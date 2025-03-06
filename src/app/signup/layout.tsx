
"use client"

import { useEffect } from "react";
import { initReplitAuth } from "@/lib/auth";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    // Initialize Replit Auth
    initReplitAuth();
  }, []);

  return children;
}
