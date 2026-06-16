import { fetchByCity, fetchByCoords } from './api/weather';
import type { ApiResponse } from './types/ApiResponse';
import type { ModalProps } from './types/ModalProps';
import { SendResponse } from './utils/sendResponse';
import openWeatherLogo from './assets/logo.svg';
import { DataTable } from './components/DataTable';
import { capitalize } from '@material-ui/core';
import { useState, useEffect } from 'react';
import { useTranslation, Trans } from 'react-i18next';
import { Modal } from './components/Modal';
import './App.css';

function App() {
  const { t, i18n } = useTranslation();
  const [loadings, setLoadings] = useState([false, false, false]);
  const [modalsOpen, setModalsOpen] = useState([false, false]);

  const [data, setData] = useState<null | ApiResponse>(null);
  const [error, setError] = useState<null | string>(null);

  const [persistEnabled, setPersistEnabled] = useState(() => {
    const stored = localStorage.getItem('WEATHER_PERSIST_ENABLED');
    return stored === null ? true : stored === 'true';
  });

  useEffect(() => {
    localStorage.setItem('WEATHER_PERSIST_ENABLED', String(persistEnabled));
  }, [persistEnabled]);

  const [coords, setCoords] = useState({lat: 0, lon: 0});

  useEffect(() => {
    if (!navigator.geolocation) {
      setError(t('errors.geoNotSupported'));
      return;
    }

    const success = (pos: GeolocationPosition) => {
      setCoords({
        lat: pos.coords.latitude,
        lon: pos.coords.longitude,
      });
    };

    const failure = (err: GeolocationPositionError) => {
      setError(t('errors.geoFailed', { message: err.message }));
    };

    navigator.geolocation.getCurrentPosition(success, failure);
  }, []);

  useEffect(() => {
    if (!persistEnabled) return;
    if (data) SendResponse.send('SUCCESS', JSON.stringify(data));
    if (error) SendResponse.send('ERROR', error);
  }, [data, error, persistEnabled])

  const fetchCurrent = async () => {
    setLoadings([true, false, false])
    setError(null)
    setData(null)

    try {
      const res = await fetchByCoords(coords.lat, coords.lon)
      setData(res)

    } catch (err) {
      setError(`${err}`);

    } finally {
      setLoadings([false, false, false]);
    }
  }

  const fetchByEnterCoords = async (lat: number, lon: number) => {
    setLoadings([false, true, false])
    setError(null)
    setData(null)

    try {
      const res = await fetchByCoords(lat, lon);
      setData(res)

    } catch (err) {
      setError(`${err}`);

    } finally {
      setLoadings([false, false, false]);
    }
  }

  const fetchByCityName = async (cityName: string) => {
    setLoadings([false, false, true])
    setError(null)
    setData(null)

    try {
      const res = await fetchByCity(cityName)
      setData(res)

    } catch (err) {
      setError(`${err}`);

    } finally {
      setLoadings([false, false, false]);
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
            <Trans i18nKey="app.description" components={{ code: <code /> }} />
          </p>
        </div>
        {
          !loadings[0] ? <button type="button" className="counter" onClick={fetchCurrent}>{t('buttons.currentCoords')}</button> 
                  : <button type='button' className='counter'>{t('app.loading')}</button>
        }
        {
          !loadings[1] ? <button type="button" className="counter" onClick={() => setModalsOpen([true, false])}>{t('buttons.enterCoords')}</button> 
                  : <button type='button' className='counter'>{t('app.loading')}</button>
        }
        {
          !loadings[2] ? <button type="button" className="counter" onClick={() => setModalsOpen([false, true])}>{t('buttons.enterCity')}</button> 
                  : <button type='button' className='counter'>{t('app.loading')}</button>
        }

        <label className="toggle">
          <input
            type="checkbox"
            checked={persistEnabled}
            onChange={e => setPersistEnabled(e.target.checked)}
          />
          <span className="toggle-track">
            <span className="toggle-knob" />
          </span>
          <span className="toggle-label">{t('toggle.persistData')}</span>
        </label>

        <div className="lang-bar">
          <button
            className={`lang-btn${i18n.language === 'en' ? ' active' : ''}`}
            onClick={() => i18n.changeLanguage('en')}
          >
            {t('lang.en')}
          </button>
          <button
            className={`lang-btn${i18n.language === 'pt' ? ' active' : ''}`}
            onClick={() => i18n.changeLanguage('pt')}
          >
            {t('lang.pt')}
          </button>
          <button
            className={`lang-btn${i18n.language === 'ru' ? ' active' : ''}`}
            onClick={() => i18n.changeLanguage('ru')}
          >
            {t('lang.ru')}
          </button>
        </div>

        {
          !data ? t('app.tapButton') :
          <DataTable rows={[
            {
              name: t('table.temperature'),
              data: `${data.main.temp} °C`
            },
            {
              name: t('table.feelsLike'),
              data: `${data.main.feels_like} °C`
            },
            {
              name: t('table.weather'),
              data: `${capitalize(data.weather[0].description)}`
            },
            {
              name: t('table.city'),
              data: !data.name ? t('app.notFound') : `${data.name} - ${data.sys.country}`
            },
            {
              name: t('table.coordenates'),
              data: `${data.coord.lat}, ${data.coord.lon}`
            }
          ]} />
        }
      </section>


      <Modal
        open={modalsOpen[0]}
        title={t('modal.enterCoordsTitle')}
        onClose={() => setModalsOpen([false, false])}
        onSubmit={fetchByEnterCoords as ModalProps['onSubmit']}
        inputs={[
          {
            label: t('fields.latitude'),
            placeholder: t('placeholders.latitude'),
            type: 'number'
          },
          {
            label: t('fields.longitude'),
            placeholder: t('placeholders.longitude'),
            type: 'number'
          },
        ]}
      />

      <Modal
        open={modalsOpen[1]}
        title={t('modal.enterCityTitle')}
        onClose={() => setModalsOpen([false, false])}
        onSubmit={fetchByCityName as ModalProps['onSubmit']}
        inputs={[
          {
            label: t('fields.cityName'),
            placeholder: t('placeholders.cityName'),
            type: 'text'
          }
        ]}
      />
    </>
  )
}

export default App
