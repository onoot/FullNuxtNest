# Сервис управления продуктами питания

## Архитектура проекта

### Микросервисная архитектура

```mermaid
graph TD
    Client[Web Client] --> API[API Gateway]
    API --> ProductService[Product Service]
    ProductService --> MongoDB[(MongoDB)]
    Client --> Swagger[Swagger UI]
    Swagger --> API
    
    style Client fill:#f9f,stroke:#333,stroke-width:2px
    style API fill:#bbf,stroke:#333,stroke-width:2px
    style ProductService fill:#bfb,stroke:#333,stroke-width:2px
    style MongoDB fill:#fbb,stroke:#333,stroke-width:2px
    style Swagger fill:#fbf,stroke:#333,stroke-width:2px
```

### Компоненты системы

#### 1. Frontend (Nuxt 3)
- **Порт**: 5000
- **Компоненты**:
  - ProductList: Отображение списка продуктов с пагинацией
  - ProductForm: Форма создания/редактирования продукта
- **Особенности**:
  - TypeScript для типобезопасности
  - SCSS для стилизации
  - Компонентный подход
  - Адаптивный дизайн

#### 2. Backend (NestJS)
- **Порт**: 3000
- **Модули**:
  - ProductsModule: Управление продуктами
- **Слои**:
  - Controllers: Обработка HTTP-запросов
  - Services: Бизнес-логика
  - Schemas: Модели данных MongoDB
- **Особенности**:
  - REST API
  - Swagger документация
  - Валидация данных
  - Пагинация

#### 3. База данных (MongoDB)
- **Порт**: 27017
- **База данных**: food-products
- **Коллекции**:
  - products: Хранение информации о продуктах
- **Индексы**:
  - name: Для быстрого поиска по названию
  - category: Для фильтрации по категориям

#### 4. Swagger UI
- **Порт**: 4000
- **URL**: http://localhost:4000/api-docs
- **Особенности**:
  - Интерактивная документация API
  - Возможность тестирования endpoints
  - Полное описание моделей данных
  - Автоматическая валидация запросов

### Безопасность и масштабируемость

#### Безопасность
- CORS защита для API
- Валидация входных данных
- Типизация данных на всех уровнях

#### Масштабируемость
- Пагинация для больших наборов данных
- Индексация MongoDB
- Кэширование на уровне API
- Возможность горизонтального масштабирования

## Реализованные функции

### API Endpoints
- GET /products - получение списка продуктов с пагинацией
- GET /products/:id - получение информации о конкретном продукте
- POST /products - создание нового продукта
- PUT /products/:id - обновление существующего продукта
- DELETE /products/:id - удаление продукта

### Модель продукта
```typescript
interface Product {
  _id: string;
  name: string;
  price: number;
  category: string;
  description: string;
  quantity: number;
}
```

## Запуск проекта

### Через Docker (рекомендуемый способ)
```bash
# Запуск всех сервисов через Docker Compose
./start.bat
```

После запуска будут доступны:
- Frontend: http://localhost:5000
- Backend API: http://localhost:3000
- Swagger UI: http://localhost:4000/api-docs
- MongoDB: mongodb://localhost:27017

### Ручной запуск

#### Требования
- Node.js 16+
- MongoDB 4+
- Docker (опционально)

#### 1. MongoDB
```bash
# Запуск MongoDB локально
mongod --dbpath ./data/db
```

#### 2. Backend
```bash
cd api
npm install
npm run seed # заполнение базы тестовыми данными
npm run start:dev
```

#### 3. Frontend
```bash
cd frontend
npm install
npm run dev
```

#### 4. Swagger UI
```bash
cd swagger
npm install
npm start
```

## Docker контейнеры

Проект разбит на отдельные контейнеры:

### 1. MongoDB контейнер
- Образ: mongo:4
- Порт: 27017:27017
- Volumes: mongodb_data:/data/db

### 2. Backend контейнер
- Образ: node:16
- Порт: 3000:3000
- Зависимости: mongodb

### 3. Frontend контейнер
- Образ: node:16
- Порт: 5000:5000
- Зависимости: backend

### 4. Swagger UI контейнер
- Образ: node:16
- Порт: 4000:4000
- Зависимости: backend

## API Documentation
Swagger документация доступна по адресу: http://localhost:4000/api-docs

## Технологический стек
- NestJS
- MongoDB
- Nuxt 3
- TypeScript
- SCSS
- Swagger UI
- Docker
- Docker Compose

## Дальнейшие улучшения
1. Добавление аутентификации и авторизации
2. Реализация кэширования с Redis
3. Добавление системы логирования
4. Внедрение CI/CD
5. Добавление тестов (unit, e2e)
6. Контейнеризация с Docker 