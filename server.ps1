$port = 8080
$root = (Get-Location).Path
$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://*:$port/")
$listener.Start()

Write-Host "Server running at http://localhost:$port"

try {
    while ($listener.IsListening) {
        $context = $listener.GetContext()
        $request = $context.Request
        $response = $context.Response

        $path = $request.Url.LocalPath
        if ($path -eq "/") { $path = "/index.html" }
        
        $localPath = Join-Path -Path $root -ChildPath $path.Replace("/", "\")
        $localPath = [System.IO.Path]::GetFullPath($localPath)

        if ((Test-Path -Path $localPath) -and ($localPath.StartsWith($root))) {
            $ext = [System.IO.Path]::GetExtension($localPath).ToLower()
            $mime = "application/octet-stream"
            switch ($ext) {
                ".html" { $mime = "text/html" }
                ".htm" { $mime = "text/html" }
                ".css" { $mime = "text/css" }
                ".js" { $mime = "application/javascript" }
                ".jpg" { $mime = "image/jpeg" }
                ".jpeg" { $mime = "image/jpeg" }
                ".png" { $mime = "image/png" }
                ".gif" { $mime = "image/gif" }
                ".m4a" { $mime = "audio/mp4" }
                ".mp4" { $mime = "video/mp4" }
            }
            $response.ContentType = $mime

            $bytes = [System.IO.File]::ReadAllBytes($localPath)
            $response.ContentLength64 = $bytes.Length
            $response.OutputStream.Write($bytes, 0, $bytes.Length)
        } else {
            $response.StatusCode = 404
        }
        $response.Close()
    }
} finally {
    $listener.Stop()
}
