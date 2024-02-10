ChatInput.prototype.autoComplete = function () {
    let playernames = [];
    for (let player in g_PlayerAssignments)
        playernames.push(g_PlayerAssignments[player].name);

    let autocompletable = [].concat(
        g_asciimojisSuggestions,
        playernames
    )

    autoCompleteText(this.chatInput, autocompletable);
}