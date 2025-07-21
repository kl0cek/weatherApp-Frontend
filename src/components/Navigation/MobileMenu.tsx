'use client'
import { useState } from 'react'
import { useTheme } from '../../context/ThemeProvider'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSun, faMoon, faBars, faTimes } from '@fortawesome/free-solid-svg-icons'

export const MobileMenu = () => {
    const { theme, setTheme } = useTheme()
      const [isMenuOpen, setIsMenuOpen] = useState(false)
    
    

    const toggleTheme = () => {
        setTheme(theme === 'dark' ? 'light' : 'dark')
    }
    
    return (
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
    )
}