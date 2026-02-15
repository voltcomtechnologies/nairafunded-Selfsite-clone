"use client";

import { useParams } from "next/navigation";
import ClientRender from "@/components/ClientRender";

export default function DynamicPage() {
    const params = useParams();
    const slug = params.slug as string;

    return (
        <main>
            <ClientRender slug={slug} />
        </main>
    );
}
