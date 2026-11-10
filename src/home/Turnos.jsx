import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Demo from './Demo';
import {
    RUBROS, TRABAJOS, PRECIO_ENTRADA, LEGAL_BASE, LEGAL_SUSCRIPCION,
    EMAIL, INSTAGRAM, APPS_SCRIPT_URL, fmtARS, waLink,
} from './config';
import { trackWhatsApp } from './track';
import { Wa, Logo, Contacto } from './ui';
import './home.css';

const INCLUYE = [
    'Tu logo y tus colores',
    'Tus servicios, precios y duraciones',
    'Tus profesionales y sus horarios',
    'Reserva online desde un link',
    'Agenda del equipo: quién viene, a qué hora y con quién',
    'Carga de turnos que llegan por teléfono o en el local',
    'Cambios de horario y cancelaciones',
];

const PASOS = [
    ['Conversamos', 'Vemos cómo trabajan hoy: servicios, equipo y horarios.'],
    ['Tu marca', 'La página de reservas lleva tu logo y tus colores.'],
    ['Lo armamos', 'Cargamos servicios, precios y profesionales.'],
    ['Reservan', 'Tus clientes eligen servicio, profesional y horario desde el celu.'],
    ['Tu agenda', 'Cada turno aparece ordenado en tu panel.'],
    ['Es tuyo', 'Queda para tu negocio, sin abono de software a Kikar.'],
];

const OTROS = [
    ['Web landing', 'Una página pensada para vender', 'Hola Kikar! Quiero consultar por una web landing.'],
    ['E-commerce', 'Tu tienda online, lista para cobrar', 'Hola Kikar! Quiero consultar por un e-commerce.'],
    ['Redes', 'Packs mensuales de gestión de redes', 'Hola Kikar! Quiero consultar por la gestión de redes.'],
    ['Producción audiovisual', 'Contenido, publicidad y cine', 'Hola Kikar! Quiero consultar por producción audiovisual.'],
    ['Socios', 'Programa de crecimiento para empresas', 'Hola Kikar! Quiero saber más del programa Socios.'],
    ['Diagnóstico', 'Gratuito · revisamos tu presencia digital', 'Hola Kikar! Quiero el diagnóstico gratuito de mi presencia digital.'],
];

const FAQ = [
    ['¿Cuánto sale?', `Las implementaciones arrancan en ARS ${fmtARS(PRECIO_ENTRADA)}, en un pago inicial. El precio final depende de lo que necesite tu negocio: cantidad de locales, funciones e integraciones. Te pasamos la propuesta por escrito antes de arrancar.`],
    ['¿Hay algún costo mensual?', 'A Kikar no le pagás abono de software. Sí hay costos de proveedores, como alojamiento, dominio y correo, que se pagan a cada uno y te detallamos antes de contratar. El soporte y las mejoras posteriores se acuerdan aparte.'],
    ['¿Puede mandar recordatorios por WhatsApp o cobrar señas?', 'Se puede sumar. Son integraciones con proveedores que tienen su propio costo, así que las evaluamos con vos y las presupuestamos según cómo trabajes.'],
    ['Ya uso otra app de turnos. ¿Puedo pasar mis datos?', 'Primero revisamos qué datos se pueden exportar de tu sistema actual y cómo importarlos. Te lo confirmamos antes de avanzar.'],
    ['¿Cuánto tarda?', 'Depende del alcance. El plazo va confirmado en la propuesta, una vez que sabemos qué necesitás.'],
    ['No trabajo con turnos. ¿Me sirve?', 'También desarrollamos sistemas de gestión a medida: pedidos, stock, catálogos mayoristas y paneles internos. Contanos qué querés ordenar y vemos si tiene sentido.'],
];

