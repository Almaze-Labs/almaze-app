// import type { Metadata } from "next";
// import localFont from "next/font/local";
import { Inter } from 'next/font/google';
import './globals.css';
import { Metadata } from 'next';

const inter = Inter({ subsets: ['latin'] });


export const metadata: Metadata = {
  title: "Almaze: Self Evolving AI that Helps You Complete Mundane Tasks",
  description:
    "The autoagentic AGI. Almaze is a self-evolving AGI made of agents that collaborate, and build new agents as needed, in order to complete tasks for a user.",
  openGraph: {
    type: "website",
    url: "https://e8ogg8s4k8c84osoo8wo4ks4.dev3vds1.link/",
    title: "Almaze: Self Evolving AI that Helps You Complete Mundane Tasks",
    description:
      "The autoagentic AGI. Almaze is a self-evolving AGI made of agents that collaborate, and build new agents as needed, in order to complete tasks for a user.",
    images: `https://ai-proj-04.vercel.app/og-banner.png`,
  },
};


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );}
