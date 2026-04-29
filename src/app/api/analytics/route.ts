import { NextResponse } from "next/server";

export async function GET() {
    const umamiKey = process.env.UMAMI_API_KEY;
    const websiteId = process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID;

    // If no keys, return mock data
    if (!umamiKey || !websiteId) {
        return NextResponse.json(MOCK_DATA);
    }

    try {
        const headers = { "x-umami-api-key": umamiKey };
        const baseUrl = "https://api.umami.is/v1";

        // 1. Fetch Umami Stats (Realtime & Overview)
        const now = Date.now();
        const start = now - 24 * 60 * 60 * 1000; // Last 24 hours
        
        const [umamiStats, activeUsers, topPages, geoData, deviceData, sourceData] = await Promise.all([
            fetch(`${baseUrl}/websites/${websiteId}/stats?startAt=${start}&endAt=${now}`, { headers }).then(r => r.json()),
            fetch(`${baseUrl}/websites/${websiteId}/active`, { headers }).then(r => r.json()),
            fetch(`${baseUrl}/websites/${websiteId}/metrics?type=url&startAt=${start}&endAt=${now}`, { headers }).then(r => r.json()),
            fetch(`${baseUrl}/websites/${websiteId}/metrics?type=country&startAt=${start}&endAt=${now}`, { headers }).then(r => r.json()),
            fetch(`${baseUrl}/websites/${websiteId}/metrics?type=device&startAt=${start}&endAt=${now}`, { headers }).then(r => r.json()),
            fetch(`${baseUrl}/websites/${websiteId}/metrics?type=referrer&startAt=${start}&endAt=${now}`, { headers }).then(r => r.json())
        ]);

        // Transform data for our dashboard with safe fallbacks
        const getVal = (obj: any) => typeof obj === 'object' ? (obj?.value ?? 0) : (obj ?? 0);

        const totalViews = getVal(umamiStats.pageviews);
        const visitors = getVal(umamiStats.visitors);

        // Color mapping for common sources
        const getSourceColor = (name: string) => {
            const n = name.toLowerCase();
            if (n.includes('direct')) return "#00a651";
            if (n.includes('google')) return "#D4AF37";
            if (n.includes('facebook') || n.includes('t.co') || n.includes('twitter')) return "#3b82f6";
            return "#94a3b8";
        };

        return NextResponse.json({
            activeUsers: getVal(activeUsers[0]?.x ?? activeUsers?.x ?? activeUsers),
            totalViews: totalViews,
            uniqueVisitors: visitors,
            bounceRate: visitors > 0 
                ? `${Math.round(getVal(umamiStats.bounces) / visitors * 100)}%`
                : "0%",
            avgSessionTime: visitors > 0
                ? `${Math.floor(getVal(umamiStats.totaltime) / visitors / 60)}m`
                : "0m",
            topPages: (topPages || []).slice(0, 5).map((p: any) => ({ path: p.x, views: p.y || 0 })),
            sources: (sourceData || []).slice(0, 4).map((s: any) => ({
                name: s.x === "" ? "Direct" : s.x,
                value: totalViews > 0 ? Math.round((s.y / totalViews) * 100) : 0,
                color: getSourceColor(s.x)
            })),
            locations: (geoData || []).slice(0, 5).map((g: any) => ({ 
                country: g.x, 
                code: g.x ? g.x.substring(0, 2).toUpperCase() : "🌍", 
                views: g.y || 0, 
                percentage: totalViews > 0 ? Math.round((g.y / totalViews) * 100) : 0
            })),
            devices: (deviceData || []).map((d: any) => ({
                name: d.x ? d.x.charAt(0).toUpperCase() + d.x.slice(1) : "Unknown",
                percentage: totalViews > 0 ? Math.round((d.y / totalViews) * 100) : 0
            }))
        });
    } catch (error) {
        console.error("Analytics API Error:", error);
        return NextResponse.json(MOCK_DATA); // Fallback to mock on error
    }
}

const MOCK_DATA = {
    activeUsers: 24,
    totalViews: 12450,
    uniqueVisitors: 3820,
    bounceRate: "42.3%",
    avgSessionTime: "4m 12s",
    topPages: [
        { path: "/", views: 5240 },
        { path: "/rules", views: 3120 },
        { path: "/shop", views: 2840 },
        { path: "/faq", views: 1240 }
    ],
    sources: [
        { name: "Direct", value: 45, color: "#00a651" },
        { name: "Google", value: 30, color: "#D4AF37" },
        { name: "Social", value: 15, color: "#3b82f6" },
        { name: "Referral", value: 10, color: "#94a3b8" }
    ],
    locations: [
        { country: "Nigeria", code: "NG", views: 5240, percentage: 65 },
        { country: "United States", code: "US", views: 1210, percentage: 15 },
        { country: "United Kingdom", code: "GB", views: 820, percentage: 10 },
        { country: "Ghana", code: "GH", views: 410, percentage: 5 },
        { country: "Others", code: "🌍", views: 320, percentage: 5 }
    ],
    devices: [
        { name: "Mobile", percentage: 72 },
        { name: "Desktop", percentage: 25 },
        { name: "Tablet", percentage: 3 }
    ]
};
