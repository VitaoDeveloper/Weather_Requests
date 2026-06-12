import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import { CounterButton } from './components/button' 
import { current } from './api/weather';
import axios from 'axios';
import './App.css'

function App() {

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [coords, setCoords] = useState({lat: 0, lon: 0})
  const [error, setError] = useState('');

  useEffect(() => {
    // Verifica se o navegador suporta geolocalização
    if (!navigator.geolocation) {
      setError('Geolocalização não é suportada pelo seu navegador.');
      return;
    }

    const sucesso = (posicao: GeolocationPosition) => {
      setCoords({
        lat: posicao.coords.latitude,
        lon: posicao.coords.longitude,
      });
    };

    const falha = (err: GeolocationPositionError) => {
      setError(`Erro ao obter localização: ${err.message}`);
    };

    // Executa a busca ao montar o componente
    navigator.geolocation.getCurrentPosition(sucesso, falha);
  }, []);

  const fetchCurrent = async () => {
    setLoading(true)
    setError('')
    setData(null)

    try {
      const data = await current(coords.lat, coords.lon)
      setData(data)
    } catch (error) {
      setError("Erro ao buscar. Tente novamente.");
    } finally {
      setLoading(false);
    }
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
        {loading ? CounterButton('Current coordenates', fetchCurrent) : CounterButton('Loading...')}
        {data}

        {loading ? CounterButton('Enter coordenates') : CounterButton('Loading...')}
        {loading? CounterButton('Enter city name') : CounterButton('Loading...')}
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
    </>
  )
}

export default App
