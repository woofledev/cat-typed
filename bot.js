const Discord = require('discord.js');
const {MessageAttachment} = require('discord.js');
const fs = require('fs');
const conf = require('./config');
const client = new Discord.Client({
    intents:[
        Discord.Intents.FLAGS.GUILDS,
        Discord.Intents.FLAGS.GUILD_MESSAGES
    ]});
const filePath = conf.file;
client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
  client.user.setPresence({
    status: 'online',
    activities: [{name:'the cat typing', type:'LISTENING'}]
  })
});

client.on('message', async message => {
    if (message.author.bot || !message.guild) return;
    const typedMessage = message.content.trim();
    if (typedMessage.startsWith('cat-ping')){
      message.channel.send('Pong!');
    } else if (typedMessage === 'cat-typed *') {
      if (!message.channel.permissionsFor(client.user).has('ATTACH_FILES')) {message.channel.send("enable file perms so i can send it.");return;}
      const fileContents = await fs.promises.readFile(filePath, 'utf-8');
      const fileAttachment = new MessageAttachment(Buffer.from(fileContents), filePath);
      message.channel.send({ files: [fileAttachment] });
    } else if (typedMessage.startsWith('cat-typed ')) {
      const numCharacters = typedMessage.split(' ')[1];
      if (isNaN(numCharacters) || numCharacters <= 0) return;
      if (!message.channel.permissionsFor(client.user).has('ATTACH_FILES')) {message.channel.send("enable file perms so i can send it.");return;}
      const fileContents = await fs.promises.readFile(filePath, 'utf-8');
      const lastCharacters = fileContents.slice(-numCharacters);
      const fileAttachment = new MessageAttachment(Buffer.from(lastCharacters), 'cat-chars-'+numCharacters+'.txt');
      message.channel.send({ files: [fileAttachment] });
    }
  });
  
client.login(conf.token);
