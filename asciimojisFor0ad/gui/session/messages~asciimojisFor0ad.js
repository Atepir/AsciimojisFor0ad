function submitChatInput()
{
	let text = Engine.GetGUIObjectByName("chatInput").caption;

	closeChat();

	if (!text.length)
		return;

	if (executeNetworkCommand(text))
		return;

	if (executeCheat(text))
		return;

	let asciimojis = {
			"angry": "•`_´•",
			"arrowhead": "⤜(ⱺ ʖ̯ⱺ)⤏",
			"bigheart": "❤",
			"blackeye": "0__#",
			"blubby": "( 0 _ 0 )",
			"bored": "(-_-)",
			"check": "✔",
			"claro": "(͡ ° ͜ʖ ͡ °)",
			"club": "♣",
			"dab": "ヽ( •_)ᕗ",
			"depressed": "(︶︹︶)",
			"derp": "☉ ‿ ⚆",
			"dope": "<(^_^)>",
			"duckface": "(・3・)",
			"duel": "ᕕ(╭ರ╭ ͟ʖ╮•́)⊃¤=(————-",
			"duh": "(≧︿≦)",
			"dunno": "¯\(°_o)/¯",
			"eeriemob": "(-(-_-(-_(-_(-_-)_-)-_-)_-)_-)-)",
			"endure": "(҂◡_◡) ᕤ",
			"flor": "(✿◠‿◠)",
			"ghast": "= _ =",
			"glasseoff": "( ͡° ͜ʖ ͡°)ﾉ⌐■-■",
			"hello": "(ʘ‿ʘ)/",
			"help": "\(°Ω°)/",
			"lenny": "( ͡° ͜ʖ ͡°)",
			"lennyflip": "(ノ ͡° ͜ʖ ͡°ノ) ︵ ( ͜。 ͡ʖ ͜。)",
			"lennygang": "( ͡°( ͡° ͜ʖ( ͡° ͜ʖ ͡°)ʖ ͡°) ͡°)",
			"lennystrong": "ᕦ( ͡° ͜ʖ ͡°)ᕤ",
			"loading": "███▒▒▒▒▒▒▒",
			"lol": "L(° O °L)",
			"love": "♥‿♥",
			"nerd": "(⌐⊙_⊙)",
			"nice": "( ͡° ͜ °)",
			"sing": "♫",
			"really": "ò_ô",
			"sadlenny": "( ͡° ʖ̯ ͡°)",
			"thanks": "\(^-^)/",
			"this": "( ͡° ͜ʖ ͡°)_/¯",
			"whoa": "(°o•)",
			"woo": "＼(＾O＾)／",
			"wtf": "(⊙＿⊙')",
			"yay": "\( ﾟヮﾟ)/",
			"yolo": "Yᵒᵘ Oᶰˡʸ Lᶤᵛᵉ Oᶰᶜᵉ",
			"yuno": "(屮ﾟДﾟ)屮 Y U NO",
			"zombie": "[¬º-°]¬"
	};

	Object.keys(asciimojis).forEach(function(key) {
		let command_key = ":"+key+":";
		text = text.split(command_key).join(asciimojis[key]);
	});

	let chatAddressee = Engine.GetGUIObjectByName("chatAddressee");
	if (chatAddressee.selected > 0 && (text.indexOf("/") != 0 || text.indexOf("/me ") == 0))
		text = chatAddressee.list_data[chatAddressee.selected] + " " + text;

	let selectedChat = chatAddressee.list_data[chatAddressee.selected];
	if (selectedChat.startsWith("/msg"))
		g_LastChatAddressee = selectedChat;

	submitChatDirectly(text);
}