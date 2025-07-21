'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
  faSun, 
  faMoon, 
  faHome, 
  faMapMarkerAlt, 
  faBars, 
  faTimes 
} from '@fortawesome/free-solid-svg-icons'
import { useTheme } from '../context/ThemeProvider'
import BackendStatus from './BackendStatus'

export default function Navigation() {
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const navigation = [
    { name: 'Strona główna', href: '/', icon: faHome },
    { name: 'Wybierz z mapy', href: '/map', icon: faMapMarkerAlt },
  ]

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

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

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-200 ${
                  pathname === item.href
                    ? 'bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-100'
                }`}
              >
                <FontAwesomeIcon icon={item.icon} className="w-4 h-4" />
                <span>{item.name}</span>
              </Link>
            ))}
            
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500"
              aria-label="Przełącz motyw"
            >
              <FontAwesomeIcon 
                icon={theme === 'dark' ? faSun : faMoon} 
                className="w-4 h-4" 
              />
            </button>
          </div>

          <div className="border-l border-gray-300 dark:border-gray-600 pl-4">
            <BackendStatus />
          </div>

          {/* Mobile feature existing menu button */}
          <div className="md:hidden flex items-center space-x-2">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-200"
              aria-label="Przełącz motyw"
            >
              <FontAwesomeIcon 
                icon={theme === 'dark' ? faSun : faMoon} 
                className="w-4 h-4" 
              />
            </button>
            
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-200"
              aria-label="Menu"
            >
              <FontAwesomeIcon 
                icon={isMenuOpen ? faTimes : faBars} 
                className="w-4 h-4" 
              />
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className={`md:hidden overflow-hidden transition-all duration-300 ${
          isMenuOpen ? 'max-h-48 pb-4' : 'max-h-0'
        }`}>
          <div className="space-y-2">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-200 ${
                  pathname === item.href
                    ? 'bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-100'
                }`}
              >
                <FontAwesomeIcon icon={item.icon} className="w-4 h-4" />
                <span>{item.name}</span>
              </Link>
            ))}
            <div className="px-3 py-2 border-t border-gray-200 dark:border-gray-700">
              
              <BackendStatus />
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}