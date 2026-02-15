"use client";

import type { Config } from "@puckeditor/core";
import { motion } from "framer-motion";
import ForexAnimation from "@/components/ForexAnimation";
import LiveTradingSimulation from "@/components/LiveTradingSimulation";
import FaqSection from "@/components/FaqSection";
import ContactSection from "@/components/ContactSection";

type Props = {
    Hero: {
        heading: string;
        subheading: string;
        ctaText: string;
        ctaLink: string;
        rulesText: string;
        rulesLink: string;
        fontSize?: string;
        fontType?: string;
        animationType?: string;
    };
    BenefitsBar: {
        items: { label: string; value: string }[];
    };
    ValueProps: {
        items: { title: string; description: string }[];
    };
    HowItWorks: {
        heading: string;
        subtitle: string;
        steps: { step: string; title: string; description: string }[];
    };
    PricingCards: {
        heading: string;
        subtitle: string;
        plans: {
            name: string;
            price: string;
            features: { text: string }[];
            ctaLink: string;
        }[];
    };
    FAQ: {
        heading: string;
        subtitle: string;
        items: { question: string; answer: string }[];
    };
    RulesSection: {
        heading: string;
        subtitle: string;
        rules: { title: string; content: string }[];
    };
    ContactSection: {
        heading: string;
        description: string;
        email: string;
        hours: string;
        location: string;
        locationDetail: string;
        whatsappContacts: { label: string; number: string }[];
        telegramContacts: { label: string; username: string }[];
    };
    TextBlock: {
        heading: string;
        body: string;
    };
    Animation: {
        type: string;
    };
    ShopGrid: {
        heading: string;
        products: {
            name: string;
            price: string;
            image?: string;
            rules: { text: string }[];
            ctaLink: string;
        }[];
    };
};

