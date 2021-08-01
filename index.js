const Discord = require("discord.js")
const app = new Discord.Client();

var scan = [];

if (process.env.NODE_ENV !== 'production') {
    console.log("Starting in test mode");
    require('dotenv').config();
}

app.on("ready", () => {
    const servers =  app.guilds.cache.size;
    console.log("Bot active - Servers: " + servers);
    app.user.setActivity('Looking for spammers..', { type: "PLAYING"})

    //init array to filter
    scan.push("website.com");
    scan.push("website2.eu");
    scan.push("link-to-website.cc");

  });

app.on("message", async msg => {
    if (msg.author.bot || msg.channel.type == "dm") return; //if messages comes from a bot or is sent in dm's ignore
    const body = msg.content.toLowerCase();

    scan.forEach( i => {
        if(body.includes(i)){
            msg.delete();
            msg.channel.send("Malicious link automatically removed. Warned user: " + msg.member.user.tag);
            //msg.member.ban({reason: "[ Automatic ban ] Spreading malicious scam/phishing links"}).catch(error => msg.reply(error));
            return;
        }
    })

})

app.login(process.env.DTOKEN)