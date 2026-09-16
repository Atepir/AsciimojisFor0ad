<!-- Title -->
<div align="center">

# AsciimojisFor0ad

<p>
<a href="https://github.com/Atepir/AsciimojisFor0ad/releases"><img src="https://img.shields.io/github/release/Atepir/AsciimojisFor0ad.svg?style=for-the-badge&color=gold&label=Version" height="20"></a>
<a href="https://play0ad.com/download/"><img src="https://img.shields.io/badge/Compatibility-A28-gold?style=for-the-badge" height="20"></a>
<a href=""><img src="https://img.shields.io/github/downloads/Atepir/AsciimojisFor0ad/total.svg?color=gold&amp&label=%E2%88%91%20Downloads&amp&style=for-the-badge" height="20"></a>
<a href="https://wildfiregames.com/forum/topic/110806-chat-modding-asciimojis"><img src="https://img.shields.io/badge/Discussion-Forum-gold?style=for-the-badge" height="20"></a>
</p>

<p>
<!-- dev badges -->
<a href="https://github.com/Atepir/AsciimojisFor0ad/commits/main"><img src="https://img.shields.io/github/commits-since/Atepir/AsciimojisFor0ad/latest/main?style=for-the-badge" height="20"></a>
<a href="https://github.com/Atepir/AsciimojisFor0ad/graphs/contributors"><img src="https://img.shields.io/maintenance/yes/2026?style=for-the-badge" height="20"></a>
<a href="https://github.com/Atepir/AsciimojisFor0ad/commits/main"><img src="https://img.shields.io/github/commit-activity/m/Atepir/AsciimojisFor0ad?style=for-the-badge" height="20"></a>
</p>

</div>

This is a mod for 0ad which provides Asciimojis and Emojis.

Requires 0 A.D. 0.28 (Alpha 28).

Writing `:lenny:` in 0ad for this awesome guy ( ͡° ͜ʖ ͡°) may be pretty good :)

Asciimojis are available in the lobby chat, game prepare, and in-game for both those who have and haven't the mod installed.

Because it still in developpement, please feel free to report me any error you find to atepir0\<at\>gmail.com.

## Features
This is a list of the currently available Asciimojis preceeded by the command displaying them :

- `angry` `•``_``•`
- `blackeye` `0__#`
- `blubby` `( 0 _ 0 )`
- `bored` `(-_-)`
- `claro` `(͡ ° ͜ʖ ͡ °)`
- `dope` `<(^_^)>`
- `dunno` `¯\\(°_o)/¯`
- `eeriemob` `(-(-_-(-_(-_(-_-)_-)-_-)_-)_-)-)`
- `endure` `(҂◡_◡) ᕤ`
- `flor` `(✿◠‿◠)`
- `glasseoff` `( ͡° ͜ʖ ͡°)ﾉ⌐■-■`
- `hello` `(ʘ‿ʘ)/`
- `help` `\\(°Ω°)/`
- `lenny` `( ͡° ͜ʖ ͡°)`
- `lennygang` `( ͡°( ͡° ͜ʖ( ͡° ͜ʖ ͡°)ʖ ͡°) ͡°)`
- `lennystrong` `ᕦ( ͡° ͜ʖ ͡°)ᕤ`
- `lol` `L(° O °L)`
- `love` `♥‿♥`
- `nerd` `(⌐⊙_⊙)`
- `nice` `( ͡° ͜ °)`
- `really` `ò_ô`
- `sadlenny` `( ͡° ʖ̯ ͡°)`
- `thanks` `\\(^-^)/`
- `this` `( ͡° ͜ʖ ͡°)_/¯`
- `yolo` `Yᵒᵘ Oᶰˡʸ Lᶤᵛᵉ Oᶰᶜᵉ`
- `zombie` `[¬º-°]¬` 

## Emojis
Real (colored) emojis are also available, written with the same syntax : for instance `:smile:`, `:fire:` or `:elephant:`.
The full list is in [tools/emojis.json](tools/emojis.json).
The asciimojis listed above are also displayed as a picture (writing `:lenny:` shows a picture instead of the ascii art).

How it works:
- The game engine cannot draw emoji characters (😀 and friends): its font renderer only handles 16 bit codepoints, and none of the fonts it ships contains an emoji glyph. Emojis are therefore drawn as inline pictures, using the `[icon]` tag of the GUI. It also means that only the players who have the mod installed can see them.
- What is sent over the network is the asciimoji itself, so players that don't have the mod still see it exactly as before. Emojis that have no asciimoji equivalent are sent as their `:name:`.
- Emojis are displayed in the in-game chat, in the game setup chat and in the lobby chat.

Emojis can be disabled by setting `asciimojis.emojis = false` in the user config file (`%APPDATA%\0ad\config\user.cfg` on Windows): the asciimojis and the `:name:` of the emojis are then displayed as plain text.

The pictures come from [twemoji](https://github.com/jdecked/twemoji) (CC-BY 4.0).
To add or change an emoji, edit [tools/emojis.json](tools/emojis.json) and the `g_AsciimojisEmoji`/`g_AsciimojisAsciiArt` lists of `gui/common/global~asciimojis.js`, then run:

```
powershell -ExecutionPolicy Bypass -File tools/fetch-emoji-assets.ps1
```

This downloads the pictures into `art/textures/ui/asciimojis/` and regenerates the three files that register the icons: `gui/common/resources/setup_asciimojis_icons.xml` (in-game chat), `gui/lobby/icons/asciimojis.xml` (lobby chat) and `gui/gamesetup/setup.xml` (game setup chat). The last one replaces a file of the game (the game includes it as a file and not as a directory), which is why the generator keeps its vanilla content.

## Guide to installation
1. Download the latest release from the [releases page](https://github.com/Atepir/AsciimojisFor0ad/releases).

2. Launch the .pyromod file with 0ad.