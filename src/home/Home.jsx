import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Demo from './Demo';
import { TRABAJOS, PRECIO_ENTRADA, EMAIL, INSTAGRAM, fmtARS, waLink } from './config';
import { trackWhatsApp } from './track';
import { Wa, Logo, Contacto, useReveal, useBarra } from './ui';
import './home.css';

const IMG = '/img/esculturas/';
const MSG_DIAG = 'Hola Kikar! Quiero un diagnóstico de mi negocio.';

// El recorrido de una venta: cada etapa con su escultura.
const RECORRIDO = [
    { k: 'ven', t: 'Te ven', d: 'Contenido y publicidad para que la gente correcta se cruce con tu marca.', alt: 'Estatua de mármol sacándose una selfie con un celular' },
    { k: 'eligen', t: 'Te eligen', d: 'Una web clara, que explica qué vendés y lleva directo a la consulta.', alt: 'Mano de mármol señalando' },
    { k: 'compran', t: 'Te compran', d: 'Reservas, pedidos y consultas que entran ordenados.', alt: 'Dos manos de mármol pasándose una moneda' },
    { k: 'vuelven', t: 'Vuelven', d: 'Medimos qué funcionó, ajustamos y volvemos a salir.', alt: 'Corona de laurel de mármol' },
];

const CREAR = [
    {
        t: 'Estrategia comercial', img: 'det-ojo.webp',
        d: 'Antes de producir nada, ordenamos qué ofrecer, a quién y por dónde.',
        items: ['Diagnóstico gratuito', 'Plan comercial', 'Programa Socios'],
    },
    {
        t: 'Contenido y publicidad', img: 'det-mano.webp',
        d: 'Piezas con un objetivo comercial y campañas que las ponen frente a tu cliente.',
        items: ['Redes', 'Meta Ads', 'Producción audiovisual'], to: '/prices', cta: 'Ver packs',
    },
    {
        t: 'Web y tiendas', mock: 'web',
        d: 'Páginas que explican qué vendés y tiendas listas para cobrar.',
        items: ['Web landing', 'E-commerce', 'Catálogos'],
    },
    {
        t: 'Sistemas a medida', mock: 'sis',
        d: 'Turnos y gestión con tu marca, hechos para tu forma de trabajar.',
        items: ['Agenda', 'Gestión'], to: '/turnos', cta: 'Ver la demo',
    },
];

const METODO = [
    ['Entendemos', 'Tu negocio, tu cliente y lo que querés lograr.'],
    ['Proponemos', 'Un plan concreto: qué hacer, en qué orden y cuánto sale.'],
    ['Creamos', 'Contenido, anuncios, web o sistema. Lo producimos nosotros.'],
    ['Medimos', 'Miramos los números y ajustamos.'],
];

const Mock = ({ tipo }) =>
    tipo === 'web' ? (
        <div className="mk mk-web" aria-hidden="true">
            <div className="win"><span /><span /><span className="corto" /><em>Consultar</em><u /></div>
        </div>
    ) : (
        <div className="mk mk-sis" aria-hidden="true">
            <div className="cal">
                <b>Elegí tu horario</b>
                <p><i>10:00</i><i className="on">11:00</i><i>12:00</i></p>
                <em>Confirmar</em>
            </div>
        </div>
    );

