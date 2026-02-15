import Link from "next/link";
import Image from "next/image";

export default function Footer() {
    return (
        <footer className="bg-[#060a13] border-t border-[#1e293b] mt-20">
            <div className="max-w-7xl mx-auto px-6 py-16">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    {/* Brand */}
                    <div>
                        <Image
                            src="/logo.png"
                            alt="NairaFunded"
                            width={160}
                            height={36}
                            className="h-8 w-auto object-contain mb-4"
                        />
                        <p className="text-sm text-slate-400 leading-relaxed">
                            NairaFunded was created to rebalance the relationship between
                            capital and talent. At the heart of the brand is precision-backed
                            opportunity.
                        </p>
                    </div>

                    {/* Support */}
                    <div>
                        <h4 className="text-white font-semibold mb-4">Support</h4>
                        <ul className="space-y-2 text-sm text-slate-400">
                            <li>
                                <a href="mailto:support@nairafunded.com" className="hover:text-white transition-colors">
                                    support@nairafunded.com
                                </a>
                            </li>
                            <li>Mon–Fri, 24h response</li>
                        </ul>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-white font-semibold mb-4">Quick Links</h4>
                        <ul className="space-y-2 text-sm text-slate-400">
                            <li><Link href="/shop" className="hover:text-white transition-colors">Buy Account</Link></li>
                            <li><Link href="/rules" className="hover:text-white transition-colors">Rules</Link></li>
                            <li><Link href="/faq" className="hover:text-white transition-colors">FAQ</Link></li>
                            <li><Link href="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
                        </ul>
                    </div>
                </div>

                {/* Risk Notice */}
                <div className="mt-12 pt-8 border-t border-[#1e293b]">
                    <p className="text-xs text-yellow-500/80 font-semibold mb-2">
                        Risk notice: MARKET NO BE YOUR MATE!
                    </p>
                    <p className="text-xs text-slate-500 leading-relaxed max-w-3xl">
                        Trading no be Ponzi. Risk high. Loss dey real. If you no manage
                        risk, market go serve you breakfast. The fee paid is for an
                        Evaluation Service and access to a simulated trading environment. It
                        is not an investment deposit. All fees are non-refundable once the
                        service has commenced.
                    </p>
                </div>
            </div>
        </footer>
    );
}
