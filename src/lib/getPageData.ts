import fs from "fs/promises";
import path from "path";

const DATA_DIR = path.join(process.cwd(), "src/data");

export async function getPageData(slug: string) {
    const filePath = path.join(DATA_DIR, `${slug}.json`);

    try {
        const raw = await fs.readFile(filePath, "utf-8");
        return JSON.parse(raw);
    } catch {
        return { content: [], root: { props: { title: slug } } };
    }
}
