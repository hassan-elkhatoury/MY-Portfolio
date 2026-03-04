import type { Metadata, Viewport } from 'next'
import { Inter, Space_Grotesk } from 'next/font/google'
import { ThemeProvider } from '@/components/theme-provider'
import { Analytics } from '@vercel/analytics/next'
import { Toaster } from 'sonner'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
})

export const metadata: Metadata = {
  title: 'Hasan El Khatoury | Java Backend Engineer',
  description: 'Personal portfolio of Hasan El Khatoury — Java Backend Engineer specializing in distributed systems, microservices, and cloud-native applications.',
  generator: 'v0.app',
  metadataBase: new URL('https://hasan-elkhatoury.vercel.app'),
  keywords: [
    'Hasan El Khatoury',
    'Java Backend Engineer',
    'Portfolio',
    'Distributed Systems',
    'Microservices',
    'Cloud-Native',
    'Spring Boot',
    'Oracle Certified',
  ],
  authors: [{ name: 'Hasan El Khatoury' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    title: 'Hasan El Khatoury | Java Backend Engineer',
    description: 'Java Backend Engineer specializing in distributed systems, microservices, and cloud-native applications.',
    siteName: 'Hasan El Khatoury — Portfolio',
    images: [
      {
        url: '/api/og',
        width: 1200,
        height: 630,
        alt: 'Hasan El Khatoury — Java Backend Engineer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Hasan El Khatoury | Java Backend Engineer',
    description: 'Java Backend Engineer specializing in distributed systems, microservices, and cloud-native applications.',
    images: ['/api/og'],
  },
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  themeColor: '#0B0F19',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Hasan El Khatoury",
              url: "https://hasan-elkhatoury.vercel.app",
              jobTitle: "Java Backend Engineer",
              sameAs: [
                "https://github.com/hassan-elkhatoury",
                "https://www.linkedin.com/in/hasan-el-khatoury-5b9648292/",
              ],
              knowsAbout: [
                "Java",
                "Spring Boot",
                "Distributed Systems",
                "Microservices",
                "Docker",
                "MongoDB",
                "Oracle Cloud Infrastructure",
              ],
            }),
          }}
        />
      </head>
      <body className="font-sans antialiased">
        <a
          href="#about"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[9999] focus:rounded-lg focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-primary-foreground focus:shadow-lg focus:outline-none"
        >
          Skip to content
        </a>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster theme="dark" position="bottom-right" />
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
