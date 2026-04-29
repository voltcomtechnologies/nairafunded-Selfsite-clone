"use client";

import { useState, useEffect } from "react";
import { 
    Users, 
    MousePointer2, 
    Globe, 
    Monitor, 
    ArrowUpRight, 
    ArrowDownRight, 
    BarChart3, 
    MapPin, 
    Clock, 
    Eye,
    ChevronRight,
    Search,
    ExternalLink,
    Smartphone,
    Laptop,
    Tablet
} from "lucide-react";
import Link from "next/link";

import { getAnalyticsData, AnalyticsData } from "@/lib/analytics";

// --- Components ---

const MetricCard = ({ metric }: { metric: any }) => (
    <div className="bg-[#111827] border border-[#1e293b] p-6 rounded-xl hover:border-[#00a651]/50 transition-all group">
        <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-[#00a651]/10 rounded-lg group-hover:bg-[#00a651]/20 transition-colors">
                <metric.icon className="w-5 h-5 text-[#00a651]" />
            </div>
            <div className={`flex items-center gap-1 text-sm font-medium ${metric.trending === 'up' ? 'text-green-400' : 'text-red-400'}`}>
                {metric.trending === 'up' ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                {metric.change}
            </div>
        </div>
        <h3 className="text-gray-400 text-sm font-medium">{metric.label}</h3>
        <p className="text-2xl font-bold text-white mt-1">{metric.value}</p>
    </div>
);

export default function AnalyticsDashboard() {
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState<AnalyticsData | null>(null);

    const fetchData = async () => {
        setIsLoading(true);
        const result = await getAnalyticsData();
        setData(result);
        setIsLoading(false);
    };

    useEffect(() => {
        fetchData();
        // Refresh every 60 seconds
        const interval = setInterval(fetchData, 60000);
        return () => clearInterval(interval);
    }, []);

    if (isLoading && !data) {
        return (
            <div className="min-h-screen bg-[#0b0f19] flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 border-4 border-[#00a651] border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-[#94a3b8] font-medium animate-pulse">Fetching Realtime Insights...</p>
                </div>
            </div>
        );
    }

    const metrics = [
        { label: "Total Views", value: (data?.totalViews || 0).toLocaleString(), change: "+12.5%", trending: "up", icon: Eye },
        { label: "Unique Visitors", value: (data?.uniqueVisitors || 0).toLocaleString(), change: "+5.2%", trending: "up", icon: Users },
        { label: "Bounce Rate", value: data?.bounceRate || "0%", change: "-2.1%", trending: "down", icon: MousePointer2 },
        { label: "Avg. Session", value: data?.avgSessionTime || "0m", change: "+15s", trending: "up", icon: Clock },
    ];

    return (
        <div className="min-h-screen bg-[#0b0f19] text-gray-100 p-4 md:p-8 pt-24 md:pt-28 selection:bg-[#00a651] selection:text-white">
            {/* Header */}
            <div className="max-w-7xl mx-auto mb-10">
                <div className="flex justify-between items-end">
                    <div>
                        <h1 className="text-3xl font-bold text-white mb-2">Web Analytics</h1>
                        <p className="text-gray-400">Real-time performance and visitor behavior insights for NairaFunded.</p>
                    </div>
                    <div className="flex gap-3">
                        <div className="bg-[#111827] border border-[#1e293b] px-4 py-2 rounded-lg flex items-center gap-2">
                            <div className="w-2 h-2 bg-[#00a651] rounded-full animate-pulse"></div>
                            <span className="text-sm font-semibold text-white">{(data?.activeUsers || 0)} Live Visitors</span>
                        </div>
                        <button 
                            onClick={fetchData}
                            className="bg-[#00a651] hover:bg-[#008d44] text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all"
                        >
                            Refresh Data
                        </button>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto space-y-8">
                {/* Metrics Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {metrics.map((m, i) => (
                        <MetricCard key={i} metric={m} />
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Top Pages & Behavior */}
                    <div className="lg:col-span-2 bg-[#111827] border border-[#1e293b] rounded-2xl overflow-hidden">
                        <div className="p-6 border-bottom border-[#1e293b] flex justify-between items-center">
                            <h2 className="text-lg font-bold flex items-center gap-2">
                                <BarChart3 className="w-5 h-5 text-[#D4AF37]" />
                                Top Performing Pages
                            </h2>
                            <button className="text-[#94a3b8] text-sm hover:text-white flex items-center gap-1">
                                View All <ChevronRight className="w-4 h-4" />
                            </button>
                        </div>
                        <div className="p-0">
                            <table className="w-full text-left">
                                <thead className="bg-[#0f172a] text-xs font-bold text-gray-500 uppercase tracking-wider">
                                    <tr>
                                        <th className="px-6 py-3">Page Path</th>
                                        <th className="px-6 py-3">Views</th>
                                        <th className="px-6 py-3">Bounce</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-[#1e293b]">
                                    {(data?.topPages || []).map((row, i) => (
                                        <tr key={i} className="hover:bg-white/5 transition-colors cursor-pointer group">
                                            <td className="px-6 py-4 font-medium text-gray-300 group-hover:text-white">{row.path}</td>
                                            <td className="px-6 py-4 text-gray-400">{(row.views || 0).toLocaleString()}</td>
                                            <td className="px-6 py-4">
                                                <span className={`px-2 py-1 rounded text-xs font-bold ${i % 2 === 0 ? 'bg-green-400/10 text-green-400' : 'bg-yellow-400/10 text-yellow-400'}`}>
                                                    {i % 2 === 0 ? '32%' : '45%'}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Traffic Sources */}
                    <div className="bg-[#111827] border border-[#1e293b] rounded-2xl p-6">
                        <h2 className="text-lg font-bold mb-6 flex items-center gap-2">
                            <Globe className="w-5 h-5 text-[#00a651]" />
                            Acquisition Channels
                        </h2>
                        <div className="space-y-6">
                            {(data?.sources || []).map((s, i) => (
                                <div key={i} className="space-y-2">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-400">{s.name}</span>
                                        <span className="text-white font-bold">{s.value}%</span>
                                    </div>
                                    <div className="h-2 bg-[#1e293b] rounded-full overflow-hidden">
                                        <div 
                                            className="h-full transition-all duration-1000" 
                                            style={{ width: `${s.value}%`, backgroundColor: s.color }}
                                        ></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="mt-8 pt-6 border-t border-[#1e293b]">
                            <p className="text-xs text-gray-500 mb-4 uppercase font-bold tracking-widest">Device Technologies</p>
                            <div className="flex justify-between">
                                {(data?.devices || []).map((d, i) => (
                                    <div key={i} className="flex flex-col items-center gap-1">
                                        {d.name === 'Mobile' && <Smartphone className="w-5 h-5 text-gray-400" />}
                                        {d.name === 'Desktop' && <Laptop className="w-5 h-5 text-gray-400" />}
                                        {d.name === 'Tablet' && <Tablet className="w-5 h-5 text-gray-400" />}
                                        <span className="text-xs font-bold">{d.percentage}%</span>
                                        <span className="text-[10px] text-gray-500">{d.name}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Geographic Distribution */}
                    <div className="bg-[#111827] border border-[#1e293b] rounded-2xl p-6">
                        <h2 className="text-lg font-bold mb-6 flex items-center gap-2">
                            <MapPin className="w-5 h-5 text-red-500" />
                            Visitor Locations
                        </h2>
                        <div className="space-y-4">
                            {(data?.locations || []).map((loc, i) => (
                                <div key={i} className="flex items-center gap-4">
                                    <span className="text-2xl">{loc.code}</span>
                                    <div className="flex-1">
                                        <div className="flex justify-between text-sm mb-1">
                                            <span className="font-medium">{loc.country}</span>
                                            <span className="text-gray-400">{(loc.views || 0).toLocaleString()} views</span>
                                        </div>
                                        <div className="h-1.5 bg-[#1e293b] rounded-full overflow-hidden">
                                            <div 
                                                className="h-full bg-[#00a651]" 
                                                style={{ width: `${loc.percentage}%` }}
                                            ></div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Advanced Features Promo */}
                    <div className="bg-gradient-to-br from-[#111827] to-[#00a651]/5 border border-[#00a651]/20 rounded-2xl p-8 flex flex-col justify-center">
                        <div className="bg-[#00a651]/10 w-fit p-3 rounded-2xl mb-6">
                            <BarChart3 className="w-8 h-8 text-[#00a651]" />
                        </div>
                        <h2 className="text-2xl font-bold text-white mb-4">PostHog Advanced Insights</h2>
                        <p className="text-gray-400 mb-6 leading-relaxed">
                            Unlock deep behavioral analysis including session replays, conversion funnels, and click heatmaps. See exactly how traders interact with your evaluation rules.
                        </p>
                        <div className="grid grid-cols-2 gap-4">
                            <a 
                                href="https://app.posthog.com" 
                                target="_blank"
                                className="flex items-center justify-center gap-2 bg-[#1e293b] hover:bg-[#334155] text-white py-3 rounded-xl font-bold transition-all text-sm"
                            >
                                Session Replays <ExternalLink className="w-4 h-4" />
                            </a>
                            <a 
                                href="https://app.posthog.com" 
                                target="_blank"
                                className="flex items-center justify-center gap-2 bg-[#1e293b] hover:bg-[#334155] text-white py-3 rounded-xl font-bold transition-all text-sm"
                            >
                                Heatmaps <ExternalLink className="w-4 h-4" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
