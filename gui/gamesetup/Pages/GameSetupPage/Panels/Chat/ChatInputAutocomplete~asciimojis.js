ChatInputAutocomplete.prototype.getAutocompleteEntries = function () {
    if (this.entries)
        return this.entries;

    // Maps from priority to autocompletable strings
    let entries = { "0": g_asciimojisSuggestions };

    this.gameSettingControlManager.addAutocompleteEntries(entries);

    let allEntries = Object.keys(entries).sort((a, b) => +b - +a).reduce(
        (all, priority) => all.concat(entries[priority]),
        []);

    this.entries = Array.from(new Set(allEntries));

    return this.entries;
}