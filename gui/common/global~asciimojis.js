/**
 * @fileoverview
 * This file contains the asciimojis middleware and the asciimojis dictionary.
 */

/**
 * List of asciimojis.
 */
var g_asciimojis = {
    "angry": "•`_´•",
    "arrowhead": "⤜(ⱺ ʖ̯ⱺ)⤏",
    "bigheart": "❤",
    "blackeye": "0__#",
    "blubby": "( 0 _ 0 )",
    "bored": "(-_-)",
    "check": "✔",
    "claro": "(͡ ° ͜ʖ ͡ °)",
    "club": "♣",
    "dab": "ヽ( •_)ᕗ",
    "depressed": "(︶︹︶)",
    "derp": "☉ ‿ ⚆",
    "dope": "<(^_^)>",
    "duckface": "(・3・)",
    "duel": "ᕕ(╭ರ╭ ͟ʖ╮•́)⊃¤=(————-",
    "duh": "(≧︿≦)",
    "dunno": "¯\(°_o)/¯",
    "eeriemob": "(-(-_-(-_(-_(-_-)_-)-_-)_-)_-)-)",
    "endure": "(҂◡_◡) ᕤ",
    "flor": "(✿◠‿◠)",
    "ghast": "= _ =",
    "glasseoff": "( ͡° ͜ʖ ͡°)ﾉ⌐■-■",
    "hello": "(ʘ‿ʘ)/",
    "help": "\(°Ω°)/",
    "lenny": "( ͡° ͜ʖ ͡°)",
    "lennyflip": "(ノ ͡° ͜ʖ ͡°ノ) ︵ ( ͜。 ͡ʖ ͜。)",
    "lennygang": "( ͡°( ͡° ͜ʖ( ͡° ͜ʖ ͡°)ʖ ͡°) ͡°)",
    "lennystrong": "ᕦ( ͡° ͜ʖ ͡°)ᕤ",
    "loading": "███▒▒▒▒▒▒▒",
    "lol": "L(° O °L)",
    "love": "♥‿♥",
    "nerd": "(⌐⊙_⊙)",
    "nice": "( ͡° ͜ °)",
    "sing": "♫",
    "really": "ò_ô",
    "sadlenny": "( ͡° ʖ̯ ͡°)",
    "thanks": "\(^-^)/",
    "this": "( ͡° ͜ʖ ͡°)_/¯",
    "whoa": "(°o•)",
    "woo": "＼(＾O＾)／",
    "wtf": "(⊙＿⊙')",
    "yay": "\( ﾟヮﾟ)/",
    "yolo": "Yᵒᵘ Oᶰˡʸ Lᶤᵛᵉ Oᶰᶜᵉ",
    "yuno": "(屮ﾟДﾟ)屮 Y U NO",
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
 * Checks if a value is null or undefined.
 * @param {*} value
 * @returns {boolean}
 */
function g_IsNullOrUndefined(value) {
    return value === null || value === undefined;
}