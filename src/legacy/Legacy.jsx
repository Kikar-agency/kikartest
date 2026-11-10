import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { translations } from './translations';
import Navbar from './Navbar';
import Footer from './Footer';
import PricesPage from './PricesPage';
import ColegiosPage from './ColegiosPage';
import './legacy.css';

export default function Legacy() {
    const [lang, setLang] = useState('es');
    const t = translations[lang];
    return (
        <div className="min-h-screen bg-kikar-dark text-white selection:bg-kikar-violet/30">
            <Navbar lang={lang} setLang={setLang} t={t} />
            <main>
                <Routes>
                    <Route path="/prices" element={<PricesPage t={t} />} />
                    <Route path="/instituciones-educativas" element={<ColegiosPage />} />
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            </main>
            <Footer t={t} />
        </div>
    );
}
