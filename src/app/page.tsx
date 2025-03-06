"use client"

import { useEffect } from "react";
import { Navbar } from "@/components/navbar";
import { HeroSection } from "@/components/hero-section";
import { LogoTicker } from "@/components/logo-ticker";
import { Features } from "@/components/features";
import { Testimonials } from "@/components/testimonials";
import { CallToAction } from "@/components/call-to-action";
import SiteFooter from "@/components/site-footer";
import { GithubIndicator } from "@/components/github-indicator";
import { Pricing } from "@/components/pricing";

export default function Home() {
  

  return (
    <main className="flex min-h-screen flex-col items-center justify-between bg-black text-white overflow-hidden">
      <div className="w-full">
        <Navbar />
        <HeroSection />
        <LogoTicker />
        <Features />
        <Pricing />
        <Testimonials />
        <CallToAction />
        <SiteFooter />
        <GithubIndicator />
      </div>
    </main>
  );
}