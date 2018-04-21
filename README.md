# Quotecord

![Image of example quote](https://i.imgur.com/wEcJfO1.png)

## Table of Contents

* [Download](#download)
* [Finding Token ID](#finding-token-id)
* [Usage](#usage)
  * [Important Note](#important-note)

## Download

[Click here for the latest release.](https://github.com/SpoonBytes/quotecord/releases)

Once Quotecord has been opened, it will create a `config.json` file in the program's directory. Open the file using a text editor, and add your token ID in between the empty quotation marks. Save the file and relaunch Quotecord to begin using it.

## Finding Token ID

![Screenshot of application tab](https://i.imgur.com/QBNTrhX.png)

1.  Press `Ctrl/CMD + Shift + I` (for Mac the keybind is `CMD + Option + I`) while the Discord window is opened.

2.  Switch to the `Application` tab in the window that appears.

3.  Expand the `Local Storage` drop-down on the left and click on the Discord URL.

4.  Find the `token` key in the list that appears: the value is your token ID.

## Usage

1.  Navigate to your Discord settings, then to the Appearance section. Scroll to the bottom of the section and enable the switch labeled `Developer Mode`. This will allow you to copy message IDs, which is an essential part of how Quotecord is able to quote messages.

2.  Right click the message you would like to quote and select `Copy ID`.

3.  Type `{quote:MESSAGE_ID_HERE}` with `MESSGAGE_ID_HERE` replaced by the message ID obtained in the previous step

4.  Send!

### Important Note

![Screenshot of Discord Support article on self-bots](https://i.imgur.com/cGHUpEy.png)

While it is **unlikely** that action will be taken against a self-bot account doing small tasks (such as quoting), please use Quotecord at your own risk. Discord's official stance on self-bots is that they are forbidden.
