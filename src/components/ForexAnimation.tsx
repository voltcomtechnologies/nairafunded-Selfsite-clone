"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

function TickerItem({ pair, index }: { pair: string; index: number }) {
    const [value, setValue] = useState<string>("-----");

    useEffect(() => {
        setValue((1 + Math.random()).toFixed(5));

        // Optionally update the value periodically to make it look alive
        const interval = setInterval(() => {
            setValue((1 + Math.random() * 0.5).toFixed(5));
        }, 3000 + Math.random() * 2000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="flex items-center gap-3 bg-[#111827] rounded-lg px-4 py-2 border border-[#1e293b]">
            <span className="text-sm font-mono text-white">{pair}</span>
            <motion.span
                className="text-xs font-mono"
                animate={{ color: ["#00a651", "#ef4444", "#00a651"] }}
                transition={{ duration: 3, repeat: Infinity, delay: index * 0.5 }}
            >
                {value}
            </motion.span>
        </div>
    );
}

export default function ForexAnimation({ type = "candlestick" }: { type?: AnimationType }) {
    if (type === "candlestick") {
        const candles = [
            { o: 30, c: 60, h: 70, l: 20, bull: true },
            { o: 55, c: 35, h: 65, l: 25, bull: false },
            { o: 40, c: 70, h: 80, l: 35, bull: true },
            { o: 65, c: 45, h: 75, l: 40, bull: false },
            { o: 50, c: 80, h: 90, l: 45, bull: true },
            { o: 75, c: 55, h: 85, l: 50, bull: false },
            { o: 60, c: 85, h: 95, l: 55, bull: true },
            { o: 80, c: 90, h: 98, l: 75, bull: true },
        ];

        return (
            <div className="flex items-end gap-3 h-40 w-full max-w-md mx-auto px-4">
                {candles.map((c, i) => {
                    const bodyTop = Math.max(c.o, c.c);
                    const bodyBot = Math.min(c.o, c.c);
                    const bodyH = bodyTop - bodyBot;
                    const color = c.bull ? "#00a651" : "#ef4444";
                    return (
                        <motion.div
                            key={i}
                            className="flex-1 flex flex-col items-center"
                            initial={{ opacity: 0, scaleY: 0 }}
                            animate={{ opacity: 1, scaleY: 1 }}
                            transition={{ delay: i * 0.1, duration: 0.4 }}
                            style={{ originY: 1 }}
                        >
                            {/* Top wick */}
                            <div style={{ width: 2, height: `${(c.h - bodyTop) * 1.6}px`, backgroundColor: color }} />
                            {/* Body */}
                            <motion.div
                                style={{
                                    width: "80%",
                                    height: `${Math.max(bodyH * 1.6, 6)}px`,
                                    backgroundColor: color,
                                    borderRadius: 2,
                                }}
                                animate={{ opacity: [0.8, 1, 0.8] }}
                                transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
                            />
                            {/* Bottom wick */}
                            <div style={{ width: 2, height: `${(bodyBot - c.l) * 1.6}px`, backgroundColor: color }} />
                        </motion.div>
                    );
                })}
            </div>
        );
    }

    if (type === "ticker") {
        const pairs = ["EUR/USD", "GBP/JPY", "XAU/USD", "USD/NGN"];
        return (
            <div className="overflow-hidden py-4">
                <motion.div
                    className="flex gap-8 whitespace-nowrap"
                    animate={{ x: [0, -600] }}
                    transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                >
                    {[...pairs, ...pairs, ...pairs].map((pair, i) => (
                        <TickerItem key={i} pair={pair} index={i} />
                    ))}
                </motion.div>
            </div>
        );
    }

    if (type === "pulse") {
        return (
            <div className="relative flex items-center justify-center h-48 w-48 mx-auto">
                {[1, 2, 3].map((ring) => (
                    <motion.div
                        key={ring}
                        className="absolute rounded-full border border-[#00a651]"
                        style={{ width: `${ring * 60}px`, height: `${ring * 60}px` }}
                        animate={{ scale: [1, 1.3, 1], opacity: [0.6, 0.1, 0.6] }}
                        transition={{ duration: 2 + ring * 0.5, repeat: Infinity, delay: ring * 0.3 }}
                    />
                ))}
                <div className="z-10 text-2xl font-bold gradient-text">MT5</div>
            </div>
        );
    }

    // Grid - default
    return (
        <div className="grid grid-cols-4 gap-1 h-32 w-full max-w-xs mx-auto">
            {Array.from({ length: 16 }).map((_, i) => (
                <motion.div
                    key={i}
                    className="rounded-sm"
                    animate={{
                        backgroundColor: ["#1e293b", "#00a651", "#1e293b", "#D4AF37", "#1e293b"],
                    }}
                    transition={{
                        duration: 4,
                        repeat: Infinity,
                        delay: i * 0.2,
                    }}
                />
            ))}
        </div>
    );
}
