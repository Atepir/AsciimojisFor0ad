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

<p>
<!-- emoji showcase -->
<img src="art/textures/ui/asciimojis/1f60e.png" width="32" alt=":cool:">
<img src="art/textures/ui/asciimojis/1f525.png" width="32" alt=":fire:">
<img src="art/textures/ui/asciimojis/2694.png" width="32" alt=":swords:">
<img src="art/textures/ui/asciimojis/1f6e1.png" width="32" alt=":shield:">
<img src="art/textures/ui/asciimojis/1f3c6.png" width="32" alt=":trophy:">
<img src="art/textures/ui/asciimojis/1f3f0.png" width="32" alt=":castle:">
<img src="art/textures/ui/asciimojis/1f418.png" width="32" alt=":elephant:">
<img src="art/textures/ui/asciimojis/1f40e.png" width="32" alt=":horse:">
<img src="art/textures/ui/asciimojis/1f411.png" width="32" alt=":sheep:">
<img src="art/textures/ui/asciimojis/1f37b.png" width="32" alt=":beer:">
<img src="art/textures/ui/asciimojis/1f355.png" width="32" alt=":pizza:">
<img src="art/textures/ui/asciimojis/1f389.png" width="32" alt=":party:">
<img src="art/textures/ui/asciimojis/1f480.png" width="32" alt=":dead:">
<img src="art/textures/ui/asciimojis/1f921.png" width="32" alt=":clown:">
</p>

</div>

This is a mod for 0ad which provides Emojis and Asciimojis, because a game about building an empire deserves better than `:)`.

Requires 0 A.D. 0.28 (Alpha 28).

