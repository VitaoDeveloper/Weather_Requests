# Weather Requests

A React application that fetches and displays current weather data from the [OpenWeather API](https://openweathermap.org/api). Users can search by city name, enter coordinates manually, or auto-detect their location via the browser's Geolocation API.

## Features

- **Three fetch methods**: auto-detect current location, enter coordinates, or search by city name
- **Responsive data table**: displays temperature, feels-like, weather description, city/country, and coordinates
- **Internationalization (i18n)**: English and Portuguese (Brazil) with a language toggle
- **Persistence toggle**: optionally saves API responses to `localStorage`
- **Dark mode**: adapts to the system's `prefers-color-scheme`
- **Accessible modals**: built with Radix UI Dialog
- **Loading states**: each fetch method has its own loading indicator

## Tech Stack

| Layer | Technology |
|---|---|
| Language | TypeScript |
| UI Library | React 19 |
| Build tool | Vite 8 |
| HTTP client | Axios |
| UI Components | Material-UI 4 (table), Radix UI Dialog (modals) |
| i18n | i18next + react-i18next |
| Linting | ESLint + typescript-eslint |
| Package manager | pnpm |

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (latest LTS recommended)
- [pnpm](https://pnpm.io/)
- A free API key from [OpenWeather](https://openweathermap.org/api)

### Installation

```bash
# Clone the repository
git clone <repo-url>
cd Weather_Requests

# Install dependencies
pnpm install

# Set up your environment variables
cp .env.example .env
# Edit .env and add your OpenWeather API key:
# VITE_OPEN_WEATHER_API_KEY=your_api_key_here
```

### Development

```bash
pnpm dev
```

The app will be available at `http://localhost:5173`.

### Build

```bash
pnpm build
```

### Preview Production Build

```bash
pnpm preview
```

## Environment Variables

| Variable | Description |
|---|---|
| `VITE_OPEN_WEATHER_API_KEY` | Your OpenWeather API key (required) |

## Project Structure

```
src/
├── api/          # Axios client and API functions
├── assets/       # Static assets (logo)
├── components/   # DataTable and Modal components
├── locales/      # i18n configuration and translation files
├── modules/      # Utility modules
├── types/        # TypeScript type definitions
├── utils/        # Helper functions
├── App.tsx       # Root component with main logic
├── App.css       # Component styles
├── index.css     # Global styles and CSS variables
└── main.tsx      # Application entry point
```