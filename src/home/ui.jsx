import React, { useEffect, useRef, useState } from 'react';
import { APPS_SCRIPT_URL, waLink } from './config';
import { trackWhatsApp, trackLead, getOrigen } from './track';

export const WaIcon = () => (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
        <path d="M12.04 2a9.9 9.9 0 0 0-8.5 15l-1.4 5 5.2-1.36A9.9 9.9 0 1 0 12.04 2Zm0 1.8a8.1 8.1 0 1 1-4.2 15.04l-.3-.18-3 .8.8-2.94-.2-.31A8.1 8.1 0 0 1 12.04 3.8Zm-3.3 3.9c-.2 0-.5.07-.75.35-.26.28-.98.96-.98 2.34 0 1.38 1 2.71 1.15 2.9.14.19 1.95 3.1 4.8 4.22 2.37.93 2.85.75 3.37.7.51-.05 1.66-.68 1.9-1.34.23-.65.23-1.21.16-1.33-.07-.12-.26-.19-.54-.33-.28-.14-1.66-.82-1.92-.91-.26-.1-.44-.14-.63.14-.19.28-.73.91-.9 1.1-.16.19-.33.21-.6.07-.29-.14-1.2-.44-2.28-1.4a8.5 8.5 0 0 1-1.58-1.97c-.16-.28-.02-.43.13-.57.12-.12.28-.33.42-.49.14-.16.19-.28.28-.47.1-.19.05-.35-.02-.49-.07-.14-.62-1.53-.87-2.1-.22-.5-.44-.5-.62-.5h-.52Z" />
    </svg>
);

export const Wa = ({ origen, texto, className = 'btn btn-cream', children }) => (
    <a className={className} href={waLink(texto)} target="_blank" rel="noopener noreferrer" onClick={() => trackWhatsApp(origen)}>
        <WaIcon />
        <span>{children}</span>
    </a>
);

// Regla del kit: en fondos oscuros va el isotipo invert; en fondos claros, el normal.
export const Logo = ({ fondo = 'oscuro', bajada = false }) => (
    <span className={`logo ${fondo}`}>
        <img src={fondo === 'oscuro' ? '/isotipo-invert.png' : '/isotipo.png'} alt="" width="36" height="36" />
        <span>
            KIKAR
            {bajada && <small>Estrategias comerciales</small>}
        </span>
    </span>
);

export function Contacto({ servicio, ejemplo = 'Barbería Norte' }) {
    const [f, setF] = useState({ nombre: '', contacto: '', empresa: '' });
    const [estado, setEstado] = useState('idle');
    const on = (e) => setF({ ...f, [e.target.name]: e.target.value });

    const enviar = async (e) => {
        e.preventDefault();
        setEstado('loading');
        try {
            await fetch(APPS_SCRIPT_URL, {
                method: 'POST',
                mode: 'no-cors',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...f,
                    servicio,
                    origen: getOrigen(),
                    fecha: new Date().toLocaleString('es-AR', { timeZone: 'America/Argentina/Buenos_Aires' }),
                }),
            });
            trackLead(servicio);
            setEstado('ok');
        } catch {
            setEstado('error');
        }
    };

    if (estado === 'ok') {
        return (
            <div className="form ok">
                <h3>Listo, {f.nombre.split(' ')[0]}.</h3>
                <p>Recibimos tus datos y te escribimos. Si preferís, adelantá por WhatsApp.</p>
                <Wa origen="form-ok" texto={`Hola Kikar! Soy ${f.nombre}, acabo de dejar mis datos en la web.`}>Escribir ahora</Wa>
            </div>
        );
    }

    return (
        <form className="form" onSubmit={enviar}>
            <label>
                <span className="label">Tu nombre</span>
                <input name="nombre" value={f.nombre} onChange={on} required autoComplete="given-name" placeholder="Juan" />
            </label>
            <label>
                <span className="label">Tu WhatsApp</span>
                <input name="contacto" value={f.contacto} onChange={on} required type="tel" inputMode="tel" autoComplete="tel" placeholder="351 000 0000" />
            </label>
            <label>
                <span className="label">Tu negocio</span>
                <input name="empresa" value={f.empresa} onChange={on} placeholder={`Ej: ${ejemplo}`} />
            </label>
            {estado === 'error' && <p className="form-err">No se pudo enviar. Probá de nuevo o escribinos por WhatsApp.</p>}
            <button className="btn btn-cream" disabled={estado === 'loading'}>
                {estado === 'loading' ? 'Enviando…' : 'Quiero que me escriban'}
            </button>
        </form>
    );
}

// Aparición suave de los bloques .rv al entrar en pantalla.
export function useReveal() {
    useEffect(() => {
        const rev = new IntersectionObserver(
            (es) => es.forEach((e) => e.isIntersecting && (e.target.classList.add('in'), rev.unobserve(e.target))),
            { rootMargin: '0px 0px -8% 0px' },
        );
        document.querySelectorAll('.rv').forEach((el) => rev.observe(el));
        return () => rev.disconnect();
    }, []);
}

// Barra fija: aparece cuando el botón del hero sale de pantalla y se esconde en el contacto.
export function useBarra() {
    const heroCta = useRef(null);
    const contacto = useRef(null);
    const [barra, setBarra] = useState(false);
    useEffect(() => {
        const v = { hero: true, contacto: false };
        const io = new IntersectionObserver((es) => {
            es.forEach((e) => {
                if (e.target === heroCta.current) v.hero = e.isIntersecting;
                if (e.target === contacto.current) v.contacto = e.isIntersecting;
            });
            setBarra(!v.hero && !v.contacto);
        });
        io.observe(heroCta.current);
        io.observe(contacto.current);
        return () => io.disconnect();
    }, []);
    return { heroCta, contacto, barra };
}
