"use client";

import { Puck } from "@puckeditor/core";
import "@puckeditor/core/dist/index.css";
import { config } from "@/puck.config";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";

const PAGES = [
    { slug: "home", label: "Home" },
    { slug: "rules", label: "Rules" },
    { slug: "faq", label: "FAQ" },
    { slug: "contact", label: "Contact" },
    { slug: "shop", label: "Shop" },
];

function Editor() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const slug = searchParams.get("page") || "home";
    const [data, setData] = useState<any>(null);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        setData(null);
        fetch(`/api/content?slug=${slug}`)
            .then((res) => res.json())
            .then((d) => setData(d));
    }, [slug]);

    const save = async (newData: any) => {
        setSaving(true);
        await fetch("/api/content", {
            method: "POST",
            body: JSON.stringify({ slug, data: newData }),
            headers: { "Content-Type": "application/json" },
        });
        setSaving(false);
        alert(`✅ "${slug}" page published successfully!`);
    };

    const switchPage = (newSlug: string) => {
        router.push(`/admin38699496?page=${newSlug}`);
    };

    return (
        <div className="h-screen flex flex-col bg-[#0b0f19]">
            {/* Page selector bar */}
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                    padding: "8px 16px",
                    background: "#111827",
                    borderBottom: "1px solid #1e293b",
                    zIndex: 99999,
                    flexShrink: 0,
                }}
            >
                <span style={{ color: "#94a3b8", fontSize: "13px", marginRight: "12px", fontWeight: 600 }}>
                    Edit Page:
                </span>
                {PAGES.map((p) => (
                    <button
                        key={p.slug}
                        onClick={() => switchPage(p.slug)}
                        style={{
                            padding: "6px 16px",
                            borderRadius: "6px",
                            fontSize: "13px",
                            fontWeight: 600,
                            cursor: "pointer",
                            border: "none",
                            transition: "all 0.2s",
                            background: slug === p.slug ? "#00a651" : "transparent",
                            color: slug === p.slug ? "#fff" : "#94a3b8",
                        }}
                    >
                        {p.label}
                    </button>
                ))}
                <a
                    href={slug === "home" ? "/" : `/${slug}`}
                    target="_blank"
                    style={{
                        marginLeft: "auto",
                        padding: "6px 16px",
                        borderRadius: "6px",
                        fontSize: "13px",
                        fontWeight: 600,
                        color: "#D4AF37",
                        textDecoration: "none",
                        border: "1px solid #D4AF37",
                    }}
                >
                    View Live ↗
                </a>
            </div>

            {/* Puck editor */}
            <div className="flex-1 overflow-hidden">
                {!data ? (
                    <div style={{ padding: "40px", textAlign: "center", color: "#94a3b8" }}>
                        Loading editor for <strong>{slug}</strong>...
                    </div>
                ) : (
                    <Puck config={config} data={data} onPublish={save} />
                )}
            </div>
        </div>
    );
}

export default function AdminPage() {
    return (
        <Suspense fallback={<div style={{ padding: "40px", textAlign: "center", color: "#94a3b8" }}>Loading...</div>}>
            <Editor />
        </Suspense>
    );
}
