const Discord = require('discord.js');
const client = new Discord.Client();
const ayarlar = require('./ayarlar.json');
client.queue = new Map()
const chalk = require('chalk');
const fs = require('fs');
const Jimp = require('jimp');
const db = require('quick.db');
const Canvas = require('canvas')
const ms = require('parse-ms')
const moment = require('moment');
require('./util/eventLoader')(client);

///////////
const http = require('http');
const path = require('path');
const express = require('express');
const app = express();
app.get("/", (request, response) => {
  response.sendStatus(200)
  //response.sendFile(path.join(__dirname+'/index.html'))
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://projenin-ismi.glitch.me/`);
}, 20000);
///////////

var prefix = ayarlar.prefix;

const log = message => {
  console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] ${message}`);
};

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir('./komutlar/', (err, files) => {
  if (err) console.error(err);
  log(`${files.length} komut yüklenecek.`);
  files.forEach(f => {
    let props = require(`./komutlar/${f}`);
    log(`Yüklenen komut: ${props.help.name}.`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});


client.on('message', message => {
let para = db.fetch(`para_${message.author.id}`)
let altın = db.fetch(`altın_${message.author.id}`)
let kredi = db.fetch(`kredi_${message.author.id}`)
if(para) return

  if(!para) {
  db.set(`para_${message.author.id}`, 0)
db.set(`altın_${message.author.id}`, 0)
db.set(`kredi_${message.author.id}`, 1000)
  db.set(`kartsure_${message.author.id}`, Date.now());
    return 
  } 
});

////oto
 setTimeout(function(){
    client.users.forEach(kullanici => db.add(`para_${kullanici.id}`, 100))
client.channels.get('769699763599441930').send(client.guilds.reduce((a, b) => a + b.memberCount, 0).toLocaleString() + ' Kullanıcının günlük maaşı olan **100$** Yatırıldı!')
     }, 600000);
////////////////////.on('message', msg => {
client.on('message', msg => {
if (!msg.content.startsWith(prefix)) {
    return;
  }

  });


client.elevation = message => {
  if(!message.guild) {
	return; }
  let permlvl = 0;
  if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
  if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
  if (message.author.id === ayarlar.sahip) permlvl = 4;
  return permlvl;
};

client.login(ayarlar.token);