function Cuenta() {
    const [mes, setMes] = useState(70000);
    return (
        <div className="cuenta">
            <label htmlFor="mes" className="label">¿Cuánto pagás por mes de suscripción?</label>
            <output className="cuenta-mes">{fmtARS(mes)}<small>/mes</small></output>
            <input
                id="mes" type="range" min="20000" max="250000" step="5000"
                value={mes} onChange={(e) => setMes(+e.target.value)}
                style={{ '--p': `${((mes - 20000) / 230000) * 100}%` }}
            />
            <div className="cuenta-res">
                <div>
                    <span className="label">En un año</span>
                    <strong>{fmtARS(mes * 12)}</strong>
                </div>
                <div>
                    <span className="label">En tres años</span>
                    <strong>{fmtARS(mes * 36)}</strong>
                </div>
            </div>
            <p className="cuenta-nota">Y si un día dejás de pagar, te quedás sin sistema.</p>
            <Wa
                origen="cuenta"
                texto={`Hola Kikar! Hoy pago ${fmtARS(mes)} por mes por mi sistema de turnos. Quiero hacer la cuenta con ustedes.`}
                className="btn btn-green"
            >
                Hagamos la cuenta con lo que pagás
            </Wa>
            <p className="fine oscuro">{LEGAL_SUSCRIPCION}</p>
        </div>
    );
}

