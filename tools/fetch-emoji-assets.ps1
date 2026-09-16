<#
.SYNOPSIS
    Downloads the emoji pictures of this mod and generates the GUI XML files
    that register them as [icon] tags.

.DESCRIPTION
    Emojis are rendered by the game as inline images, because its font
    renderer cannot draw the emoji characters themselves (the glyph map of
    the engine is limited to 16 bit codepoints, and its fonts have no emoji
    glyph anyway).

    For every emoji of tools/emojis.json, this script:
      1. downloads the twemoji png (https://github.com/jdecked/twemoji,
         CC-BY 4.0) into art/textures/ui/asciimojis/<codepoint>.png, resized
         to twice the size used in game (crisper with a GUI scale of 2);
      2. writes the two <setup> files that register one icon per emoji:
           gui/common/resources/setup_asciimojis_icons.xml  (in-game chat)
           gui/lobby/icons/asciimojis.xml                   (lobby chat)
         both directories being included by the corresponding GUI page.

    The list of emoji names must be kept in sync with g_AsciimojisEmoji and
    g_AsciimojisAsciiArt of gui/common/global~asciimojis.js; the script warns
    about any difference.

.PARAMETER SkipDownload
    Only regenerate the XML files, without touching the png files.

.PARAMETER Check
    Fail (exit 1) instead of warning when the emoji lists of
    gui/common/global~asciimojis.js and tools/emojis.json disagree.
    Used by the CI.

.EXAMPLE
    powershell -ExecutionPolicy Bypass -File tools/fetch-emoji-assets.ps1
#>

[CmdletBinding()]
param(
    [switch]$SkipDownload,
    [switch]$Check
)

$ErrorActionPreference = "Stop"

# A real tab character, used to indent the generated XML.
$tab = "`t"

$modPath = Split-Path -Parent (Split-Path -Parent $MyInvocation.MyCommand.Path)
$jsonPath = Join-Path $modPath "tools/emojis.json"
$jsPath = Join-Path $modPath "gui/common/global~asciimojis.js"
$imagePath = Join-Path $modPath "art/textures/ui/asciimojis"
$iconsXml = @(
    (Join-Path $modPath "gui/common/resources/setup_asciimojis_icons.xml"),
    (Join-Path $modPath "gui/lobby/icons/asciimojis.xml"),
    (Join-Path $modPath "gui/gamesetup/setup.xml")
)

# Size of the png, in pixels, and size used by the game, in GUI pixels.
$textureSize = 28
$iconSize = "14 14"
$twemojiVersion = "15.1.0"
$twemojiUrl = "https://cdn.jsdelivr.net/gh/jdecked/twemoji@$twemojiVersion/assets/72x72"

Add-Type -AssemblyName System.Drawing

$emojis = Get-Content $jsonPath -Raw | ConvertFrom-Json
$allEmojis = [ordered]@{}
foreach ($group in @("emoji", "asciiart"))
{
    foreach ($entry in $emojis.$group.PSObject.Properties)
    {
        $allEmojis[$entry.Name] = $entry.Value
    }
}

if (-not (Test-Path $imagePath))
{
    New-Item -ItemType Directory -Path $imagePath -Force | Out-Null
}

function Resize-EmojiPng([string]$source, [string]$destination, [int]$size)
{
    $image = [System.Drawing.Image]::FromFile($source)
    try
    {
        $bitmap = New-Object System.Drawing.Bitmap($size, $size)
        $graphics = [System.Drawing.Graphics]::FromImage($bitmap)
        try
        {
            $graphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
            $graphics.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
            $graphics.DrawImage($image, 0, 0, $size, $size)
        }
        finally
        {
            $graphics.Dispose()
        }
        $bitmap.Save($destination, [System.Drawing.Imaging.ImageFormat]::Png)
        $bitmap.Dispose()
    }
    finally
    {
        $image.Dispose()
    }
}

