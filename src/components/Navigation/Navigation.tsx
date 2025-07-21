'use client'

import Link from 'next/link'
import BackendStatus from '../BackendStatus'
import { DesktopNavigation, MobileMenu, MobileNavigation } from './index'

export const Navigation = () => {


  return (
    <nav className="bg-white dark:bg-gray-900 shadow-lg transition-colors duration-300">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link 
              href="/" 
              className="text-xl font-bold text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors duration-200"
            >
              🌤️ Prognoza Pogody
            </Link>
          </div>
          <DesktopNavigation />
          <div className="border-l border-gray-300 dark:border-gray-600 pl-4">
            <BackendStatus />
          </div>
          <MobileMenu />
        </div>
        <MobileNavigation />
      </div>
    </nav>
  )
}