$ErrorActionPreference = 'Stop'
$siteRoot = Split-Path -Parent $PSScriptRoot
$compiler = (Get-Command pdflatex -ErrorAction Stop).Source
$buildDirectory = Join-Path $siteRoot '_local_preview\latex'
$pdfDirectory = Join-Path $siteRoot 'assets\pdf\notes'
New-Item -ItemType Directory -Force -Path $buildDirectory, $pdfDirectory | Out-Null
Push-Location $PSScriptRoot
try {
    foreach ($note in @('what-is-optimization', 'black-box-optimization', 'local-methods', 'first-order-methods', 'spo-two-stage', 'fisher-markets')) {
        foreach ($pass in 1..2) {
            $compilerOutput = & $compiler '-interaction=nonstopmode' '-halt-on-error' '-file-line-error' "-output-directory=$buildDirectory" "$note.tex" 2>&1
            if ($LASTEXITCODE -ne 0) {
                $compilerOutput | Select-Object -Last 35 | Write-Output
                throw "Compilation failed for $note on pass $pass."
            }
        }
        Copy-Item -LiteralPath (Join-Path $buildDirectory "$note.pdf") -Destination (Join-Path $pdfDirectory "$note.pdf")
        Write-Output "Compiled $note.pdf."
    }
} finally {
    Pop-Location
}
