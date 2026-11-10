import React, { useRef, useState } from 'react';
import { RUBROS, DIAS, HORAS, fmtARS, waLink } from './config';
import { trackDemo, trackWhatsApp } from './track';

const PASOS = ['Servicio', 'Profesional', 'Horario', 'Listo'];

export default function Demo({ rubroInicial }) {
    const [rubro, setRubro] = useState(rubroInicial);
    const [paso, setPaso] = useState(0);
    const [sel, setSel] = useState({ servicio: null, pro: null, dia: DIAS[0], hora: null });
    const r = RUBROS[rubro];
    const agendaRef = useRef(null);

    const cambiarRubro = (k) => {
        setRubro(k);
        setPaso(0);
        setSel({ servicio: null, pro: null, dia: DIAS[0], hora: null });
    };
    const reiniciar = () => cambiarRubro(rubro);

    const confirmar = () => {
        setPaso(3);
        trackDemo(rubro);
        // En el celu la agenda queda debajo del teléfono: la traemos a la vista para que se vea caer el turno.
        setTimeout(() => agendaRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' }), 700);
    };

    return (
        <div className="demo">
            <div className="demo-tabs" role="tablist" aria-label="Elegí un rubro">
                {Object.entries(RUBROS).map(([k, v]) => (
                    <button
                        key={k}
                        role="tab"
                        aria-selected={rubro === k}
                        className={rubro === k ? 'on' : ''}
                        onClick={() => cambiarRubro(k)}
                    >
                        {v.tab}
                    </button>
                ))}
            </div>

            <div className="demo-grid">
                <div className="phone" style={{ '--marca': r.color }}>
                    <div className="phone-top">
                        <span className="phone-logo">{r.marca.charAt(0)}</span>
                        <div>
                            <strong>{r.marca}</strong>
                            <small>Reservá tu turno</small>
                        </div>
                    </div>

                    <ol className="phone-steps" aria-hidden="true">
                        {PASOS.map((p, i) => (
                            <li key={p} className={i <= paso ? 'on' : ''} />
                        ))}
                    </ol>

                    <div className="phone-body" key={rubro + paso}>
                        {paso === 0 && (
                            <>
                                <p className="phone-q">¿Qué te hacés?</p>
                                {r.servicios.map((s) => (
                                    <button
                                        key={s.n}
                                        className="opt"
                                        onClick={() => {
                                            setSel({ ...sel, servicio: s });
                                            setPaso(1);
                                        }}
                                    >
                                        <span>
                                            <b>{s.n}</b>
                                            <small>{s.min} min</small>
                                        </span>
                                        <em>{fmtARS(s.p)}</em>
                                    </button>
                                ))}
                            </>
                        )}

                        {paso === 1 && (
                            <>
                                <p className="phone-q">¿Con quién?</p>
                                {r.equipo.map((p) => (
                                    <button
                                        key={p}
                                        className="opt"
                                        onClick={() => {
                                            setSel({ ...sel, pro: p });
                                            setPaso(2);
                                        }}
                                    >
                                        <span className="pro">
                                            <i>{p.charAt(0)}</i>
                                            <b>{p}</b>
                                        </span>
                                        <em>Elegir</em>
                                    </button>
                                ))}
                            </>
                        )}

                        {paso === 2 && (
                            <>
                                <p className="phone-q">¿Cuándo?</p>
                                <div className="chips">
                                    {DIAS.map((d) => (
                                        <button
                                            key={d}
                                            className={sel.dia === d ? 'on' : ''}
                                            onClick={() => setSel({ ...sel, dia: d })}
                                        >
                                            {d}
                                        </button>
                                    ))}
                                </div>
                                <div className="slots">
                                    {HORAS.map((h) => (
                                        <button
                                            key={h.h}
                                            disabled={!h.libre}
                                            className={sel.hora === h.h ? 'on' : ''}
                                            onClick={() => setSel({ ...sel, hora: h.h })}
                                        >
                                            {h.h}
                                        </button>
                                    ))}
                                </div>
                                <button className="phone-cta" disabled={!sel.hora} onClick={confirmar}>
                                    Confirmar turno
                                </button>
                            </>
                        )}

                        {paso === 3 && (
                            <div className="done">
                                <span className="check" aria-hidden="true">
                                    <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12.5l4.5 4.5L19 7.5" /></svg>
                                </span>
                                <p className="phone-q">¡Turno reservado!</p>
                                <p className="done-res">
                                    {sel.servicio.n} con {sel.pro}
                                    <br />
                                    {sel.dia} · {sel.hora}
                                </p>
                                <button className="link" onClick={reiniciar}>
                                    Reservar otro
                                </button>
                            </div>
                        )}
                    </div>

                    {paso > 0 && paso < 3 && (
                        <button className="phone-back" onClick={() => setPaso(paso - 1)}>
                            ← Volver
                        </button>
                    )}
                </div>

                <div ref={agendaRef} className={`agenda ${paso === 3 ? 'live' : ''}`}>
                    <p className="label">Lo que ves vos</p>
                    <h3>
                        {paso === 3 ? 'Y el turno ya está en tu agenda.' : 'Cada reserva cae sola en tu agenda.'}
                    </h3>
                    <ul>
                        {r.agenda.map((a) => (
                            <li key={a[0]}>
                                <time>{a[0]}</time>
                                <span>
                                    <b>{a[1]}</b>
                                    <small>
                                        {a[2]} · con {a[3]}
                                    </small>
                                </span>
                            </li>
                        ))}
                        {paso === 3 ? (
                            <li className="nuevo">
                                <time>{sel.hora}</time>
                                <span>
                                    <b>Vos (demo)</b>
                                    <small>
                                        {sel.servicio.n} · con {sel.pro}
                                    </small>
                                </span>
                                <em>Nuevo</em>
                            </li>
                        ) : (
                            <li className="vacio">
                                <time>--:--</time>
                                <span>
                                    <small>Completá la reserva y mirá qué pasa acá</small>
                                </span>
                            </li>
                        )}
                    </ul>
                    <p className="agenda-meta">Quién viene · a qué hora · con quién</p>

                    {paso === 3 && (
                        <a
                            className="btn btn-cream"
                            href={waLink(`Hola Kikar! Probé la demo de turnos (${r.tab}) y quiero ver una con mi marca.`)}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => trackWhatsApp('demo-completa')}
                        >
                            Quiero uno así con mi marca
                        </a>
                    )}
                </div>
            </div>
            <p className="fine">Marcas, precios y turnos de muestra. La demo no guarda datos.</p>
        </div>
    );
}
