/**
 * @fileoverview
 * Renders the asciimojis and emojis of the lobby chat messages as pictures.
 *
 * This file follows the "~modname" convention: it is loaded right after
 * ChatMessageFormat.js and only patches what it needs, so it doesn't have to
 * be updated when the game changes that file.
 */

{
    const g_AsciimojisFormat = ChatMessageFormat.prototype.format;

    /**
     * @param {Object} message
     * @returns {string} The formatted message, with the asciimojis replaced
     *          by their picture when the icons are available.
     */
    ChatMessageFormat.prototype.format = function (message) {
        let formatted = g_AsciimojisFormat.call(this, message);

        if (typeof formatted === "string")
            formatted = g_AsciimojisIconMiddleware(formatted);

        return formatted;
    };
}
