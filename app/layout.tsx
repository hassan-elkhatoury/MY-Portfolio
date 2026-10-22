import type { Metadata, Viewport } from 'next'
import { Bricolage_Grotesque, Caveat } from 'next/font/google'
import { ThemeProvider } from '@/components/theme-provider'
import { MotionPreferencesProvider } from '@/components/portfolio/motion-preferences'
import { Analytics } from '@vercel/analytics/next'
import { Toaster } from 'sonner'
import './globals.css'
import '@/components/portfolio/night-materials.css'

const bricolage = Bricolage_Grotesque({
  subsets: ['latin'],
  variable: '--font-bricolage',
})

const caveat = Caveat({
  subsets: ['latin'],
  variable: '--font-caveat',
})

export const metadata: Metadata = {
  title: 'Hassan El Khatoury | Java Backend Engineer',
  description: 'Computer Science Engineering student graduating in 2027. Oracle-certified Java developer with Spring Boot experience at MEF and full-stack work on MODEYA. Seeking a 2027 PFE internship.',
  metadataBase: new URL('https://hassanelkhatoury.vercel.app'),
  keywords: [
    'Hassan El Khatoury',
    'Java Backend Engineer',
    'Portfolio',
    'Distributed Systems',
    'Microservices',
    'Cloud-Native',
    'Spring Boot',
    'Oracle Certified',
  ],
  authors: [{ name: 'Hassan El Khatoury' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    title: 'Hassan El Khatoury | Java Backend Engineer',
    description: 'Computer Science Engineering student graduating in 2027. Oracle-certified Java developer with Spring Boot experience at MEF and full-stack work on MODEYA. Seeking a 2027 PFE internship.',
    siteName: 'Hassan El Khatoury — Portfolio',
    images: [
      {
        url: '/api/og',
        width: 1200,
        height: 630,
        alt: 'Hassan El Khatoury — Java Backend Engineer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Hassan El Khatoury | Java Backend Engineer',
    description: 'Computer Science Engineering student graduating in 2027. Oracle-certified Java developer with Spring Boot experience at MEF and full-stack work on MODEYA. Seeking a 2027 PFE internship.',
    images: ['/api/og'],
  },
  icons: {
    icon: '/icon.svg',
  },
}

export const viewport: Viewport = {
  themeColor: '#fffdf8',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${bricolage.variable} ${caveat.variable}`}>
      <head>
        <script
          id="portfolio-motion-preferences"
          dangerouslySetInnerHTML={{ __html: `(function(){var paused=false;try{paused=localStorage.getItem('portfolio-motion-paused-v1')==='true'}catch(e){}document.documentElement.dataset.motionPaused=String(paused||window.matchMedia('(prefers-reduced-motion: reduce)').matches)})()` }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Hassan El Khatoury",
              url: "https://hassanelkhatoury.vercel.app",
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
          href="#main-content"
          className="skip-content"
        >
          Skip to content
        </a>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
        >
          <MotionPreferencesProvider>
            {children}
            <Toaster theme="dark" position="bottom-right" />
          </MotionPreferencesProvider>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
