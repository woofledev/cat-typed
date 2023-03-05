# cat-typed
bot that sends what my cat typed from a text file
## how it works
the text file is opened in a custom program i made, which autosaves the text file every character written. you  can figure that part out though.<br>
basically you enter `cat-typed (chars)`, which will send the number of characters from the text file to discord.<br>
`cat-typed *` sends the whole text file<br>
`cat-ping`  just to check if the bot even works
## install
after you got the repo, create 2 files:<br>
#### config.json:
```json
{
    "file": "sometextfile.txt",
    "token": "your token goes here"
}
```
sometextfile.txt (or the text file u set) will be left empty (up to you really).<br><br>
after that, just run `npm i` to install dependencies, and `node bot` to run the bot.