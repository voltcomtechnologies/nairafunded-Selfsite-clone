"use client";

import { useState } from "react";
import { motion } from "framer-motion";

type Props = {
    heading: string;
    description: string;
    email: string;
    hours: string;
    location: string;
    locationDetail: string;
    whatsappContacts?: { label: string; number: string }[];
    telegramContacts?: { label: string; username: string }[];
};

export default function ContactSection({
    heading,
    description,
    email,
    hours,
    location,
    locationDetail,
    whatsappContacts = [],
    telegramContacts = []
}: Props) {
    const [formState, setFormState] = useState<"idle" | "submitting" | "success">("idle");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setFormState("submitting");
        // Simulate API call
        setTimeout(() => {
            setFormState("success");
            // Reset after a delay
            setTimeout(() => setFormState("idle"), 3000);
        }, 1500);
    };

    return (
        <section className="max-w-7xl mx-auto px-6 py-20 min-h-screen flex flex-col justify-center">
            {/* Header */}
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
                    className="text-slate-400 text-lg max-w-2xl mx-auto"
                >
                    {description}
                </motion.p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
                {/* Left: Contact Form */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="relative"
                >
                    <div className="absolute -inset-1 bg-gradient-to-r from-[#00a651] to-[#0d2828] opacity-20 blur-xl rounded-2xl" />
                    <div className="relative bg-[#111827]/80 backdrop-blur-md border border-[#1e293b] rounded-2xl p-8 md:p-10">
                        <div className="flex items-center gap-3 mb-8">
                            <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
                            <span className="text-sm font-medium text-green-500 uppercase tracking-wider">Support Online</span>
                        </div>

                        {formState === "success" ? (
                            <div className="flex flex-col items-center justify-center py-12 text-center">
                                <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mb-4">
                                    <svg className="w-8 h-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-bold text-white mb-2">Message Sent!</h3>
                                <p className="text-slate-400">We'll get back to you shortly.</p>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-slate-300">Name</label>
                                        <input
                                            required
                                            type="text"
                                            placeholder="Your name"
                                            className="w-full bg-[#0b0f19] border border-[#1e293b] focus:border-[#00a651] text-white rounded-xl px-4 py-3 outline-none transition-colors"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-slate-300">Email</label>
                                        <input
                                            required
                                            type="email"
                                            placeholder="your@email.com"
                                            className="w-full bg-[#0b0f19] border border-[#1e293b] focus:border-[#00a651] text-white rounded-xl px-4 py-3 outline-none transition-colors"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-slate-300">Subject</label>
                                    <select className="w-full bg-[#0b0f19] border border-[#1e293b] focus:border-[#00a651] text-white rounded-xl px-4 py-3 outline-none transition-colors appearance-none">
                                        <option>General Inquiry</option>
                                        <option>Billing Issue</option>
                                        <option>Technical Support</option>
                                        <option>Partnership</option>
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-slate-300">Message</label>
                                    <textarea
                                        required
                                        rows={4}
                                        placeholder="How can we help?"
                                        className="w-full bg-[#0b0f19] border border-[#1e293b] focus:border-[#00a651] text-white rounded-xl px-4 py-3 outline-none transition-colors resize-none"
                                    />
                                </div>
                                <button
                                    disabled={formState === "submitting"}
                                    className="w-full bg-[#00a651] hover:bg-[#008f45] disabled:bg-[#00a651]/50 text-white font-bold py-4 rounded-xl transition-all active:scale-95 flex items-center justify-center gap-2"
                                >
                                    {formState === "submitting" ? (
                                        <>
                                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                            <span>Sending...</span>
                                        </>
                                    ) : (
                                        <span>Send Message</span>
                                    )}
                                </button>
                            </form>
                        )}
                    </div>
                </motion.div>

                {/* Right: Info Cards */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="space-y-8"
                >
                    {/* Map Graphic Placement (Conceptual) */}
                    <div className="h-48 rounded-2xl bg-[#111827] border border-[#1e293b] flex items-center justify-center relative overflow-hidden group">
                        <div className="absolute inset-0 bg-[#00a651]/5" />
                        {/* Simple grid pattern simulating map */}
                        <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(#1e293b 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
                        <div className="relative z-10 text-center">
                            <div className="w-12 h-12 bg-[#00a651]/20 rounded-full flex items-center justify-center mx-auto mb-3 text-[#00a651]">
                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012 2v1.065M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                                </svg>
                            </div>
                            <h3 className="text-white font-bold">{location}</h3>
                            <p className="text-slate-400 text-sm">{locationDetail}</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="bg-[#111827] border border-[#1e293b] p-6 rounded-2xl hover:border-[#00a651]/30 transition-colors">
                            <h4 className="text-slate-400 text-sm uppercase tracking-wider mb-2">Email Support</h4>
                            <a href={`mailto:${email}`} className="text-base sm:text-lg font-bold text-white hover:text-[#00a651] transition-colors whitespace-nowrap overflow-hidden text-ellipsis">
                                {email}
                            </a>
                        </div>
                        <div className="bg-[#111827] border border-[#1e293b] p-6 rounded-2xl hover:border-[#00a651]/30 transition-colors">
                            <h4 className="text-slate-400 text-sm uppercase tracking-wider mb-2">Response Time</h4>
                            <p className="text-lg font-bold text-white">
                                {hours}
                            </p>
                        </div>
                    </div>

                    {/* Social Chat Buttons */}
                    {(whatsappContacts.length > 0 || telegramContacts.length > 0) && (
                        <div className="bg-[#111827] border border-[#1e293b] p-6 rounded-2xl">
                            <h3 className="text-xl font-bold text-white mb-4">Chat with us</h3>
                            <div className="flex flex-col gap-3">
                                {whatsappContacts.map((contact, i) => (
                                    <a
                                        key={`wa-${i}`}
                                        href={`https://wa.me/${contact.number}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center justify-between bg-[#25D366]/10 hover:bg-[#25D366]/20 border border-[#25D366]/20 hover:border-[#25D366]/40 p-4 rounded-xl transition-all group"
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-[#25D366] flex items-center justify-center text-white">
                                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                                </svg>
                                            </div>
                                            <div>
                                                <div className="font-bold text-white group-hover:text-[#25D366] transition-colors">{contact.label}</div>
                                                <div className="text-xs text-[#25D366]">{contact.number}</div>
                                            </div>
                                        </div>
                                        <div className="text-[#25D366] opacity-0 group-hover:opacity-100 transition-opacity">
                                            Chat &rarr;
                                        </div>
                                    </a>
                                ))}

                                {telegramContacts.map((contact, i) => (
                                    <a
                                        key={`tg-${i}`}
                                        href={`https://t.me/${contact.username}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center justify-between bg-[#0088cc]/10 hover:bg-[#0088cc]/20 border border-[#0088cc]/20 hover:border-[#0088cc]/40 p-4 rounded-xl transition-all group"
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-[#0088cc] flex items-center justify-center text-white">
                                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 11.944 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
                                                </svg>
                                            </div>
                                            <div>
                                                <div className="font-bold text-white group-hover:text-[#0088cc] transition-colors">{contact.label}</div>
                                                <div className="text-xs text-[#0088cc]">@{contact.username}</div>
                                            </div>
                                        </div>
                                        <div className="text-[#0088cc] opacity-0 group-hover:opacity-100 transition-opacity">
                                            Chat &rarr;
                                        </div>
                                    </a>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* FAQ Teaser */}
                    <div className="bg-gradient-to-br from-[#1e293b] to-[#111827] p-8 rounded-2xl border border-white/5">
                        <h3 className="text-xl font-bold text-white mb-2">Check the FAQ</h3>
                        <p className="text-slate-400 mb-6 text-sm">
                            Most questions about drawdowns, payouts, and rules are answered in our Knowledge Hub.
                        </p>
                        <a href="/faq" className="text-[#00a651] font-bold hover:text-white transition-colors flex items-center gap-2">
                            Go to FAQ
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </a>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