export default function Turnos() {
    const rubro = useMemo(() => {
        const p = new URLSearchParams(window.location.search).get('rubro');
        return RUBROS[p] ? p : 'barberia';
    }, []);
    const conRubro = new URLSearchParams(window.location.search).get('rubro') === rubro;
    const tuNegocio = conRubro ? RUBROS[rubro].tuNegocio : 'tu negocio';

    // Barra fija: aparece cuando el botón del hero sale de pantalla y se esconde en el contacto.
    const heroCta = useRef(null);
    const contacto = useRef(null);
    const [barra, setBarra] = useState(false);
    useEffect(() => {
        const vistos = { hero: true, contacto: false };
        const io = new IntersectionObserver((es) => {
            es.forEach((e) => {
                if (e.target === heroCta.current) vistos.hero = e.isIntersecting;
                if (e.target === contacto.current) vistos.contacto = e.isIntersecting;
            });
            setBarra(!vistos.hero && !vistos.contacto);
        });
        io.observe(heroCta.current);
        io.observe(contacto.current);

        const rev = new IntersectionObserver(
            (es) => es.forEach((e) => e.isIntersecting && (e.target.classList.add('in'), rev.unobserve(e.target))),
            { rootMargin: '0px 0px -8% 0px' },
        );
        document.querySelectorAll('.rv').forEach((el) => rev.observe(el));
        return () => { io.disconnect(); rev.disconnect(); };
    }, []);

    const textoDemo = `Hola Kikar! Quiero pedir una demo del sistema de turnos para ${tuNegocio}.`;

    return (
        <div className="k">
            <header className="top">
                <Link to="/" aria-label="Kikar, inicio"><Logo fondo="oscuro" /></Link>
                <Wa origen="header" texto={textoDemo} className="top-cta">Pedí tu demo</Wa>
            </header>

            <main>
                {/* ───────── HERO ───────── */}
                <section className="hero dark">
                    <div className="wrap hero-grid">
                        <div>
                            <p className="label up a1">Sistemas a medida · Córdoba</p>
                            <h1 className="a2">
                                Tu sistema de turnos, con tu marca. <span>Y&nbsp;es&nbsp;tuyo.</span>
                            </h1>
                            <p className="lead a3">
                                Lo desarrollamos para {tuNegocio}: tus clientes reservan desde un link y vos ves la agenda
                                completa. Un pago inicial, sin abono de software a Kikar.
                            </p>
                            <div className="precio a3">
                                <span className="label">Implementación inicial · desde</span>
                                <strong>ARS {fmtARS(PRECIO_ENTRADA)}</strong>
                            </div>
                            <div className="hero-ctas a4" ref={heroCta}>
                                <Wa origen="hero" texto={textoDemo}>Pedí tu demo por WhatsApp</Wa>
                                <a className="btn btn-ghost" href="#demo">Probá cómo reserva tu cliente ↓</a>
                            </div>
                            <p className="hero-sub a4">Demo de 15 minutos. Vemos cómo trabajan y qué necesitan.</p>
                        </div>
                        <figure className="hero-foto a3">
                            <img src="/img/toma_cliente_celular.webp" alt="Clienta reservando un turno desde el celular" width="900" height="1600" fetchpriority="high" />
                            <div className="toast">
                                <span className="dot" />
                                <div>
                                    <b>Nueva reserva</b>
                                    <small>Corte + Barba · Jue 16:00</small>
                                </div>
                            </div>
                            <figcaption>Imagen generada con IA</figcaption>
                        </figure>
                    </div>
                </section>

                {/* ───────── DEMO ───────── */}
                <section id="demo" className="dark sec">
                    <div className="wrap">
                        <p className="label up rv">Probalo acá</p>
                        <h2 className="rv">Así reserva tu cliente.</h2>
                        <p className="lead rv">Elegí un rubro y hacé una reserva de prueba. Tarda 10 segundos.</p>
                        <Demo rubroInicial={rubro} />
                    </div>
                </section>

                {/* ───────── LA CUENTA ───────── */}
                <section className="light sec">
                    <div className="wrap two">
                        <div>
                            <p className="label up rv">La cuenta</p>
                            <h2 className="rv">¿Pagás una suscripción por tu agenda online?</h2>
                            <p className="lead rv">
                                Con una app de turnos pagás todos los meses por algo que no es tuyo. Con Kikar hacés una
                                implementación inicial y el sistema queda para tu negocio.
                            </p>
                        </div>
                        <div className="rv"><Cuenta /></div>
                    </div>
                </section>

                {/* ───────── QUÉ INCLUYE ───────── */}
                <section className="cream2 sec">
                    <div className="wrap two">
                        <figure className="foto rv">
                            <img src="/img/toma_recepcion.webp" alt="Recepción de un local revisando la agenda en una tablet" loading="lazy" width="900" height="1600" />
                            <figcaption>Imagen generada con IA</figcaption>
                        </figure>
                        <div>
                            <p className="label up rv">Qué incluye</p>
                            <h2 className="rv">Tu logo. Tus colores. Tu agenda.</h2>
                            <ul className="checks rv">
                                {INCLUYE.map((t) => <li key={t}>{t}</li>)}
                            </ul>
                            <div className="aparte rv">
                                <p className="label">Se suma según tu negocio</p>
                                <p>Recordatorios por WhatsApp, cobro de señas, varios locales, stock o comisiones. Lo vemos en la demo y va presupuestado aparte.</p>
                            </div>
                            <Wa origen="incluye" texto={textoDemo} className="btn btn-green rv">Pedí tu demo</Wa>
                        </div>
                    </div>
                </section>

                {/* ───────── PROCESO ───────── */}
                <section id="section-1" className="dark sec">
                    <div className="wrap">
                        <p className="label up rv">Paso a paso</p>
                        <h2 className="rv">De la primera charla a tu sistema funcionando.</h2>
                        <ol className="pasos">
                            {PASOS.map(([t, d], i) => (
                                <li key={t} className="rv">
                                    <span className="num">{String(i + 1).padStart(2, '0')}</span>
                                    <div>
                                        <h3>{t}</h3>
                                        <p>{d}</p>
                                    </div>
                                </li>
                            ))}
                        </ol>
                        <p className="fine">{LEGAL_BASE}</p>
                    </div>
                </section>

                {/* ───────── GESTIÓN ───────── */}
                <section className="light sec">
                    <div className="wrap two">
                        <div>
                            <p className="label up rv">Gestión</p>
                            <h2 className="rv">¿Lo tuyo no son los turnos? Armamos el sistema que tu negocio necesita.</h2>
                            <p className="lead rv">
                                Pedidos, stock, catálogos mayoristas, paneles internos. Sistemas de administración a medida,
                                con la misma idea: se hacen para tu forma de trabajar y quedan para tu empresa.
                            </p>
                            <Wa origen="gestion" texto="Hola Kikar! Quiero consultar por un sistema de gestión a medida." className="btn btn-green rv">
                                Contanos qué querés ordenar
                            </Wa>
                        </div>
                        <ul className="tags rv" aria-label="Ejemplos de sistemas">
                            {['Pedidos mayoristas', 'Control de stock', 'Catálogo con panel', 'Listas de precios', 'Cotizaciones', 'Panel de clientes'].map((t) => <li key={t}>{t}</li>)}
                        </ul>
                    </div>
                </section>

                {/* ───────── LO DE SIEMPRE ───────── */}
                <section id="section-0" className="cream2 sec">
                    <div className="wrap">
                        <p className="label up rv">Y lo de siempre</p>
                        <h2 className="rv">Todo lo que hace falta para que tu negocio venda online.</h2>
                        <div className="otros">
                            {OTROS.map(([t, d, msg], i) => (
                                <a
                                    key={t} className={`otro rv ${i % 2 ? '' : 'osc'}`}
                                    href={waLink(msg)} target="_blank" rel="noopener noreferrer"
                                    onClick={() => trackWhatsApp('servicio-' + t)}
                                >
                                    <span className="label">{String(i + 1).padStart(2, '0')} / 06</span>
                                    <h3>{t}</h3>
                                    <p className="label">{d}</p>
                                    <span className="arrow" aria-hidden="true">→</span>
                                </a>
                            ))}
                        </div>
                        <p className="mas rv">
                            <Link to="/prices">Ver packs de redes y precios</Link>
                            <Link to="/instituciones-educativas">Instituciones educativas</Link>
                        </p>
                    </div>
                </section>

                {/* ───────── TRABAJOS ───────── */}
                <section className="light sec">
                    <div className="wrap">
                        <p className="label up rv">Trabajos</p>
                        <h2 className="rv">Sitios y sistemas que ya están funcionando.</h2>
                        <ul className="trabajos rv">
                            {TRABAJOS.map((t) => (
                                <li key={t.n}>
                                    <a href={t.u} target="_blank" rel="noopener noreferrer">
                                        <b>{t.n}</b>
                                        <span className="label">{t.r}</span>
                                        <i aria-hidden="true">↗</i>
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </section>

                {/* ───────── FAQ ───────── */}
                <section className="cream2 sec">
                    <div className="wrap narrow">
                        <p className="label up rv">Preguntas</p>
                        <h2 className="rv">Lo que nos preguntan antes de arrancar.</h2>
                        <div className="faq rv">
                            {FAQ.map(([q, a]) => (
                                <details key={q}>
                                    <summary>{q}</summary>
                                    <p>{a}</p>
                                </details>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ───────── CONTACTO ───────── */}
                <section id="contacto" className="dark sec final" ref={contacto}>
                    <div className="wrap two">
                        <div>
                            <span id="section-2" /><span id="agendar" />
                            <p className="label up">Pedí tu demo</p>
                            <h2>Vemos tu caso en 15 minutos.</h2>
                            <p className="lead">
                                Te mostramos el ejemplo de reservas y agenda, revisamos qué usás hoy y hacemos la cuenta con
                                lo que pagás.
                            </p>
                            <Wa origen="contacto" texto={textoDemo}>Escribinos por WhatsApp</Wa>
                            <p className="hero-sub">Lunes a viernes, de 9 a 18 h.</p>
                        </div>
                        <div>
                            <p className="label o">O dejanos tus datos y te escribimos</p>
                            <Contacto servicio="Sistema de turnos / gestión" ejemplo={RUBROS[rubro].marca} />
                        </div>
                    </div>
                </section>
            </main>

            <footer className="foot dark">
                <div className="wrap">
                    <Logo fondo="oscuro" />
                    <nav>
                        <Link to="/prices">Precios</Link>
                        <Link to="/instituciones-educativas">Instituciones</Link>
                        <a href={INSTAGRAM} target="_blank" rel="noopener noreferrer">Instagram</a>
                        <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
                    </nav>
                    <p className="fine">{LEGAL_BASE} Las marcas de la demo son ficticias.</p>
                    <p className="label">Córdoba · © {new Date().getFullYear()} Kikar</p>
                </div>
            </footer>

            <div className={`barra ${barra ? 'on' : ''}`} aria-hidden={!barra}>
                <div>
                    <span className="label">Desde</span>
                    <strong>ARS {fmtARS(PRECIO_ENTRADA)}</strong>
                </div>
                <Wa origen="barra-fija" texto={textoDemo}>Pedí tu demo</Wa>
            </div>
        </div>
    );
}
