import { Client, RichEmbed } from "discord.js";
import config from "./config";

const client = new Client();

client.on("ready", () => {
	console.log(`Logged in as ${client.user.username}.`);
});

client.on("message", message => {
	if (message.client === client) {
		const channel = message.channel;
		let quote = message.content.match(/{quote:\d+}/);

		if (!quote) return;

		quote = quote[0];
		let quoteId = quote.split(":")[1].replace("}", "");

		channel.fetchMessages().then(messages => {
			const quoteSource = messages.get(quoteId),
				quoteEmbed = new RichEmbed();

			quoteEmbed
				.setAuthor(
					`${quoteSource.author.username} said: `,
					quoteSource.author.avatarURL
				)
				.setDescription(quoteSource.content)
				.setURL("https://github.com/SpoonBytes/quotecord");

			channel
				.sendEmbed(quoteEmbed)
				.then(m =>
					channel.sendMessage(message.content.replace(/{quote:\d+}/, ""))
				);

			message.delete();
		});
	}
});

if (config.token) client.login(config.token);
else throw Error("Cannot login: no client token in config.json.");
