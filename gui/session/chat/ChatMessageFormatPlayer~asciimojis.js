/**
 * @fileoverview
 * Renders the asciimojis and emojis of the incoming chat messages of the
 * in-game chat as pictures.
 *
 * This file follows the "~modname" convention: it is loaded right after
 * ChatMessageFormatPlayer.js and only patches what it needs, so it doesn't
 * have to be updated when the game changes that file.
 */

{
    const g_AsciimojisParse = ChatMessageFormatPlayer.prototype.parse;

    /**
     * @param {Object} msg
     * @returns {Object} The formatted message, with the asciimojis replaced
     *          by their picture when the icons are available.
     */
    ChatMessageFormatPlayer.prototype.parse = function (msg) {
        let formatted = g_AsciimojisParse.call(this, msg);

        if (formatted && formatted.text)
            formatted.text = g_AsciimojisIconMiddleware(formatted.text);

        return formatted;
    };
}
