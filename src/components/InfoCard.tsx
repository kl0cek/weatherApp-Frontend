export const InfoCard = () => {
  return (
    <div className="card max-w-4xl mx-auto animate-scale-in">
      <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
        💡 Jak korzystać z aplikacji
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-gray-600 dark:text-gray-400">
        <div>
          <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-2">
            Wprowadź współrzędne ręcznie
          </h4>
          <p>
            Wpisz szerokość i długość geograficzną w formacie dziesiętnym 
            (np. 50.0647, 19.9450 dla Krakowa)
          </p>
        </div>
        <div>
          <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-2">
            Użyj automatycznej lokalizacji
          </h4>
          <p>
            Kliknij przycisk &quot;Użyj mojej lokalizacji&quot;
            pobrać twoje obecne współrzędne
          </p>
        </div>
        <div>
          <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-2">
            Wybierz z mapy
          </h4>
          <p>
            Przejdź do sekcji &quot;Wybierz z mapy&quot; aby wybrać lokalizację 
            klikając na interaktywnej mapie świata
          </p>
        </div>
      </div>
    </div>
  )
}