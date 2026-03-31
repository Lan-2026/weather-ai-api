# weather-ai-api

A Node.js REST API built with Express, featuring weather data, AI-powered chat, user management, Redis caching, and AWS Lambda deployment.

## Features

- Weather lookup by city (Open-Meteo API)
- AI chat and AI weather explanation (Groq / LLaMA)
- User management with JWT authentication
- Redis caching with stale-while-revalidate
- Rate limiting middleware
- Deployed to AWS Lambda via SAM

## Tech Stack

- **Runtime:** Node.js
- **Framework:** Express
- **AI:** Groq (LLaMA 3.3 70b) via OpenAI SDK
- **Cache:** Redis
- **Auth:** JWT
- **Deploy:** AWS Lambda + API Gateway (SAM)

## Getting Started

### Prerequisites

- Node.js 20+
- Docker (for Redis)
- AWS SAM CLI (for deployment)

### Installation

```bash
npm install
```

### Environment Variables

Create a `.env` file:

```env
PORT=3000
REDIS_URL=redis://localhost:6379
GROQ_API_KEY=your_groq_api_key_here
AI_MODEL=llama-3.3-70b-versatile
AI_BASE_URL=https://api.groq.com/openai/v1
CACHE_TTL_MS=300000
MAX_CACHE_SIZE=3
RATE_LIMIT_WINDOW_SECONDS=60
RATE_LIMIT_MAX_REQUESTS=5
```

Get a free Groq API key at https://console.groq.com/keys

### Start Redis

```bash
docker run --name my-redis -p 6379:6379 -d redis
```

### Run Locally

```bash
npm run dev
```

## API Endpoints

### Weather

| Method | Endpoint                  | Description            |
| ------ | ------------------------- | ---------------------- |
| GET    | `/weather?city=Melbourne` | Get weather for a city |

### AI

| Method | Endpoint      | Body                      | Description            |
| ------ | ------------- | ------------------------- | ---------------------- |
| POST   | `/ai/chat`    | `{ "message": "hello" }`  | Chat with AI           |
| POST   | `/ai/weather` | `{ "city": "Melbourne" }` | AI weather explanation |

### Users

| Method | Endpoint       | Auth | Description              |
| ------ | -------------- | ---- | ------------------------ |
| POST   | `/users/login` | No   | Login, returns JWT token |
| GET    | `/users`       | JWT  | Get all users            |
| POST   | `/users`       | JWT  | Create a user            |
| GET    | `/users/:id`   | No   | Get user by ID           |

### Authentication

Include the JWT token in the `Authorization` header:

```
Authorization: Bearer <token>
```

## Deployment (AWS Lambda)

```bash
sam build
sam deploy --guided
```

## Project Structure

```
src/
├── app.js                  # Express app setup
├── server.js               # Local server entry point
├── lambda.js               # AWS Lambda handler
├── config/
│   ├── index.js            # Config from env vars
│   └── redisClient.js      # Redis client
├── controllers/            # Route handlers
├── services/               # Business logic
├── middleware/             # Logger, auth, rate limiter
├── routes/                 # Route definitions
└── utils/                  # asyncHandler, AppError, logger
```
