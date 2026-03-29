"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, Send, X, MessageCircle } from "lucide-react";

const LiveChatWidget = () => {
    const [isOpen, setIsOpen] = useState(false);

    const contactLinks = [
        {
            name: "WhatsApp",
            icon: <MessageCircle className="w-5.5 h-5.5" />,
            url: "https://wa.me/2348166878921",
            color: "bg-[#25D366]",
            hoverColor: "hover:bg-[#20ba59]",
            textColor: "text-white",
            description: "Chat with us on WhatsApp"
        },
        {
            name: "Telegram",
            icon: <Send className="w-5.5 h-5.5" />,
            url: "https://t.me/naira_funded",
            color: "bg-[#0088cc]",
            hoverColor: "hover:bg-[#0077b5]",
            textColor: "text-white",
            description: "Join our Telegram support"
        }
    ];

    return (
        <div className="fixed bottom-6 right-6 z-[9999] flex flex-col items-end gap-4">
            {/* Animated Chat Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="flex flex-col gap-3 mb-2"
                    >
                        {contactLinks.map((link, index) => (
                            <motion.a
                                key={link.name}
                                href={link.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className={`group flex items-center gap-3 px-4 py-3 rounded-2xl shadow-xl transition-all duration-300 ${link.color} ${link.hoverColor} backdrop-blur-md border border-white/10`}
                            >
                                <span className={`flex items-center justify-center ${link.textColor}`}>
                                    {link.icon}
                                </span>
                                <div className="flex flex-col">
                                    <span className={`text-sm font-bold ${link.textColor}`}>
                                        {link.name}
                                    </span>
                                    <span className="text-[10px] text-white/80 font-medium">
                                        {link.description}
                                    </span>
                                </div>
                            </motion.a>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Main Toggle Button */}
            <div className="flex items-center gap-3">
                <AnimatePresence>
                    {!isOpen && (
                        <motion.div
                            initial={{ opacity: 0, x: 20, scale: 0.8 }}
                            animate={{ opacity: 1, x: 0, scale: 1 }}
                            exit={{ opacity: 0, x: 20, scale: 0.8 }}
                            transition={{ 
                                delay: 0.5,
                                type: "spring",
                                stiffness: 260,
                                damping: 20 
                            }}
                            className="bg-white/10 backdrop-blur-xl border border-white/20 px-4 py-2 rounded-full shadow-2xl overflow-hidden group"
                        >
                            <motion.span 
                                animate={{ 
                                    opacity: [0.7, 1, 0.7],
                                }}
                                transition={{ 
                                    duration: 3, 
                                    repeat: Infinity, 
                                    ease: "easeInOut" 
                                }}
                                className="text-white text-sm font-semibold whitespace-nowrap flex items-center gap-2"
                            >
                                <span className="relative flex h-2.5 w-2.5">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500 border border-white/80 shadow-sm"></span>
                                </span>
                                Chat with Us
                            </motion.span>
                        </motion.div>
                    )}
                </AnimatePresence>

                <motion.button
                    onClick={() => setIsOpen(!isOpen)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`relative w-16 h-16 rounded-full flex items-center justify-center shadow-2xl transition-all duration-500 overflow-hidden ${
                        isOpen 
                            ? "bg-slate-800 rotate-90" 
                            : "bg-gradient-to-br from-amber-400 via-emerald-500 to-emerald-700 border border-white/20"
                    }`}
                >
                    {/* Shimmer Effect */}
                    {!isOpen && (
                        <motion.div
                            animate={{
                                x: ["-100%", "200%"],
                            }}
                            transition={{
                                duration: 3,
                                repeat: Infinity,
                                ease: "linear",
                                repeatDelay: 1,
                            }}
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12"
                        />
                    )}

                    {/* Background Pulse Effect - Emerald/Gold */}
                    {!isOpen && (
                        <motion.div
                            animate={{
                                scale: [1, 1.25, 1],
                                opacity: [0.4, 0, 0.4],
                            }}
                            transition={{
                                duration: 2.5,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
                            className="absolute inset-0 bg-emerald-400 rounded-full"
                        />
                    )}

                    <AnimatePresence mode="wait">
                        {isOpen ? (
                            <motion.div
                                key="close"
                                initial={{ opacity: 0, rotate: -90 }}
                                animate={{ opacity: 1, rotate: 0 }}
                                exit={{ opacity: 0, rotate: 90 }}
                            >
                                <X className="w-8 h-8 text-white" />
                            </motion.div>
                        ) : (
                            <motion.div
                                key="chat"
                                initial={{ opacity: 0, scale: 0.5 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.5 }}
                                className="relative z-10"
                            >
                                <MessageSquare className="w-8 h-8 text-white fill-white/10" />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.button>
            </div>
        </div>
    );
};

export default LiveChatWidget;
