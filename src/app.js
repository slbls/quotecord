const path = require("path"),
	fs = require("fs"),
	{ app, Menu, Tray, shell } = require("electron"),
	{ Client, RichEmbed } = require("discord.js"),
	client = new Client();

let tray;

function createTray(menu) {
	tray = new Tray(path.join(__dirname, "./build/icon.png"));

	tray.setContextMenu(
		Menu.buildFromTemplate(
			menu.concat([
				{
					label: "Open config.json",
					sublabel:
						"View and/or edit the file in your default editor",
					click: () => shell.openItem("config.json")
				},
				{
					label: "Reload",
					sublabel: "Detect changes to config.json",
					click: () => {
						app.relaunch();
						app.exit();
					}
				},
				{
					label: "Exit",
					role: "quit"
				}
			])
		)
	);
	tray.setToolTip("Quotecord");
}

app.on("ready", () => {
	fs.writeFile(
		"config.json",
		JSON.stringify({ token: "" }, null, "\t"),
		{ flag: "wx" },
		error => {
			if (error && error.code === "EEXIST") {
				fs.readFile("config.json", "utf8", (error, data) => {
					const config = JSON.parse(data);
					if (config.token) {
						client.login(config.token);
						return;
					}

					createTray([
						{
							label: "Unable to login",
							sublabel:
								"config.json exists but no token was specified."
						}
					]);
				});

				return;
			}

			createTray([
				{
					label: "Unable to login",
					sublabel:
						"config.json was automatically created and requires a token."
				}
			]);
		}
	);
});

client.on("ready", () => {
	createTray([
		{
			label: "Currently logged in as",
			sublabel: client.user.username
		}
	]);
});

const QUOTE_REGEX = /({quote:\d+})/;

client.on("message", message => {
	if (message.client !== client) {
		return;
	}

	const messageContent = message.content,
		channel = message.channel;

	if (!QUOTE_REGEX.test(messageContent)) {
		return;
	}

	channel.fetchMessages().then(messages => {
		if (message.deletable) {
			message.delete();
		}

		messageContent
			.split(QUOTE_REGEX)
			.filter(Boolean)
			.forEach(chunk => {
				if (!QUOTE_REGEX.test(chunk)) {
					channel.send(chunk.trim());
					return;
				}

				const quote = messages.get(
					chunk.split(":")[1].replace("}", "")
				);

				channel.send(
					new RichEmbed({
						author: {
							name: quote.member
								? quote.member.nickname || quote.author.username
								: quote.author.username,
							icon_url: quote.author.displayAvatarURL
						},
						description: quote.content,
						footer: {
							text: quote.createdAt.toLocaleDateString("en-US", {
								hour: "numeric",
								minute: "numeric",
								second: "numeric"
							})
						}
					})
				);
			});
	});
});
