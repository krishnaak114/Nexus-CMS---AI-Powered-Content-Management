@echo off
echo.
echo ====================================
echo   NEXUS CMS - Starting Development
echo ====================================
echo.

cd /d "%~dp0"

echo [1/3] Checking environment...
if not exist ".env.local" (
    echo ERROR: .env.local not found!
    echo Please copy .env.example to .env.local
    pause
    exit /b 1
)

echo [2/3] Checking database...
if not exist "dev.db" (
    echo Creating database...
    call npx prisma db push
)

echo [3/3] Starting server...
echo.
echo ============================================
echo   Server starting at http://localhost:3000
echo ============================================
echo.
echo Press Ctrl+C to stop the server
echo.

npm run dev
