// Eventos del Pixel de Meta. Si el pixel no cargó (bloqueador), no rompe nada.
const fbq = (...args) => {
    if (typeof window !== 'undefined' && typeof window.fbq === 'function') window.fbq(...args);
};

// Clic a WhatsApp: es la conversión principal de la página.
export const trackWhatsApp = (origen) => fbq('track', 'Contact', { content_name: origen });

// Formulario enviado.
export const trackLead = (servicio) => fbq('track', 'Lead', { content_name: servicio });

// Terminó la demo de reserva: sirve para armar públicos de gente con interés real.
export const trackDemo = (rubro) => fbq('trackCustom', 'DemoReserva', { rubro });

// UTM del anuncio, para saber de qué campaña vino cada consulta.
export const getOrigen = () => {
    if (typeof window === 'undefined') return '';
    const p = new URLSearchParams(window.location.search);
    return ['utm_source', 'utm_campaign', 'utm_content', 'rubro']
        .filter((k) => p.get(k))
        .map((k) => `${k}=${p.get(k)}`)
        .join(' | ');
};