Emojis are the point of this mod : 70 of them hide behind a `:name:` command and are drawn as real pictures, in the lobby chat, in the game setup and in-game. Type `:fire:`, `:swords:` or `:elephant:` and see for yourself — the [emoji list](#emoji-list) shows them all.

Only the players who have the mod installed and enabled get to see the pictures : the others merely read the text. Curious about who sees what? [Have a look](#who-sees-what).

The old asciimojis are still there, for those who have the mod and for those who don't — writing `:lenny:` for this awesome guy ( ͡° ͜ʖ ͡°) may still be pretty good :)

Because it still in developpement, please feel free to report me any error you find to atepir0\<at\>gmail.com.

## Emojis
Emojis are written with a `:name:` command : for instance `:smile:`, `:fire:` or `:elephant:`. There are 70 of them, from `:smile:` to `:elephant:`, `:swords:` and `:sos:` (for when your base is on fire), and they are all displayed with their picture in the [emoji list](#emoji-list). The machine readable list is in [tools/emojis.json](tools/emojis.json).

### Who sees what
Here is the small tragedy of this mod : emojis are drawn as inline pictures, so **only the players who have the mod installed and enabled can see them**. Everybody else still reads something meaningful, but let's be honest, it is not quite the same thing :

| What you write | Player without the mod reads | Player with the mod sees |
| --- | --- | --- |
| `:fire:` (emoji without an asciimoji) | the text `:fire:` | the 🔥 picture |
| `:lenny:` (emoji with an asciimoji) | the asciimoji `( ͡° ͜ʖ ͡°)`, exactly as before this mod | the picture |

19 of the asciimojis have a picture as well : all of them but `:blackeye:`, `:blubby:`, `:claro:`, `:dope:`, `:eeriemob:`, `:lennygang:` and `:lennystrong:`.

### Emojis without the mod
Good news for the friends who refuse to install it : the pictures are resolved when the message is *displayed*, on the machine of whoever reads it, and the `:name:` form is recognized as such. They can therefore type `:fire:` by hand like a pro, and every modded player will see the picture. Only the auto-completion (typing `:` opens the list of names) and the preview in the chat input are reserved to the modded ones.

It also means that a picture can't be faked : the game escapes the square brackets of a chat message before it is displayed, so a player typing a raw `[icon]` tag only ever shows that text.

### Multiplayer compatibility
Emojis are sent as text and drawn by the GUI of the player who reads them, and the mod declares `"ignoreInCompatibilityChecks": true` in its [mod.json](mod.json). Modded and unmodded players can therefore play the same game, so no need to convert your whole lobby first : the lobby lists the mod in grey with the tooltip *"This mod does not affect MP compatibility"*, and a replay recorded with the mod still loads without it.

### How it works
- The game engine cannot draw emoji characters (😀 and friends): its font renderer only handles 16 bit codepoints, and none of the fonts it ships contains an emoji glyph. Emojis are therefore drawn as inline pictures, using the `[icon]` tag of the GUI, which has to be registered by the mod on every page that displays a chat.
- What is sent over the network is the asciimoji itself, so players that don't have the mod still see it exactly as before. Emojis that have no asciimoji equivalent are sent as their `:name:`.
- Emojis are displayed in the in-game chat, in the game setup chat and in the lobby chat.

Emojis can be disabled by setting `asciimojis.emojis = false` in the user config file (`%APPDATA%\0ad\config\user.cfg` on Windows): the asciimojis and the `:name:` of the emojis are then displayed as plain text.

### Emoji list
<details>
<summary>Spoiler : all the 70 emojis with their picture (click to expand)</summary>

| | | | | |
| --- | --- | --- | --- | --- |
| <img src="art/textures/ui/asciimojis/1f600.png" width="20" alt=":smile:"> `:smile:` | <img src="art/textures/ui/asciimojis/1f601.png" width="20" alt=":grin:"> `:grin:` | <img src="art/textures/ui/asciimojis/1f602.png" width="20" alt=":joy:"> `:joy:` | <img src="art/textures/ui/asciimojis/1f923.png" width="20" alt=":rofl:"> `:rofl:` | <img src="art/textures/ui/asciimojis/1f609.png" width="20" alt=":wink:"> `:wink:` |
| <img src="art/textures/ui/asciimojis/1f60d.png" width="20" alt=":hearteyes:"> `:hearteyes:` | <img src="art/textures/ui/asciimojis/1f618.png" width="20" alt=":kiss:"> `:kiss:` | <img src="art/textures/ui/asciimojis/1f60f.png" width="20" alt=":smirk:"> `:smirk:` | <img src="art/textures/ui/asciimojis/1f914.png" width="20" alt=":thinking:"> `:thinking:` | <img src="art/textures/ui/asciimojis/1f610.png" width="20" alt=":neutral:"> `:neutral:` |
| <img src="art/textures/ui/asciimojis/1f615.png" width="20" alt=":confused:"> `:confused:` | <img src="art/textures/ui/asciimojis/1f622.png" width="20" alt=":cry:"> `:cry:` | <img src="art/textures/ui/asciimojis/1f62d.png" width="20" alt=":sob:"> `:sob:` | <img src="art/textures/ui/asciimojis/1f971.png" width="20" alt=":yawn:"> `:yawn:` | <img src="art/textures/ui/asciimojis/1f620.png" width="20" alt=":mad:"> `:mad:` |
| <img src="art/textures/ui/asciimojis/1f621.png" width="20" alt=":rage:"> `:rage:` | <img src="art/textures/ui/asciimojis/1f60e.png" width="20" alt=":cool:"> `:cool:` | <img src="art/textures/ui/asciimojis/1f928.png" width="20" alt=":eyebrow:"> `:eyebrow:` | <img src="art/textures/ui/asciimojis/1f922.png" width="20" alt=":sick:"> `:sick:` | <img src="art/textures/ui/asciimojis/1f480.png" width="20" alt=":dead:"> `:dead:` |
| <img src="art/textures/ui/asciimojis/1f47b.png" width="20" alt=":ghost:"> `:ghost:` | <img src="art/textures/ui/asciimojis/1f47d.png" width="20" alt=":alien:"> `:alien:` | <img src="art/textures/ui/asciimojis/1f921.png" width="20" alt=":clown:"> `:clown:` | <img src="art/textures/ui/asciimojis/1f4a9.png" width="20" alt=":poop:"> `:poop:` | <img src="art/textures/ui/asciimojis/1f525.png" width="20" alt=":fire:"> `:fire:` |
| <img src="art/textures/ui/asciimojis/1f4a5.png" width="20" alt=":boom:"> `:boom:` | <img src="art/textures/ui/asciimojis/2b50.png" width="20" alt=":star:"> `:star:` | <img src="art/textures/ui/asciimojis/2764.png" width="20" alt=":heart:"> `:heart:` | <img src="art/textures/ui/asciimojis/1f494.png" width="20" alt=":brokenheart:"> `:brokenheart:` | <img src="art/textures/ui/asciimojis/1f44d.png" width="20" alt=":thumbsup:"> `:thumbsup:` |
| <img src="art/textures/ui/asciimojis/1f44e.png" width="20" alt=":thumbsdown:"> `:thumbsdown:` | <img src="art/textures/ui/asciimojis/1f44c.png" width="20" alt=":ok:"> `:ok:` | <img src="art/textures/ui/asciimojis/1f44f.png" width="20" alt=":clap:"> `:clap:` | <img src="art/textures/ui/asciimojis/1f64f.png" width="20" alt=":pray:"> `:pray:` | <img src="art/textures/ui/asciimojis/1f44b.png" width="20" alt=":wave:"> `:wave:` |
| <img src="art/textures/ui/asciimojis/1f4aa.png" width="20" alt=":muscle:"> `:muscle:` | <img src="art/textures/ui/asciimojis/270a.png" width="20" alt=":fist:"> `:fist:` | <img src="art/textures/ui/asciimojis/1f91d.png" width="20" alt=":handshake:"> `:handshake:` | <img src="art/textures/ui/asciimojis/1f926.png" width="20" alt=":facepalm:"> `:facepalm:` | <img src="art/textures/ui/asciimojis/1f937.png" width="20" alt=":shrug:"> `:shrug:` |
| <img src="art/textures/ui/asciimojis/2705.png" width="20" alt=":check:"> `:check:` | <img src="art/textures/ui/asciimojis/274c.png" width="20" alt=":cross:"> `:cross:` | <img src="art/textures/ui/asciimojis/26a0.png" width="20" alt=":warning:"> `:warning:` | <img src="art/textures/ui/asciimojis/2753.png" width="20" alt=":question:"> `:question:` | <img src="art/textures/ui/asciimojis/1f440.png" width="20" alt=":eyes:"> `:eyes:` |
| <img src="art/textures/ui/asciimojis/1f451.png" width="20" alt=":crown:"> `:crown:` | <img src="art/textures/ui/asciimojis/1f3c6.png" width="20" alt=":trophy:"> `:trophy:` | <img src="art/textures/ui/asciimojis/2694.png" width="20" alt=":swords:"> `:swords:` | <img src="art/textures/ui/asciimojis/1f6e1.png" width="20" alt=":shield:"> `:shield:` | <img src="art/textures/ui/asciimojis/1f3f0.png" width="20" alt=":castle:"> `:castle:` |
| <img src="art/textures/ui/asciimojis/1f418.png" width="20" alt=":elephant:"> `:elephant:` | <img src="art/textures/ui/asciimojis/1f40e.png" width="20" alt=":horse:"> `:horse:` | <img src="art/textures/ui/asciimojis/1f411.png" width="20" alt=":sheep:"> `:sheep:` | <img src="art/textures/ui/asciimojis/1f37b.png" width="20" alt=":beer:"> `:beer:` | <img src="art/textures/ui/asciimojis/1f355.png" width="20" alt=":pizza:"> `:pizza:` |
| <img src="art/textures/ui/asciimojis/1f382.png" width="20" alt=":cake:"> `:cake:` | <img src="art/textures/ui/asciimojis/2615.png" width="20" alt=":coffee:"> `:coffee:` | <img src="art/textures/ui/asciimojis/1f4a1.png" width="20" alt=":idea:"> `:idea:` | <img src="art/textures/ui/asciimojis/1f389.png" width="20" alt=":party:"> `:party:` | <img src="art/textures/ui/asciimojis/1f381.png" width="20" alt=":gift:"> `:gift:` |
| <img src="art/textures/ui/asciimojis/1f308.png" width="20" alt=":rainbow:"> `:rainbow:` | <img src="art/textures/ui/asciimojis/2744.png" width="20" alt=":snow:"> `:snow:` | <img src="art/textures/ui/asciimojis/1f319.png" width="20" alt=":moon:"> `:moon:` | <img src="art/textures/ui/asciimojis/2600.png" width="20" alt=":sun:"> `:sun:` | <img src="art/textures/ui/asciimojis/1f198.png" width="20" alt=":sos:"> `:sos:` |
| <img src="art/textures/ui/asciimojis/1f338.png" width="20" alt=":flower:"> `:flower:` | <img src="art/textures/ui/asciimojis/1f576.png" width="20" alt=":sunglasses:"> `:sunglasses:` | <img src="art/textures/ui/asciimojis/1fae1.png" width="20" alt=":salute:"> `:salute:` | <img src="art/textures/ui/asciimojis/1f3b5.png" width="20" alt=":music:"> `:music:` | <img src="art/textures/ui/asciimojis/1f614.png" width="20" alt=":pensive:"> `:pensive:` |

</details>

### Adding or changing an emoji
The pictures come from [twemoji](https://github.com/jdecked/twemoji) (CC-BY 4.0).
To add or change an emoji, edit [tools/emojis.json](tools/emojis.json) and the `g_AsciimojisEmoji`/`g_AsciimojisAsciiArt` lists of `gui/common/global~asciimojis.js`, then run:

```
powershell -ExecutionPolicy Bypass -File tools/fetch-emoji-assets.ps1
```

This downloads the pictures into `art/textures/ui/asciimojis/` and regenerates the three files that register the icons: `gui/common/resources/setup_asciimojis_icons.xml` (in-game chat), `gui/lobby/icons/asciimojis.xml` (lobby chat) and `gui/gamesetup/setup.xml` (game setup chat). The last one replaces a file of the game (the game includes it as a file and not as a directory), which is why the generator keeps its vanilla content.

Keep the pictures at 32x32: the engine only converts textures whose dimensions are a power of two, and aborts the build of the pyromod when it meets another size. `tools/fetch-emoji-assets.ps1 -Check` verifies this (and that the emoji lists are in sync), which is what the CI runs.

## Asciimojis
The ancestors of all this : each one is preceeded by the command that displays it, and 19 of them also come with a picture (see [who sees what](#who-sees-what)) :

- `:angry:` `•``_``•`
- `:blackeye:` `0__#`
- `:blubby:` `( 0 _ 0 )`
- `:bored:` `(-_-)`
- `:claro:` `(͡ ° ͜ʖ ͡ °)`
- `:dope:` `<(^_^)>`
- `:dunno:` `¯\\(°_o)/¯`
- `:eeriemob:` `(-(-_-(-_(-_(-_-)_-)-_-)_-)_-)-)`
- `:endure:` `(҂◡_◡) ᕤ`
- `:flor:` `(✿◠‿◠)`
- `:glasseoff:` `( ͡° ͜ʖ ͡°)ﾉ⌐■-■`
- `:hello:` `(ʘ‿ʘ)/`
- `:help:` `\\(°Ω°)/`
- `:lenny:` `( ͡° ͜ʖ ͡°)`
- `:lennygang:` `( ͡°( ͡° ͜ʖ( ͡° ͜ʖ ͡°)ʖ ͡°) ͡°)`
- `:lennystrong:` `ᕦ( ͡° ͜ʖ ͡°)ᕤ`
- `:lol:` `L(° O °L)`
- `:love:` `♥‿♥`
- `:nerd:` `(⌐⊙_⊙)`
- `:nice:` `( ͡° ͜ °)`
- `:really:` `ò_ô`
- `:sadlenny:` `( ͡° ʖ̯ ͡°)`
- `:thanks:` `\\(^-^)/`
- `:this:` `( ͡° ͜ʖ ͡°)_/¯`
- `:yolo:` `Yᵒᵘ Oᶰˡʸ Lᶤᵛᵉ Oᶰᶜᵉ`
- `:zombie:` `[¬º-°]¬` 

## Guide to installation
1. Download the latest release from the [releases page](https://github.com/Atepir/AsciimojisFor0ad/releases).

2. Launch the .pyromod file with 0ad.

3. Check in the mod selection screen that the mod is enabled: it is enabled automatically when the .pyromod is launched. A disabled mod is a sad mod, and you would be reading `:fire:` like everybody else.