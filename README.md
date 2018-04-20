# Quotecord - The simple self-bot for quoting in Discord!

## Table of Contents

* [Installation](#installation)
* [Finding Token ID](#finding-token-id)
* [Usage](#usage)

## Installation

1.  If it is not installed already, [install Node.js on your system.](https://nodejs.org/)

2.  [Download Quotecord from GitHub.](https://github.com/SpoonBytes/quotecord/archive/master.zip)

3.  Edit the `config.js` file inside of the Quotecord folder with your account's token ID. To find your account's token ID, please see [Finding Token ID.](#finding-token-id)

4.  Open the terminal/command line in the Quotecord folder and run the command `node app.js`.

## Finding Token ID

![Screenshot of application tab](https://i.imgur.com/QBNTrhX.png)

1.  Press `Ctrl + Shift + I` while the Discord window is opened.

2.  Switch to the `Application` tab in the window that appears.

3.  Expand the `Local Storage` drop-down on the left and click on the Discord URL.

4.  Find the `token` key in the list that appears: the value is your token ID.

## Usage

1.  Right click the message you would like to quote and select `Copy ID`.

2.  Type `{quote:MESSAGE_ID_HERE}` with `MESSGAGE_ID_HERE` replaced by the message ID obtained in the previous step

3.  Send!
