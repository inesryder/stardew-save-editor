# How to use this program

## Installation

Prerequisite : NodeJS and NPM

1. Clone the repository.
2. Run `npm i` in a command prompt to install the dependencies.
3. Run `npm link` to generate the `stardew` global command.

## Usage

1. Go to the Stardew Valley save folder : `%appdata%\StardewValley\Saves`.
2. Open the save folder you want to edit (ex : `Ness_247241397`).
3. Open a command prompt.
4. Type `stardew SAVE_FILE_NAME` and enter. In my case, I would type `stardew Ness_247241397`.

## Program

Once the program is opened, you will have three editions options :
- Change your name : `name Harry`,
- Change your amount of money : `money 50670`,
- Or change the amount of an item in your inventory : `4 50` (a numbered list will be shown beforehand).

Once done with the edition, type in `save` to generate the new save file.

> To avoid irreperable damage, a backup file is generated at lauch. Is it titled `SAVE_FILE_backup`. As an example, by backup save file is named `Ness_247241397_backup`

> Before you load your game, you will notice than the save shows the old name and money value. That's normal, load the game and you will see the values will have updated to the values you have chosen.
