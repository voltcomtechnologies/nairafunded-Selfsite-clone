import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import { revalidatePath } from "next/cache";

export const dynamic = "force-dynamic";

const DATA_DIR = path.join(process.cwd(), "src/data");

async function ensureDir() {
    try {
        await fs.mkdir(DATA_DIR, { recursive: true });
    } catch (e) { }
}

export async function GET(req: NextRequest) {
    await ensureDir();
    const slug = req.nextUrl.searchParams.get("slug") || "home";
    const filePath = path.join(DATA_DIR, `${slug}.json`);

    try {
        const data = await fs.readFile(filePath, "utf-8");
        return NextResponse.json(JSON.parse(data));
    } catch (e) {
        // Return default data if file doesn't exist
        return NextResponse.json({ content: [], root: { props: { title: slug } } });
    }
}

export async function POST(req: NextRequest) {
    await ensureDir();
    const { slug, data } = await req.json();
    const filePath = path.join(DATA_DIR, `${slug || "home"}.json`);

    await fs.writeFile(filePath, JSON.stringify(data, null, 2));

    // Invalidate the cached page so changes appear immediately
    try {
        const pagePath = slug === "home" ? "/" : `/${slug}`;
        revalidatePath(pagePath);
        revalidatePath("/"); // also revalidate home as a fallback
    } catch (e) {
        // revalidatePath may throw in some contexts, ignore
    }

    return NextResponse.json({ success: true });
}
