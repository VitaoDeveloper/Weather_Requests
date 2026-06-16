# Weather Requests

Um aplicativo React que busca e exibe dados meteorológicos atuais da [OpenWeather API](https://openweathermap.org/api). Os usuários podem pesquisar por nome da cidade, inserir coordenadas manualmente ou detectar automaticamente sua localização via Geolocation API do navegador.

## Funcionalidades

- **Três métodos de consulta**: detectar localização atual, inserir coordenadas ou pesquisar por nome da cidade
- **Tabela de dados responsiva**: exibe temperatura, sensação térmica, descrição do clima, cidade/país e coordenadas
- **Internacionalização (i18n)**: inglês e português (Brasil) com alternador de idioma
- **Opção de persistência**: salva respostas da API no `localStorage` opcionalmente
- **Modo escuro**: adapta-se à preferência de esquema de cores do sistema
- **Modais acessíveis**: construídos com Radix UI Dialog
- **Estados de carregamento**: cada método de consulta tem seu próprio indicador

## Tecnologias

| Camada | Tecnologia |
|---|---|
| Linguagem | TypeScript |
| Biblioteca UI | React 19 |
| Build | Vite 8 |
| Cliente HTTP | Axios |
| Componentes UI | Material-UI 4 (tabela), Radix UI Dialog (modais) |
| i18n | i18next + react-i18next |
| Linting | ESLint + typescript-eslint |
| Gerenciador de pacotes | pnpm |

## Como usar

### Pré-requisitos

- [Node.js](https://nodejs.org/) (última LTS recomendada)
- [pnpm](https://pnpm.io/)
- Uma chave de API gratuita da [OpenWeather](https://openweathermap.org/api)

### Instalação

```bash
# Clone o repositório
git clone <repo-url>
cd Weather_Requests

# Instale as dependências
pnpm install

# Configure as variáveis de ambiente
cp .env.example .env
# Edite o .env e adicione sua chave da OpenWeather:
# VITE_OPEN_WEATHER_API_KEY=sua_chave_api_aqui
```

### Desenvolvimento

```bash
pnpm dev
```

O aplicativo estará disponível em `http://localhost:5173`.

### Build

```bash
pnpm build
```

### Preview da Build de Produção

```bash
pnpm preview
```

## Variáveis de Ambiente

| Variável | Descrição |
|---|---|
| `VITE_OPEN_WEATHER_API_KEY` | Sua chave da API OpenWeather (obrigatória) |

## Estrutura do Projeto

```
src/
├── api/          # Cliente Axios e funções da API
├── assets/       # Recursos estáticos (logo)
├── components/   # Componentes DataTable e Modal
├── locales/      # Configuração de i18n e arquivos de tradução
├── modules/      # Módulos utilitários
├── types/        # Definições de tipos TypeScript
├── utils/        # Funções auxiliares
├── App.tsx       # Componente raiz com a lógica principal
├── App.css       # Estilos dos componentes
├── index.css     # Estilos globais e variáveis CSS
└── main.tsx      # Ponto de entrada da aplicação
```
