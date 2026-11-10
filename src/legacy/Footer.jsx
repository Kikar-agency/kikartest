import React from 'react';
import { Instagram, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = ({ t }) => {
    const lang = t?.lang || 'es';
    return (
        <footer className="bg-black py-12 border-t border-white/10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="text-center md:text-left">
                        <span className="text-2xl font-bold tracking-wider text-white">KIKAR</span>
                        <p className="text-gray-500 text-sm mt-1">© {new Date().getFullYear()} Kikar. Todos los derechos reservados.</p>
                    </div>

                    <div className="flex items-center gap-8 text-sm text-gray-500">
                        <Link to="/instituciones-educativas" className="hover:text-white transition-colors">
                            Instituciones
                        </Link>
                        <Link to="/prices" className="hover:text-white transition-colors">
                            Precios
                        </Link>
                        <a href="mailto:hola@kikar.com.ar" className="hover:text-white transition-colors">
                            hola@kikar.com.ar
                        </a>
                    </div>

                    <div className="flex space-x-4">
                        <a
                            href="https://www.instagram.com/kikar.ar"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-400 hover:text-white transition-colors"
                            aria-label="Instagram"
                        >
                            <Instagram size={22} />
                        </a>
                        <a
                            href="mailto:hola@kikar.com.ar"
                            className="text-gray-400 hover:text-white transition-colors"
                            aria-label="Email"
                        >
                            <Mail size={22} />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
