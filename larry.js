const db = require("coders.db");
const discord = require("discord.js");
const client = new discord.Client({ disableEveryone: true });
client.login("Nzg0MTY2MzAzNzgyOTI4NDA0.X8lVxw.y8cox-RKhOu_wI1ekKsFMBfARYg");
const fetch = require("node-fetch");
const fs = require("fs");
require("express")().listen(1343);
//UPTİME

const express = require("express");
const app = express();
const http = require("http");
app.get("/", (request, response) => {
  console.log("Pinglenmedi.");
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);

//OYNUYOR KISMI

client.on('ready', async () => {
   client.appInfo = await client.fetchApplication();
  setInterval( async () => {
    client.appInfo = await client.fetchApplication();
    client.channels.resolve("840554033629626409").join({edit: ""})

  }, 60000);
  client.user.setActivity("xalpha-tech.xyz", {type:"WATCHING"})  
  console.log("Aktif!")

});

setInterval(() => {
  var links = db.get("linkler");
  if (!links) return;
  var linkA = links.map(c => c.url);
  linkA.forEach(link => {
    try {
      fetch(link);
    } catch (e) {
      console.log("" + e);
    }
  });
  console.log("Pinglendi.");
}, 60000);

client.on("ready", () => {
  if (!Array.isArray(db.get("linkler"))) {
    db.set("linkler", []);
  }
});

//embed hazırlıkları


const help = new discord.MessageEmbed()
.setFooter("Larry Uptime")
.setColor("BLUE")
.setThumbnail('yok')
.setDescription(`Selamlar, botunu uptime etmeye hazırmısın? 
\n👥 artık kolay bir şekilde botunu 7/24 aktif edebilirsin!
\n👋🏻 uptime olmak için \`la!ekle [glitch linki]\` yazabilirsin 
\n🎭 Uptime ettiğin botlarımı görmek istiyorsun \`!göster\` `)





client.on("message", message => {
  if (message.author.bot) return;
  var spl = message.content.split(" ");
  if (spl[0] == "!ekle") {
    var link = spl[1];
    fetch(link)
      .then(() => {
        if (
          db
            .get("linkler")
            .map(z => z.url)
            .includes(link)
        )
             return message.channel.send(new discord.MessageEmbed().setFooter("Larry Uptime").setColor("RED").setDescription("Projeniz Sistemimizde Zaten Var."));
        message.channel.send(new discord.MessageEmbed().setFooter("Larry Uptime").setColor("BLUE").setDescription("Projeniz Sistemimize Başarıyla Eklendi."));
        db.push("linkler", { url: link, owner: message.author.id });
      })
      .catch(e => {
        return message.channel.send(new discord.MessageEmbed().setFooter("Larry Uptime").setColor("GOLD").setDescription("Lütfen Geçerli Bir Link Giriniz"));
      });
  }
});

client.on("message", message => {
  if (message.author.bot) return;
  var spl = message.content.split(" ");
  if (spl[0] == "!say") {
    var link = spl[1];
    message.channel.send(new discord.MessageEmbed().setFooter("Larry Uptime").setColor("BLUE").setDescription(`**${db.get("linkler").length}** Proje uptime ediliyor!`));
  }
});

client.on("message", message => {
  if (message.author.bot) return;
  var spl = message.content.split(" ");
  if (spl[0] == "!yardım") {
    var link = spl[1];
    message.channel.send(help);
  }
});

client.on("message", message => {
  if (message.author.bot) return;
  var spl = message.content.split(" ");
  if (spl[0] == "!yardım") {
    var link = spl[1];
    message.channel.send(new discord.MessageEmbed().setFooter("Larry Uptime").setColor("BLUE").setDescription(`👋🏻 uptime yapmak için \`!ekle [glitch linki]\` yazabilirsin.`));
  }
});