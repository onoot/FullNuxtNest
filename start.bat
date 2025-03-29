@echo off
echo Starting Food Products Service...

REM Проверка и освобождение портов
echo Checking and freeing ports...
for /f "tokens=5" %%a in ('netstat -aon ^| find ":3000" ^| find "LISTENING"') do taskkill /f /pid %%a >nul 2>&1
for /f "tokens=5" %%a in ('netstat -aon ^| find ":4000" ^| find "LISTENING"') do taskkill /f /pid %%a >nul 2>&1
for /f "tokens=5" %%a in ('netstat -aon ^| find ":5000" ^| find "LISTENING"') do taskkill /f /pid %%a >nul 2>&1
timeout /t 2 /nobreak >nul

REM Остановка и удаление старых контейнеров
echo Stopping and removing old containers...
docker-compose down --remove-orphans

REM Запуск новых контейнеров
echo Starting new containers...
docker-compose up -d --build

echo.
echo Services are starting:
echo Frontend: http://localhost:5000
echo Backend API: http://localhost:3000
echo Swagger UI: http://localhost:4000/api-docs
echo MongoDB: mongodb://localhost:27017
echo.
echo Press any key to view logs...
pause > nul

docker-compose logs -f 