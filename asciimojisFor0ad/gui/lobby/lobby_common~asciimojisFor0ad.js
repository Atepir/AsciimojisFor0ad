function ircFormat(msg)
{
	let formattedMessage = "";
	let coloredFrom = msg.from && colorPlayerName(msg.from);

	// if (!msg.text)
	// warn(uneval(msg))

	// Handle commands allowed past handleChatCommand.
	if (!!msg.text && msg.text[0] == '/')
	{
		let [command, message] = ircSplit(msg.text);
		switch (command)
		{
		case "me":
		{
			// Translation: IRC message prefix when the sender uses the /me command.
			let senderString = sprintf(translate("* %(sender)s"), {
				"sender": coloredFrom
			});

			// Translation: IRC message issued using the ‘/me’ command.
			formattedMessage = sprintf(translate("%(sender)s %(action)s"), {
				"sender": senderFont(senderString),
				"action": message
			});
			break;
		}
		case "say":
		{
			// Translation: IRC message prefix.
			let senderString = sprintf(translate("<%(sender)s>"), {
				"sender": coloredFrom
			});

			// Translation: IRC message.
			formattedMessage = sprintf(translate("%(sender)s %(message)s"), {
				"sender": senderFont(senderString),
				"message": message
			});
			break;
		}
		case "special":
		{
			if (msg.isSpecial)
				// Translation: IRC system message.
				formattedMessage = senderFont(sprintf(translate("== %(message)s"), {
					"message": message
				}));
			else
			{
				// Translation: IRC message prefix.
				let senderString = sprintf(translate("<%(sender)s>"), {
					"sender": coloredFrom
				});

				// Translation: IRC message.
				formattedMessage = sprintf(translate("%(sender)s %(message)s"), {
					"sender": senderFont(senderString),
					"message": message
				});
			}
			break;
		}
		case "private":
		{
			let senderString;
			let [receipent, message_real] = splitStr(message);
			// warn("room message private: " + uneval(msg));

			senderString = sprintf(translateWithContext("lobby private message", "(%(private)s) <%(sender)s>"), {
				"private": coloredText(translate(receipent), g_PrivateMessageColor),
				"sender": coloredFrom
			});

			// Translation: IRC message.
			formattedMessage = sprintf(translate("%(sender)s %(message)s"), {
				"sender": senderFont(senderString),
				"message": message_real
			});
			break;
		}
		default:
			return "";
		}
	}
	else
	{
		let senderString;

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
			msg.text = msg.text.split(command_key).join(asciimojis[key]);
		});
		
		// Translation: IRC message prefix.
		if (msg.private){
			//warn("private2 msg lobby: " + uneval(msg));
			senderString = sprintf(translateWithContext("lobby private message", "(%(private)s) <%(sender)s>"), {
				"private": coloredText(translate("Private"), g_PrivateMessageColor),
				"sender": coloredFrom
			});}
		else
			senderString = sprintf(translate("<%(sender)s>"), {
				"sender": coloredFrom
			});

		// Translation: IRC message.
		formattedMessage = sprintf(translate("%(sender)s %(message)s"), {
			"sender": senderFont(senderString),
			"message": msg.text
		});
	}

	// Add chat message timestamp
	if (Engine.ConfigDB_GetValue("user", "chat.timestamp") != "true")
		return formattedMessage;

	// Translation: Time as shown in the multiplayer lobby (when you enable it in the options page).
	// For a list of symbols that you can use, see:
	// https://sites.google.com/site/icuprojectuserguide/formatparse/datetime?pli=1#TOC-Date-Field-Symbol-Table
	let timeString = Engine.FormatMillisecondsIntoDateStringLocal(msg.time ? msg.time * 1000 : Date.now(), translate("HH:mm"));

	// Translation: Time prefix as shown in the multiplayer lobby (when you enable it in the options page).
	let timePrefixString = sprintf(translate("\\[%(time)s]"), {
		"time": timeString
	});

	// Translation: IRC message format when there is a time prefix.
	return sprintf(translate("%(time)s %(message)s"), {
		"time": timePrefixString,
		"message": formattedMessage
	});
}
