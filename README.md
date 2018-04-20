# Quotecord

![Image of example quote](https://i.imgur.com/wEcJfO1.png)

## Table of Contents

* [Installation](#installation)
* [Finding Token ID](#finding-token-id)
* [Usage](#usage)

## Installation

1.  If it is not installed already, [install Node.js on your system.](https://nodejs.org/)

2.  [Download and extract Quotecord from GitHub.](https://github.com/SpoonBytes/quotecord/archive/master.zip)

3.  Edit the `config.json` file with your account's token ID. To find your account's token ID, please see [Finding Token ID.](#finding-token-id)

4.  Open the terminal/command line inside the Quotecord folder and run the command `npm start`.

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

### Important Note

While it is **unlikely** that action will be taken against a self-bot account doing small tasks (such as quoting), please use Quotecord at your own risk. Discord's official stance on self-bots is that they are forbidden.
