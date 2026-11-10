import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Globe } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = ({ lang, setLang, t }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleMenu = () => setIsOpen(!isOpen);

    const languages = [
        { code: 'es', label: 'ES' },
        { code: 'en', label: 'EN' },
        { code: 'pt', label: 'PT' }
    ];

    const isHomePage = location.pathname === '/';

    const renderLink = (link, index, mobile = false) => {
        const href = isHomePage ? `#section-${index}` : `/#section-${index}`;
        const baseClass = mobile
            ? "text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
            : "hover:text-kikar-violet transition-colors duration-300 px-3 py-2 rounded-md text-sm font-medium";

        return (
            <a key={index} href={href} onClick={mobile ? toggleMenu : undefined} className={baseClass}>
                {link}
            </a>
        );
    };

    return (
        <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-kikar-dark/80 backdrop-blur-md border-b border-white/10' : 'bg-transparent'}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    <div className="flex-shrink-0">
                        <Link to="/" className="text-2xl font-bold tracking-wider text-white">KIKAR</Link>
                    </div>

                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-8">
                            {t.nav.links.map((link, index) => renderLink(link, index))}
                            <Link
                                to="/instituciones-educativas"
                                className={`transition-colors duration-300 px-3 py-2 rounded-md text-sm font-medium ${location.pathname === '/instituciones-educativas' ? 'text-kikar-violet' : 'hover:text-kikar-violet'}`}
                            >
                                {lang === 'es' ? 'Instituciones' : lang === 'pt' ? 'Instituições' : 'Institutions'}
                            </Link>
                            <Link
                                to="/prices"
                                className={`transition-colors duration-300 px-3 py-2 rounded-md text-sm font-medium ${location.pathname === '/prices' ? 'text-kikar-violet' : 'hover:text-kikar-violet'}`}
                            >
                                {lang === 'es' ? 'Precios' : lang === 'pt' ? 'Preços' : 'Prices'}
                            </Link>
                        </div>
                    </div>

                    <div className="hidden md:flex items-center space-x-4">
                        <div className="flex items-center space-x-2 bg-white/5 rounded-full px-3 py-1 border border-white/10">
                            <Globe size={14} className="text-gray-400" />
                            {languages.map((l) => (
                                <button
                                    key={l.code}
                                    onClick={() => setLang(l.code)}
                                    className={`text-xs font-semibold transition-colors ${lang === l.code ? 'text-white' : 'text-gray-500 hover:text-gray-300'}`}
                                >
                                    {l.label}
                                </button>
                            ))}
                        </div>
                        <a href="#agendar" className="glass-button px-4 py-2 rounded-full text-sm font-semibold text-white">
                            {t.hero.ctaPrimary}
                        </a>
                    </div>

                    <div className="-mr-2 flex md:hidden">
                        <button onClick={toggleMenu} className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-white/10 focus:outline-none">
                            {isOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="md:hidden bg-kikar-dark border-b border-white/10"
                    >
                        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                            {t.nav.links.map((link, index) => renderLink(link, index, true))}
                            <Link
                                to="/instituciones-educativas"
                                onClick={toggleMenu}
                                className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                            >
                                {lang === 'es' ? 'Instituciones' : lang === 'pt' ? 'Instituições' : 'Institutions'}
                            </Link>
                            <Link
                                to="/prices"
                                onClick={toggleMenu}
                                className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                            >
                                {lang === 'es' ? 'Precios' : lang === 'pt' ? 'Preços' : 'Prices'}
                            </Link>
                            <div className="flex justify-center space-x-4 py-4">
                                {languages.map((l) => (
                                    <button
                                        key={l.code}
                                        onClick={() => { setLang(l.code); toggleMenu(); }}
                                        className={`text-sm font-semibold ${lang === l.code ? 'text-kikar-violet' : 'text-gray-400'}`}
                                    >
                                        {l.label}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
