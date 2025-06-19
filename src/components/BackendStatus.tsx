'use client'

import { useEffect, useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
    faCircle,
    faSpinner,
    faExclamationTriangle
} from '@fortawesome/free-solid-svg-icons'

export default function BackendStatus() {
    const [status, setStatus] = useState<'checking' | 'online' | 'offline'>('checking')
    const [lastChecked, setLastChecked] = useState<Date | null>(null)

    const checkBackendStatus = async () => {
        try {
            const response = await fetch('/api/test', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            if(response.ok) {
                setStatus('online')
            } else {
                setStatus('offline')
            }
        } catch (error){
            setStatus('offline')
        } finally {
            setLastChecked(new Date())
        }
    }

    useEffect(() => {
        checkBackendStatus()

        const interval = setInterval(checkBackendStatus, 30000)
        return () => clearInterval(interval)
    }, [])

    const getStatusColor = () => {
        switch(status) {
            case 'online': return 'text-green-500'
            case 'offline': return 'text-red-500'
            case 'checking': return 'text-yellow-500'
        }
    }

    const getStatusText = () => {
        switch(status) {
            case 'online': return 'Backend Online'
            case 'offline': return 'Backend Offline'
            case 'checking': return 'Checking ...'
        }
    }

    const getStatusIcon = () => {
        switch(status) {
            case 'online': return faCircle
            case 'offline': return faExclamationTriangle
            case 'checking': return faSpinner
        }
    }

    return (
        <div className="flex items-center space-x-2 text-sm">
            <FontAwesomeIcon
                icon={getStatusIcon()}
                className={`w-3 h-3 ${getStatusColor()} ${status === 'checking' ? 'animate-spin': ''}`}
            />
            <span className={`${getStatusColor()} font-medium`}>
                {getStatusText()}
            </span>
            {status === 'offline' && (
                <button 
                    onClick={checkBackendStatus}
                    className="text-xs text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 underline"
                >
                    Sprawdź ponownie
                </button>
            )}
            {lastChecked && (
                <span className="text-xs text-gray-400">
                    {lastChecked.toLocaleTimeString()}
                </span>
            )}
        </div>
    )
}