export const config: Config<Props> = {
    components: {
        /* ───────────────────── HERO ───────────────────── */
        Hero: {
            fields: {
                heading: { type: "text" },
                subheading: { type: "textarea" },
                ctaText: { type: "text" },
                ctaLink: { type: "text" },
                rulesText: { type: "text" },
                rulesLink: { type: "text" },
                // New configuration fields
                fontSize: {
                    type: "select",
                    options: [
                        { label: "Small", value: "small" },
                        { label: "Medium", value: "medium" },
                        { label: "Large", value: "large" },
                        { label: "Extra Large", value: "xl" },
                    ],
                },
                fontType: {
                    type: "select",
                    options: [
                        { label: "Sans Serif", value: "font-sans" },
                        { label: "Serif", value: "font-serif" },
                        { label: "Monospace", value: "font-mono" },
                    ],
                },
                animationType: {
                    type: "select",
                    options: [
                        { label: "Fade Up", value: "fade-up" },
                        { label: "Fade In", value: "fade-in" },
                        { label: "Zoom In", value: "zoom-in" },
                        { label: "None", value: "none" },
                    ],
                },
            },
            defaultProps: {
                heading: "NairaFunded— Trading evaluations built for disciplined traders.",
                subheading: "",
                ctaText: "View pricing",
                ctaLink: "/shop",
                rulesText: "Simple Rules",
                rulesLink: "/rules",
                fontSize: "medium",
                fontType: "font-sans",
                animationType: "fade-up",
            },
            render: ({ heading, subheading, ctaText, ctaLink, rulesText, rulesLink, fontSize, fontType, animationType }) => {
                // Size mappings
                const sizeClasses = {
                    small: { top: "text-xl md:text-3xl lg:text-4xl", bottom: "text-2xl md:text-4xl lg:text-5xl", single: "text-xl md:text-4xl" },
                    medium: { top: "text-2xl md:text-4xl lg:text-5xl", bottom: "text-3xl md:text-5xl lg:text-6xl", single: "text-2xl md:text-5xl" },
                    large: { top: "text-3xl md:text-5xl lg:text-6xl", bottom: "text-4xl md:text-6xl lg:text-7xl", single: "text-3xl md:text-6xl" },
                    xl: { top: "text-4xl md:text-6xl lg:text-7xl", bottom: "text-5xl md:text-7xl lg:text-8xl", single: "text-4xl md:text-7xl" },
                };

                const selectedSize = sizeClasses[fontSize as keyof typeof sizeClasses] || sizeClasses.medium;

                // Animation variants
                const animations = {
                    "fade-up": { initial: { opacity: 0, y: 30 }, animate: { opacity: 1, y: 0 } },
                    "fade-in": { initial: { opacity: 0 }, animate: { opacity: 1 } },
                    "zoom-in": { initial: { opacity: 0, scale: 0.9 }, animate: { opacity: 1, scale: 1 } },
                    "none": { initial: {}, animate: {} },
                };

                const selectedAnim = animations[animationType as keyof typeof animations] || animations["fade-up"];

                return (
                    <section className={`relative pt-20 md:pt-32 pb-12 md:pb-20 px-4 md:px-6 overflow-hidden lg:min-h-screen flex items-center ${fontType || 'font-sans'}`}>

                        {/* ── Background layers ── */}
                        {/* Dot-grid overlay */}
                        <div className="absolute inset-0 hero-dot-grid pointer-events-none" />

                        {/* Gradient orbs – layered for depth */}
                        <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[500px] h-[500px] md:w-[900px] md:h-[900px] bg-[#00a651]/8 rounded-full blur-[100px] md:blur-[140px] pointer-events-none" />
                        <div className="absolute top-[20%] right-[-5%] w-[300px] h-[300px] md:w-[500px] md:h-[500px] bg-[#D4AF37]/5 rounded-full blur-[80px] md:blur-[120px] pointer-events-none" />
                        <div className="absolute bottom-[-10%] left-[-5%] w-[350px] h-[350px] md:w-[600px] md:h-[600px] bg-[#00a651]/5 rounded-full blur-[100px] pointer-events-none" />

                        {/* Subtle top-edge highlight */}
                        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00a651]/20 to-transparent" />

                        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-8 md:gap-12 items-center relative z-10 w-full">

                            {/* ── Left column – Text content ── */}
                            <div className="max-w-2xl text-center lg:text-left mx-auto lg:mx-0">

                                {/* Badge */}
                                <motion.div
                                    initial={{ opacity: 0, y: 15 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, ease: "easeOut" }}
                                    className="inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-full border border-[#00a651]/25 mb-6 md:mb-8 badge-shimmer relative overflow-hidden"
                                >
                                    <div className="w-2 h-2 rounded-full bg-[#00a651] shadow-[0_0_8px_rgba(0,166,81,0.6)] animate-pulse" />
                                    <span className="text-[#00a651] text-xs md:text-sm font-semibold tracking-wide">Nigeria&apos;s #1 Prop Trading Firm</span>
                                </motion.div>

                                {/* Heading */}
                                <motion.div
                                    initial={selectedAnim.initial}
                                    animate={selectedAnim.animate}
                                    transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
                                >
                                    <h1 className="font-extrabold leading-[1.08] mb-5 md:mb-7 tracking-tight">
                                        {heading?.includes("—") ? (
                                            <>
                                                <span className={`text-white block mb-1 ${selectedSize.top}`}>{heading?.split("—")[0]}.</span>
                                                <span className={`block gradient-text ${selectedSize.bottom}`}>
                                                    {heading?.split("—")[1]}
                                                </span>
                                            </>
                                        ) : (
                                            <span className={`text-white ${selectedSize.single}`}>{heading}</span>
                                        )}
                                    </h1>
                                </motion.div>

                                {/* Subheading */}
                                {subheading && (
                                    <motion.p
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
                                        className="text-base md:text-lg lg:text-xl text-slate-400 mb-8 md:mb-10 leading-relaxed font-normal max-w-lg mx-auto lg:mx-0"
                                    >
                                        {subheading}
                                    </motion.p>
                                )}

                                {/* CTA Buttons */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.7, delay: 0.35, ease: "easeOut" }}
                                    className="flex flex-wrap gap-3 md:gap-4 justify-center lg:justify-start"
                                >
                                    {/* Primary CTA */}
                                    <a
                                        href={ctaLink}
                                        className="group relative bg-gradient-to-b from-[#00c060] to-[#00a651] text-white px-7 py-3 md:px-9 md:py-4 rounded-xl font-bold text-sm md:text-base transition-all duration-300 hover:shadow-[0_0_35px_rgba(0,166,81,0.45)] hover:-translate-y-0.5 active:scale-[0.97] flex items-center gap-2.5 overflow-hidden"
                                    >
                                        {/* Inner shine */}
                                        <span className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent rounded-xl pointer-events-none" />
                                        <span className="relative">{ctaText}</span>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 md:h-5 md:w-5 relative transition-transform group-hover:translate-x-0.5" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                                        </svg>
                                    </a>

                                    {/* Secondary CTA – Glass effect */}
                                    <a
                                        href={rulesLink}
                                        className="group relative border border-[#334155] hover:border-[#00a651]/40 text-slate-300 hover:text-white px-7 py-3 md:px-9 md:py-4 rounded-xl font-bold text-sm md:text-base transition-all duration-300 bg-white/[0.02] hover:bg-white/[0.05] backdrop-blur-sm"
                                    >
                                        {rulesText}
                                    </a>
                                </motion.div>

                                {/* ── Social Proof Stats ── */}
                                <motion.div
                                    initial={{ opacity: 0, y: 15 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.7, delay: 0.55, ease: "easeOut" }}
                                    className="mt-10 md:mt-14"
                                >
                                    <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6 md:gap-0">
                                        {[
                                            { value: "2,500+", label: "Funded Traders" },
                                            { value: "₦150M+", label: "Paid Out" },
                                            { value: "24hrs", label: "Payout Speed" },
                                        ].map((stat, i) => (
                                            <div key={i} className="flex items-center">
                                                <div className="text-center md:text-left px-0 md:px-5 first:pl-0 last:pr-0">
                                                    <div className="text-white font-extrabold text-lg md:text-xl">{stat.value}</div>
                                                    <div className="text-slate-500 text-xs md:text-sm font-medium">{stat.label}</div>
                                                </div>
                                                {i < 2 && (
                                                    <div className="hidden md:block w-px h-8 bg-[#1e293b] ml-5" />
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </motion.div>
                            </div>

                            {/* ── Right column – Trading Simulation ── */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.92, x: 40 }}
                                animate={{ opacity: 1, scale: 1, x: 0 }}
                                transition={{ duration: 0.9, delay: 0.3, ease: "easeOut" }}
                                className="relative max-w-[380px] md:max-w-none mx-auto"
                            >
                                {/* Decorative background elements */}
                                <div className="absolute -inset-6 bg-gradient-to-tr from-[#00a651]/15 via-transparent to-[#D4AF37]/5 rounded-[2rem] blur-2xl opacity-40 pointer-events-none" />
                                <div className="absolute top-8 -right-8 w-28 h-28 bg-[#D4AF37]/8 rounded-full blur-2xl pointer-events-none" />
                                <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-[#00a651]/10 rounded-full blur-2xl pointer-events-none" />

                                <div className="relative transform transition-transform duration-500 hover:scale-[1.015]">
                                    <LiveTradingSimulation />
                                </div>

                                {/* Floating "Trade Executed" card */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20, x: -20 }}
                                    animate={{ opacity: 1, y: 0, x: 0 }}
                                    transition={{ delay: 2.5, duration: 0.5, ease: "easeOut" }}
                                    className="absolute -bottom-4 -left-4 md:-bottom-6 md:-left-6 bg-[#111827]/90 backdrop-blur-xl border border-[#1e293b] p-3 md:p-4 rounded-xl shadow-2xl hidden md:block"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="bg-[#00a651]/15 p-2 rounded-lg border border-[#00a651]/20">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#00a651]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                        </div>
                                        <div>
                                            <div className="text-white font-bold text-sm">Trade Executed</div>
                                            <div className="text-slate-500 text-xs">0.05s Execution Speed</div>
                                        </div>
                                    </div>
                                </motion.div>
                            </motion.div>
                        </div>
                    </section>
                );
            },
        },

        /* ───────────────── BENEFITS BAR ──────────────── */
        BenefitsBar: {
            fields: {
                items: {
                    type: "array",
                    getItemSummary: (item) => item.label || "Benefit",
                    arrayFields: {
                        label: { type: "text" },
                        value: { type: "text" },
                    },
                },
            },
            defaultProps: {
                items: [
                    { label: "Payout cadence", value: "24hrs" },
                    { label: "Profit split", value: "Up to 90%" },
                    { label: "Platforms", value: "MT5" },
                ],
            },
            render: ({ items }) => (
                <section className="bg-[#111827] border-y border-[#1e293b]">
                    <div className="max-w-7xl mx-auto px-6 py-6 flex flex-wrap justify-center gap-8 md:gap-16">
                        {items.map((item, i) => (
                            <div key={i} className="text-center">
                                <div className="text-xs text-slate-500 uppercase tracking-wider mb-1">{item.label}</div>
                                <div className="text-xl font-bold gradient-text">{item.value}</div>
                            </div>
                        ))}
                    </div>
                </section>
            ),
        },

        /* ────────────────── VALUE PROPS ──────────────── */
        ValueProps: {
            fields: {
                items: {
                    type: "array",
                    getItemSummary: (item) => item.title || "Prop",
                    arrayFields: {
                        title: { type: "text" },
                        description: { type: "textarea" },
                    },
                },
            },
            defaultProps: {
                items: [
                    { title: "Risk-first rule set", description: "Clear daily + overall drawdown limits. Designed to reward consistency over spikes." },
                    { title: "Fast evaluation flow", description: "Hit targets without unnecessary minimum days. Trade when your edge is present." },
                    { title: "Transparent payouts", description: "Straightforward profit split and payout cadence. No hidden performance fees." },
                ],
            },
            render: ({ items }) => (
                <section className="relative px-6 py-24 overflow-hidden">
                    {/* Background Decorative Elements */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-[#00a651]/5 rounded-full blur-[120px] pointer-events-none" />

                    <div className="max-w-7xl mx-auto relative z-10">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {items.map((item, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-50px" }}
                                    transition={{ duration: 0.5, delay: i * 0.15, ease: "easeOut" }}
                                    whileHover={{ y: -8 }}
                                    className="group relative"
                                >
                                    {/* Card Container */}
                                    <div className="h-full bg-[#111827]/40 backdrop-blur-md border border-[#1e293b]/60 rounded-3xl p-8 transition-all duration-500 hover:bg-[#111827]/60 hover:border-[#00a651]/30 hover:shadow-[0_10px_40px_-10px_rgba(0,166,81,0.1)]">

                                        {/* Icon/Graphic Area */}
                                        <div className="mb-6 relative inline-block">
                                            <div className="absolute inset-0 bg-[#00a651] blur-xl opacity-20 rounded-full group-hover:opacity-40 transition-opacity duration-500" />
                                            <div className="relative w-14 h-14 rounded-2xl bg-gradient-to-br from-[#1e293b] to-[#0f172a] border border-[#334155] flex items-center justify-center group-hover:border-[#00a651]/50 transition-colors duration-500">
                                                {/* Animated Inner Dot */}
                                                <div className="w-3 h-3 rounded-full bg-[#00a651] shadow-[0_0_10px_#00a651] group-hover:animate-pulse" />

                                                {/* Orbiting Ring (Cosmetic) */}
                                                <div className="absolute inset-0 rounded-2xl border border-[#00a651]/0 group-hover:border-[#00a651]/20 transition-all duration-700 scale-110" />
                                            </div>
                                        </div>

                                        {/* Content */}
                                        <h3 className="text-xl font-bold text-white mb-4 group-hover:text-[#00a651] transition-colors duration-300">
                                            {item.title}
                                        </h3>
                                        <p className="text-slate-400 leading-relaxed group-hover:text-slate-300 transition-colors duration-300">
                                            {item.description}
                                        </p>

                                        {/* Hover Indicator Corner */}
                                        <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                            <svg className="w-4 h-4 text-[#00a651]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                            </svg>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>
            ),
        },

        /* ──────────────── HOW IT WORKS ───────────────── */
        HowItWorks: {
            fields: {
                heading: { type: "text" },
                subtitle: { type: "textarea" },
                steps: {
                    type: "array",
                    getItemSummary: (item) => item.title || "Step",
                    arrayFields: {
                        step: { type: "text" },
                        title: { type: "text" },
                        description: { type: "textarea" },
                    },
                },
            },
            defaultProps: {
                heading: "Sharp Sharp Road to Funded",
                subtitle: "If you fit trade well and manage risk, funding dey wait you.",
                steps: [
                    { step: "Step 1", title: "Show You Sabi (Evaluation)", description: "Oya, prove say you get level. No be by mouth. Trade with sense, hold discipline tight, and hit the target. No loose guard." },
                    { step: "Step 2", title: "Confirm Your Steeze (Verification)", description: "We wan see say no be luck or juju. Same rules, but take am jeje. No rush am — just pure skill and risk control." },
                    { step: "Step 3", title: "Odogwu Level (Funded)", description: "You don land. Now na to protect the bag and grow am small-small. If you lose discipline, na straight breakfast." },
                ],
            },
            render: ({ heading, subtitle, steps }) => (
                <section className="bg-[#0f172a] py-20">
                    <div className="max-w-7xl mx-auto px-6">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{heading}</h2>
                            <p className="text-slate-400 max-w-2xl mx-auto">{subtitle}</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {steps.map((s, i) => (
                                <div key={i} className="relative">
                                    {/* Connector line */}
                                    {i < steps.length - 1 && (
                                        <div className="hidden md:block absolute top-8 left-full w-full h-px bg-gradient-to-r from-[#00a651]/40 to-transparent z-0" />
                                    )}
                                    <div className="bg-[#111827] border border-[#1e293b] rounded-2xl p-8 relative z-10 hover:border-[#D4AF37]/30 transition-all">
                                        <div className="text-xs text-[#D4AF37] font-semibold uppercase tracking-wider mb-3">{s.step}</div>
                                        <h3 className="text-lg font-bold text-white mb-3">{s.title}</h3>
                                        <p className="text-sm text-slate-400 leading-relaxed">{s.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            ),
        },

        /* ────────────────── PRICING ──────────────────── */
        PricingCards: {
            fields: {
                heading: { type: "text" },
                subtitle: { type: "textarea" },
                plans: {
                    type: "array",
                    getItemSummary: (plan) => plan.name || "Plan",
                    arrayFields: {
                        name: { type: "text" },
                        price: { type: "text" },
                        features: { type: "array", arrayFields: { text: { type: "text" } } },
                        ctaLink: { type: "text" },
                    },
                },
            },
            defaultProps: {
                heading: "Pick your account size.",
                subtitle: "Choose a structure that matches your risk tolerance. Upgrade as you grow.",
                plans: [],
            },
            render: ({ heading, subtitle, plans }) => (
                <section className="relative px-6 py-24 overflow-hidden">
                    {/* Background Glows */}
                    <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-[#00a651]/10 rounded-full blur-[100px] pointer-events-none" />
                    <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-[#1e293b]/20 rounded-full blur-[100px] pointer-events-none" />

                    <div className="max-w-7xl mx-auto relative z-10">
                        <div className="text-center mb-20">
                            <motion.h2
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="text-4xl md:text-5xl font-bold text-white mb-6"
                            >
                                {heading}
                            </motion.h2>
                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.1 }}
                                className="text-lg text-slate-400 max-w-2xl mx-auto"
                            >
                                {subtitle}
                            </motion.p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 items-start">
                            {plans.map((plan, i) => {
                                // Highlight the middle plan (index 2) as "Most Popular"
                                const isPopular = i === 2;

                                return (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, y: 50 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true, margin: "-50px" }}
                                        transition={{ duration: 0.5, delay: i * 0.1 }}
                                        className={`relative group rounded-3xl p-6 flex flex-col transition-all duration-300 ${isPopular
                                            ? "bg-[#111827]/80 border-2 border-[#00a651] shadow-[0_0_40px_-10px_rgba(0,166,81,0.3)] scale-105 z-20"
                                            : "bg-[#111827]/40 backdrop-blur-sm border border-[#1e293b] hover:border-[#00a651]/30 hover:bg-[#111827]/60 z-10"
                                            }`}
                                    >
                                        {isPopular && (
                                            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#00a651] text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-lg">
                                                MOST POPULAR
                                            </div>
                                        )}

                                        <div className="mb-6">
                                            <h3 className={`text-lg font-bold mb-2 ${isPopular ? "text-white" : "text-slate-300"}`}>
                                                {plan.name}
                                            </h3>
                                            <div className="flex items-baseline gap-1">
                                                <span className={`text-3xl font-bold ${isPopular ? "text-[#00a651]" : "text-white"}`}>
                                                    {plan.price}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="w-full h-px bg-[#1e293b] mb-6 group-hover:bg-[#334155] transition-colors" />

                                        <ul className="space-y-4 mb-8 flex-1">
                                            {plan.features?.map((f, j) => (
                                                <li key={j} className="flex items-start gap-3 text-sm text-slate-400 group-hover:text-slate-300 transition-colors">
                                                    <div className={`mt-0.5 w-4 h-4 rounded-full flex items-center justify-center shrink-0 ${isPopular ? "bg-[#00a651] text-white" : "bg-[#1e293b] text-[#00a651]"}`}>
                                                        <svg className="w-2.5 h-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                                        </svg>
                                                    </div>
                                                    <span>{f.text}</span>
                                                </li>
                                            ))}
                                        </ul>

                                        <a
                                            href={plan.ctaLink || "/shop"}
                                            className={`block w-full text-center py-3.5 rounded-xl font-bold transition-all active:scale-95 ${isPopular
                                                ? "bg-[#00a651] hover:bg-[#008f45] text-white shadow-lg shadow-green-900/20"
                                                : "bg-[#1e293b] hover:bg-[#00a651] text-slate-300 hover:text-white"
                                                }`}
                                        >
                                            Chose Plan
                                        </a>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </div>
                </section>
            ),
        },

        /* ─────────────────── FAQ ─────────────────────── */
        FAQ: {
            fields: {
                heading: { type: "text" },
                subtitle: { type: "textarea" },
                items: {
                    type: "array",
                    getItemSummary: (item) => item.question || "Question",
                    arrayFields: {
                        question: { type: "text" },
                        answer: { type: "textarea" },
                    },
                },
            },
            defaultProps: {
                heading: "Questions, answered.",
                subtitle: "If you're a serious trader, you'll care about rules, payouts, and what's actually enforced.",
                items: [],
            },
            render: (props) => <FaqSection {...props} />,
        },

        /* ────────────────── RULES ────────────────────── */
        RulesSection: {
            fields: {
                heading: { type: "text" },
                subtitle: { type: "text" },
                rules: {
                    type: "array",
                    getItemSummary: (rule) => rule.title || "Rule",
                    arrayFields: {
                        title: { type: "text" },
                        content: { type: "textarea" },
                    },
                },
            },
            defaultProps: {
                heading: "OFFICIAL TRADING RULES & RISK DISCLOSURE",
                subtitle: "(The \"Suit & Tie\" Version for Compliance)",
                rules: [],
            },
            render: ({ heading, subtitle, rules }) => (
                <section className="max-w-7xl mx-auto px-6 pt-32 pb-20">
                    <div className="text-center mb-16">
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-3xl md:text-5xl font-bold text-white mb-4"
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
                            {subtitle}
                        </motion.p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[minmax(200px,auto)]">
                        {rules.map((rule, i) => {
                            const isDrawdown = rule.title.includes("Drawdown");
                            const isPayout = rule.title.includes("Payout");
                            const isStrategies = rule.title.includes("Strategies");

                            // Bento Grid Logic
                            let spanClass = "md:col-span-1";
                            let colorClass = "bg-[#111827]/80 border-[#1e293b] hover:border-[#00a651]/50";
                            let iconColor = "text-[#00a651] bg-[#00a651]/10 border-[#00a651]/20";

                            if (isDrawdown) {
                                spanClass = "md:col-span-2 md:row-span-1";
                                colorClass = "bg-gradient-to-br from-red-950/40 to-[#111827] border-red-500/30 hover:border-red-500/60";
                                iconColor = "text-red-500 bg-red-500/10 border-red-500/20";
                            } else if (isPayout) {
                                spanClass = "md:col-span-2 md:col-start-2";
                                colorClass = "bg-gradient-to-br from-amber-950/40 to-[#111827] border-amber-500/30 hover:border-amber-500/60";
                                iconColor = "text-amber-500 bg-amber-500/10 border-amber-500/20";
                            } else if (isStrategies) {
                                spanClass = "md:col-span-1";
                                colorClass = "bg-gradient-to-b from-blue-950/20 to-[#111827] border-blue-500/30 hover:border-blue-500/60";
                                iconColor = "text-blue-500 bg-blue-500/10 border-blue-500/20";
                            }

                            return (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                    whileHover={{ y: -5 }}
                                    className={`relative backdrop-blur-sm border rounded-3xl p-8 transition-colors flex flex-col ${spanClass} ${colorClass}`}
                                >
                                    <div className="mb-6 flex items-start justify-between">
                                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-xl border ${iconColor}`}>
                                            {isDrawdown ? "!" : isPayout ? "$" : i + 1}
                                        </div>
                                        {(isDrawdown || isPayout) && (
                                            <span className={`text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider border ${iconColor}`}>
                                                {isDrawdown ? "Critical" : "Reward"}
                                            </span>
                                        )}
                                    </div>

                                    <h2 className="text-2xl font-bold text-white mb-4">{rule.title}</h2>
                                    <div className="text-slate-400 leading-relaxed whitespace-pre-line space-y-4 text-base">
                                        {rule.content.split('\n\n').map((paragraph, idx) => (
                                            <p key={idx}>{paragraph}</p>
                                        ))}
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </section>
            ),
        },

        /* ────────────────── CONTACT ──────────────────── */
        ContactSection: {
            fields: {
                heading: { type: "text" },
                description: { type: "textarea" },
                email: { type: "text" },
                hours: { type: "text" },
                location: { type: "text" },
                locationDetail: { type: "text" },
                whatsappContacts: {
                    type: "array",
                    arrayFields: {
                        label: { type: "text" },
                        number: { type: "text" },
                    },
                    getItemSummary: (item: any) => item.label || "WhatsApp Contact",
                },
                telegramContacts: {
                    type: "array",
                    arrayFields: {
                        label: { type: "text" },
                        username: { type: "text" },
                    },
                    getItemSummary: (item: any) => item.label || "Telegram Contact",
                },
            },
            defaultProps: {
                heading: "Built for serious traders.",
                description: "Naira Funded is a modern, rules-first evaluation brand. We care about repeatable execution, clean risk, and transparent expectations.",
                email: "support@nairafunded.com",
                hours: "Mon–Fri, 24h response",
                location: "Central Business District, Abuja",
                locationDetail: "Hybrid Operations",
                whatsappContacts: [
                    { label: "Support Team", number: "2348000000000" },
                ],
                telegramContacts: [
                    { label: "Community", username: "nairafunded" },
                ],
            },
            render: (props) => <ContactSection {...props} />,
        },

        /* ────────────────── TEXT BLOCK ───────────────── */
        TextBlock: {
            fields: {
                heading: { type: "text" },
                body: { type: "textarea" },
            },
            defaultProps: {
                heading: "",
                body: "",
            },
            render: ({ heading, body }) => (
                <section className="max-w-4xl mx-auto px-6 py-12">
                    {heading && <h2 className="text-2xl font-bold text-white mb-4">{heading}</h2>}
                    <p className="text-slate-400 leading-relaxed whitespace-pre-line">{body}</p>
                </section>
            ),
        },

        /* ────────────────── ANIMATION ────────────────── */
        Animation: {
            fields: {
                type: {
                    type: "select",
                    options: [
                        { label: "Candlestick Chart", value: "candlestick" },
                        { label: "Ticker Tape", value: "ticker" },
                        { label: "Pulse Rings", value: "pulse" },
                        { label: "Data Grid", value: "grid" },
                    ],
                },
            },
            defaultProps: {
                type: "candlestick",
            },
            render: ({ type }: any) => (
                <section className="max-w-7xl mx-auto px-6 py-12">
                    <ForexAnimation type={type} />
                </section>
            ),
        },

        /* ────────────────── SHOP GRID ────────────────── */
        ShopGrid: {
            fields: {
                heading: { type: "text" },
                products: {
                    type: "array",
                    getItemSummary: (p) => p.name || "Product",
                    arrayFields: {
                        name: { type: "text" },
                        price: { type: "text" },
                        image: { type: "text" },
                        rules: { type: "array", arrayFields: { text: { type: "text" } } },
                        ctaLink: { type: "text" },
                    },
                },
            },
            defaultProps: {
                heading: "Choose Your Evaluation",
                products: [
                    {
                        name: "200k MT5 ACCOUNT",
                        price: "₦8,900",
                        image: "/images/shop/200k.jpg",
                        rules: [{ text: "20% maximum drawdown" }, { text: "No 1–4 minutes fast scalping" }, { text: "Trade at least once in 7 days" }],
                        ctaLink: "/shop",
                    },
                    {
                        name: "400k MT5 ACCOUNT",
                        price: "₦16,500",
                        image: "/images/shop/400k.jpg",
                        rules: [{ text: "20% maximum drawdown" }, { text: "No 1–4 minutes fast scalping" }, { text: "Trade at least once in 7 days" }],
                        ctaLink: "/shop",
                    },
                    {
                        name: "600k MT5 ACCOUNT",
                        price: "₦24,500",
                        image: "/images/shop/600k.jpg",
                        rules: [{ text: "20% maximum drawdown" }, { text: "No 1–4 minutes fast scalping" }, { text: "Trade at least once in 7 days" }],
                        ctaLink: "/shop",
                    },
                    {
                        name: "800k MT5 ACCOUNT",
                        price: "₦32,000",
                        image: "/images/shop/800k.jpg",
                        rules: [{ text: "20% maximum drawdown" }, { text: "No 1–4 minutes fast scalping" }, { text: "Trade at least once in 7 days" }],
                        ctaLink: "/shop",
                    },
                    {
                        name: "1.5M MT5 ACCOUNT",
                        price: "₦58,000",
                        image: "/images/shop/1.5m.jpg",
                        rules: [{ text: "20% maximum drawdown" }, { text: "No 1–4 minutes fast scalping" }, { text: "Trade at least once in 7 days" }],
                        ctaLink: "/shop",
                    },
                ],
            },
            render: ({ heading, products }) => (
                <section className="max-w-7xl mx-auto px-6 pt-32 pb-20 relative z-10">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl md:text-5xl font-bold text-white mb-16 text-center"
                    >
                        {heading}
                    </motion.h1>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {products.map((p, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                whileHover={{ y: -8 }}
                                className={`relative group rounded-3xl overflow-hidden border transition-all duration-300 ${i === 1
                                    ? "bg-gradient-to-b from-[#00a651]/10 to-[#111827] border-[#00a651] shadow-[0_0_40px_-10px_rgba(0,166,81,0.3)]"
                                    : "bg-[#111827]/60 backdrop-blur-md border-white/10 hover:border-[#00a651]/50"
                                    }`}
                            >
                                {i === 1 && (
                                    <div className="absolute top-0 inset-x-0 h-1 bg-[#00a651] shadow-[0_0_10px_#00a651]" />
                                )}

                                {/* Image / Header Area */}
                                <div className="h-48 overflow-hidden relative">
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#111827] to-transparent z-10" />
                                    {p.image ? (
                                        <img
                                            src={p.image}
                                            alt={p.name}
                                            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-gradient-to-br from-[#00a651]/20 to-[#0b0f19]" />
                                    )}
                                    <div className="absolute bottom-4 left-6 z-20">
                                        <p className="text-slate-300 text-sm font-medium uppercase tracking-wider mb-1">Evaluation</p>
                                        <h3 className="text-2xl font-bold text-white leading-none">{p.name.replace(" MT5 ACCOUNT", "")}</h3>
                                    </div>
                                </div>

                                <div className="p-6 pt-2">
                                    <div className="flex items-end gap-2 mb-8">
                                        <span className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400">
                                            {p.price}
                                        </span>
                                        <span className="text-slate-500 mb-1.5 font-medium">/ one-time</span>
                                    </div>

                                    <div className="space-y-4 mb-8">
                                        {p.rules?.map((r, j) => (
                                            <div key={j} className="flex items-start gap-3">
                                                <div className="w-5 h-5 rounded-full bg-[#00a651]/10 flex items-center justify-center shrink-0 mt-0.5">
                                                    <svg className="w-3 h-3 text-[#00a651]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                                    </svg>
                                                </div>
                                                <span className="text-slate-300 text-sm">{r.text}</span>
                                            </div>
                                        ))}

                                        {/* Auto-filled generic features if rules list is short */}
                                        {[
                                            "One-time fee",
                                            "No time limits",
                                            "1:100 Leverage"
                                        ].map((feat, idx) => (
                                            <div key={`feat-${idx}`} className="flex items-start gap-3">
                                                <div className="w-5 h-5 rounded-full bg-[#00a651]/10 flex items-center justify-center shrink-0 mt-0.5">
                                                    <svg className="w-3 h-3 text-[#00a651]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                                    </svg>
                                                </div>
                                                <span className="text-slate-400 text-sm">{feat}</span>
                                            </div>
                                        ))}
                                    </div>

                                    <a
                                        href={p.ctaLink || "/shop"}
                                        className={`block w-full text-center py-4 rounded-xl font-bold transition-all active:scale-95 ${i === 1
                                            ? "bg-[#00a651] hover:bg-[#008f45] text-white shadow-[0_4px_20px_-5px_rgba(0,166,81,0.4)]"
                                            : "bg-[#1e293b] hover:bg-[#283548] text-white border border-white/5"
                                            }`}
                                    >
                                        Get Funded
                                    </a>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </section>
            ),
        },
    },
};
