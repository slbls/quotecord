# Quotecord - The simple self-bot for quoting in Discord!

## Installation

1.  If it is not installed already, install Node.js on your system. https://nodejs.org/en/
2.  Download Quotecord from GitHub.
3.  Edit config.js inside the Quotecord folder with your account's token ID. To find your account's token ID, read the section "Finding Token ID" below.
4.  Open the terminal/command line in the Quotecord folder and run the command "node app.js"
5.  If the previous steps have been followed correctly, Quotecord should now be running.

## Finding Token ID

1.  Press CTRL+Shift+I in Discord.
2.  Switch to the `Network` tab in the window that appears.
    ![](http://i.imgur.com/IuNf1GL.png)
3.  With this window still open, send a message in any Discord channel. Look for a request named `messages` in the list of items that appears (see bottom of image).
    ![](http://i.imgur.com/BWSd48r.png?1)
4.  Click on the `messages` request. In the panel that appears to the right click the `Headers` tab and scroll down to the `Request Headers` section. The value labeled `authorization` is your account's token ID.
    ![](http://i.imgur.com/OJKNSLe.png?1)

## Usage

To quote another users message, simple copy the message ID you are looking to quote by right clicking the message and selecting "Copy ID." Once this has been done, any message containing `{quote:MESSAGE_ID_HERE}` will be replaced by the quoted message.
