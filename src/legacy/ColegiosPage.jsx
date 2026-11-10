import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
    ArrowLeft, ArrowRight, ChevronDown, ChevronUp,
    Globe, Users, Palette, BarChart2, Camera, Pen,
    TrendingUp, GraduationCap, MapPin, MessageSquare,
    Target, CheckCircle2, BarChart, Clock
} from 'lucide-react';
import { Link } from 'react-router-dom';

/* ─── BRAND TOKENS ──────────────────────────────────────────────────────────── */
const B = {
    black:   '#0D0D0F',
    gray:    '#6B7280',
    light:   '#F1F2F5',
    white:   '#FFFFFF',
    grad:    'linear-gradient(135deg, #4F46E5 0%, #7C3AED 50%, #10B981 100%)',
    gradText:'linear-gradient(135deg, #4F46E5, #7C3AED, #10B981)',
    indigo:  '#4F46E5',
    violet:  '#7C3AED',
    teal:    '#10B981',
    border:  '#E4E5EA',
};

/* ─── HELPERS ───────────────────────────────────────────────────────────────── */
const GradText = ({ children, style = {} }) => (
    <span style={{ background: B.gradText, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', ...style }}>
        {children}
    </span>
);

const DotPattern = ({ style = {} }) => (
    <svg width="180" height="180" viewBox="0 0 180 180" style={{ position: 'absolute', opacity: 0.18, ...style }}>
        {Array.from({ length: 7 }).map((_, row) =>
            Array.from({ length: 7 }).map((_, col) => (
                <circle key={`${row}-${col}`} cx={col * 28 + 10} cy={row * 28 + 10} r="2.5" fill={B.indigo} />
            ))
        )}
    </svg>
);

const FloatCard = ({ icon, label, value, color, style = {} }) => (
    <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: style.animDelay || 0 }}
        style={{
            position: 'absolute',
            background: B.white,
            borderRadius: '14px',
            padding: '14px 18px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            boxShadow: '0 8px 32px rgba(0,0,0,0.10)',
            minWidth: '160px',
            ...style,
            animDelay: undefined,
        }}
    >
        <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: `${color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', color, flexShrink: 0 }}>
            {icon}
        </div>
        <div>
            <div style={{ fontSize: '11px', color: B.gray, fontWeight: 500, lineHeight: 1.2 }}>{label}</div>
            <div style={{ fontSize: '18px', fontWeight: 700, color: B.black, lineHeight: 1.2 }}>{value}</div>
        </div>
    </motion.div>
);

const SectionTag = ({ children }) => (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 14px', background: `${B.indigo}12`, borderRadius: '100px', marginBottom: '20px' }}>
        <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: B.grad, flexShrink: 0 }} />
        <span style={{ fontSize: '12px', fontWeight: 600, letterSpacing: '0.08em', color: B.indigo }}>
            {children}
        </span>
    </div>
);

const Divider = () => (
    <div style={{ height: '1px', background: B.border, margin: '0 0 64px' }} />
);

/* ─── MAIN ──────────────────────────────────────────────────────────────────── */
const ColegiosPage = () => {
    const [openFaq, setOpenFaq] = useState(null);
    const wa = "5493513022840";

    /* data */
    const services = [
        { icon: <Globe size={20} />,     title: 'Sitio Web Institucional',    desc: 'Presencia digital que comunica la identidad y propuesta educativa desde el primer clic. Optimizado para búsquedas locales.' },
        { icon: <Users size={20} />,     title: 'Gestión de Redes Sociales',  desc: 'Contenido institucional planificado que mantiene viva la comunidad educativa y atrae nuevas familias.' },
        { icon: <Palette size={20} />,   title: 'Diseño Visual',              desc: 'Identidad gráfica consistente en todos los canales: digital, impreso y eventos. Piezas que reflejan la excelencia del colegio.' },
        { icon: <BarChart2 size={20} />, title: 'Estrategia Digital',         desc: 'Plan de presencia alineado con captación, retención y posicionamiento. Decisiones basadas en datos, no suposiciones.' },
        { icon: <Camera size={20} />,    title: 'Cobertura de Eventos',       desc: 'Documentación de actos, ceremonias y actividades con visibilidad institucional en tiempo real.' },
        { icon: <Pen size={20} />,       title: 'Copywriting Institucional',  desc: 'Mensajes que comunican los valores del colegio con voz propia, cálida y profesional.' },
    ];

    const valueProps = [
        { icon: <TrendingUp size={22} />, color: B.indigo, title: 'Más inscriptos, más ingresos', desc: 'Una presencia digital activa convierte búsquedas online en consultas reales de inscripción. Cada nueva matrícula por este canal ya justifica la inversión del año.' },
        { icon: <Target size={22} />,     color: B.violet, title: 'Justificá y elevá tu cuota',   desc: 'Un colegio con presencia impecable transmite excelencia antes del primer contacto. Esa percepción te da el respaldo para posicionarte en el segmento premium.' },
        { icon: <CheckCircle2 size={22}/>, color: B.teal,  title: 'Mostrá lo que ya hacés bien',  desc: 'Tu colegio ya tiene historia, valores y trabajo real. Lo hacemos visible para que las familias entiendan por qué merece lo que cobra.' },
    ];

    const stats = [
        { value: '+340%', label: 'Alcance orgánico',        sub: '6 meses de gestión',        color: B.indigo },
        { value: '3×',    label: 'Consultas de inscripción', sub: 'vs. sin gestión digital',   color: B.violet },
        { value: '+60%',  label: 'Nuevas matrículas',        sub: 'primer trimestre',          color: B.teal   },
        { value: '92%',   label: 'Familias investigan online', sub: 'antes de contactar',      color: B.indigo },
    ];

    const faqs = [
        { q: '¿Trabajan con colegios fuera de Argentina?',       a: 'Sí. Trabajamos con instituciones educativas en toda Latinoamérica — Argentina, México, Colombia, Chile y más. La gestión se coordina 100% de forma remota.' },
        { q: '¿Quién aprueba el contenido antes de publicarlo?', a: 'Siempre el colegio. Antes de cada publicación enviamos el material para revisión institucional. La institución tiene la última palabra sobre qué se publica.' },
        { q: '¿Cómo impacta esto en la cantidad de inscriptos?', a: 'Una presencia digital activa genera más consultas y más confianza en época de inscripciones. Reportamos consultas generadas, alcance y crecimiento mes a mes.' },
        { q: '¿Pueden ayudarnos a posicionarnos como colegio premium?', a: 'Absolutamente. Trabajamos la identidad visual, el tono institucional y la comunicación de propuesta educativa para que la percepción externa justifique y eleve el valor de la cuota.' },
        { q: '¿Hay contratos de permanencia?',                   a: 'No. Trabajamos mes a mes porque confiamos en que los resultados hablan solos.' },
    ];

    const fv = { initial: { opacity: 0, y: 28 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: 0.55 } };

    return (
        <div style={{ fontFamily: "'Inter', sans-serif", background: B.light, color: B.black, minHeight: '100vh' }}>

            {/* ── BACK ──────────────────────────────────────────────── */}
            <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '128px 24px 0' }}>
                <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '7px', color: B.gray, textDecoration: 'none', fontSize: '13px', fontWeight: 500, marginBottom: '56px' }}
                    onMouseEnter={e => e.currentTarget.style.color = B.black}
                    onMouseLeave={e => e.currentTarget.style.color = B.gray}>
                    <ArrowLeft size={15} /> Volver al inicio
                </Link>
            </div>

            {/* ── HERO ──────────────────────────────────────────────── */}
            <section style={{ background: B.white, padding: '0 24px 80px' }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'center' }} className="cols-2">

                        {/* Left */}
                        <motion.div initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65 }}>
                            <SectionTag>Marketing para instituciones educativas</SectionTag>

                            <h1 style={{ fontSize: 'clamp(38px, 4.5vw, 62px)', fontWeight: 800, lineHeight: 1.08, letterSpacing: '-0.03em', margin: '0 0 22px', color: B.black }}>
                                Estrategia clara para<br />instituciones que{' '}
                                <GradText>crecen.</GradText>
                            </h1>

                            <p style={{ fontSize: '17px', lineHeight: 1.7, color: B.gray, maxWidth: '440px', margin: '0 0 36px', fontWeight: 400 }}>
                                Ayudamos a instituciones educativas a atraer más alumnos, fortalecer su marca y posicionarse en su comunidad con marketing digital estratégico y medible.
                            </p>

                            <div style={{ display: 'flex', gap: '12px', marginBottom: '40px', flexWrap: 'wrap' }}>
                                <a href={`https://wa.me/${wa}?text=Hola! Quiero una reunión de diagnóstico para mi colegio`}
                                    target="_blank" rel="noopener noreferrer"
                                    style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '13px 24px', background: B.black, color: B.white, borderRadius: '10px', fontSize: '14px', fontWeight: 600, textDecoration: 'none', transition: 'opacity .2s' }}
                                    onMouseEnter={e => e.currentTarget.style.opacity = '0.82'}
                                    onMouseLeave={e => e.currentTarget.style.opacity = '1'}>
                                    <MessageSquare size={15} /> Solicitar información
                                </a>
                                <a href="mailto:hola@kikar.com.ar"
                                    style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '13px 24px', background: 'transparent', color: B.black, borderRadius: '10px', fontSize: '14px', fontWeight: 600, textDecoration: 'none', border: `1.5px solid ${B.border}`, transition: 'border-color .2s' }}
                                    onMouseEnter={e => e.currentTarget.style.borderColor = B.black}
                                    onMouseLeave={e => e.currentTarget.style.borderColor = B.border}>
                                    Ver ejemplos de instituciones <ArrowRight size={14} />
                                </a>
                            </div>

                            <div style={{ display: 'flex', gap: '28px', flexWrap: 'wrap' }}>
                                {[
                                    { icon: <TrendingUp size={15} />, text: 'Estrategias basadas en datos' },
                                    { icon: <Users size={15} />,      text: 'Más inscripciones y consultas' },
                                    { icon: <BarChart size={15} />,   text: 'Resultados medibles' },
                                ].map((f, i) => (
                                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '7px', color: B.gray, fontSize: '13px', fontWeight: 500 }}>
                                        <span style={{ color: B.teal }}>{f.icon}</span>
                                        {f.text}
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        {/* Right: visual */}
                        <motion.div initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7, delay: 0.15 }}
                            style={{ position: 'relative', height: '480px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>

                            {/* Dot patterns */}
                            <DotPattern style={{ top: '0', right: '0' }} />
                            <DotPattern style={{ bottom: '10px', left: '0', opacity: 0.12 }} />

                            {/* Gradient circles */}
                            <div style={{ position: 'absolute', width: '400px', height: '400px', borderRadius: '50%', background: 'linear-gradient(135deg, rgba(79,70,229,0.13) 0%, rgba(124,58,237,0.10) 50%, rgba(16,185,129,0.07) 100%)', border: '1.5px solid rgba(79,70,229,0.14)' }} />
                            <div style={{ position: 'absolute', width: '310px', height: '310px', borderRadius: '50%', background: 'linear-gradient(135deg, rgba(79,70,229,0.08), rgba(16,185,129,0.06))' }} />

                            {/* Kikar 3D mascot */}
                            <img
                                src="/kikar-3d.png"
                                alt="Kikar Instituciones Educativas"
                                style={{ width: '320px', height: '320px', objectFit: 'contain', position: 'relative', zIndex: 2, filter: 'drop-shadow(0 24px 48px rgba(79,70,229,0.15))' }}
                                onError={e => { e.target.style.display = 'none'; }}
                            />

                            {/* Floating cards */}
                            <FloatCard icon={<Users size={16} />}     label="Más alumnos"  value="+127%" color={B.indigo} style={{ top: '30px',   right: '-10px', zIndex: 3, animDelay: 0 }} />
                            <FloatCard icon={<BarChart size={16} />}  label="Consultas"    value="+85%"  color={B.violet} style={{ top: '185px',  right: '-30px', zIndex: 3, animDelay: 1.2 }} />
                            <FloatCard icon={<Target size={16} />}    label="Conversión"   value="+63%"  color={B.teal}   style={{ bottom: '55px', left:  '-20px', zIndex: 3, animDelay: 0.6 }} />
                        </motion.div>
                    </div>

                    {/* Trust strip */}
                    <motion.div {...fv} style={{ marginTop: '72px', paddingTop: '48px', borderTop: `1px solid ${B.border}` }}>
                        <p style={{ textAlign: 'center', fontSize: '13px', fontWeight: 500, color: B.gray, letterSpacing: '0.06em', marginBottom: '28px' }}>
                            Instituciones que ya confían en nosotros
                        </p>
                        <div style={{ display: 'flex', justifyContent: 'center', gap: '40px', flexWrap: 'wrap', alignItems: 'center', opacity: 0.55 }}>
                            {['Instituto América', 'Colegio del Sol', 'Instituto Horizonte', 'Colegio San Martín', 'Academia Integral'].map((name, i) => (
                                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <GraduationCap size={16} style={{ color: B.black }} />
                                    <span style={{ fontSize: '14px', fontWeight: 600, color: B.black, whiteSpace: 'nowrap' }}>{name}</span>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* ── EJEMPLO REAL: INSTITUTO AMÉRICA ───────────────────── */}
            <section style={{ background: B.white, padding: '88px 24px', borderTop: `1px solid ${B.border}` }}>
                <div style={{ maxWidth: '1080px', margin: '0 auto' }}>
                    <motion.div {...fv} style={{ textAlign: 'center', marginBottom: '44px' }}>
                        <SectionTag>Ejemplo real · Caso de éxito</SectionTag>
                        <h2 style={{ fontSize: 'clamp(28px,3.5vw,44px)', fontWeight: 800, letterSpacing: '-0.03em', color: B.black, margin: '0 0 16px', lineHeight: 1.12 }}>
                            Así se ve un sitio institucional que <GradText>convierte.</GradText>
                        </h2>
                        <p style={{ fontSize: '17px', lineHeight: 1.7, color: B.gray, maxWidth: '620px', margin: '0 auto' }}>
                            <strong style={{ color: B.black }}>Instituto América</strong> confió en nosotros su presencia digital. Este es el sitio real que desarrollamos: pensado para transmitir excelencia y convertir visitas en consultas de inscripción.
                        </p>
                    </motion.div>

                    {/* Mockup navegador con sitio en vivo */}
                    <motion.div {...fv}
                        style={{ background: B.white, border: `1px solid ${B.border}`, borderRadius: '18px', overflow: 'hidden', boxShadow: '0 24px 64px rgba(0,0,0,0.12)' }}>
                        {/* Barra del navegador */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '12px 18px', background: B.light, borderBottom: `1px solid ${B.border}` }}>
                            <span style={{ width: '11px', height: '11px', borderRadius: '50%', background: '#ff5f57' }} />
                            <span style={{ width: '11px', height: '11px', borderRadius: '50%', background: '#febc2e' }} />
                            <span style={{ width: '11px', height: '11px', borderRadius: '50%', background: '#28c840' }} />
                            <div style={{ flex: 1, textAlign: 'center', fontSize: '13px', color: B.gray, fontWeight: 500 }}>
                                instamerica.com.ar
                            </div>
                        </div>
                        {/* Preview del sitio */}
                        <div style={{ position: 'relative', height: '520px', overflow: 'hidden', background: B.light }}>
                            <iframe
                                src="https://instamerica.com.ar/"
                                title="Instituto América — sitio desarrollado por Kikar"
                                style={{ width: '100%', height: '100%', border: 0, pointerEvents: 'none' }}
                                loading="lazy"
                                sandbox="allow-scripts allow-same-origin"
                            />
                            <div style={{ position: 'absolute', inset: 0, cursor: 'default' }} />
                        </div>
                    </motion.div>

                    <div style={{ textAlign: 'center', marginTop: '32px' }}>
                        <a href="https://instamerica.com.ar/" target="_blank" rel="noopener noreferrer"
                            style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '14px 28px', background: B.black, color: B.white, borderRadius: '10px', fontSize: '14px', fontWeight: 600, textDecoration: 'none', transition: 'opacity .2s' }}
                            onMouseEnter={e => e.currentTarget.style.opacity = '0.82'}
                            onMouseLeave={e => e.currentTarget.style.opacity = '1'}>
                            Ver sitio en vivo <ArrowRight size={15} />
                        </a>
                    </div>
                </div>
            </section>

            {/* ── STATS ─────────────────────────────────────────────── */}
            <section style={{ background: B.light, padding: '72px 24px' }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '24px' }} className="cols-4">
                    {stats.map((s, i) => (
                        <motion.div key={i} {...fv} transition={{ ...fv.transition, delay: i * 0.1 }}
                            style={{ background: B.white, borderRadius: '16px', padding: '28px 24px', border: `1px solid ${B.border}` }}>
                            <div style={{ fontSize: 'clamp(32px,3vw,44px)', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1, marginBottom: '8px' }}>
                                <GradText>{s.value}</GradText>
                            </div>
                            <div style={{ fontSize: '14px', fontWeight: 600, color: B.black, marginBottom: '4px' }}>{s.label}</div>
                            <div style={{ fontSize: '12px', color: B.gray }}>{s.sub}</div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* ── 78% ───────────────────────────────────────────────── */}
            <section style={{ background: B.white, padding: '88px 24px', overflow: 'hidden', position: 'relative' }}>
                <div style={{ position: 'absolute', top: '-60px', right: '-60px', width: '400px', height: '400px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(79,70,229,0.07) 0%, transparent 70%)' }} />
                <div style={{ position: 'absolute', bottom: '-40px', left: '-40px', width: '300px', height: '300px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(16,185,129,0.07) 0%, transparent 70%)' }} />
                <div style={{ maxWidth: '820px', margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1 }}>
                    <motion.div {...fv}>
                        <SectionTag>El nuevo ciclo de decisión</SectionTag>
                        <div style={{ fontSize: 'clamp(80px,14vw,160px)', fontWeight: 800, lineHeight: 1, letterSpacing: '-0.05em', margin: '0 0 12px' }}>
                            <GradText>78%</GradText>
                        </div>
                        <p style={{ fontSize: 'clamp(20px,2.5vw,28px)', fontWeight: 700, color: B.black, lineHeight: 1.25, marginBottom: '16px', letterSpacing: '-0.02em' }}>
                            de las familias investiga online antes de contactar a un colegio
                        </p>
                        <p style={{ fontSize: '17px', color: B.gray, lineHeight: 1.7, maxWidth: '560px', margin: '0 auto' }}>
                            Ya entraron a tu Instagram. Ya vieron tu web. Ya compararon con otros colegios de la zona.
                            <strong style={{ color: B.black, display: 'block', marginTop: '8px' }}>Si lo que ven no convence, simplemente eligen otro.</strong>
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* ── POR QUÉ IMPORTA ───────────────────────────────────── */}
            <section style={{ background: B.light, padding: '88px 24px' }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                    <motion.div {...fv} style={{ marginBottom: '48px', textAlign: 'center' }}>
                        <SectionTag>Por qué importa</SectionTag>
                        <h2 style={{ fontSize: 'clamp(28px,3.5vw,44px)', fontWeight: 800, letterSpacing: '-0.03em', color: B.black, margin: 0 }}>
                            Más visibilidad. Más familias. <GradText>Más ingresos.</GradText>
                        </h2>
                    </motion.div>
                    <Divider />
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '24px' }} className="cols-3">
                        {valueProps.map((vp, i) => (
                            <motion.div key={i} {...fv} transition={{ ...fv.transition, delay: i * 0.12 }}
                                style={{ background: B.white, borderRadius: '20px', padding: '36px 30px', border: `1px solid ${B.border}`, position: 'relative', overflow: 'hidden' }}>
                                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: B.grad }} />
                                <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: `${vp.color}14`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: vp.color, marginBottom: '20px' }}>
                                    {vp.icon}
                                </div>
                                <h3 style={{ fontSize: '18px', fontWeight: 700, color: B.black, marginBottom: '12px', letterSpacing: '-0.015em', lineHeight: 1.25 }}>{vp.title}</h3>
                                <p style={{ fontSize: '15px', lineHeight: 1.7, color: B.gray, margin: 0 }}>{vp.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── UNIVERSIDADES ─────────────────────────────────────── */}
            <section style={{ background: B.white, padding: '88px 24px', borderTop: `1px solid ${B.border}` }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                    <motion.div {...fv} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'center' }} className="cols-2">
                        {/* Left */}
                        <div>
                            <SectionTag>Universidades e Institutos Terciarios</SectionTag>
                            <h2 style={{ fontSize: 'clamp(28px,3.5vw,44px)', fontWeight: 800, letterSpacing: '-0.03em', color: B.black, margin: '0 0 20px', lineHeight: 1.1 }}>
                                La presencia digital que tu casa de estudios <GradText>merece.</GradText>
                            </h2>
                            <p style={{ fontSize: '16px', lineHeight: 1.75, color: B.gray, margin: '0 0 32px' }}>
                                Las universidades e institutos terciarios compiten por estudiantes que eligen dónde formarse basándose en lo que ven online. Una propuesta académica sólida necesita una presencia digital a la altura.
                            </p>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                                {[
                                    { label: 'Captación de nuevos inscriptos', desc: 'Campañas orientadas a estudiantes secundarios que están decidiendo su carrera.' },
                                    { label: 'Posicionamiento de carreras',     desc: 'Comunicación diferenciada para cada oferta académica y su perfil de audiencia.' },
                                    { label: 'Comunidad de egresados',          desc: 'Redes activas que mantienen el vínculo institucional más allá del egreso.' },
                                    { label: 'Marca empleadora',               desc: 'Presencia que atrae docentes, investigadores y convenios con el sector privado.' },
                                ].map((item, i) => (
                                    <div key={i} style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                                        <div style={{ width: '22px', height: '22px', borderRadius: '50%', background: B.grad, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '2px' }}>
                                            <CheckCircle2 size={12} style={{ color: '#fff' }} />
                                        </div>
                                        <div>
                                            <div style={{ fontSize: '15px', fontWeight: 600, color: B.black, marginBottom: '2px' }}>{item.label}</div>
                                            <div style={{ fontSize: '13px', color: B.gray, lineHeight: 1.5 }}>{item.desc}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        {/* Right: feature cards */}
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                            {[
                                { icon: <Globe size={20} />,     color: B.indigo, title: 'Web institucional',    desc: 'Sitio moderno, accesible y optimizado para SEO educativo.' },
                                { icon: <Users size={20} />,     color: B.violet, title: 'Redes & comunidad',    desc: 'LinkedIn, Instagram y Facebook con voz académica propia.' },
                                { icon: <BarChart2 size={20} />, color: B.teal,   title: 'Ads de captación',     desc: 'Campañas orientadas a estudiantes en etapa de decisión.' },
                                { icon: <Camera size={20} />,    color: B.indigo, title: 'Vida universitaria',   desc: 'Cobertura de eventos, graduaciones y actividades de campus.' },
                            ].map((card, i) => (
                                <motion.div key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                                    style={{ background: B.light, borderRadius: '16px', padding: '24px 20px', border: `1px solid ${B.border}` }}>
                                    <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: `${card.color}14`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: card.color, marginBottom: '14px' }}>
                                        {card.icon}
                                    </div>
                                    <div style={{ fontSize: '14px', fontWeight: 700, color: B.black, marginBottom: '6px' }}>{card.title}</div>
                                    <div style={{ fontSize: '12px', lineHeight: 1.6, color: B.gray }}>{card.desc}</div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* ── SERVICIOS ─────────────────────────────────────────── */}
            <section style={{ background: B.white, padding: '88px 24px' }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                    <motion.div {...fv} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '48px', alignItems: 'end', marginBottom: '56px' }} className="cols-2">
                        <div>
                            <SectionTag>Nuestra propuesta</SectionTag>
                            <h2 style={{ fontSize: 'clamp(28px,3.5vw,44px)', fontWeight: 800, letterSpacing: '-0.03em', color: B.black, margin: 0, lineHeight: 1.1 }}>
                                Todo lo que necesita la institución,{' '}
                                <GradText>en un solo equipo.</GradText>
                            </h2>
                        </div>
                        <p style={{ fontSize: '16px', lineHeight: 1.75, color: B.gray, margin: 0, alignSelf: 'end' }}>
                            Desde el sitio web hasta la gestión mensual de redes. Trabajamos con colegios de toda Latinoamérica de forma remota, con resultados medibles desde el primer mes.
                        </p>
                    </motion.div>
                    <Divider />
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '2px', borderRadius: '20px', overflow: 'hidden', border: `1px solid ${B.border}` }} className="cols-3">
                        {services.map((svc, i) => (
                            <motion.div key={i} {...fv} transition={{ ...fv.transition, delay: i * 0.07 }}
                                style={{ background: B.white, padding: '32px 28px', borderRight: i % 3 !== 2 ? `1px solid ${B.border}` : 'none', borderBottom: i < 3 ? `1px solid ${B.border}` : 'none', cursor: 'default', transition: 'background .2s' }}
                                onMouseEnter={e => e.currentTarget.style.background = B.light}
                                onMouseLeave={e => e.currentTarget.style.background = B.white}>
                                <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: B.light, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
                                    <span style={{ background: B.gradText, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>{svc.icon}</span>
                                </div>
                                <h4 style={{ fontSize: '15px', fontWeight: 700, color: B.black, marginBottom: '8px', lineHeight: 1.3 }}>{svc.title}</h4>
                                <p style={{ fontSize: '13px', lineHeight: 1.7, color: B.gray, margin: 0 }}>{svc.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── PROCESO ───────────────────────────────────────────── */}
            <section style={{ background: B.light, padding: '88px 24px' }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                    <motion.div {...fv} style={{ textAlign: 'center', marginBottom: '56px' }}>
                        <SectionTag>Cómo empezamos</SectionTag>
                        <h2 style={{ fontSize: 'clamp(28px,3.5vw,44px)', fontWeight: 800, letterSpacing: '-0.03em', color: B.black, margin: 0 }}>
                            Tres pasos, <GradText>resultados desde el primer mes.</GradText>
                        </h2>
                    </motion.div>
                    <Divider />
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '24px' }} className="cols-3">
                        {[
                            { n: '01', icon: <Target size={20} />,        title: 'Diagnóstico institucional', desc: 'Analizamos la presencia digital actual, objetivos y mercado local. Sin costo y sin compromiso.', color: B.indigo },
                            { n: '02', icon: <Pen size={20} />,           title: 'Propuesta a medida',        desc: 'Plan de acción con servicios, cronograma y presupuesto según las prioridades del colegio.', color: B.violet },
                            { n: '03', icon: <BarChart size={20} />,      title: 'Gestión y resultados',      desc: 'Ejecutamos, medimos y reportamos. Resultados visibles desde el primer mes de trabajo.',    color: B.teal },
                        ].map((step, i) => (
                            <motion.div key={i} {...fv} transition={{ ...fv.transition, delay: i * 0.12 }}
                                style={{ background: B.white, borderRadius: '20px', padding: '36px 30px', border: `1px solid ${B.border}` }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
                                    <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: `${step.color}14`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: step.color }}>
                                        {step.icon}
                                    </div>
                                    <span style={{ fontSize: '40px', fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 1, color: B.border }}>{step.n}</span>
                                </div>
                                <h3 style={{ fontSize: '18px', fontWeight: 700, color: B.black, marginBottom: '10px', letterSpacing: '-0.015em' }}>{step.title}</h3>
                                <p style={{ fontSize: '14px', lineHeight: 1.7, color: B.gray, margin: 0 }}>{step.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── FAQ ───────────────────────────────────────────────── */}
            <section style={{ background: B.white, padding: '88px 24px' }}>
                <div style={{ maxWidth: '740px', margin: '0 auto' }}>
                    <motion.div {...fv} style={{ textAlign: 'center', marginBottom: '48px' }}>
                        <SectionTag>Preguntas frecuentes</SectionTag>
                        <h2 style={{ fontSize: 'clamp(24px,3vw,38px)', fontWeight: 800, letterSpacing: '-0.03em', color: B.black, margin: 0 }}>
                            Todo lo que necesitás saber
                        </h2>
                    </motion.div>
                    <div style={{ borderRadius: '20px', overflow: 'hidden', border: `1px solid ${B.border}` }}>
                        {faqs.map((faq, i) => (
                            <div key={i} style={{ background: B.white, borderBottom: i < faqs.length - 1 ? `1px solid ${B.border}` : 'none' }}>
                                <button onClick={() => setOpenFaq(openFaq === i ? null : i)}
                                    style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '22px 28px', background: 'none', border: 'none', cursor: 'pointer', gap: '16px', textAlign: 'left' }}>
                                    <span style={{ fontSize: '15px', fontWeight: 600, color: B.black }}>{faq.q}</span>
                                    {openFaq === i
                                        ? <ChevronUp size={16} style={{ color: B.indigo, flexShrink: 0 }} />
                                        : <ChevronDown size={16} style={{ color: B.gray, flexShrink: 0 }} />}
                                </button>
                                {openFaq === i && (
                                    <div style={{ padding: '0 28px 22px', fontSize: '14px', lineHeight: 1.75, color: B.gray }}>
                                        {faq.a}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── CTA ───────────────────────────────────────────────── */}
            <section style={{ background: B.black, padding: '96px 24px', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: '-80px', right: '-80px', width: '500px', height: '500px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(79,70,229,0.15) 0%, transparent 65%)' }} />
                <div style={{ position: 'absolute', bottom: '-60px', left: '-60px', width: '400px', height: '400px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(16,185,129,0.10) 0%, transparent 65%)' }} />
                <div style={{ maxWidth: '760px', margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1 }}>
                    <motion.div {...fv}>
                        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 14px', background: 'rgba(255,255,255,0.08)', borderRadius: '100px', marginBottom: '28px' }}>
                            <MapPin size={12} style={{ color: 'rgba(255,255,255,0.5)' }} />
                            <span style={{ fontSize: '12px', fontWeight: 500, color: 'rgba(255,255,255,0.5)', letterSpacing: '0.06em' }}>
                                Argentina · México · Colombia · Chile · y más
                            </span>
                        </div>
                        <h2 style={{ fontSize: 'clamp(36px,5vw,64px)', fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 1.0, color: B.white, marginBottom: '20px' }}>
                            Tu institución tiene historia.<br />
                            <GradText>Mostrémosla.</GradText>
                        </h2>
                        <p style={{ fontSize: '17px', color: 'rgba(255,255,255,0.5)', lineHeight: 1.7, maxWidth: '500px', margin: '0 auto 40px' }}>
                            Una reunión de diagnóstico, sin costo y sin compromiso. Analizamos tu situación y mostramos qué oportunidades concretas tiene tu institución.
                        </p>
                        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
                            <a href={`https://wa.me/${wa}?text=Hola! Soy de un colegio y quiero una reunión de diagnóstico`}
                                target="_blank" rel="noopener noreferrer"
                                style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '14px 28px', background: B.white, color: B.black, borderRadius: '10px', fontSize: '14px', fontWeight: 700, textDecoration: 'none', transition: 'opacity .2s' }}
                                onMouseEnter={e => e.currentTarget.style.opacity = '0.88'}
                                onMouseLeave={e => e.currentTarget.style.opacity = '1'}>
                                Quiero mi diagnóstico gratuito <ArrowRight size={15} />
                            </a>
                            <a href="mailto:hola@kikar.com.ar"
                                style={{ display: 'inline-flex', alignItems: 'center', padding: '14px 28px', background: 'transparent', color: 'rgba(255,255,255,0.6)', borderRadius: '10px', border: '1.5px solid rgba(255,255,255,0.18)', fontSize: '14px', fontWeight: 600, textDecoration: 'none', transition: 'all .2s' }}
                                onMouseEnter={e => { e.currentTarget.style.color = '#fff'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.5)'; }}
                                onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.6)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.18)'; }}>
                                hola@kikar.com.ar
                            </a>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* ── RESPONSIVE ────────────────────────────────────────── */}
            <style>{`
                @media (max-width: 860px) {
                    .cols-2 { grid-template-columns: 1fr !important; gap: 40px !important; }
                    .cols-3 { grid-template-columns: 1fr !important; }
                    .cols-4 { grid-template-columns: 1fr 1fr !important; }
                }
                @media (max-width: 520px) {
                    .cols-4 { grid-template-columns: 1fr 1fr !important; }
                }
            `}</style>
        </div>
    );
};

export default ColegiosPage;
