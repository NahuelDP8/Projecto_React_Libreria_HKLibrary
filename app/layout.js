'use client';
import { Inter } from 'next/font/google';
import NavbarApp from './components/navbar/navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/globalStyles.css';

const APP_NAME = "HKLibrary";
const APP_DEFAULT_TITLE = "HKL";
const APP_TITLE_TEMPLATE = "%s - PWA App";
const APP_DESCRIPTION = "Una app que atrapa tu alma!";

export const metadata = {
  applicationName: APP_NAME,
  title: {
    default: APP_DEFAULT_TITLE,
    template: APP_TITLE_TEMPLATE,
  },
  description: APP_DESCRIPTION,
  manifest: "/manifest.json",
  themeColor: "#FFFFFF",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: APP_DEFAULT_TITLE,
    // startUpImage: [],
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: "website",
    siteName: APP_NAME,
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
  },
  twitter: {
    card: "summary",
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
  },
};

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <title>HS Library</title>
      </head>
      <body className={inter.className}>
        <NavbarApp />
        {children}
      </body>
    </html>
  )
}
