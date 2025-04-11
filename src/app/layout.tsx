// app/layout.tsx

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import FacebookPixel from "@/app/components/FacebookPixel"; // You'll create this component

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "18-Aprel | Biznes Masterklassi",
    description: "18-Aprel | Biznes Masterklassi",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <head>
                <meta
                    name="facebook-domain-verification"
                    content="q7wbhd14mezgaot08uc82c61frjwm7"
                />
            </head>
            <body className={`${geistSans.variable} ${geistMono.variable}`}>
                {children}
                <FacebookPixel />
                <noscript>
                    <img
                        height="1"
                        width="1"
                        style={{ display: "none" }}
                        src="https://www.facebook.com/tr?id=2393820357650116&ev=PageView&noscript=1"
                        alt=""
                    />
                </noscript>
            </body>
        </html>
    );
}
