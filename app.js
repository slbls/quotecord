const chalk = require("chalk"),
	{ Client, RichEmbed } = require("discord.js"),
	client = new Client();

function stdinWait() {
	process.stdin.setRawMode(true);
	process.stdin.resume();
	process.stdin.on("data", process.exit.bind(process, 0));
}

client.on("ready", () => {
	console.log(
		chalk.bold.green(
			`Quotecord is currently running and is logged in as ${chalk.inverse(
				client.user.username
			)}.`
		)
	);
	console.log(chalk.gray("To exit Quotecord, press any key..."));

	stdinWait();
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

const fs = require("fs"),
	path = require("path");

// Because pkg, which is used for deploying quotecord, creates its own
// filesystem and bundles all require() files into the binary, the real
// file system is accessed using process.execPath. For this same reason,
// config.json is read using readFile, rather than simply require(), as
// the file would otherwise be packaged into the distributable with no way
// for the user to edit or access its contents.

const configPath = path.join(path.dirname(process.execPath), "config.json");

fs.writeFile(
	configPath,
	JSON.stringify({ token: "" }, null, "\t"),
	{ flag: "wx" },
	error => {
		if (error && error.code === "EEXIST") {
			fs.readFile(configPath, "utf8", (error, data) => {
				const config = JSON.parse(data);
				if (config.token) {
					client.login(config.token);
					return;
				}

				console.log(
					chalk.bold.red(
						"Cannot login: config.json exists but no client token was specified."
					)
				);
				console.log(chalk.gray("Press any key to exit..."));

				process.stdin.setRawMode(true);
				process.stdin.resume();
				process.stdin.on("data", process.exit.bind(process, 0));
			});

			return;
		}

		console.log(
			chalk.bold.green(
				"Quotecord has successfully created the config.json file. Please add your client token to it."
			)
		);
		console.log(chalk.gray("Press any key to exit..."));

		stdinWait();
	}
);
