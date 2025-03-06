"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import SiteLogo from "@/assets/logo.svg";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

const ActionButton = ({ label, variant = "primary", onClick }) => {
    return (
        <button
            onClick={onClick}
            className={`w-full py-2 px-4 rounded-lg text-white font-medium transition-all 
                ${variant === "primary" 
                    ? "bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700" 
                    : "bg-gray-800 hover:bg-gray-700"}`}
        >
            {label}
        </button>
    );
};

export function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const router = useRouter();

    const navItems = [
        { label: "Features", href: "/#features" },
        { label: "Pricing", href: "/#pricing" },
        { label: "Testimonials", href: "/#testimonials" },
    ];

    return (
        <nav className="fixed top-0 left-0 w-full z-50 bg-black/80 backdrop-blur-md border-b border-white/10">
            <div className="container mx-auto px-4 py-3 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-3 text-white text-2xl font-bold">
                    <div className="border size-8 rounded-lg flex items-center justify-center">
                        <SiteLogo className="size-6 h-auto" />
                    </div>
                    Mr. Happy
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center space-x-8">
                    {navItems.map((item) => (
                        <Link 
                            key={item.label} 
                            href={item.href} 
                            className="text-white/70 hover:text-white transition-colors"
                        >
                            {item.label}
                        </Link>
                    ))}
                </div>

                {/* Auth Buttons (Desktop) */}
                <div className="hidden md:flex items-center space-x-4">
                    <Link href="/login">
                        <Button variant="ghost" className="text-white hover:bg-white/10">
                            Login
                        </Button>
                    </Link>
                    <Link href="/signup">
                        <Button className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700">
                            Sign Up
                        </Button>
                    </Link>
                </div>

                {/* Mobile Menu Button */}
                <div className="md:hidden">
                    <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon" className="text-white">
                                <Menu className="h-6 w-6" />
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="right" className="bg-black/95 border-l border-white/10 text-white p-0">
                            <div className="flex flex-col h-full">
                                <div className="p-4 border-b border-white/10 flex justify-end">
                                    <Button 
                                        variant="ghost" 
                                        size="icon" 
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        <X className="h-6 w-6" />
                                    </Button>
                                </div>
                                <motion.div 
                                    initial={{ opacity: 0, y: -20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    className="flex flex-col space-y-6 items-center pt-6"
                                >
                                    {navItems.map((item) => (
                                        <a 
                                            key={item.label}
                                            href={item.href} 
                                            className="text-lg font-medium text-white/90 hover:text-white transition-colors"
                                            onClick={() => setIsMenuOpen(false)}
                                        >
                                            {item.label}
                                        </a>
                                    ))}
                                    <div className="pt-6 flex flex-col gap-4 w-full px-6">
                                        <ActionButton 
                                            label="Login" 
                                            variant="secondary"
                                            onClick={() => {
                                                router.push("/login");
                                                setIsMenuOpen(false);
                                            }}
                                        />
                                        <ActionButton 
                                            label="Sign Up" 
                                            onClick={() => {
                                                router.push("/signup");
                                                setIsMenuOpen(false);
                                            }}
                                        />
                                    </div>
                                </motion.div>
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </nav>
    );
}
