import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import Cursor from "@/components/cursor-follower"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://localhost:5000'),
  title: {
    default: "Creative Developer - Portfolio | Web Development & Design",
    template: "%s | Creative Developer"
  },
  description: "Professional portfolio showcasing innovative web development and design solutions. Specializing in React, Next.js, and modern web technologies with 5+ years of experience.",
  keywords: "web developer, designer, portfolio, creative, professional, React, Next.js, JavaScript, TypeScript, UI/UX, full-stack developer, frontend developer, web design",
  authors: [{ name: "Creative Developer", url: "https://yourdomain.com" }],
  creator: "Creative Developer",
  publisher: "Creative Developer",
  category: "Technology",
  verification: {
    google: "your-google-verification-code",
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    title: 'Creative Developer - Portfolio | Web Development & Design',
    description: 'Professional portfolio showcasing innovative web development and design solutions. Specializing in React, Next.js, and modern web technologies.',
    siteName: 'Creative Developer Portfolio',
    images: [
      {
        url: '/portfolio.jpg',
        width: 1200,
        height: 630,
        alt: 'Creative Developer Portfolio - Web Development & Design Showcase',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Creative Developer - Portfolio | Web Development & Design',
    description: 'Professional portfolio showcasing innovative web development and design solutions. Specializing in React, Next.js, and modern web technologies.',
    creator: '@yourhandle',
    images: ['/portfolio.jpg'],
  },
  alternates: {
    canonical: '/',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="canonical" href="https://your-domain.com" />
        <link rel="manifest" href="/app/manifest.json" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <meta name="theme-color" content="#9333ea" />
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="language" content="English" />
        <meta name="revisit-after" content="7 days" />
        <link rel="icon" type="image/jpeg" href="/portfolio.jpg" />
        <link rel="apple-touch-icon" href="/portfolio.jpg" />
      </head>
      <body className={inter.className}>
        <Cursor />
        <main role="main">
          {children}
        </main>
      </body>
    </html>
  )
}
