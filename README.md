# Quotecord - The simple self-bot for quoting in Discord!

### Installation
1. If it is not installed already, install Node.js on your system. https://nodejs.org/en/
2. Download the latest release of Quotecord from https://github.com/SpoonBytes/Quotecord/releases
3. Edit config.js inside the Quotecord folder with your account's token ID.
  * The token ID can be found by pressing CTRL+Shift+I in Discord, switching to the Network tab and sending a message in any channel. Look for a request in this tab with the name ```messages``` and find the authorization field for that request. This is your account's token ID.
4. Open the terminal/command line in the Quotecord folder and run the command "node"
5. If the previous steps have been followed correctly, Quotecord should now be running.

### Usage
To quote another users message, simple copy the message ID you are looking to quote by right clicking the message and selecting "Copy ID." Once this has been done, any message containing ```{quote:MESSAGE_ID_HERE}``` will be replaced by the quoted message.
