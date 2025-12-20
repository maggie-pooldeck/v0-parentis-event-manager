import type React from "react"
import type { Metadata } from "next"
import { DM_Sans, Playfair_Display } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-dm-sans",
  display: "swap",
})

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["600"],
  variable: "--font-playfair",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Parentis - This is not another app, it's a lifeline.",
  description:
    "Parentis extracts info from the 5-10 apps you juggle and syncs it to your existing calendar. No new workflows.",
  generator: "v0.app",
  metadataBase: new URL("https://parentis.app"),
  openGraph: {
    title: "Parentis - This is not another app, it's a lifeline.",
    description:
      "Parentis extracts info from the 5-10 apps you juggle and syncs it to your existing calendar. No new workflows.",
    type: "website",
    url: "https://parentis.app",
    siteName: "Parentis",
  },
  twitter: {
    card: "summary_large_image",
    title: "Parentis - This is not another app, it's a lifeline.",
    description:
      "Parentis extracts info from the 5-10 apps you juggle and syncs it to your existing calendar. No new workflows.",
  },
  icons: {
    icon: "/favicon.png",
    apple: "/apple-icon.png",
  },
  other: {
    "fb:app_id": process.env.NEXT_PUBLIC_FACEBOOK_APP_ID || "",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        {process.env.NEXT_PUBLIC_FACEBOOK_APP_ID && (
          <meta property="fb:app_id" content={process.env.NEXT_PUBLIC_FACEBOOK_APP_ID} />
        )}
      </head>
      <body className={`${dmSans.variable} ${playfair.variable} font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
