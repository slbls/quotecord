const fs = require("fs"),
	{ app, Menu, Tray } = require("electron"),
	{ Client, RichEmbed } = require("discord.js"),
	client = new Client();

let tray;

function createTray(menu) {
	tray = new Tray("icon.png");

	tray.setContextMenu(
		Menu.buildFromTemplate(
			menu.concat([
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
					click: () => app.quit()
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
							sublabel: "config.json exists but no token was specified."
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

client.on("message", message => {
	if (message.client === client) {
		const messageContent = message.content,
			channel = message.channel;

		const tags = messageContent.match(/{quote:\d+}/g);
		if (!tags) return;

		channel.fetchMessages().then(messages => {
			if (message.deletable) message.delete();

			messageContent.split(/{quote:\d+}/).forEach((beforeTag, index) => {
				const tag = tags[index];

				if (!tag) {
					if (beforeTag) channel.send(beforeTag);

					return;
				}

				const quote = messages.get(tags[index].split(":")[1].replace("}", ""));

				if (!quote) return;

				channel.send(
					beforeTag,
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
	}
});
