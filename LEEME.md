# Kikar · web 2026

Web nueva, pensada para tráfico de Meta en celular.

- `/` es la home de la agencia: estrategia comercial, los ocho servicios, método, una sección de sistemas con la demo, trabajos y contacto.
- `/turnos` es la landing del sistema de turnos, para mandar ahí los anuncios de esa campaña.

## Probar y publicar

```bash
npm install
npm run dev        # ver en el navegador
npm run build
npx wrangler pages deploy dist --project-name broken-wood-3e5c
```

## Dónde se toca cada cosa

- `src/home/config.js`: WhatsApp, precio de entrada, textos legales, rubros de la demo y lista de trabajos.
- `src/home/Home.jsx`: la home de la agencia.
- `src/home/Turnos.jsx`: la landing del sistema de turnos.
- `src/home/ui.jsx`: logo, botón de WhatsApp y formulario, compartidos.
- `src/home/Demo.jsx`: la reserva de prueba.
- `src/home/home.css`: estilos (paleta y tipografías del kit: Cabinet Grotesk + NORD).
- `src/legacy/`: las páginas anteriores `/prices` e `/instituciones-educativas`, sin cambios. Se cargan aparte.

## Links para los anuncios

`https://www.kikar.com.ar/turnos?rubro=barberia` (también `salon`, `estetica`, `unas`) abre la página hablando de ese rubro y con la demo ya en esa marca. Sumale los UTM de siempre: quedan guardados en la planilla junto con cada formulario.

## Eventos del Pixel

- `Contact`: cada clic a WhatsApp (con el lugar del botón en `content_name`).
- `Lead`: formulario enviado.
- `DemoReserva` (personalizado): terminó la reserva de prueba. Sirve para armar públicos.

## Esculturas

Las imágenes de `public/img/esculturas/` son las esculturas generadas con IA, ya recortadas y optimizadas. Para cambiar una, se reemplaza el archivo con el mismo nombre.
