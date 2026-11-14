# Local static server for the prototype (PowerShell, Windows).
# Usage: powershell -ExecutionPolicy Bypass -File tools/serve.ps1 [-Port 8000]

param(
    [int]$Port = 8000
)

$ErrorActionPreference = "Stop"
$root = Split-Path -Parent $PSScriptRoot
$listener = [System.Net.HttpListener]::new()
$listener.Prefixes.Add("http://localhost:$Port/")
$listener.Start()

Write-Host "Organic Maps MD3 prototype: http://localhost:$Port/prototype/index.html"
Write-Host "Press Ctrl+C to stop."

$mime = @{
    ".html" = "text/html; charset=utf-8"
    ".css"  = "text/css; charset=utf-8"
    ".js"   = "text/javascript; charset=utf-8"
    ".json" = "application/json; charset=utf-8"
    ".svg"  = "image/svg+xml"
    ".png"  = "image/png"
    ".woff2" = "font/woff2"
}

try {
    while ($listener.IsListening) {
        $context = $listener.GetContext()
        $request = $context.Request
        $response = $context.Response

        $path = $request.Url.LocalPath.TrimStart("/")
        if ([string]::IsNullOrWhiteSpace($path)) { $path = "prototype/index.html" }

        $full = Join-Path $root ($path -replace "/", [IO.Path]::DirectorySeparatorChar)
        $resolved = [IO.Path]::GetFullPath($full)

        if (-not $resolved.StartsWith($root) -or -not (Test-Path $resolved -PathType Leaf)) {
            $response.StatusCode = 404
            $bytes = [Text.Encoding]::UTF8.GetBytes("Not found")
        } else {
            $ext = [IO.Path]::GetExtension($resolved).ToLower()
            if ($mime.ContainsKey($ext)) { $response.ContentType = $mime[$ext] }
            $bytes = [IO.File]::ReadAllBytes($resolved)
        }

        $response.ContentLength64 = $bytes.Length
        $response.OutputStream.Write($bytes, 0, $bytes.Length)
        $response.OutputStream.Close()
    }
} finally {
    $listener.Stop()
    $listener.Close()
}
