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
 * Emojis that have no asciimoji equivalent. The message that is sent over the
 * network contains the ":name:" token, so players that don't have this mod
 * installed still read something meaningful, while the players that have it
 * see the picture instead (see g_AsciimojisIconMiddleware).
 *
 * Adding an emoji here requires an entry of the same name in
 * tools/emojis.json, then running tools/fetch-emoji-assets.ps1.
 */
var g_AsciimojisEmoji = [
    "smile", "grin", "joy", "rofl", "wink", "hearteyes", "kiss", "smirk",
    "thinking", "neutral", "confused", "cry", "sob", "yawn", "mad", "rage",
    "cool", "eyebrow", "sick", "dead", "ghost", "alien", "clown", "poop",
    "fire", "boom", "star", "heart", "brokenheart", "thumbsup", "thumbsdown",
    "ok", "clap", "pray", "wave", "muscle", "fist", "handshake", "facepalm",
    "shrug", "check", "cross", "warning", "question", "eyes", "crown",
    "trophy", "swords", "shield", "castle", "elephant", "horse", "sheep",
    "beer", "pizza", "cake", "coffee", "idea", "party", "gift", "rainbow",
    "snow", "moon", "sun", "sos", "flower", "sunglasses", "salute", "music",
    "pensive"
];

/**
 * Asciimojis that are also available as a picture. The asciimoji itself is
 * sent over the network (players without the mod see it exactly as before),
 * and the players that have the mod see the picture instead.
 */
var g_AsciimojisAsciiArt = [
    "angry", "bored", "dunno", "endure", "flor", "glasseoff", "hello",
    "help", "lenny", "lol", "love", "nerd", "nice", "really", "sadlenny",
    "thanks", "this", "yolo", "zombie"
];

// Emojis are sent as ":name:" tokens, so they need to be in the dictionary
// used by the sending middleware too.
for (let emoji of g_AsciimojisEmoji)
    g_asciimojis[emoji] = `:${emoji}:`;

/**
 * Emojis can be turned off from the user config ("asciimojis.emojis = false"),
 * in which case the mod falls back to its text behaviour.
 */
function g_AsciimojisEmojisEnabled() {
    return Engine.ConfigDB_GetValue("user", "asciimojis.emojis") !== "false";
}

/**
 * Strings that have to be replaced by a picture, associated with the emoji
 * they belong to, the longest first, so that a longer asciimoji wins over the
 * shorter one it contains (the asciimoji of "this" contains the lenny face).
 *
 * Computed on first use: escapeText() is defined in functions_utility.js,
 * which may be loaded after this file.
 */
var g_AsciimojisIconLookupCache = undefined;
function g_AsciimojisIconLookup() {
    if (g_AsciimojisIconLookupCache)
        return g_AsciimojisIconLookupCache;

    let lookups = g_AsciimojisEmoji.map(emoji => [`:${emoji}:`, emoji]);
    for (let asciimoji of g_AsciimojisAsciiArt) {
        let asciiArt = g_asciimojis[asciimoji];

        // Skip the names that are not in the dictionary (typo) or that have no
        // asciimoji of their own.
        if (!asciiArt || asciiArt[0] == ":")
            continue;

        // The asciimoji is what is sent over the network, so that is what is
        // received most of the time; the ":name:" token is still recognized so
        // that the players without the mod (or the ones typing the command
        // themselves) also get the picture.
        lookups.push([asciiArt, asciimoji]);
        lookups.push([`:${asciimoji}:`, asciimoji]);
    }

    // Chat messages are escaped by the game before being displayed (the
    // backslash and the opening bracket are prefixed), so the escaped form has
    // to be recognized as well.
    let escaped = [];
    if (typeof escapeText === "function")
        escaped = lookups
            .map(([text, emoji]) => [escapeText(text), emoji])
            .filter(([text, emoji]) => !lookups.some(([known]) => known === text));

    g_AsciimojisIconLookupCache = lookups.concat(escaped).sort((a, b) => b[0].length - a[0].length);
    return g_AsciimojisIconLookupCache;
}

/**
 * Replaces the asciimojis and emojis of a formatted chat message with their
 * picture, using the [icon] tag of the GUI (the icon must be registered by
 * setup_asciimojis_icons.xml, otherwise the tag is displayed as plain text).
 *
 * Must be applied to the message as it is displayed, i.e. *after* the game
 * escaped it, and never to a message that is going to be sent (use
 * g_AsciimojisMiddleware for that).
 *
 * @param {string} text Message, already escaped by the game.
 * @returns {string} Message with [icon] tags.
 */
function g_AsciimojisIconMiddleware(text) {
    if (!text || !g_AsciimojisEmojisEnabled())
        return text;

    let result = String(text);
    for (let [text, emoji] of g_AsciimojisIconLookup())
        if (result.indexOf(text) != -1)
            result = result.split(text).join(`[icon="icon_asciimoji_${emoji}"]`);

    return result;
}

/**
 * List of asciimojis suggestions.
 */
const g_asciimojisSuggestions = Object.keys(g_asciimojis).map(asciimoji => `:${asciimoji}:`);
