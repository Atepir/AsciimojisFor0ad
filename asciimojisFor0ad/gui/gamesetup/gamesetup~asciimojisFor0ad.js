// Im bored

function submitChatInput()
{
	let chatInput = Engine.GetGUIObjectByName("chatInput");
	let text = chatInput.caption;
	if (!text.length)
		return;

	chatInput.caption = "";
	
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

	if (!executeNetworkCommand(text))
		Engine.SendNetworkChat(text);

	chatInput.focus();
}

/**
 * Send a list of playernames and distinct between players and observers.
 * Don't send teams, AIs or anything else until the game was started.
 * The playerData format from g_GameAttributes is kept to reuse the GUI function presenting the data.
 */
function formatClientsForStanza()
{
	let connectedPlayers = 0;
	let playerData = [];

	for (let guid in g_PlayerAssignments)
	{
		let pData = { "Name": g_PlayerAssignments[guid].name };

		if (g_GameAttributes.settings.PlayerData[g_PlayerAssignments[guid].player - 1])
			++connectedPlayers;
		else
			pData.Team = "observer";

		playerData.push(pData);
	}

	return {
		"list": playerDataToStringifiedTeamList(playerData),
		"connectedPlayers": connectedPlayers
	};
}

/**
 * Send the relevant gamesettings to the lobbybot immediately.
 */
function sendRegisterGameStanzaImmediate()
{
	if (!g_IsController || !Engine.HasXmppClient())
		return;

	if (g_GameStanzaTimer !== undefined)
	{
		clearTimeout(g_GameStanzaTimer);
		g_GameStanzaTimer = undefined;
	}

	let clients = formatClientsForStanza();

	let stanza = {
		"name": g_ServerName,
		"port": g_ServerPort,
		"hostUsername": Engine.LobbyGetNick(),
		"mapName": g_GameAttributes.map,
		"niceMapName": getMapDisplayName(g_GameAttributes.map),
		"mapSize": g_GameAttributes.mapType == "random" ? g_GameAttributes.settings.Size : "Default",
		"mapType": g_GameAttributes.mapType,
		"victoryConditions": g_GameAttributes.settings.VictoryConditions.join(","),
		"nbp": clients.connectedPlayers,
		"maxnbp": g_GameAttributes.settings.PlayerData.length,
		"players": clients.list,
		"stunIP": g_StunEndpoint ? g_StunEndpoint.ip : "",
		"stunPort": g_StunEndpoint ? g_StunEndpoint.port : "",
		"mods": JSON.stringify(g_EngineInfo.mods.filter(mod => !mod[0].startsWith("fgod")))
	};

	// Only send the stanza if the relevant settings actually changed
	if (g_LastGameStanza && Object.keys(stanza).every(prop => g_LastGameStanza[prop] == stanza[prop]))
		return;

	g_LastGameStanza = stanza;
	Engine.SendRegisterGame(stanza);
}

/**
 * Send the relevant gamesettings to the lobbybot in a deferred manner.
 */
function sendRegisterGameStanza()
{
	if (!g_IsController || !Engine.HasXmppClient())
		return;

	if (g_GameStanzaTimer !== undefined)
		clearTimeout(g_GameStanzaTimer);

	g_GameStanzaTimer = setTimeout(sendRegisterGameStanzaImmediate, g_GameStanzaTimeout * 1000);
}

