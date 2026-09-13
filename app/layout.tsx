import type { Metadata } from "next";
import "./globals.css";
import { AppProvider } from "@/context/AppContext";
import Header from "@/components/Header";
import Navigation from "@/components/Navigation";

export const metadata: Metadata = {
  title: "Swedish Tastes",
  description: "Discover, save and organise recipes with Swedish Tastes.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <AppProvider>
          <Header />
          <Navigation />
          <main>{children}</main>
        </AppProvider>
      </body>
    </html>
  );
}
