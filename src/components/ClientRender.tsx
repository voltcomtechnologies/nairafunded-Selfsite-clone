"use client";

import { useState, useEffect } from "react";
import { Render } from "@puckeditor/core";
import { config } from "@/puck.config";

export default function ClientRender({ slug }: { slug: string }) {
    const [data, setData] = useState<any>(null);

    useEffect(() => {
        fetch(`/api/content?slug=${slug}&t=${Date.now()}`)
            .then((res) => res.json())
            .then((d) => setData(d));
    }, [slug]);

    if (!data) {
        return (
            <div style={{ minHeight: "60vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <div style={{ color: "#94a3b8", fontSize: "18px" }}>Loading...</div>
            </div>
        );
    }

    return <Render config={config} data={data} />;
}
