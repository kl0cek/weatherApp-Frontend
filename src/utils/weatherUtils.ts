export const formatSunExposure = (hours: number): string => {
  const wholeHours = Math.floor(hours)
  const minutes = Math.round((hours - wholeHours) * 60)
  
  if (minutes === 0) {
    return `${wholeHours}h`
  }
  return `${wholeHours}h ${minutes}min`
}

export const getPressureCategory = (pressure: number) => {
  if (pressure < 1000) return { text: 'Niskie', color: 'text-blue-600 dark:text-blue-400' }
  if (pressure > 1020) return { text: 'Wysokie', color: 'text-green-600 dark:text-green-400' }
  return { text: 'Normalne', color: 'text-gray-600 dark:text-gray-400' }
}

export const getSunExposureCategory = (hours: number) => {
  if (hours < 4) return { text: 'Mało słońca', color: 'text-gray-600 dark:text-gray-400' }
  if (hours > 8) return { text: 'Dużo słońca', color: 'text-yellow-600 dark:text-yellow-400' }
  return { text: 'Umiarkowanie', color: 'text-orange-600 dark:text-orange-400' }
}