if (-not $SkipDownload)
{
    foreach ($emoji in $allEmojis.Keys)
    {
        $codepoint = $allEmojis[$emoji]
        $destination = Join-Path $imagePath "$codepoint.png"
        if (Test-Path $destination)
        {
            Write-Host "keep    $emoji ($codepoint)"
            continue
        }

        $temporary = Join-Path $env:TEMP "asciimojis-$codepoint-72.png"
        try
        {
            Write-Host "fetch   $emoji ($codepoint)"
            Invoke-WebRequest -Uri "$twemojiUrl/$codepoint.png" -OutFile $temporary -UseBasicParsing
            Resize-EmojiPng $temporary $destination $textureSize
        }
        catch
        {
            Write-Warning "Could not fetch $emoji ($codepoint): $_"
        }
        finally
        {
            Remove-Item $temporary -ErrorAction SilentlyContinue
        }
    }
}

# The icons have to be registered by every GUI page that displays chat lines.
#   gui/common/resources/   directory included by page_session.xml,
#   gui/lobby/icons/        directory included by page_lobby.xml,
#   gui/gamesetup/setup.xml included as a file by page_gamesetup.xml, hence the
#                           override, whose vanilla content is kept below.
$iconLines = @()
foreach ($emoji in $allEmojis.Keys)
{
    $iconLines += "	<icon name=`"icon_asciimoji_$emoji`" sprite=`"stretched:asciimojis/$($allEmojis[$emoji]).png`" size=`"$iconSize`"/>"
}

$vanillaGamesetup = @(
    '',
    '<!-- Vanilla 0.28.0 content of gui/gamesetup/setup.xml, kept because this',
    '     file replaces it (it is included as a file, not as a directory). -->',
    '<tooltip',
    '	name="onscreenToolTip"',
    '	use_object="onscreenToolTip"',
    '	delay="0"',
    '	hide_object="true"',
    '/>'
)

$targets = @(
    @{
        "file" = $iconsXml[0]
        "comment" = @('	Included as a directory by page_session.xml (in-game chat).')
        "extra" = @()
    },
    @{
        "file" = $iconsXml[1]
        "comment" = @('	Included as a directory by page_lobby.xml (lobby chat).')
        "extra" = @()
    },
    @{
        "file" = $iconsXml[2]
        "comment" = @(
            '	Included as a file by page_gamesetup.xml (game setup chat): this file replaces',
            '	the vanilla one, so the content the game expects here is kept as well.'
        )
        "extra" = $vanillaGamesetup
    }
)

foreach ($target in $targets)
{
    $lines = @('<?xml version="1.0" encoding="utf-8"?>', '<!--')
    $lines += $target["comment"]
    $lines += $tab + 'Generated by tools/fetch-emoji-assets.ps1 from tools/emojis.json - do not edit by hand.'
    $lines += @('-->', '<setup>')
    $lines += $iconLines
    $lines += $target["extra"]
    $lines += '</setup>'

    $file = $target["file"]
    $directory = Split-Path -Parent $file
    if (-not (Test-Path $directory))
    {
        New-Item -ItemType Directory -Path $directory -Force | Out-Null
    }
    # No BOM and LF line endings, so that the file is byte-identical on any
    # platform (the CI checks that the committed files match this output).
    [System.IO.File]::WriteAllText($file, ($lines -join "`n") + "`n", (New-Object System.Text.UTF8Encoding($false)))
    Write-Host ("wrote   {0}" -f $file)
}

# Warn about emojis that are not in sync with the js dictionary.
$js = Get-Content $jsPath -Raw
$declared = @()
foreach ($group in @("g_AsciimojisEmoji", "g_AsciimojisAsciiArt"))
{
    $match = [regex]::Match($js, "$group = \[(.*?)\];", "Singleline")
    if ($match.Success)
    {
        $declared += [regex]::Matches($match.Groups[1].Value, '"(\w+)"') | ForEach-Object { $_.Groups[1].Value }
    }
}

$missing = @($declared | Where-Object { -not $allEmojis.Contains($_) } | Select-Object -Unique)
$extra = @($allEmojis.Keys | Where-Object { $declared -notcontains $_ })
if ($missing.Count -or $extra.Count)
{
    Write-Warning "gui/common/global~asciimojis.js and tools/emojis.json are out of sync."
    if ($missing.Count) { Write-Warning "  in the js but not in the json: $($missing -join ', ')" }
    if ($extra.Count) { Write-Warning "  in the json but not in the js: $($extra -join ', ')" }
    if ($Check) { exit 1 }
}
else
{
    Write-Host "in sync: $($allEmojis.Count) emojis"
}
