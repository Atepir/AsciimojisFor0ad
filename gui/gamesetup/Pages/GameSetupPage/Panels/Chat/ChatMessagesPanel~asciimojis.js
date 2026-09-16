/**
 * @fileoverview
 * Renders the asciimojis and emojis of the game setup chat as pictures.
 *
 * This file follows the "~modname" convention: it is loaded right after
 * ChatMessagesPanel.js and only patches what it needs, so it doesn't have to
 * be updated when the game changes that file. Every chat message of the page
 * goes through addText(), which receives the already formatted and escaped
 * text, which is exactly where the [icon] tags have to be inserted.
 */

{
    const g_AsciimojisAddText = ChatMessagesPanel.prototype.addText;

    /**
     * @param {string} text
     */
    ChatMessagesPanel.prototype.addText = function (text) {
        return g_AsciimojisAddText.call(
            this, typeof text === "string" ? g_AsciimojisIconMiddleware(text) : text);
    };
}
