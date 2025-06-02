import type { Metadata } from "next";
import {  Space_Grotesk } from "next/font/google";
import "./globals.css";

import {
  ClerkProvider, 
} from '@clerk/nextjs'
const SpaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});


export const metadata: Metadata = {
  title: "Aquafornais",
  description: "uwu",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      
      <html lang="en" suppressHydrationWarning={true} data-theme="corporate" >
        <body
          className={`${SpaceGrotesk.variable}  antialiased`}
        >                    
            {children}          
        </body>
      </html>
      
    </ClerkProvider>
  );
}
