/**
 * @fileoverview
 * This file contains the asciimojis middleware and the asciimojis dictionary.
 */

/**
 * List of asciimojis.
 */
var g_asciimojis = {
    "angry": "•`_´•",
    "blackeye": "0__#",
    "blubby": "( 0 _ 0 )",
    "bored": "(-_-)",
    "claro": "(͡ ° ͜ʖ ͡ °)",
    "dope": "<(^_^)>",
    "dunno": "¯\(°_o)/¯",
    "eeriemob": "(-(-_-(-_(-_(-_-)_-)-_-)_-)_-)-)",
    "endure": "(҂◡_◡) ᕤ",
    "flor": "(✿◠‿◠)",
    "glasseoff": "( ͡° ͜ʖ ͡°)ﾉ⌐■-■",
    "hello": "(ʘ‿ʘ)/",
    "help": "\(°Ω°)/",
    "lenny": "( ͡° ͜ʖ ͡°)",
    "lennygang": "( ͡°( ͡° ͜ʖ( ͡° ͜ʖ ͡°)ʖ ͡°) ͡°)",
    "lennystrong": "ᕦ( ͡° ͜ʖ ͡°)ᕤ",
    "lol": "L(° O °L)",
    "love": "♥‿♥",
    "nerd": "(⌐⊙_⊙)",
    "nice": "( ͡° ͜ °)",
    "really": "ò_ô",
    "sadlenny": "( ͡° ʖ̯ ͡°)",
    "thanks": "\(^-^)/",
    "this": "( ͡° ͜ʖ ͡°)_/¯",
    "yolo": "Yᵒᵘ Oᶰˡʸ Lᶤᵛᵉ Oᶰᶜᵉ",
    "zombie": "[¬º-°]¬"
};


/**
 * Looks for asciimojis in the message and replace them with their corresponding asciimoji.
 * @param {string} msg 
 * @returns 
 */
function g_AsciimojisMiddleware(msg) {
    return String(msg).replace(/:\w+:/g, function (match) {
        return g_asciimojis[match.slice(1, -1)] || match;
    });
}

/**
 * List of asciimojis suggestions.
 */
const g_asciimojisSuggestions = Object.keys(g_asciimojis).map(asciimoji => `:${asciimoji}:`);