export default function Home() {
    useReveal();
    const { heroCta, contacto, barra } = useBarra();
    const raiz = useRef(null);
    useEffect(() => {
        // Un solo listener: deja el scroll en --sy para el movimiento del busto.
        let raf = 0;
        const on = () => {
            if (raf) return;
            raf = requestAnimationFrame(() => { raf = 0; raiz.current?.style.setProperty('--sy', Math.min(window.scrollY, 900)); });
        };
        window.addEventListener('scroll', on, { passive: true });

        // Profundidad del hero: sigue al mouse en escritorio y a la inclinación del celular donde no pide permiso.
        const mover = (x, y) => {
            raiz.current?.style.setProperty('--px', Math.max(-1, Math.min(1, x)).toFixed(3));
            raiz.current?.style.setProperty('--py', Math.max(-1, Math.min(1, y)).toFixed(3));
        };
        const mouse = (e) => mover((e.clientX / window.innerWidth) * 2 - 1, (e.clientY / window.innerHeight) * 2 - 1);
        const giro = (e) => e.gamma != null && mover(e.gamma / 25, (e.beta - 45) / 30);
        window.addEventListener('pointermove', mouse, { passive: true });
        const conGiro = 'DeviceOrientationEvent' in window && typeof window.DeviceOrientationEvent.requestPermission !== 'function';
        if (conGiro) window.addEventListener('deviceorientation', giro, { passive: true });
        return () => {
            window.removeEventListener('scroll', on);
            window.removeEventListener('pointermove', mouse);
            if (conGiro) window.removeEventListener('deviceorientation', giro);
        };
    }, []);

    return (
        <div className="k calma" ref={raiz}>
            <header className="top">
                <Logo fondo="oscuro" bajada />
                <nav className="top-nav">
                    <a href="#soluciones">Soluciones</a>
                    <a href="#trabajos">Trabajos</a>
                    <a href="#metodo">Método</a>
                </nav>
                <Wa origen="header" texto={MSG_DIAG} className="top-cta lleno">Hablemos</Wa>
            </header>

            <main>
                {/* ───────── HERO ───────── */}
                <section className="dark h-hero">
                    <img className="paisaje" src={`${IMG}paisaje-hero.webp`} alt="" aria-hidden="true" width="1000" height="1250" fetchpriority="high" />
                    <div className="escena">
                        <img className="halo" src={`${IMG}laurel.webp`} alt="" aria-hidden="true" width="800" height="800" />
                        <img className="busto" src={`${IMG}hero-busto.webp`} alt="Busto de mármol con corona de laurel" width="1100" height="1374" fetchpriority="high" />
                        <img className="mano-h" src={`${IMG}etapa-eligen.webp`} alt="" aria-hidden="true" />
                        <span className="chip c1" aria-hidden="true"><i className="cora" /></span>
                        <span className="chip c2" aria-hidden="true"><i className="punto" />Nueva consulta</span>
                        <span className="chip c3" aria-hidden="true"><i className="play" /></span>
                    </div>
                    <div className="wrap">
                        <h1>
                            <span className="ln"><span>El arte de</span></span>
                            <span className="ln"><span>hacer crecer.</span></span>
                        </h1>
                        <p className="lead a3">Estrategia, creatividad y tecnología.</p>
                        <div className="hero-ctas a4" ref={heroCta}>
                            <Wa origen="hero" texto={MSG_DIAG}>Quiero un diagnóstico</Wa>
                            <a className="sub-link" href="#trabajos">Ver trabajos</a>
                        </div>
                    </div>
                </section>

                {/* ───────── UNA MISMA DIRECCIÓN ───────── */}
                <section id="recorrido" className="light sec hoja">
                    <div className="wrap">
                        <span id="section-1" />
                        <h2 className="rv">Una misma dirección.</h2>
                        <p className="lead rv">Cada parte de tu negocio, conectada.</p>
                        <ol className="linea rv" aria-hidden="true">
                            {RECORRIDO.map((e) => <li key={e.k}>{e.t}</li>)}
                        </ol>
                        <ol className="pila">
                            {RECORRIDO.map((e, i) => (
                                <li key={e.k} className={`etapa e-${e.k}`} style={{ '--i': i }}>
                                    <div className="esc"><img src={`${IMG}etapa-${e.k}.webp`} alt={e.alt} decoding="async" /></div>
                                    <div className="txt">
                                        <span className="label">{String(i + 1).padStart(2, '0')} / 04</span>
                                        <h3>{e.t}</h3>
                                        <p>{e.d}</p>
                                    </div>
                                </li>
                            ))}
                        </ol>
                    </div>
                </section>

                {/* ───────── LO QUE PODEMOS CREAR ───────── */}
                <section id="soluciones" className="light sec">
                    <div className="wrap">
                        <span id="section-0" />
                        <h2 className="rv">Lo que podemos crear juntos.</h2>
                        <div className="crear">
                            {CREAR.map((c) => (
                                <article key={c.t} className="sol rv">
                                    {c.img
                                        ? <div className="mk"><img src={IMG + c.img} alt="" width="900" height="600" loading="lazy" /></div>
                                        : <Mock tipo={c.mock} />}
                                    <div>
                                        <h3>{c.t}</h3>
                                        <p>{c.d}</p>
                                        <ul>{c.items.map((x) => <li key={x}>{x}</li>)}</ul>
                                        <div className="sol-ctas">
                                            <a
                                                href={waLink(`Hola Kikar! Quiero consultar por ${c.t.toLowerCase()}.`)}
                                                target="_blank" rel="noopener noreferrer"
                                                onClick={() => trackWhatsApp('solucion-' + c.t)}
                                            >
                                                Consultar →
                                            </a>
                                            {c.to && <Link to={c.to}>{c.cta}</Link>}
                                        </div>
                                    </div>
                                </article>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ───────── SISTEMAS (con la demo) ───────── */}
                <section id="sistemas" className="dark sec hoja">
                    <div className="wrap">
                        <p className="label up rv">Sistemas a medida</p>
                        <h2 className="rv">Así se reserva un turno.</h2>
                        <p className="lead rv">
                            Desarrollamos sistemas de turnos y de gestión con tu marca. Un pago inicial desde
                            ARS {fmtARS(PRECIO_ENTRADA)}, sin abono de software a Kikar. Probalo:
                        </p>
                        <Demo rubroInicial="barberia" />
                        <div className="sis-cta rv">
                            <Link className="btn btn-cream" to="/turnos">Ver todo sobre el sistema de turnos</Link>
                        </div>
                    </div>
                </section>

                {/* ───────── MÉTODO ───────── */}
                <section id="metodo" className="dark sec hoja metodo-sec">
                    <img className="nubes" src={`${IMG}nubes.webp`} alt="" aria-hidden="true" width="1400" height="788" loading="lazy" />
                    <div className="wrap">
                        <h2 className="rv">De la idea a la acción.</h2>
                        <ol className="metodo">
                            {METODO.map(([t, d], i) => (
                                <li key={t} className="rv" style={{ '--d': `${i * 0.12}s` }}>
                                    <h3>{t}</h3>
                                    <p>{d}</p>
                                </li>
                            ))}
                        </ol>
                    </div>
                </section>

                {/* ───────── BANDA ───────── */}
                <section className="banda">
                    <img src={`${IMG}banda-mano.webp`} alt="Pintura de una mano extendida sobre un paisaje" width="1400" height="788" loading="lazy" />
                    <p className="rv">Tu marca,<br />con dirección.</p>
                </section>

                {/* ───────── TRABAJOS ───────── */}
                <section id="trabajos" className="lienzo sec">
                    <img className="deco-mano" src={`${IMG}trabajos-mano.webp`} alt="" aria-hidden="true" width="1000" height="795" loading="lazy" />
                    <div className="wrap">
                        <h2 className="rv">Webs que ya están funcionando.</h2>
                        <p className="lead rv">Tocá cualquiera para verla en vivo.</p>
                    </div>
                    <ul className="obras rv">
                        {TRABAJOS.map((t, i) => (
                            <li key={t.n}>
                                <a href={t.u} target="_blank" rel="noopener noreferrer">
                                    <span className="cap"><img src={`/img/trabajos/${t.img}.webp`} alt={`Captura del sitio de ${t.n}`} width="800" height="450" loading="lazy" /></span>
                                    <span className="label">{String(i + 1).padStart(2, '0')}</span>
                                    <b>{t.n} <i aria-hidden="true">↗</i></b>
                                    <small>{t.r}</small>
                                </a>
                            </li>
                        ))}
                    </ul>
                    <p className="carril-tip label" aria-hidden="true">Deslizá →</p>
                </section>

                {/* ───────── CIERRE ───────── */}
                <div ref={contacto}>
                    <section className="llamado">
                        <img src={`${IMG}cierre-joven.webp`} alt="Pintura de un joven con corona de laurel y manto rojo" width="1300" height="867" loading="lazy" />
                        <div className="wrap">
                            <span id="section-2" /><span id="agendar" />
                            <h2 className="rv">Hablemos de tu próximo paso.</h2>
                            <p className="lead rv">Contanos qué vendés y vemos por dónde arrancar.</p>
                            <Wa origen="contacto" texto={MSG_DIAG} className="btn btn-green rv">Empezar una conversación</Wa>
                            <p className="hero-sub rv">Lunes a viernes, de 9 a 18 h.</p>
                        </div>
                    </section>

                    <section id="contacto" className="dark sec final hoja">
                        <img className="busto-fin" src={`${IMG}cierre-busto.webp`} alt="Busto de mármol de un filósofo hablando por celular" width="1100" height="1374" loading="lazy" />
                        <div className="wrap">
                            <div className="fin-txt">
                                <h2>¿Preferís que te escribamos?</h2>
                                <p className="lead">Dejanos tus datos y te contactamos.</p>
                            </div>
                            <Contacto servicio="Diagnóstico" ejemplo="Tu marca" />
                        </div>
                    </section>
                </div>
            </main>

            <footer className="foot dark">
                <div className="wrap">
                    <Logo fondo="oscuro" bajada />
                    <nav>
                        <Link to="/turnos">Sistema de turnos</Link>
                        <Link to="/prices">Precios</Link>
                        <Link to="/instituciones-educativas">Instituciones</Link>
                        <a href={INSTAGRAM} target="_blank" rel="noopener noreferrer">Instagram</a>
                        <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
                    </nav>
                    <p className="fine">Las esculturas y pinturas son imágenes generadas con IA.</p>
                    <p className="label">Córdoba · © {new Date().getFullYear()} Kikar</p>
                </div>
            </footer>

            <div className={`barra ${barra ? 'on' : ''}`} aria-hidden={!barra}>
                <div>
                    <span className="label">Gratis</span>
                    <strong>Diagnóstico</strong>
                </div>
                <Wa origen="barra-fija" texto={MSG_DIAG}>Hablemos</Wa>
            </div>
        </div>
    );
}
