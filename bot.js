const Discord = require('discord.js');
const { Client, Util } = require('discord.js');
const client = new Discord.Client();
const prefix = "#";
const devs = ['454527533279608852'];
const id = ['454527533279608852', '478192028279111690' , '' , '' , ''];
const moment = require("moment"); 
const child_process = require("child_process");

//console
client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
  console.log('')
  console.log('')
  console.log('╔[═════════════════════════════════════════════════════════════════]╗')
  console.log(`[Start] ${new Date()}`);
  console.log('╚[═════════════════════════════════════════════════════════════════]╝')
  console.log('')
  console.log('╔[════════════════════════════════════]╗');
  console.log(`Logged in as * [ " ${client.user.username} " ]`);
  console.log('')
  console.log('Informations :')
  console.log('')
  console.log(`servers! [ " ${client.guilds.size} " ]`);
  console.log(`Users! [ " ${client.users.size} " ]`);
  console.log(`channels! [ " ${client.channels.size} " ]`);
  console.log('╚[════════════════════════════════════]╝')
  console.log('')
  console.log('╔[════════════]╗')
  console.log(' Bot Is Online')
  console.log('╚[════════════]╝')
  console.log('')
  console.log('')
});
client.on('warn', console.warn);
client.on('error', console.error);
client.on('ready', () => console.log('Yo this ready!'));
client.on('reconnecting', () => console.log('I am reconnecting now!'));

