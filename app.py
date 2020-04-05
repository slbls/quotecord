from discord import Client, Embed, NotFound, Forbidden, HTTPException


class QuotecordClient(Client):
    def __init__(self):
        super().__init__()

        self.help_embed = Embed(type="rich", title="Quotecord Help")
        self.help_embed.add_field(
            name="Command Usage", value="`!quote <message_id>`", inline=False
        )
        self.help_embed.add_field(
            name="What's a Message ID?",
            value="Every Discord message has a unique ID associated with it. Message IDs tell Quotecord which message to quote. To find out how to get the ID of a particular message, please see the GitHub Repository link.",
        )
        self.help_embed.add_field(
            name="GitHub Repository",
            value="https://github.com/bearinsun/quotecord",
            inline=False,
        )

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

        quote = None
        quote_id = message_arguments[1]

        try:
            quote = await message.channel.fetch_message(quote_id)
        except (NotFound, Forbidden, HTTPException) as exception:
            if isinstance(exception, NotFound):
                help_description = "No message with that ID was found."
            elif isinstance(exception, Forbidden):
                help_description = "Quotecord does not have the permissions required."
            elif isinstance(exception, HTTPException):
                help_description = "The API request failed. This can occur when an invalid or incorrect ID is provided."

        if quote is None or quote.content == "":
            if quote is not None:
                help_description = "The message has no text content."

            await self.send_help_embed(
                message.channel,
                f"Cannot quote message ID `{quote_id}`. {help_description}",
            )
            return

        await message.channel.send(
            embed=Embed(
                type="rich", description=quote.content, timestamp=quote.created_at
            ).set_footer(
                text=quote.author.display_name, icon_url=quote.author.avatar_url
            )
        )


if __name__ == "__main__":
    from argparse import ArgumentParser

    parser = ArgumentParser()
    parser.add_argument("token", type=str, help="Discord bot authentication token")
    arguments = parser.parse_args()

    QuotecordClient().run(arguments.token)
