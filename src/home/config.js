// Todo lo que se toca seguido está acá: contacto, precio de entrada, textos legales y rubros de la demo.

export const WHATSAPP = '5493513022840';
export const EMAIL = 'hola@kikar.com.ar';
export const INSTAGRAM = 'https://www.instagram.com/kikar.ar';
export const APPS_SCRIPT_URL =
    'https://script.google.com/macros/s/AKfycbxZd9aTLM7FLPG4-ETu2f_-8KQR7rGDek-gnwAucj0VfibadMyl254DlE0vJ-U5m9c5/exec';

export const PRECIO_ENTRADA = 500000; // ARS, implementación inicial

export const LEGAL_BASE =
    'Pantallas y precios ilustrativos. Alcance y presupuesto final según cada negocio. Alojamiento, dominio y correo se pagan a cada proveedor.';
export const LEGAL_SUSCRIPCION =
    'Ejemplo ilustrativo; no es un cálculo de ahorro. Precio de entrada sujeto al alcance. Alojamiento, dominio y correo se pagan a cada proveedor.';

export const fmtARS = (n) => '$' + Math.round(n).toLocaleString('es-AR');

export const waLink = (texto) =>
    `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(texto)}`;

// Rubros de la demo. Se puede abrir la página con ?rubro=barberia | salon | estetica | unas
// para que el anuncio y la página hablen del mismo negocio. Las marcas son ficticias.
export const RUBROS = {
    barberia: {
        tab: 'Barbería',
        tuNegocio: 'tu barbería',
        marca: 'Barbería Norte',
        color: '#1E3352',
        servicios: [
            { n: 'Corte', min: 45, p: 18000 },
            { n: 'Corte + Barba', min: 60, p: 22000 },
            { n: 'Barba', min: 30, p: 12000 },
            { n: 'Color', min: 120, p: 45000 },
        ],
        equipo: ['Lucio', 'Tomás', 'Nico'],
        agenda: [
            ['09:00', 'Julián', 'Corte', 'Lucio'],
            ['11:30', 'Diego', 'Barba', 'Nico'],
        ],
    },
    salon: {
        tab: 'Salón',
        tuNegocio: 'tu salón',
        marca: 'Estudio Lumen',
        color: '#7A4B3A',
        servicios: [
            { n: 'Corte y brushing', min: 60, p: 20000 },
            { n: 'Color', min: 120, p: 45000 },
            { n: 'Nutrición', min: 45, p: 18000 },
            { n: 'Peinado', min: 45, p: 16000 },
        ],
        equipo: ['Camila', 'Flor', 'Sol'],
        agenda: [
            ['09:00', 'Martina', 'Color', 'Camila'],
            ['11:30', 'Paula', 'Peinado', 'Sol'],
        ],
    },
    estetica: {
        tab: 'Estética',
        tuNegocio: 'tu centro de estética',
        marca: 'Alma Estética',
        color: '#4E6E5E',
        servicios: [
            { n: 'Limpieza facial', min: 60, p: 25000 },
            { n: 'Masaje descontracturante', min: 50, p: 28000 },
            { n: 'Depilación', min: 30, p: 15000 },
            { n: 'Tratamiento corporal', min: 60, p: 30000 },
        ],
        equipo: ['Julieta', 'Carla'],
        agenda: [
            ['09:00', 'Lucía', 'Limpieza facial', 'Julieta'],
            ['11:30', 'Ana', 'Depilación', 'Carla'],
        ],
    },
    unas: {
        tab: 'Uñas',
        tuNegocio: 'tu estudio de uñas',
        marca: 'Nails Club',
        color: '#8E4A5E',
        servicios: [
            { n: 'Semipermanente', min: 60, p: 14000 },
            { n: 'Kapping', min: 90, p: 18000 },
            { n: 'Esculpidas', min: 120, p: 24000 },
            { n: 'Retiro', min: 30, p: 6000 },
        ],
        equipo: ['Agus', 'Mica'],
        agenda: [
            ['09:00', 'Sofía', 'Kapping', 'Agus'],
            ['11:30', 'Valen', 'Semipermanente', 'Mica'],
        ],
    },
};

export const DIAS = ['Jue 12', 'Vie 13', 'Sáb 14'];
export const HORAS = [
    { h: '10:00', libre: true },
    { h: '11:30', libre: false },
    { h: '16:00', libre: true },
    { h: '17:30', libre: true },
    { h: '18:30', libre: false },
    { h: '19:00', libre: true },
];

// Webs hechas por Kikar, en orden de prioridad. La miniatura es una captura del sitio en celular.
export const TRABAJOS = [
    { n: 'Alquimia', r: 'Insumos B2B · catálogo y cotización', u: 'https://alquimiaarg.com.ar/', img: 'alquimia' },
    { n: 'Instituto América', r: 'Educación · sitio institucional', u: 'https://instamerica.com.ar/', img: 'instituto-america' },
    { n: 'arba Hogar', r: 'Mueblería · landing y catálogo', u: 'https://arbahogar.com.ar/', img: 'arba-hogar' },
    { n: 'El Madero', r: 'Fábrica · venta mayorista', u: 'https://kikar-agency.github.io/madero_mayorista/', img: 'el-madero' },
    { n: 'Dario Ludueña', r: 'Media kit · métricas para colaboraciones', u: 'https://kikar-agency.github.io/darioludue-a/', img: 'dario-luduena' },
    { n: 'DS Muebles', r: 'Mueblería · catálogo', u: 'https://kikar-agency.github.io/dsmuebles/', img: 'ds-muebles' },
    { n: 'Ve.creativa', r: 'Papelería · catálogo con carrito', u: 'https://kikar-agency.github.io/ve.creativa2/', img: 've-creativa' },
    { n: 'Deco & Vita', r: 'Pinturas · tienda', u: 'https://kikar-agency.github.io/Decoyvita/', img: 'deco-vita' },
    { n: 'Neutra', r: 'Distribuidora mayorista', u: 'https://kikar-agency.github.io/Neutra/', img: 'neutra' },
    { n: 'AquaClean', r: 'Servicios de limpieza', u: 'https://kikar-agency.github.io/Aquaclean/', img: 'aquaclean' },
];
