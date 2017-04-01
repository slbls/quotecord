const Discord = require("discord.js");
const config = require("./config.json");
const client = new Discord.Client();

client.on('ready', () => {
	console.log(`Logged in as ${client.user.username}.`);
});

client.on('message', msg => {
	if(msg.client === client) {
		let channel = msg.channel;
		let quote = msg.content.match(/{quote:\d+}/);
		
		if(quote) {
			quote = quote[0];
			let quoteId = quote.split(":")[1].replace("}", "");
			channel.fetchMessages().then(msgs => {
				let quoteSource = msgs.get(quoteId);
				let quoteEmbed = new Discord.RichEmbed();
				quoteEmbed.setAuthor(`${quoteSource.author.username} said: `, quoteSource.author.avatarURL).setDescription(quoteSource.content).setURL("https://github.com/SpoonBytes/Quotecord");
				channel.sendEmbed(quoteEmbed).then(m => channel.sendMessage(msg.content.replace(/{quote:\d+}/, "")));

				msg.delete();
			});
		}
	}
});

if(config.token) {
	client.login(config.token);
} else {
	throw Error("Cannot login: no client token in config.json.");
}