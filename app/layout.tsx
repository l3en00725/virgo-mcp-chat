import { Toaster } from "sonner"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { ThemeProvider } from "@/components/theme-provider"
import { BASE_METADATA } from "@/lib/constants"
import DatadogInit from "@/components/datadog-init"
import AuthButton from "@/app/(auth)/AuthButton"   // ✅ Import your auth button

import "./globals.css"

export const metadata: Metadata = {
  ...BASE_METADATA,
  title: "Virgo Chat",
  description: "Chat directly with 2,800+ APIs in one place, powered by Virgo.",
  icons: {
    icon: "/images/profileimg.jpg",
    shortcut: "/images/profileimg.jpg",
    apple: "/images/profileimg.jpg",
  },
  openGraph: {
    title: "Virgo Chat",
    description:
      "Chat directly with 2,800+ APIs in one place, powered by Virgo.",
    url: "https://virgo-mcp-chat.vercel.app",
    siteName: "Virgo MCP",
    images: [
      {
        url: "/images/og-image.png", // put a 1200x630 image in /public/images
        width: 1200,
        height: 630,
        alt: "Virgo MCP Chat Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Virgo Chat",
    description:
      "Chat directly with 2,800+ APIs in one place, powered by Virgo.",
    images: ["/images/og-image.png"],
  },
}

export const viewport = {
  maximumScale: 1, // Disable auto-zoom on mobile Safari
}

const geist = Geist({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-geist",
})

const geistMono = Geist_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-geist-mono",
})

const LIGHT_THEME_COLOR = "hsl(0 0% 100%)"
const DARK_THEME_COLOR = "hsl(240deg 10% 3.92%)"
const THEME_COLOR_SCRIPT = `\
(function() {
  var html = document.documentElement;
  var meta = document.querySelector('meta[name="theme-color"]');
  if (!meta) {
    meta = document.createElement('meta');
    meta.setAttribute('name', 'theme-color');
    document.head.appendChild(meta);
  }
  function updateThemeColor() {
    var isDark = html.classList.contains('dark');
    meta.setAttribute('content', isDark ? '${DARK_THEME_COLOR}' : '${LIGHT_THEME_COLOR}');
  }
  var observer = new MutationObserver(updateThemeColor);
  observer.observe(html, { attributes: true, attributeFilter: ['class'] });
  updateThemeColor();
})();`

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geist.variable} ${geistMono.variable}`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: THEME_COLOR_SCRIPT,
          }}
        />
      </head>
      <body className="antialiased">
        <DatadogInit />
        <Analytics />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {/* ✅ Top navigation bar */}
          <header className="flex justify-between items-center px-6 py-4 border-b border-gray-200 dark:border-gray-800">
            <h1 className="text-xl font-bold tracking-wide">VIRGO</h1>
            <AuthButton />
          </header>

          {/* Main content */}
          <main>{children}</main>

          <Toaster position="top-center" />
        </ThemeProvider>
      </body>
    </html>
  )
}
