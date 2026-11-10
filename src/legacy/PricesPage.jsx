import React from 'react';
import { motion } from 'framer-motion';
import { Check, Share2, ArrowLeft, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useBlueRate, arsEquivalent } from '../utils/useBlueRate';

const PricesPage = ({ t }) => {
    const blueRate = useBlueRate();
    const socialPacks = [
        { type: 'start', color: 'text-blue-400', border: 'border-blue-500/30' },
        { type: 'grow', color: 'text-violet-400', border: 'border-violet-500', popular: true },
        { type: 'pro', color: 'text-green-400', border: 'border-green-500/30' }
    ];

    return (
        <div className="pt-32 pb-24 min-h-screen bg-kikar-dark">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <Link to="/" className="inline-flex items-center text-kikar-violet hover:text-white transition-colors mb-12 group font-bold tracking-tight">
                    <ArrowLeft size={20} className="mr-2 group-hover:-translate-x-1 transition-transform" />
                    {t.es ? 'VOLVER AL INICIO' : 'BACK TO HOME'}
                </Link>

                <div className="text-center mb-24">
                    <h1 className="text-5xl md:text-8xl font-black mb-8 italic tracking-tighter uppercase">{t.es ? 'Detalle de Planes' : 'Plan Details'}</h1>
                    <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto font-medium leading-relaxed">
                        Transparencia total. Elegí el nivel que tu marca necesita hoy para verse mundial.
                    </p>
                </div>

                {/* Social Media Packs Detailed Section */}
                <div className="mb-32">
                    <div className="flex items-center gap-6 mb-16">
                        <div className="h-px flex-1 bg-gradient-to-r from-transparent to-violet-500/30" />
                        <h2 className="text-2xl font-black uppercase tracking-[0.3em] text-violet-500 italic">SOCIAL MANAGEMENT</h2>
                        <div className="h-px flex-1 bg-gradient-to-l from-transparent to-violet-500/30" />
                    </div>

                    <div className="grid lg:grid-cols-3 gap-10 items-stretch">
                        {socialPacks.map((packKey, index) => {
                            const data = t.services.social.packs[packKey.type];
                            return (
                                <motion.div
                                    key={packKey.type}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: index * 0.1 }}
                                    className={`group relative flex flex-col bg-white/5 border ${packKey.popular ? 'border-violet-500/50 shadow-2xl shadow-violet-500/20' : 'border-white/10'} rounded-[3rem] overflow-hidden`}
                                >
                                    <div className="relative h-72 overflow-hidden">
                                        <img
                                            src={data.media}
                                            alt={data.name}
                                            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-kikar-dark via-transparent to-transparent" />

                                        <div className="absolute bottom-8 left-8">
                                            <h3 className={`text-4xl font-black italic tracking-tighter ${packKey.color}`}>
                                                {data.name}
                                            </h3>
                                        </div>
                                    </div>

                                    <div className="p-10 flex flex-col flex-grow">
                                        <div className="mb-2 uppercase tracking-[0.3em] text-[10px] font-black opacity-40 text-white">
                                            {data.tagline}
                                        </div>
                                        <div className="mb-1 flex items-baseline gap-3">
                                            <span className="text-5xl font-black text-white">{data.price.split(' ')[0]}</span>
                                            <span className="text-gray-500 font-bold uppercase text-sm tracking-[0.15em]">{data.price.split(' ').slice(1).join(' ')}</span>
                                        </div>
                                        {arsEquivalent(data.price, blueRate) && (
                                            <div className="mb-8 text-base font-semibold text-gray-500">{arsEquivalent(data.price, blueRate)}</div>
                                        )}

                                        <p className="text-gray-400 text-lg mb-8 font-medium leading-relaxed italic">
                                            "{data.text}"
                                        </p>

                                        {data.objective && (
                                            <div className="mb-10 p-6 bg-white/5 rounded-[2rem] border border-white/5 shadow-inner">
                                                <div className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30 mb-2">OBJETIVO ESTRATÉGICO</div>
                                                <div className="text-white font-black text-xl italic tracking-tight">🎯 {data.objective}</div>
                                            </div>
                                        )}

                                        <div className="space-y-5 mb-12 flex-grow">
                                            {data.features.map((feature, i) => (
                                                <div key={i} className="flex items-start">
                                                    <div className={`mt-1.5 p-1 rounded-full ${packKey.popular ? 'bg-violet-500' : 'bg-white/20'} mr-4`}>
                                                        <Check size={14} className="text-black" />
                                                    </div>
                                                    <span className="text-gray-200 text-base font-bold tracking-tight leading-snug">{feature}</span>
                                                </div>
                                            ))}
                                        </div>

                                        {data.exclusive && (
                                            <div className="mb-10 p-6 bg-green-500/10 border border-green-500/20 rounded-[2rem]">
                                                <div className="text-[10px] font-black text-green-400 uppercase tracking-widest mb-2">🎥 BENEFICIO EXCLUSIVO (CBA CAPITAL)</div>
                                                <div className="text-white font-black text-lg mb-1">{data.exclusive.title}</div>
                                                <div className="text-gray-400 text-sm leading-relaxed">{data.exclusive.desc}</div>
                                            </div>
                                        )}

                                        <a
                                            href={`https://wa.me/${t.contact.whatsapp}?text=Hola! Quiero mi plan ${data.name}`}
                                            className={`block w-full py-6 text-center rounded-2xl font-black text-base uppercase tracking-[0.2em] transition-all duration-300 ${packKey.popular ? 'bg-violet-600 hover:bg-violet-700 text-white shadow-2xl shadow-violet-600/40' : 'bg-white text-black hover:bg-gray-200'}`}
                                        >
                                            {t.es ? 'SOLICITAR PLAN AHORA' : 'REQUEST PLAN NOW'}
                                        </a>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>

                {/* Ecommerce Section */}
                <div className="mb-32">
                    <div className="flex items-center gap-6 mb-16">
                        <div className="h-px flex-1 bg-gradient-to-r from-transparent to-kikar-blue/30" />
                        <h2 className="text-2xl font-black uppercase tracking-[0.3em] text-kikar-blue italic">ECOMMERCE PARTNERS</h2>
                        <div className="h-px flex-1 bg-gradient-to-l from-transparent to-kikar-blue/30" />
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="glass-panel p-16 rounded-[4rem] relative overflow-hidden ring-1 ring-white/10"
                    >
                        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-kikar-blue/10 rounded-full blur-[150px] -z-10" />

                        <div className="grid lg:grid-cols-2 gap-20 items-center text-center lg:text-left">
                            <div>
                                <div className="inline-flex p-5 bg-kikar-blue/20 rounded-3xl mb-8">
                                    <Share2 size={64} className="text-kikar-blue" />
                                </div>
                                <h3 className="text-5xl md:text-7xl font-black mb-8 italic tracking-tighter text-kikar-blue leading-none underline decoration-kikar-blue/30">
                                    {t.services.ecommerce.title}
                                </h3>
                                <p className="text-xl md:text-2xl text-gray-400 mb-12 font-medium leading-relaxed italic">
                                    {t.services.ecommerce.desc}
                                </p>
                                <a href={`https://wa.me/${t.contact.whatsapp}?text=Hola! Quiero aplicar al modelo socios de Ecommerce`} className="inline-block px-12 py-6 bg-kikar-blue text-white rounded-2xl font-black text-lg uppercase tracking-widest hover:bg-blue-600 transition-all hover:scale-105 shadow-2xl shadow-kikar-blue/20">
                                    {t.services.ecommerce.cta}
                                </a>
                            </div>
                            <div className="space-y-6">
                                <h4 className="font-black text-white/40 uppercase tracking-[0.2em] mb-8 text-sm">{t.es ? 'Requisitos para aplicar:' : 'Requirements to apply:'}</h4>
                                {t.services.ecommerce.requirements.map((req, i) => (
                                    <div key={i} className="flex items-center bg-white/5 p-6 rounded-[2rem] border border-white/5 group hover:border-kikar-blue/30 transition-all">
                                        <div className="w-4 h-4 bg-kikar-blue rounded-full mr-6 shadow-[0_0_15px_rgba(59,130,246,0.5)]" />
                                        <span className="font-black text-xl text-gray-200 tracking-tight italic">{req}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </div>


                {/* FAQ Section */}
                <div className="mb-24">
                    <div className="flex items-center gap-6 mb-16">
                        <div className="h-px flex-1 bg-gradient-to-r from-transparent to-white/10" />
                        <h2 className="text-2xl font-black uppercase tracking-[0.3em] text-white/60 italic">PREGUNTAS FRECUENTES</h2>
                        <div className="h-px flex-1 bg-gradient-to-l from-transparent to-white/10" />
                    </div>

                    <div className="space-y-4 max-w-4xl mx-auto">
                        {[
                            {
                                q: "¿Puedo cancelar el plan cuando quiera?",
                                a: "Sí. Trabajamos mes a mes, sin contratos de permanencia. Podés pausar o cancelar con un aviso de 15 días antes del cierre del período."
                            },
                            {
                                q: "¿Puedo cambiar de plan en el futuro?",
                                a: "Por supuesto. Podés subir o bajar de plan al finalizar cualquier mes. El cambio se aplica al siguiente período facturado."
                            },
                            {
                                q: "¿Qué diferencia real hay entre el plan START y el plan PRO?",
                                a: "El START establece tu presencia digital con contenido orgánico. El PRO agrega publicidad paga (Meta Ads), landing page profesional y métricas mensuales: es un sistema de ventas completo, no solo publicaciones."
                            },
                            {
                                q: "¿Cómo se miden los resultados?",
                                a: "En el plan PRO entregamos reportes mensuales con métricas clave: alcance, interacción, consultas generadas y rendimiento de campañas. La toma de decisiones siempre está respaldada por datos, no por suposiciones."
                            }
                        ].map((faq, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="glass-panel rounded-3xl p-8 border border-white/5 hover:border-white/15 transition-all"
                            >
                                <h3 className="text-lg font-black text-white mb-3">{faq.q}</h3>
                                <p className="text-gray-400 leading-relaxed">{faq.a}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>

                <div className="text-center pt-20 border-t border-white/5">
                    <p className="text-gray-500 font-bold uppercase tracking-widest text-xs">
                        {t.es ? '* Precios base sujetos a escala y requerimientos de producción.' : '* Base prices subject to scale and production requirements.'}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default PricesPage;
