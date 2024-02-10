ChatInputPanel.prototype.submitChatInput = function () {
    let text = this.chatInput.caption;
    if (!text.length)
        return;

    if (!this.chatCommandHandler.handleChatCommand(text))
        Engine.LobbySendMessage(g_AsciimojisMiddleware(text));

    this.chatInput.caption = "";
}


ChatInputPanel.prototype.autocomplete = function () {
    let autocompletable = [].concat(
        g_asciimojisSuggestions,
        Engine.GetPlayerList().map(player => player.name)
    );

    autoCompleteText(this.chatInput, autocompletable);
}