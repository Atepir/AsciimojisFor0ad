/**
 * This class is only concerned with owning the helper classes and linking them.
 * The class is not dealing with specific GUI objects and doesn't provide own handlers.
 */
Chat.prototype.submitChat = function (text, command = "") {
    if (command.startsWith("/msg "))
        Engine.SetGlobalHotkey("privatechat", "Press", () => { this.openPage(command); });

    let msg = command ? command + " " + text : text;

    msg = g_AsciimojisMiddleware(msg);

    if (Engine.HasNetClient())
        Engine.SendNetworkChat(msg);
    else
        this.ChatMessageHandler.handleMessage({
            "type": "message",
            "guid": "local",
            "text": msg
        });
}