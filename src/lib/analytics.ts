export interface AnalyticsData {
    activeUsers: number;
    totalViews: number;
    uniqueVisitors: number;
    bounceRate: string;
    avgSessionTime: string;
    topPages: Array<{ path: string; views: number }>;
    sources: Array<{ name: string; value: number; color: string }>;
    locations: Array<{ country: string; code: string; views: number; percentage: number }>;
    devices: Array<{ name: string; percentage: number }>;
}

export async function getAnalyticsData(): Promise<AnalyticsData> {
    // This is a server-side fetcher or a client-side fetcher that calls our internal API
    // To keep it simple and secure, we'll call our own API route
    try {
        const response = await fetch("/api/analytics");
        if (!response.ok) throw new Error("Failed to fetch analytics");
        return await response.json();
    } catch (error) {
        console.error("Analytics fetch error:", error);
        // Return mock data if API fails or is not configured
        return getMockData();
    }
}

function getMockData(): AnalyticsData {
    return {
        activeUsers: 18,
        totalViews: 10240,
        uniqueVisitors: 4120,
        bounceRate: "38.5%",
        avgSessionTime: "4m 45s",
        topPages: [
            { path: "/", views: 4200 },
            { path: "/rules", views: 2800 },
            { path: "/shop", views: 2100 },
            { path: "/faq", views: 1140 }
        ],
        sources: [
            { name: "Direct", value: 50, color: "#00a651" },
            { name: "Google", value: 25, color: "#D4AF37" },
            { name: "Social", value: 15, color: "#3b82f6" },
            { name: "Referral", value: 10, color: "#94a3b8" }
        ],
        locations: [
            { country: "Nigeria", code: "NG", views: 6500, percentage: 65 },
            { country: "United States", code: "US", views: 1500, percentage: 15 },
            { country: "United Kingdom", code: "GB", views: 1000, percentage: 10 },
            { country: "Ghana", code: "GH", views: 500, percentage: 5 },
            { country: "Others", code: "🌍", views: 740, percentage: 5 }
        ],
        devices: [
            { name: "Mobile", percentage: 68 },
            { name: "Desktop", percentage: 28 },
            { name: "Tablet", percentage: 4 }
        ]
    };
}
