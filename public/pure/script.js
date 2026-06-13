const apiKey = '10bb43980a5ce451e854eaa3a93ea4de';
// Mapeamento dos Componentes do Documento
const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn');
const geoBtn = document.getElementById('geo-btn');
const weatherCard = document.getElementById('weather-card');
const infoMsg = document.getElementById('info-msg');
let currentTempCelsius = 0;
let isCelsius = true;
// Monitoramento de Eventos Ativadores
searchBtn.addEventListener('click', () => fetchWeather(searchInput.value));
searchInput.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') fetchWeather(searchInput.value);
});
// Inicialização por Geolocalização Nativa
geoBtn.addEventListener('click', () => {
    if (navigator.geolocation) {
        infoMsg.textContent = "Localizando dispositivo...";
        navigator.geolocation.getCurrentPosition(
            (position) => {

                const { latitude, longitude } = position.coords;
                fetchWeatherByCoords(latitude, longitude);

            },
            () => { showError("Acesso à localização negado."); }
        );
    } else {
        showError("Geolocalização indisponível no navegador.");
    }
});
// Gerenciamento das Unidades
document.getElementById('unit-c').addEventListener('click', (e) => toggleUnit(true,
    e.target));
document.getElementById('unit-f').addEventListener('click', (e) =>
    toggleUnit(false, e.target));
// Requisição por Termo de Cidade
async function fetchWeather(city) {
    if (!city.trim()) return;

    clearError();
    const url = `https://api.openweathermap.org/data/2.5/weather?q=$
{encodeURIComponent(city)}&appid=${apiKey}&units=metric&lang=pt_br`;
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error("Cidade não localizada.");
        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        showError(error.message);
    }
}
// Requisição por Coordenadas (GPS)
async function fetchWeatherByCoords(lat, lon) {
    clearError();
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=$
{lon}&appid=${apiKey}&units=metric&lang=pt_br`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        showError("Erro de rede ao obter coordenadas.");
    }
}
// Atualização de Layout Dinâmico
function displayWeather(data) {
    weatherCard.style.display = 'none';
    setTimeout(() => {
        document.getElementById('city-name').textContent = `${data.name}, $
{data.sys.country}`;
        currentTempCelsius = data.main.temp;
        updateTemperatureDisplay();
        document.getElementById('description').textContent =
            data.weather[0].description;
        document.getElementById('humidity').textContent = `${data.main.humidity}
%`;
        document.getElementById('wind-speed').textContent = `${Math.round(data.wind.speed
            * 3.6)} km/h`;
        const iconCode = data.weather[0].icon;

        document.getElementById('weather-icon').src = `https://openweathermap.org/
img/wn/${iconCode}@2x.png`;
        weatherCard.style.display = 'block';
    }, 50);
}
function updateTemperatureDisplay() {
    const tempElement = document.getElementById('temperature');
    if (isCelsius) {
        tempElement.textContent = `${Math.round(currentTempCelsius)}°C`;
    } else {
        const fahrenheit = (currentTempCelsius * 9 / 5) + 32;
        tempElement.textContent = `${Math.round(fahrenheit)}°F`;
    }
}
function toggleUnit(toCelsius, element) {
    if (isCelsius === toCelsius) return;
    isCelsius = toCelsius;
    document.querySelectorAll('.unit-toggle span').forEach(span =>
        span.classList.remove('active'));
    element.classList.add('active');
    if (weatherCard.style.display === 'block') updateTemperatureDisplay();
}
function showError(msg) {
    infoMsg.textContent = msg; weatherCard.style.display =
        'none';
}
function clearError() { infoMsg.textContent = ""; }