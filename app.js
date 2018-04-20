const { Client, RichEmbed } = require("discord.js"),
	config = require("./config"),
	client = new Client();

client.on("ready", () => {
	console.log(`Logged in as ${client.user.username}.`);
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

				if (tag) {
					const quote = messages.get(
						tags[index].split(":")[1].replace("}", "")
					);

					channel.send(
						beforeTag,
						new RichEmbed({
							author: {
								name: quote.author.username,
								icon: quote.author.avatarURL
							},
							description: quote.content,
							url: "https://github.com/SpoonBytes/quotecord"
						})
					);

					return;
				}

				if (beforeTag) channel.send(beforeTag);
			});
		});
	}
});

if (config.token) client.login(config.token);
else throw Error("Cannot login: no client token in config.json.");
