'use client'
import { useRouter } from 'next/navigation'
import { Home, Heart } from 'lucide-react'
//import { ThemeToggle } from './ThemeToggle';
import React from 'react'
import Link from 'next/link'

export const Navigation: React.FC = () => {
    const router = useRouter();

    const isActive = (path: string) => router.pathname === path;


    return (
    <nav className="glass dark:glass-dark rounded-lg p-4 mb-6">
      <div className="flex items-center justify-between">
        <div className="flex space-x-4">
          <Link
            href="/"
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
              isActive('/')
                ? 'bg-white/20 text-white shadow-lg'
                : 'text-white/80 hover:text-white hover:bg-white/10'
            }`}
          >
            <Home size={20} />
            <span>Home</span>
          </Link>
          <Link
            href="/favorites"
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
              isActive('/favorites')
                ? 'bg-white/20 text-white shadow-lg'
                : 'text-white/80 hover:text-white hover:bg-white/10'
            }`}
          >
            <Heart size={20} />
            <span>Favorites</span>
          </Link>
        </div>
        
      </div>
    </nav>
  );
};

