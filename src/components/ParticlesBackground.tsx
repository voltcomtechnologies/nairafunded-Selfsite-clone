"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function ParticlesBackground() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    // Generate random particles
    const particles = Array.from({ length: 30 }).map((_, i) => ({
        id: i,
        x: Math.random() * 100, // %
        y: Math.random() * 100, // %
        size: Math.random() * 4 + 1, // px
        duration: Math.random() * 20 + 10, // s
        delay: Math.random() * 5, // s
    }));

    return (
        <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none">
            {/* Particles */}
            {particles.map((p) => (
                <motion.div
                    key={p.id}
                    className="absolute rounded-full bg-[#00a651] opacity-20"
                    style={{
                        left: `${p.x}%`,
                        top: `${p.y}%`,
                        width: p.size,
                        height: p.size,
                    }}
                    animate={{
                        y: [0, -100, 0],
                        opacity: [0.1, 0.3, 0.1],
                    }}
                    transition={{
                        duration: p.duration,
                        repeat: Infinity,
                        ease: "linear",
                        delay: p.delay,
                    }}
                />
            ))}
        </div>
    );
}
