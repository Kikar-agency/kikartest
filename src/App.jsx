import React, { Suspense, lazy, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Home from './home/Home';
import Turnos from './home/Turnos';

// Las páginas anteriores (/prices y /instituciones-educativas) siguen funcionando igual,
// pero se cargan aparte para que la home pese lo mínimo en el celular.
const Legacy = lazy(() => import('./legacy/Legacy.jsx'));

function ScrollToTop() {
    const { pathname } = useLocation();
    useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
    return null;
}

export default function App() {
    return (
        <Router>
            <ScrollToTop />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/turnos" element={<Turnos />} />
                <Route path="*" element={<Suspense fallback={null}><Legacy /></Suspense>} />
            </Routes>
        </Router>
    );
}
