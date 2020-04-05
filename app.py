from discord import Client, Embed


class QuotecordClient(Client):
    def __init__(self):
        super().__init__()

        self.help_embed = Embed(type="rich", title="Quotecord Help")
        self.help_embed.add_field(
            name="Command Usage", value="`!quote <message_id>`", inline=False)
        self.help_embed.add_field(
            name="What's a Message ID?", value="Every Discord message has a unique message ID associated with. Message IDs tell Quotecord which message to quote. To find out how to get the ID of a particular message, please see the GitHub Repository link.")
        self.help_embed.add_field(
            name="GitHub Repository", value="https://github.com/bearinsun/quotecord", inline=False)

    def create_descriptive_help_embed(self, description=None):
        self.help_embed.description = description
        return self.help_embed

    async def send_help_embed(self, channel, description=None):
        await channel.send(embed=self.create_descriptive_help_embed(description))

    async def on_ready(self):
        print(f"Logged in as: {self.user}.")

    async def on_message(self, message):
        if message.author == self.user or not message.content.startswith("!quote"):
            return

        message_arguments = message.content.split(" ")
        if len(message_arguments) != 2:
            await self.send_help_embed(message.channel)
            return

        quote_id = message_arguments[1]
        try:
            quote = await message.channel.fetch_message(quote_id)
        except Exception:
            await self.send_help_embed(message.channel, f"Cannot quote message ID `{quote_id}`. Please check that the message ID is correct.")
            return

        if quote.content == "":
            await self.send_help_embed(message.channel, f"Cannot quote message ID `{quote_id}` because it has no text content.")
            return

        embed = Embed(type="rich", description=quote.content,
                      timestamp=quote.created_at)
        embed.set_author(name=quote.author.display_name,
                         icon_url=quote.author.avatar_url)

        attachment_count = len(quote.attachments)
        if attachment_count != 0:
            embed.set_footer(
                text=f"{attachment_count} excluded attachment{'s' if attachment_count > 1 else ''}")

        await message.channel.send(embed=embed)


if __name__ == "__main__":
    from argparse import ArgumentParser

    parser = ArgumentParser()
    parser.add_argument("token", type=str,
                        help="Discord bot authentication token")
    arguments = parser.parse_args()

    QuotecordClient().run(arguments.token)
