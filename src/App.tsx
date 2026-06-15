import { fetchByCity, fetchByCoords } from './api/weather';
import type { ModalProps } from './types/ModalProps';
import { useState, useEffect } from 'react'
import { Modal } from './components/Modal';
import openWeatherLogo from './assets/logo.svg'
import './App.css'

function App() {

  const [loadings, setLoadings] = useState([false, false, false]);
  const [modalsOpen, setModalsOpen] = useState([false, false]);
  const [data, setData] = useState(null);
  const [coords, setCoords] = useState({lat: 0, lon: 0})
  const [error, setError] = useState('');

  useEffect(() => {
    if (!navigator.geolocation) {
      setError('Geolocalização não é suportada pelo seu navegador.');
      return;
    }

    const success = (pos: GeolocationPosition) => {
      setCoords({
        lat: pos.coords.latitude,
        lon: pos.coords.longitude,
      });
    };

    const failure = (err: GeolocationPositionError) => {
      setError(`Erro ao obter localização: ${err.message}`);
    };

    // Executa a busca ao montar o componente
    navigator.geolocation.getCurrentPosition(success, failure);
  }, []);

  const fetchCurrent = async () => {
    setLoadings([true, false, false])
    setError('')
    setData(null)

    try {
      const data = await fetchByCoords(coords.lat, coords.lon)
      console.log(data);
      
      setData(data)
    } catch (error) {
      setError("Erro ao buscar. Tente novamente.");
    } finally {
      setLoadings([false, false, false]);
      
      console.log(data);
      console.log(error);
    }
  }

  const fetchByEnterCoords = async (lat: number, lon: number) => {
    setCoords({lat, lon})
    setLoadings([false, true, false])
    setError('')
    setData(null)

    try {
      const data = await fetchByCoords(lat, lon)
      console.log(data);
      
      setData(data)
    } catch (error) {
      setError("Erro ao buscar. Tente novamente.");
    } finally {
      setLoadings([false, false, false]);

      console.log(data);
      console.log(error);
    }
  }

  const fetchByCityName = async (cityName: string) => {
    setLoadings([false, false, true])
    setError('')
    setData(null)

    try {
      const data = await fetchByCity(cityName)
      console.log(data);
      
      setData(data)
    } catch (error) {
      setError("Erro ao buscar. Tente novamente.");
    } finally {
      setLoadings([false, false, false]);

      console.log(data);
      console.log(error);
    }
  }

  return (
    <>
      <section id="center">
        <div>
          <img src={openWeatherLogo} alt="OpenWeather logo" width="300" />
        </div>
        <div>
          <h1>OpenWeather</h1>
          <p>
            Use the buttons below to call the main <code>OpenWeather API</code> endpoints.
          </p>
        </div>
        {
          !loadings[0] ? <button type="button" className="counter" onClick={fetchCurrent}>Current coordenates</button> 
                  : <button type='button' className='counter'>Loading...</button>
        }
        {
          !loadings[1] ? <button type="button" className="counter" onClick={() => setModalsOpen([true, false])}>Enter coordenates</button> 
                  : <button type='button' className='counter'>Loading...</button>
        }
        {
          !loadings[2] ? <button type="button" className="counter" onClick={() => setModalsOpen([false, true])}>Enter city name</button> 
                  : <button type='button' className='counter'>Loading...</button>
        }
      {data ? JSON.stringify(data, null, 2) : "Tap a button"}
      </section>


      <Modal
        open={modalsOpen[0]}
        title='Enter coordenates'
        onClose={() => setModalsOpen([false, false])}
        onSubmit={fetchByEnterCoords as ModalProps['onSubmit']}
        inputs={[
          {
            label: 'Latitude',
            placeholder: '90',
            type: 'number'
          },
          {
            label: 'Longitude',
            placeholder: '-90',
            type: 'number'
          },
        ]}
      />

      <Modal
        open={modalsOpen[1]}
        title='Enter city name'
        onClose={() => setModalsOpen([false, false])}
        onSubmit={fetchByCityName as ModalProps['onSubmit']}
        inputs={[
          {
            label: 'City name',
            placeholder: 'San Francisco',
            type: 'text'
          }
        ]}
      />
    </>
  )
}

export default App
