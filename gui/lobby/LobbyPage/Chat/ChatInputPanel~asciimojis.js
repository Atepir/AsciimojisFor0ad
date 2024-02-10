ChatInputPanel.prototype.autocomplete = function () {
    let autocompletable = [].concat(
        g_asciimojisSuggestions,
        Engine.GetPlayerList().map(player => player.name)
    );

    autoCompleteText(this.chatInput, autocompletable);
}