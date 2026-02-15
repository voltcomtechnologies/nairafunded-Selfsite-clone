"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type FaqItem = {
    question: string;
    answer: string;
};

type Props = {
    heading: string;
    subtitle: string;
    items: FaqItem[];
};

export default function FaqSection({ heading, subtitle, items }: Props) {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);
    const [searchQuery, setSearchQuery] = useState("");

    const filteredItems = items.filter(
        (item) =>
            item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.answer.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <section className="max-w-7xl mx-auto px-6 py-20 min-h-screen">
            <div className="text-center mb-16">
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-3xl md:text-5xl font-bold text-white mb-6"
                >
                    {heading}
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    className="text-slate-400 text-lg max-w-2xl mx-auto mb-10"
                >
                    {subtitle}
                </motion.p>

                {/* Search Bar */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="max-w-xl mx-auto relative z-10"
                >
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search for answers..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-[#111827]/80 backdrop-blur-md border border-[#1e293b] focus:border-[#00a651] text-white rounded-2xl py-4 pl-12 pr-4 shadow-2xl transition-all outline-none"
                        />
                        <svg
                            className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                            />
                        </svg>
                    </div>
                </motion.div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                {/* FAQ List */}
                <div className="lg:col-span-8 space-y-4">
                    <AnimatePresence>
                        {filteredItems.map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ delay: i * 0.05 }}
                                className={`border rounded-2xl overflow-hidden transition-all duration-300 ${activeIndex === i
                                    ? "bg-[#111827] border-[#00a651] shadow-[0_0_20px_-5px_rgba(0,166,81,0.2)]"
                                    : "bg-[#111827]/50 border-[#1e293b] hover:border-[#00a651]/30"
                                    }`}
                            >
                                <button
                                    onClick={() => setActiveIndex(activeIndex === i ? null : i)}
                                    className="w-full flex items-center justify-between p-6 text-left"
                                >
                                    <span className={`font-semibold text-lg transition-colors ${activeIndex === i ? "text-white" : "text-slate-300"}`}>
                                        {item.question}
                                    </span>
                                    <div
                                        className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${activeIndex === i ? "bg-[#00a651] rotate-180" : "bg-[#1e293b]"
                                            }`}
                                    >
                                        <svg
                                            className={`w-4 h-4 ${activeIndex === i ? "text-white" : "text-slate-400"}`}
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </div>
                                </button>
                                <AnimatePresence>
                                    {activeIndex === i && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.3, ease: "easeInOut" }}
                                        >
                                            <div className="px-6 pb-6 text-slate-400 leading-relaxed border-t border-[#1e293b]/50 pt-4">
                                                {item.answer}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                    {filteredItems.length === 0 && (
                        <div className="text-center py-12 text-slate-500">
                            <p>No answers found for "{searchQuery}".</p>
                        </div>
                    )}
                </div>

                {/* Support Sticky Card */}
                <div className="lg:col-span-4 lg:sticky lg:top-32">
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="bg-gradient-to-b from-[#111827] to-[#0f172a] border border-[#1e293b] rounded-2xl p-8 text-center"
                    >
                        <div className="w-16 h-16 bg-[#00a651]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                            <svg className="w-8 h-8 text-[#00a651]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">Still confused?</h3>
                        <p className="text-slate-400 text-sm mb-6">
                            Can't find what you're looking for? Chat with our support team.
                        </p>
                        <a
                            href="mailto:support@nairafunded.com"
                            className="block w-full bg-[#00a651] hover:bg-[#006837] text-white font-semibold py-3 rounded-xl transition-all"
                        >
                            Contact Support
                        </a>
                        <p className="text-xs text-slate-500 mt-4">
                            We typically reply within 2 hours.
                        </p>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
