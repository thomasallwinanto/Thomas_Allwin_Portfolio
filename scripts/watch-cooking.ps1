<#
Generates assets/cooking/index.json from files in assets/cooking/
Usage:
  # one-off generation
  .\watch-cooking.ps1

  # generate then watch for changes (keeps running)
  .\watch-cooking.ps1 -Watch
#>
param(
  [switch]$Watch
)

$root = Split-Path -Parent $MyInvocation.MyCommand.Path
$assetsDir = Join-Path $root '..\assets\cooking' | Resolve-Path -Relative
$manifestPath = Join-Path $root '..\assets\cooking\index.json' | Resolve-Path -Relative

function Write-Manifest {
    try {
        $files = Get-ChildItem -Path (Join-Path $root '..\assets\cooking') -File -Include *.jpg,*.jpeg,*.png | Sort-Object Name
        $names = $files | ForEach-Object { $_.Name }
        $json = $names | ConvertTo-Json -Depth 1
        $outPath = Join-Path $root '..\assets\cooking\index.json'
        Set-Content -Path $outPath -Value $json -Encoding UTF8
        Write-Host "[watch-cooking] Wrote manifest with $($names.Count) files to assets/cooking/index.json"
    } catch {
        Write-Host "[watch-cooking] Error generating manifest:`n$_" -ForegroundColor Red
    }
}

Write-Manifest

if($Watch){
    Write-Host "[watch-cooking] Watching assets/cooking for changes. Press Ctrl+C to stop."
    $fsw = New-Object System.IO.FileSystemWatcher
    $fsw.Path = (Join-Path $root '..\assets\cooking')
    $fsw.Filter = '*.*'
    $fsw.IncludeSubdirectories = $false
    $fsw.EnableRaisingEvents = $true

    $action = { Write-Host "[watch-cooking] Change detected: $($Event.SourceEventArgs.FullPath)"; Start-Sleep -Milliseconds 200; Write-Manifest }
    $registered = Register-ObjectEvent $fsw Created -Action $action
    Register-ObjectEvent $fsw Changed -Action $action | Out-Null
    Register-ObjectEvent $fsw Deleted -Action $action | Out-Null
    Register-ObjectEvent $fsw Renamed -Action $action | Out-Null

    try{
        while ($true) { Start-Sleep -Seconds 1 }
    } finally {
        Unregister-Event -SourceIdentifier $registered.Name -ErrorAction SilentlyContinue
        $fsw.Dispose()
    }
}
