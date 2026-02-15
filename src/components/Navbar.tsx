"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const navLinks = [
    { href: "/", label: "Home" },
    { href: "/shop", label: "Buy Account" },
    { href: "/rules", label: "Rules" },
    { href: "/faq", label: "FAQ" },
    { href: "/contact", label: "Contact Us" },
];

export default function Navbar() {
    const [open, setOpen] = useState(false);

    return (
        <motion.nav
            initial={{ y: -80 }}
            animate={{ y: 0 }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
            className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-[#0b0f19]/80 border-b border-[#1e293b]"
        >
            <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-3">
                    <Image
                        src="/logo.png"
                        alt="NairaFunded"
                        width={200}
                        height={44}
                        className="h-10 w-auto object-contain"
                        priority
                    />
                </Link>

                {/* Desktop Nav */}
                <div className="hidden lg:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className="text-sm font-medium text-slate-300 hover:text-white transition-colors relative group"
                        >
                            {link.label}
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand-green-light group-hover:w-full transition-all duration-300" />
                        </Link>
                    ))}
                </div>

                {/* CTA + Admin */}
                <div className="hidden lg:flex items-center gap-4">
                    <Link
                        href="/admin"
                        className="text-xs text-slate-500 hover:text-slate-300 transition-colors"
                    >
                        Admin
                    </Link>
                    <Link
                        href="/shop"
                        className="bg-brand-green-light hover:bg-brand-green text-white px-6 py-2.5 rounded-lg text-sm font-semibold transition-all hover:shadow-lg hover:shadow-green-500/20 active:scale-95"
                    >
                        Dashboard
                    </Link>
                </div>

                {/* Mobile Toggle */}
                <button
                    onClick={() => setOpen(!open)}
                    className="lg:hidden text-white p-2"
                >
                    {open ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Nav */}
            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="lg:hidden overflow-hidden bg-[#0f172a] border-t border-[#1e293b]"
                    >
                        <div className="flex flex-col px-6 py-4 gap-4">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    onClick={() => setOpen(false)}
                                    className="text-slate-300 hover:text-white py-2 border-b border-[#1e293b] last:border-0"
                                >
                                    {link.label}
                                </Link>
                            ))}
                            <Link
                                href="/shop"
                                className="bg-brand-green-light text-white px-6 py-3 rounded-lg text-center font-semibold mt-2"
                            >
                                Dashboard
                            </Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
}
