"use client";

import { useEffect, useState, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ──────────────────────────────────────────────────────────
   Exness MT5 Terminal — Sequential Candle Loading Simulation
   ────────────────────────────────────────────────────────── */

type Phase = "LOADING" | "ENTRY_LINES" | "TRADING" | "WIN" | "COOLDOWN";

// History candles (before entry)
const PRE_ENTRY_CANDLES = [
    { o: 38, h: 46, l: 34, c: 42 },
    { o: 42, h: 48, l: 38, c: 40 },
    { o: 40, h: 44, l: 36, c: 37 },
    { o: 37, h: 43, l: 35, c: 41 },
];

// The "Entry" candle (where the trade is placed)
const ENTRY_CANDLE = { o: 41, h: 46, l: 39, c: 44 };

// Progressive candles from Entry to TP
const TRADING_PATH = [
    { o: 44, h: 52, l: 42, c: 48 },
    { o: 48, h: 56, l: 45, c: 54 },
    { o: 54, h: 62, l: 50, c: 58 },
    { o: 58, h: 68, l: 55, c: 65 },
    { o: 65, h: 74, l: 62, c: 72 },
    { o: 72, h: 80, l: 70, c: 78 }, // Hits TP level
];

// All candles in sequence
const ALL_CANDLES = [...PRE_ENTRY_CANDLES, ENTRY_CANDLE, ...TRADING_PATH];

const ENTRY_LEVEL = 44;
const SL_LEVEL = 34;
const TP_LEVEL = 78;

const CHART_W = 360;
const CHART_H = 140;
const PADDING_TOP = 12;
const PADDING_BOT = 14;
const CHART_RIGHT_PAD = 40;
const CANDLE_WIDTH = 8;

const MIN_P = 30;
const MAX_P = 85;

function priceToY(val: number): number {
    const usable = CHART_H - PADDING_TOP - PADDING_BOT;
    return PADDING_TOP + usable - ((val - MIN_P) / (MAX_P - MIN_P)) * usable;
}

function indexToX(i: number): number {
    const total = ALL_CANDLES.length;
    const gap = (CHART_W - CHART_RIGHT_PAD) / (total + 1);
    return gap * (i + 1);
}

export default function LiveTradingSimulation() {
    const [phase, setPhase] = useState<Phase>("LOADING");
    const [visibleCount, setVisibleCount] = useState(0);
    const [liveCandle, setLiveCandle] = useState<{ o: number, h: number, l: number, c: number } | null>(null);
    const [activeTab, setActiveTab] = useState<"Trade" | "History">("Trade");
    const [headerTick, setHeaderTick] = useState(1.08640);
    const [accountData, setAccountData] = useState({ balance: 10430, equity: 10430, margin: 10105 });

    const timerRef = useRef<NodeJS.Timeout>(null);

    // Initial Load sequence
    useEffect(() => {
        if (phase === "LOADING") {
            const id = setInterval(() => {
                setVisibleCount(prev => {
                    const next = prev + 1;
                    if (next >= PRE_ENTRY_CANDLES.length + 1) { // Stop at Entry candle
                        clearInterval(id);
                        setPhase("ENTRY_LINES");
                        return next;
                    }
                    return next;
                });
            }, 250);
            return () => clearInterval(id);
        }
    }, [phase]);

    // Entry lines effect
    useEffect(() => {
        if (phase === "ENTRY_LINES") {
            const t = setTimeout(() => {
                setPhase("TRADING");
            }, 1000);
            return () => clearTimeout(t);
        }
    }, [phase]);

    // Trading sequence (One by one candles to TP)
    useEffect(() => {
        if (phase === "TRADING") {
            // Index of first trading path candle starts after history + entry
            let currentPathIdx = 0;

            const id = setInterval(() => {
                if (currentPathIdx < TRADING_PATH.length) {
                    setVisibleCount(prev => prev + 1);
                    currentPathIdx++;
                } else {
                    clearInterval(id);
                    setPhase("WIN");
                }
            }, 800); // Slower reveal for the "active" trade

            return () => clearInterval(id);
        }
    }, [phase]);

    // Win and Reset logic
    useEffect(() => {
        if (phase === "WIN") {
            setAccountData(prev => ({ ...prev, balance: 10760, equity: 10760 }));
            const t = setTimeout(() => {
                setPhase("COOLDOWN");
            }, 3000);
            return () => clearTimeout(t);
        }
        if (phase === "COOLDOWN") {
            const t = setTimeout(() => {
                setVisibleCount(0);
                setPhase("LOADING");
                setActiveTab("Trade");
                setAccountData({ balance: 10430, equity: 10430, margin: 10105 });
            }, 1000);
            return () => clearTimeout(t);
        }
    }, [phase]);

    // Header tick logic
    useEffect(() => {
        const id = setInterval(() => {
            setHeaderTick(p => +(p + (Math.random() - 0.48) * 0.0002).toFixed(5));
        }, 1500);
        return () => clearInterval(id);
    }, []);

    const entryY = useMemo(() => priceToY(ENTRY_LEVEL), []);
    const tpY = useMemo(() => priceToY(TP_LEVEL), []);
    const slY = useMemo(() => priceToY(SL_LEVEL), []);

    // Current price is the close of the last visible candle
    const currentPriceVal = ALL_CANDLES[visibleCount - 1]?.c || 40;
    const isTradeActive = visibleCount > PRE_ENTRY_CANDLES.length;

    return (
        <div className="rounded-2xl border border-[#1e293b] bg-[#0c1220]/95 backdrop-blur-xl overflow-hidden shadow-[0_20px_50px_-12px_rgba(0,0,0,0.8)] select-none font-sans flex flex-col w-full h-[460px] md:h-[500px]">


            {/* Header / Toolbar */}
            <div className="flex items-center justify-between px-3 h-10 md:h-12 border-b border-[#1e293b] bg-[#111827] shrink-0">

                <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2">
                        <div className="w-5 h-5 rounded overflow-hidden bg-[#FFD700] flex items-center justify-center shrink-0">
                            <span className="text-[10px] font-black text-black leading-none">e</span>
                        </div>
                        <span className="text-[10px] md:text-xs font-bold text-slate-200 tracking-tight">exness</span>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <span className="text-[10px] md:text-xs font-mono text-[#00a651] font-bold">
                        {headerTick.toFixed(5)}
                    </span>
                    <div className="w-1.5 h-1.5 rounded-full bg-[#00a651] shadow-[0_0_5px_#00a651] ml-2" />
                </div>
            </div>

            {/* Sub-header */}
            <div className="flex items-center gap-3 px-4 h-8 bg-[#0f172a]/50 text-slate-300 border-b border-[#1e293b]/50 shrink-0">

                <span className="text-xs font-bold font-mono">EURUSD, M15</span>
                <div className="flex gap-1">
                    {["M1", "M5", "M15", "H1", "D1"].map(tf => (
                        <span key={tf} className={`text-[9px] px-1 rounded ${tf === "M15" ? "bg-[#334155] text-white" : "text-slate-600"}`}>{tf}</span>
                    ))}
                </div>
            </div>

            {/* Chart Area */}
            <div className="relative pt-4 pb-2 flex-grow overflow-hidden min-h-[160px]">

                {/* Price Axis */}
                <div className="absolute right-0 top-0 bottom-0 w-[40px] bg-[#111827]/20 border-l border-[#1e293b] flex flex-col justify-between py-2 z-10 pointer-events-none">
                    {[1.08850, 1.08750, 1.08650, 1.08550, 1.08450, 1.08350].map(p => (
                        <span key={p} className="text-[8px] text-slate-600 font-mono pr-1 text-right">{p.toFixed(5)}</span>
                    ))}
                </div>

                <svg viewBox={`0 0 ${CHART_W} ${CHART_H}`} className="w-full h-auto" preserveAspectRatio="xMidYMid meet">
                    {/* Grid */}
                    {[0.2, 0.4, 0.6, 0.8].map((frac) => {
                        const y = PADDING_TOP + (CHART_H - PADDING_TOP - PADDING_BOT) * frac;
                        return <line key={frac} x1={0} y1={y} x2={CHART_W - CHART_RIGHT_PAD} y2={y} stroke="#1e293b" strokeWidth={0.5} />;
                    })}

                    {/* Trade Lines appearing after Entry candle */}
                    <AnimatePresence>
                        {isTradeActive && phase !== "COOLDOWN" && (
                            <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                                <line x1={0} y1={slY} x2={CHART_W - CHART_RIGHT_PAD} y2={slY} stroke="#ef4444" strokeWidth={0.8} strokeDasharray="4,3" opacity={0.6} />
                                <text x={4} y={slY - 2} fontSize={7} fill="#ef4444" fontFamily="monospace" fontWeight="bold">sl: 1.08250</text>

                                <line x1={0} y1={entryY} x2={CHART_W - CHART_RIGHT_PAD} y2={entryY} stroke="#3b82f6" strokeWidth={0.8} strokeDasharray="4,3" opacity={0.6} />
                                <text x={4} y={entryY - 2} fontSize={7} fill="#3b82f6" fontFamily="monospace" fontWeight="bold">buy 1.00</text>

                                <line x1={0} y1={tpY} x2={CHART_W - CHART_RIGHT_PAD} y2={tpY} stroke="#00a651" strokeWidth={0.8} strokeDasharray="4,3" opacity={0.6} />
                                <text x={4} y={tpY - 2} fontSize={7} fill="#00a651" fontFamily="monospace" fontWeight="bold">tp: 1.08780</text>
                            </motion.g>
                        )}
                    </AnimatePresence>

                    {/* Candles Reveal */}
                    <g>
                        {ALL_CANDLES.slice(0, visibleCount).map((c, i) => {
                            const x = indexToX(i);
                            const isBull = c.c >= c.o;
                            const bodyTop = priceToY(Math.max(c.o, c.c));
                            const bodyH = Math.max(priceToY(Math.min(c.o, c.c)) - bodyTop, 1.5);
                            const color = isBull ? "#00c060" : "#ff4d4d";
                            return (
                                <motion.g key={i} initial={{ opacity: 0, scaleY: 0 }} animate={{ opacity: 1, scaleY: 1 }} transition={{ duration: 0.2 }} style={{ transformOrigin: `${x}px ${bodyTop + bodyH}px` }}>
                                    <line x1={x} y1={priceToY(c.h)} x2={x} y2={priceToY(c.l)} stroke={color} strokeWidth={1} />
                                    <rect x={x - CANDLE_WIDTH / 2} y={bodyTop} width={CANDLE_WIDTH} height={bodyH} fill={color} />
                                    {(i === visibleCount - 1) && (
                                        <g>
                                            <rect x={CHART_W - CHART_RIGHT_PAD} y={priceToY(c.c) - 6} width={CHART_RIGHT_PAD} height={12} fill={color} />
                                            <text x={CHART_W - CHART_RIGHT_PAD + 2} y={priceToY(c.c) + 2.5} fontSize={8} fill="white" fontFamily="monospace" fontWeight="bold">
                                                {(1.08640 + (c.c - 70) * 0.00001).toFixed(5)}
                                            </text>
                                        </g>
                                    )}
                                </motion.g>
                            );
                        })}
                    </g>
                </svg>

                {/* TP Victory Toast */}
                <AnimatePresence>
                    {phase === "WIN" && (
                        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} className="absolute right-12 top-4 bg-[#00a651] border border-white/20 text-white px-4 py-2 rounded shadow-2xl z-20">
                            <div className="flex flex-col">
                                <span className="text-[10px] font-bold uppercase tracking-widest opacity-80">Notification</span>
                                <span className="text-xs font-black">TAKE PROFIT HIT</span>
                                <span className="text-[10px] opacity-90 font-mono">Profit: +$330.00</span>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Terminal Window */}
            <div className="flex flex-col border-t border-[#1e293b] bg-[#0c1220] shrink-0">
                <div className="flex items-center text-[10px] text-slate-500 border-b border-[#1e293b]/50 h-8">

                    {["Trade", "History", "News", "Journal"].map(tab => (
                        <button key={tab} onClick={() => (tab === "Trade" || tab === "History") && setActiveTab(tab as any)} className={`px-4 py-1 border-r border-[#1e293b]/50 transition-colors ${activeTab === tab ? "bg-[#111827] text-white" : "hover:text-slate-300"}`}>
                            {tab}
                        </button>
                    ))}
                </div>

                <div className="h-28 md:h-32 overflow-hidden relative">
                    <table className="w-full text-left text-[9px] md:text-[10px] border-collapse table-fixed">
                        <colgroup>
                            <col className="w-[20%]" />
                            <col className="w-[15%]" />
                            <col className="w-[10%]" />
                            <col className="w-[15%]" />
                            <col className="w-[20%]" />
                            <col className="w-[20%]" />
                        </colgroup>

                        <thead className="text-slate-600 bg-[#111827]/30">
                            <tr>
                                <th className="px-3 py-1 font-normal truncate">Order</th>
                                <th className="px-3 py-1 font-normal truncate">Symbol</th>
                                <th className="px-3 py-1 font-normal truncate">Type</th>
                                <th className="px-3 py-1 font-normal truncate">Volume</th>
                                <th className="px-3 py-1 font-normal truncate">Price</th>
                                <th className="px-3 py-1 font-normal text-right truncate">Profit</th>

                            </tr>
                        </thead>
                        <tbody className="text-slate-300 font-mono">
                            {activeTab === "Trade" && isTradeActive && phase !== "WIN" && phase !== "COOLDOWN" && (
                                <tr className="hover:bg-blue-500/10 h-6">
                                    <td className="px-3 py-1 opacity-70 truncate">82345671</td>
                                    <td className="px-3 py-1 truncate">EURUSD</td>
                                    <td className="px-3 py-1 text-blue-400 truncate">buy</td>
                                    <td className="px-3 py-1 truncate">1.00</td>
                                    <td className="px-3 py-1 truncate">1.08450</td>
                                    <td className="px-3 py-1 text-right font-bold text-blue-400 tabular-nums">
                                        {((currentPriceVal - ENTRY_LEVEL) * 10).toFixed(2)}
                                    </td>
                                </tr>

                            )}
                            {activeTab === "History" && (phase === "WIN" || phase === "COOLDOWN") && (
                                <tr className="bg-[#00a651]/5 h-6">
                                    <td className="px-3 py-1 opacity-70 truncate">82345671</td>
                                    <td className="px-3 py-1 truncate">EURUSD</td>
                                    <td className="px-3 py-1 text-blue-400 truncate">buy</td>
                                    <td className="px-3 py-1 truncate">1.00</td>
                                    <td className="px-3 py-1 truncate">1.08450</td>
                                    <td className="px-3 py-1 text-right font-bold text-[#00a651] tabular-nums">330.00</td>
                                </tr>
                            )}

                        </tbody>
                    </table>

                    {/* Empty States */}
                    {((activeTab === "History" && phase !== "WIN" && phase !== "COOLDOWN") || (activeTab === "Trade" && (!isTradeActive || phase === "WIN" || phase === "COOLDOWN"))) && (
                        <div className="absolute inset-0 flex items-center justify-center text-slate-700 text-[10px] italic">
                            No trades to show
                        </div>
                    )}
                </div>

                {/* Account Summary */}
                <div className="px-4 h-8 bg-[#111827] border-t border-[#1e293b]/50 flex items-center gap-6 text-[9px] md:text-[10px] font-mono shrink-0">
                    <div className="flex gap-2 min-w-[85px]"><span className="text-slate-600 shrink-0">Balance:</span><span className="text-slate-300 font-bold tabular-nums">{accountData.balance.toLocaleString()}</span></div>
                    <div className="flex gap-2 min-w-[105px]"><span className="text-slate-600 shrink-0">Equity:</span><span className="text-slate-300 font-bold tabular-nums">{(accountData.equity + (isTradeActive && phase !== "WIN" ? (currentPriceVal - ENTRY_LEVEL) * 10 : 0)).toLocaleString()}</span></div>
                </div>

            </div>

            {/* Status Bar */}
            <div className="px-3 h-8 border-t border-[#1e293b] bg-[#0c1220] flex items-center justify-between shrink-0">

                <div className="flex items-center gap-2">
                    <span className="text-[9px] text-slate-700 uppercase">Live Simulation</span>
                    <span className="text-[8px] text-slate-800">| Stockholm-H5</span>
                </div>
                <div className="flex items-center gap-1.5 leading-none">
                    <span className="text-[7px] text-slate-700">1.4/0.8 kb</span>
                    <div className="w-10 h-1 bg-[#1e293b] rounded-full overflow-hidden">
                        <motion.div animate={{ width: ["10%", "90%", "30%", "70%"] }} transition={{ duration: 5, repeat: Infinity }} className="h-full bg-[#00a651]" />
                    </div>
                </div>
            </div>
        </div>
    );
}
