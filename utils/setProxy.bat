@echo off
REM === Set HTTP and HTTPS proxy ===
SET http_proxy=http://proxy.example.com:8080
SET https_proxy=http://proxy.example.com:8080

REM === Optional: Set proxy for FTP or other protocols ===
SET ftp_proxy=http://proxy.example.com:8080

REM === Optional: Set no_proxy for local addresses ===
SET no_proxy=localhost,127.0.0.1,.example.local

echo Proxy settings applied.
pause
