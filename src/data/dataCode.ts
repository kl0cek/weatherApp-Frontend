import { 
  faSun, 
  faCloud, 
  faCloudSun,
  faCloudRain,
  faCloudShowersHeavy,
  faSnowflake,
  faBolt,
  faSmog
} from '@fortawesome/free-solid-svg-icons'

export const getWeatherIcon = (code: number) => {
        switch (code) {
            case 0:
                return { icon: faSun, color: 'text-yellow-500', desc: 'Słonecznie' };
            case 1:
                return { icon: faCloudSun, color: 'text-yellow-400', desc: 'Przeważnie słonecznie' };
            case 2:
                return { icon: faCloud, color: 'text-gray-500', desc: 'Częściowo pochmurno' };
            case 3:
                return { icon: faCloud, color: 'text-gray-600', desc: 'Pochmurno' };
            
            case 45:
            case 48:
                return { icon: faSmog, color: 'text-gray-400', desc: 'Mgła' };
            
            case 51:
            case 52:
            case 53:
            case 54:
            case 55:
                return { icon: faCloudRain, color: 'text-blue-400', desc: 'Mżawka' };
            
            case 56:
            case 57:
                return { icon: faSnowflake, color: 'text-blue-300', desc: 'Marznąca mżawka' };
            
            case 61:
            case 62:
            case 63:
            case 64:
            case 65:
                return { icon: faCloudRain, color: 'text-blue-500', desc: 'Deszcz' };
            
            case 66:
            case 67:
                return { icon: faSnowflake, color: 'text-blue-300', desc: 'Marznący deszcz' };
            
            case 71:
            case 72:
            case 73:
            case 74:
            case 75:
                return { icon: faSnowflake, color: 'text-blue-200', desc: 'Śnieg' };
            
            case 77:
                return { icon: faSnowflake, color: 'text-blue-100', desc: 'Ziarnisty śnieg' };
            
            case 80:
            case 81:
            case 82:
                return { icon: faCloudShowersHeavy, color: 'text-blue-600', desc: 'Przelotne opady' };
            
            case 85:
            case 86:
                return { icon: faSnowflake, color: 'text-blue-200', desc: 'Przelotny śnieg' };
            
            case 95:
                return { icon: faBolt, color: 'text-purple-500', desc: 'Burza' };
            
            case 96:
            case 99:
                return { icon: faBolt, color: 'text-purple-600', desc: 'Burza z gradem' };
            
            default:
                return { icon: faCloud, color: 'text-gray-500', desc: 'Nieznane' };
        }
    }

    