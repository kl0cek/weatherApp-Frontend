import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons'

interface ErrorMessageProps {
  message: string
}

export const ErrorMessage = ({ message }: ErrorMessageProps) => {
  return (
    <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 animate-slide-in">
      <div className="flex items-start space-x-2">
        <FontAwesomeIcon 
          icon={faExclamationTriangle} 
          className="w-5 h-5 text-red-500 mt-0.5" 
        />
        <p className="text-red-700 dark:text-red-400">{message}</p>
      </div>
    </div>
  )
}