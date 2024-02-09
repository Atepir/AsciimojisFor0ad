ChatMessageEvents.ClientChat.prototype.onClientChat = function (message) {
    this.usernameArgs.username = this.colorizePlayernameByGUID(message.guid);
    this.messageArgs.username = setStringTags(sprintf(this.SenderFormat, this.usernameArgs), this.SenderTags);
    this.messageArgs.message = escapeText(g_AsciimojisMiddleware(message.text));
    this.chatMessagesPanel.addText(sprintf(this.MessageFormat, this.messageArgs));
}