import type { Metadata } from "next";
import PuckRenderer from "@/components/PuckRenderer";
import { getPageData } from "@/lib/getPageData";

export const metadata: Metadata = {
  title: "NairaFunded — Trading evaluations built for disciplined traders",
  description:
    "Nigeria's #1 prop trading firm. Access funded MT5 accounts up to ₦1.5M with 90% profit split and 24hr payouts. Start your evaluation today.",
  keywords: [
    "prop trading Nigeria",
    "funded trader Nigeria",
    "forex evaluation account",
    "NairaFunded",
    "MT5 funded account",
    "prop firm Nigeria",
  ],
};

export default async function Home() {
  const data = await getPageData("home");

  return (
    <main>
      <PuckRenderer data={data} />
    </main>
  );
}
