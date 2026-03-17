import type { Metadata } from "next";
import PuckRenderer from "@/components/PuckRenderer";
import { getPageData } from "@/lib/getPageData";

const META_MAP: Record<string, { title: string; description: string }> = {
    shop: {
        title: "Buy Account — NairaFunded",
        description:
            "Choose your evaluation account size. MT5 funded accounts from ₦8,900 with 24hr payouts and up to 90% profit split.",
    },
    rules: {
        title: "Trading Rules — NairaFunded",
        description:
            "Official trading rules and risk disclosure for NairaFunded evaluation accounts. Clear drawdown limits, payout policies, and more.",
    },
    faq: {
        title: "FAQ — NairaFunded",
        description:
            "Frequently asked questions about NairaFunded prop trading evaluations, payouts, bots, and trading rules.",
    },
    contact: {
        title: "Contact Us — NairaFunded",
        description:
            "Get in touch with NairaFunded support. We're here to help serious traders succeed.",
    },
};

export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>;
}): Promise<Metadata> {
    const { slug } = await params;
    const meta = META_MAP[slug];

    if (meta) {
        return {
            title: meta.title,
            description: meta.description,
        };
    }

    return {
        title: `${slug.charAt(0).toUpperCase() + slug.slice(1)} — NairaFunded`,
    };
}

export function generateStaticParams() {
    return [
        { slug: "shop" },
        { slug: "rules" },
        { slug: "faq" },
        { slug: "contact" },
    ];
}

export default async function DynamicPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const data = await getPageData(slug);

    return (
        <main>
            <PuckRenderer data={data} />
        </main>
    );
}
