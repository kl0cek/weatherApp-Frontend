'use client'
import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons'
import BackendStatus from '../BackendStatus'

export const MobileNavigation = () => {
    const pathname = usePathname()
    const [isMenuOpen, setIsMenuOpen] = useState(false)

      const navigation = [
        { name: 'Strona główna', href: '/', icon: faHome },
        { name: 'Wybierz z mapy', href: '/map', icon: faMapMarkerAlt },
      ]
    

    return (
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
    )
}