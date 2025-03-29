@echo off
echo Starting Food Products Service...

docker-compose up -d

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