'use client';

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { ThemeProvider } from '@mui/material/styles';
import themeConfig from '../theme/configTheme'; 
import { AuthProvider } from "@/context/AuthContext";
import { Provider } from 'react-redux';
import { store } from '@/store';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
        <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <Provider store={store}>
          <AuthProvider>
            <ThemeProvider theme={themeConfig}>
              {children}
            </ThemeProvider>
          </AuthProvider>
        </Provider>
        </body>
      </html>
  );
}
