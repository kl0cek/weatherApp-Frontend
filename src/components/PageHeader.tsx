export function PageHeader() {
  return (
    <header className="text-center space-y-4">
      <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 animate-slide-in">
        Prognoza Pogody na 7 Dni
      </h1>
      <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto animate-slide-in">
        Wprowadź współrzędne geograficzne, aby uzyskać szczegółową prognozę pogody 
        wraz z informacjami o potencjale energii słonecznej
      </p>
    </header>
  )
}