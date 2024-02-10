ChatInputPanel.prototype.onPress = function () {
    if (!g_IsNetworked)
        return;

    let text = this.chatInput.caption;
    if (!text.length)
        return;

    this.chatInput.caption = "";

    if (!executeNetworkCommand(text))
        Engine.SendNetworkChat(g_AsciimojisMiddleware(text));

    this.chatInput.focus();
}