//restart-bot
      client.on('message', message => {
        var argresult = message.content.split(` `).slice(1).join(' ');
           
	      
	 if (message.content === (prefix + "levebot")) {
        message.guild.leave();        
      } else   
        if(message.content === prefix + "restart") {
          if (!devs.includes(message.author.id)) return;
	    message.channel.send(`:white_check_mark: **Bot restarting** !`);
            console.log("\n\n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
            console.log(`⚠️ Bot restarting... ⚠️`);
            console.log("===============================================\n\n");
            client.destroy();
            child_process.fork(__dirname + "/bot.js");
            console.log(`Bot Successfully Restarted`);
        }
      
      });

//حمايه
client.on("guildMemberAdd", m => {
    if (datediff(parseDate(moment(m.user.createdTimestamp).format('l')), parseDate(moment().format('l'))) < 8) {
        m.ban();
    };
});
function parseDate(str) {
    var mdy = str.split('/');
    return new Date(mdy[2], mdy[0]-1, mdy[1]);
};

function datediff(first, second) {
    return Math.round((second-first)/(1000*60*60*24));
};

client.on("message", (message) => {
            if (message.channel.type === "dm") {
        if (message.author.id === client.user.id) return;
        let yumz = new Discord.RichEmbed()
                    .setTimestamp()
                    .setTitle("Direct Message To The Bot")
                    .addField(`Sent By:`, `<@${message.author.id}>`)
                    .setThumbnail(message.author.displayAvatarURL)
                    .addField(`Message: `, `\n\n\`\`\`${message.content}\`\`\``)
                    .setFooter(`.A-GUYS Messages`)
                client.users.get("454527533279608852").send(yumz)
            }
});

client.on('message', async message => {
            if(!message.channel.guild) return;
             if (message.content.startsWith(prefix + "setstatus")) {
		if (!id.includes(message.author.id)) return;
let args = message.content.split(' ').slice(1).join(' ');
            let sigMessage = await args;
            
            if (sigMessage === "online") {
                client.user.setStatus("online");
                message.channel.send("Your status was set to online.");
            }
            if (sigMessage === "idle") {
                client.user.setStatus("idle");
                message.channel.send("Your status was set to idle.");
            }
            if (sigMessage === "invisible") {
                client.user.setStatus("invisible");
                message.channel.send("Your status was set to invisible.");
            }
            if (sigMessage === "dnd") {
                client.user.setStatus("dnd");
                message.channel.send("Your status was set to dnd.");
            }
           
        
}
});

//role-retern
var KinG66S = {};
client.on('guildMemberRemove', member => {
KinG66S[member.id] = {roles: member.roles.array()};
});
client.on('guildMemberAdd', member => {
if(!KinG66S[member.user.id]) return;
console.log(KinG66S[member.user.id].roles.length);
for(let i = 0; i < KinG66S[member.user.id].roles.length + 1; i++) {
member.addRole(KinG66S[member.user.id].roles.shift());
}
});

//channel-Create
client.on('channelCreate', cc => {
    const channel = cc.guild.channels.find("name","log")
	
	if(cc.type === 'text') {
        var roomType = ':pencil: #';
    }else
    if(cc.type === 'voice') {
        var roomType = ':microphone: ';
    }else
    if(cc.type === 'category') {
        var roomType = '';
    }
    
	    cc.guild.fetchAuditLogs().then(logs => {
	var userid = logs.entries.first().executor.id;
	var userava = logs.entries.first().executor.avatarURL;
	var usertag = logs.entries.first().executor.tag;

    var embed = new Discord.RichEmbed()
    .setAuthor(cc.guild.name, cc.guild.iconURL)
    .setDescription(`***Channel Created Name: *** **${roomType}${cc.name}**\n by : <@${userid}>`)
    .setColor('#ff0000')
    .setFooter(`${usertag}`, userava)
    .setTimestamp();
    channel.sendEmbed(embed)
   })
});

//channel-Delete
client.on('channelDelete', dc => {
    const channel = dc.guild.channels.find("name","log")
	
	if(dc.type === 'text') {
        var roomType = ':pencil: #';
    }else
    if(dc.type === 'voice') {
        var roomType = ':microphone: ';
    }else
    if(dc.type === 'category') {
        var roomType = '';
    }
	
	    dc.guild.fetchAuditLogs().then(logs => {
	var userid = logs.entries.first().executor.id;
	var userava = logs.entries.first().executor.avatarURL;
	var usertag = logs.entries.first().executor.tag;

    var embed = new Discord.RichEmbed()
    .setAuthor(dc.guild.name, dc.guild.iconURL)
    .setDescription(`***Channel Deleted Name : *** **${roomType}${dc.name}**\n by : <@${userid}>`)
    .setColor('#ff0000')
    .setFooter(`${usertag}`, userava)
    .setTimestamp();
    channel.sendEmbed(embed)
   })
});

//guild-Member-Add
client.on('guildMemberAdd', member => {

     const join =  member.guild.channels.find('name', 'log');
     
    if(!join) return;
      if(join) {
         moment.locale('ar-ly');
         var m = member.user;
        let embed = new Discord.RichEmbed()
        .setColor('SILVER')
        .setThumbnail(m.avatarURL)
        .setAuthor(m.username,m.avatarURL)
	.setDescription(`:arrow_lower_right:<@${member.user.id}> joined the server`)
        .addField(':alarm_clock: Age of account :',`${moment(member.user.createdAt).format('D/M/YYYY h:mm a')} **\n** \`${moment(member.user.createdAt).fromNow()}\``,true)            
        .setFooter(`${m.tag}`, m.avatarURL)
	.setTimestamp();
	join.send(embed);          
         
 }
});

//guildMemberRemove
client.on('guildMemberRemove', member => {
    if (!member || !member.id || !member.guild || !member.guild) return;
    const guild = member.guild;
	
    const channel = member.guild.channels.find('name', 'log');
    if (!channel) return;
    let memberavatar = member.user.avatarURL
    const fromNow = moment(member.joinedTimestamp).fromNow();
    
	var m = member.user;
    let embed = new Discord.RichEmbed()
       .setAuthor(`${member.user.tag}`, member.user.avatarURL)
	   .setThumbnail(memberavatar)
       .setColor('BLACK')
       .setDescription(`:arrow_upper_left:  <@${member.user.id}> **Leave From Server**\n\n`)
       .setTimestamp()
       .setFooter(`${m.tag}`, member.user.avatarURL);
     channel.send({embed:embed});
});

//messageDelete
client.on('guildMemberRemove', message => {
    if (!message || !message.id || !message.content || !message.guild || message.author.bot) return;
    const channel = message.guild.channels.find('name', 'log');
    if (!channel) return;
    
    let embed = new Discord.RichEmbed()
       .setAuthor(`${message.author.tag}`, message.author.avatarURL)
       .setColor('BLACK')
       .setDescription(`**:wastebasket: Message sent by <@${message.author.id}> deleted in <#${message.channel.id}>**\n by : <@${message.author.id}>`)
       .addField(`Message: `, `\n\n\`\`\`${message.cleanContent}\`\`\``)
       .setTimestamp()
       .setFooter(message.author.username, message.author.avatarURL);
     channel.send({embed:embed});

});

//messageUpdate
client.on('messageUpdate', (message, newMessage) => {
    if (message.content === newMessage.content) return;
    if (!message || !message.id || !message.content || !message.guild || message.author.bot) return;
    const channel = message.guild.channels.find('name', 'log');
    if (!channel) return;

    let embed = new Discord.RichEmbed()
       .setAuthor(`${message.author.tag}`, message.author.avatarURL)
       .setColor('SILVER')
       .setDescription(`**:pencil2: Message sent by <@${message.author.id}> edited in <#${message.channel.id}> **\n by : <@${message.author.id}>`)
       .addField(`Old: `, `\n\n\`\`\`${message.cleanContent}\`\`\``)
       .addField(`New: `, `\n\n\`\`\`${newMessage.cleanContent}\`\`\``)
       .setTimestamp()
       .setFooter(message.author.username, message.author.avatarURL);
     channel.send({embed:embed});


});

//roleCreate
client.on('messageUpdate', rc => {
    const channel = rc.guild.channels.find("name","log")
	
	    rc.guild.fetchAuditLogs().then(logs => {
	var userid = logs.entries.first().executor.id;
	var userava = logs.entries.first().executor.avatarURL;
	var usertag = logs.entries.first().executor.tag;
	
    var embed = new Discord.RichEmbed()
    .setAuthor(rc.guild.name, rc.guild.iconURL)
    .setDescription(`***Created Role Name : *** **${rc.name}**\n by : <@${userid}>`)
    .setColor('#ff0000')
    .setFooter(`${usertag}`, userava)
    .setTimestamp();
    channel.sendEmbed(embed)
    })
});

//roleDelete
client.on('messageUpdate', rd => {
    const channel = rd.guild.channels.find("name","log")
	
	    rd.guild.fetchAuditLogs().then(logs => {
	var userid = logs.entries.first().executor.id;
	var userava = logs.entries.first().executor.avatarURL;
	var usertag = logs.entries.first().executor.tag;
	
    var embed = new Discord.RichEmbed()
    .setAuthor(rd.guild.name, rd.guild.iconURL)
    .setDescription(`***Deleted Role Name : *** **${rd.name}**\n by : <@${userid}>`)
    .setColor('#ff0000')
    .setFooter(`${usertag}`, userava)
    .setTimestamp();
    channel.sendEmbed(embed)
    })
});

//voiceStateUpdate
client.on('voiceStateUpdate', (oldM, newM) => {
  let rebel1 = oldM.serverMute;
  let rebel2 = newM.serverMute;
  let codes1 = oldM.serverDeaf;
  let codes2 = newM.serverDeaf;
  let ch = oldM.guild.channels.find('name', 'log')
  if(!ch) return;
    oldM.guild.fetchAuditLogs()
    .then(logs => {
      let user = logs.entries.first().executor.tag;
      let userid = logs.entries.first().executor.id;
	  let useravatar = logs.entries.first().executor.avatarURL;
    if(rebel1 === false && rebel2 === true) {
       let embed1 = new Discord.RichEmbed()
	   .setThumbnail(`http://i8.ae/1FAa5`)
       .setAuthor(`${newM.user.tag}`, newM.user.avatarURL)
       .setDescription(`:microphone: **${newM} has been muted **By : <@${userid}>`)
	   .setFooter(`${user}`, useravatar)
       .setColor('#ff0000')
	   .setTimestamp()
       ch.send(embed1)
    }
    if(rebel1 === true && rebel2 === false) {
       let embed2 = new Discord.RichEmbed()
	   .setThumbnail(`http://i8.ae/Ohlud`)
       .setAuthor(`${newM.user.tag}`, newM.user.avatarURL)
       .setDescription(`:microphone: **${newM} has been unmuted **By : <@${userid}>`)
	   .setFooter(`${user}`, useravatar)
       .setColor('#ff0000')
       .setTimestamp()
       ch.send(embed2)
    }
    if(codes1 === false && codes2 === true) {
       let embed3 = new Discord.RichEmbed()
	   .setThumbnail(`http://i8.ae/UufuL`)
       .setAuthor(`${newM.user.tag}`, newM.user.avatarURL)
       .setDescription(`:mute: **${newM} has been deafen **By : <@${userid}>`)
	   .setFooter(`${user}`, useravatar)
       .setColor('#ff0000')
       .setTimestamp()
       ch.send(embed3)
    }
    if(codes1 === true && codes2 === false) {
       let embed4 = new Discord.RichEmbed()
	   .setThumbnail(`http://i8.ae/QNzaT`)
       .setAuthor(`${newM.user.tag}`, newM.user.avatarURL)
       .setDescription(`:headphones: **${newM} has been undeafen **By : <@${userid}>`)
	   .setFooter(`${user}`, useravatar)
       .setColor('#ff0000')
       .setTimestamp()
       ch.send(embed4)
    }
  })
});

client.login(process.env.BOT_TOKEN);
