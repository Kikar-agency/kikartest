import { useState, useEffect } from 'react';

/**
 * Hook que trae la cotización del dólar blue (venta) desde dolarapi.com.
 * Devuelve el número de venta, o null mientras carga / si falla.
 * Sin auth, CORS abierto.
 */
export function useBlueRate() {
    const [rate, setRate] = useState(null);

    useEffect(() => {
        let active = true;
        fetch('https://dolarapi.com/v1/dolares/blue')
            .then((r) => r.json())
            .then((data) => {
                if (active && data && data.venta) setRate(data.venta);
            })
            .catch(() => { /* silencioso: si falla, sólo mostramos USD */ });
        return () => { active = false; };
    }, []);

    return rate;
}

/** Extrae el número de USD de un string tipo "199 USD / mes" -> 199 */
export function usdFromPrice(priceStr) {
    if (!priceStr) return null;
    const match = String(priceStr).match(/[\d.]+/);
    return match ? parseFloat(match[0]) : null;
}

/** Formatea ARS con separador de miles es-AR -> "$ 285.000" */
export function formatArs(amount) {
    if (amount == null || isNaN(amount)) return null;
    return '$ ' + Math.round(amount).toLocaleString('es-AR');
}

/**
 * Devuelve el equivalente en ARS formateado para un precio USD dado.
 * Ej: arsEquivalent("199 USD / mes", 1450) -> "$ 288.550 ARS / mes aprox."
 */
export function arsEquivalent(priceStr, rate) {
    const usd = usdFromPrice(priceStr);
    if (!usd || !rate) return null;
    return `≈ ${formatArs(usd * rate)} ARS / mes`;
}
