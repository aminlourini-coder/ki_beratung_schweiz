param(
  [string]$InputDir = "c:\\Projects\\ki_beratung_schweiz-main\\assets\\images",
  [int]$Quality = 82
)

# Checks: ImageMagick available?
$magick = Get-Command magick -ErrorAction SilentlyContinue
if (-not $magick) {
  Write-Host "ImageMagick (magick) not found. Install with:" -ForegroundColor Yellow
  Write-Host "winget install ImageMagick.ImageMagick" -ForegroundColor Cyan
  exit 1
}

if (-not (Test-Path $InputDir)) {
  Write-Error "Input directory not found: $InputDir"
  exit 1
}

# Create WebP versions next to PNG/JPG if missing or older
Get-ChildItem -Path $InputDir -Recurse -Include *.png, *.jpg, *.jpeg | ForEach-Object {
  $src = $_.FullName
  $webp = [System.IO.Path]::ChangeExtension($src, ".webp")

  $needsConvert = $true
  if (Test-Path $webp) {
    $srcTime = (Get-Item $src).LastWriteTimeUtc
    $dstTime = (Get-Item $webp).LastWriteTimeUtc
    if ($dstTime -ge $srcTime) { $needsConvert = $false }
  }

  if ($needsConvert) {
    Write-Host "Converting ->" $_.Name "to WebP" -ForegroundColor Green
    magick "$src" -quality $Quality -define webp:method=6 "$webp"
  } else {
    Write-Host "Up-to-date   " $_.Name -ForegroundColor DarkGray
  }
}

Write-Host "Done. You can now reference .webp via <picture> with PNG fallback." -ForegroundColor Green
