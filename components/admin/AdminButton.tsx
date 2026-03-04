"use client";

import Link from 'next/link';
import { Settings } from 'lucide-react';

export default function AdminButton() {
  return (
    <Link
      href="/admin/login"
      className="fixed bottom-4 left-4 z-50 bg-gold-500 hover:bg-gold-600 text-white p-4 rounded-full shadow-lg transition-all hover:scale-110 group"
      aria-label="Admin Panel"
    >
      <Settings className="w-6 h-6 group-hover:rotate-90 transition-transform duration-500" />
    </Link>
  );
}