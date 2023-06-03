'use client';
import { Inter } from 'next/font/google';
import NavbarApp from './components/navbar/navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'app/css/globalStyles.css';

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>HS Library</title>
      </head>
      <body className={inter.className}>
        <NavbarApp />
        {children}
      </body>
    </html>
  )
}
