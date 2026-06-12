import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import { fetchByCity, fetchByCoords } from './api/weather';
import './App.css'
import { Modal } from './components/Modal';

function App() {

  const [loading, setLoading] = useState([false, false, false]);
  const [modalOpen, setModalOpen] = useState(false);
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
    setLoading([true, false, false])
    setError('')
    setData(null)

    try {
      const data = await fetchByCoords(coords.lat, coords.lon)
      console.log(data);
      
      setData(data)
    } catch (error) {
      setError("Erro ao buscar. Tente novamente.");
    } finally {
      setLoading([false, false, false]);
      
      console.log(data);
      console.log(error);
      
    }
  }

  const fetchByEnterCoords = async () => {
    setLoading([false, true, false])
    setError('')
    setData(null)

    try {
      const data = await fetchByCoords(coords.lat, coords.lon)
      console.log(data);
      
      setData(data)
    } catch (error) {
      setError("Erro ao buscar. Tente novamente.");
    } finally {
      setLoading([false, false, false]);

      console.log(data);
      console.log(error);
    }
  }

  const fetchByCityName = async () => {
    setLoading([false, false, true])
    setError('')
    setData(null)

    try {
      const data = await fetchByCity("Taubaté")
      console.log(data);
      
      setData(data)
    } catch (error) {
      setError("Erro ao buscar. Tente novamente.");
    } finally {
      setLoading([false, false, false]);

      console.log(data);
      console.log(error);
    }
  }

  const handleManualCoords = (lat: number, lon: number) => {
    setCoords({ lat, lon })
  }

  return (
    <>
      <section id="center">
        <div className="hero">
          <img src={heroImg} className="base" width="170" height="179" alt="" />
          <img src={reactLogo} className="framework" alt="React logo" />
          <img src={viteLogo} className="vite" alt="Vite logo" />
        </div>
        <div>
          <h1>OpenWeather</h1>
          <p>
            Use the buttons below to call the main <code>OpenWeather API</code> endpoints.
          </p>
        </div>
        {
          !loading[0] ? <button type="button" className="counter" onClick={fetchCurrent}>Current coordenates</button> 
                  : <button type='button' className='counter'>Loading...</button>
        }
        {
          !loading[1] ? <button type="button" className="counter" onClick={() => setModalOpen(true)}>Enter coordenates</button> 
                  : <button type='button' className='counter'>Loading...</button>
        }
        {
          !loading[2] ? <button type="button" className="counter" onClick={fetchByCityName}>Enter city name</button> 
                  : <button type='button' className='counter'>Loading...</button>
        }
        {error}
      </section>

      <div className="ticks"></div>

      <section id="next-steps">
        <div id="docs">
          <svg className="icon" role="presentation" aria-hidden="true">
            <use href="/icons.svg#documentation-icon"></use>
          </svg>
          <h2>Documentation</h2>
          <p>Your questions, answered</p>
          <ul>
            <li>
              <a href="https://vite.dev/" target="_blank">
                <img className="logo" src={viteLogo} alt="" />
                Explore Vite
              </a>
            </li>
            <li>
              <a href="https://react.dev/" target="_blank">
                <img className="button-icon" src={reactLogo} alt="" />
                Learn more
              </a>
            </li>
          </ul>
        </div>
        <div id="social">
          <svg className="icon" role="presentation" aria-hidden="true">
            <use href="/icons.svg#social-icon"></use>
          </svg>
          <h2>Connect with us</h2>
          <p>Join the Vite community</p>
          <ul>
            <li>
              <a href="https://github.com/vitejs/vite" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#github-icon"></use>
                </svg>
                GitHub
              </a>
            </li>
            <li>
              <a href="https://chat.vite.dev/" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#discord-icon"></use>
                </svg>
                Discord
              </a>
            </li>
            <li>
              <a href="https://x.com/vite_js" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#x-icon"></use>
                </svg>
                X.com
              </a>
            </li>
            <li>
              <a href="https://bsky.app/profile/vite.dev" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#bluesky-icon"></use>
                </svg>
                Bluesky
              </a>
            </li>
          </ul>
        </div>
      </section>

      <div className="ticks"></div>
      <section id="spacer"></section>

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleManualCoords}
        label1="Latitude"
        label2="Longitude"
      />
    </>
  )
}

export default App
