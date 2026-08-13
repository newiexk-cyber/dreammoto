@echo off
echo ===================================================
echo   DREAM MOTO NIGHT RIDE - STATIC WEB PREVIEW
echo ===================================================
echo   Dang khoi chay Web Server Tinh tai http://localhost:8000 ...
echo.
python -m http.server 8000 --directory "%~dp0"
pause
