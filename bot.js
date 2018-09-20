const Discord = require('discord.js');
const { Client, Util } = require('discord.js');
const client = new Discord.Client();
const prefix = "#";
const devs = ['454527533279608852'];
const id = ['454527533279608852', '344526837512273922' , '478192028279111690' , '' , ''];
////////////elmewal3///////////////a7med//////////////////anas
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

//restart-bot
      client.on('message', message => {
        var argresult = message.content.split(` `).slice(1).join(' ');
          if (!devs.includes(message.author.id)) return;
          
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
        } else
	 if(message.content === (prefix + "shutdown")) {
           if (!devs.includes(message.author.id)) return;
           message.channel.send(':warning: **Bot Shutdown**')
           process.kill(process.pid)
        } else return;

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

client.on('guildMemberAdd', member => {
    member.addRole(member.guild.roles.find("name",".AG"));
});

//voise online
client.on('voiceStateUpdate', (old, now) => {
  const channel = client.channels.get('471810322601345024');
  const currentSize = channel.guild.members.filter(m => m.voiceChannel).size;
  const size = channel.name.match(/\[\s(\d+)\s\]/);
  if (!size) return channel.setName(`.AG Online: [${currentSize}]`);
  if (currentSize !== size) channel.setName(`Voice Online: [${currentSize}]`);
});

//up-time-bot
client.on('message', message => {
     var prefix = "#"
     if (message.author.bot) return;
if (message.content.startsWith(prefix + "uptime")) {
	if(!message.member.hasPermission('MANAGE_MESSAGE')) return;
    let uptime = client.uptime;

    let days = 0;
    let hours = 0;
    let minutes = 0;
    let seconds = 0;
    let notCompleted = true;

    while (notCompleted) {

        if (uptime >= 8.64e+7) {

            days++;
            uptime -= 8.64e+7;

        } else if (uptime >= 3.6e+6) {

            hours++;
            uptime -= 3.6e+6;

        } else if (uptime >= 60000) {

            minutes++;
            uptime -= 60000;

        } else if (uptime >= 1000) {
            seconds++;
            uptime -= 1000;

        }

        if (uptime < 1000)  notCompleted = false;

    }

    message.channel.send("`" + `${days} days, ${hours} hrs, ${minutes} min, ${seconds} sec` + "`");


}
});

client.on('message', message => {
    var argresult = message.content.split(` `).slice(1).join(' ');
      if (!id.includes(message.author.id)) return;
      
  if (message.content.startsWith(prefix + 'setplaying')) {
    client.user.setGame(argresult);
      message.channel.send(`**✅   ${argresult}**`)
  } else 
  if (message.content.startsWith(prefix + 'setwatching')) {
  client.user.setActivity(argresult, {type:'WATCHING'});
      message.channel.send(`**✅   ${argresult}**`)
  } else 
  if (message.content.startsWith(prefix + 'setliste')) {
  client.user.setActivity(argresult , {type:'LISTENING'});
      message.channel.send(`**✅   ${argresult}**`)
  } else 
  if (message.content.startsWith(prefix + 'setstrem')) {
    client.user.setGame(argresult, "https://www.twitch.tv/idk");
      message.channel.send(`**✅**`)
  }
  if (message.content.startsWith(prefix + 'setname')) {
  client.user.setUsername(argresult).then
      message.channel.send(`Changing The Name To ..**${argresult}** `)
} else
if (message.content.startsWith(prefix + 'setavatar')) {
  client.user.setAvatar(argresult);
    message.channel.send(`Changing The Avatar To :**${argresult}** `);
}
});

//channel-Create
client.on('channelCreate', cc => {
    const channel = cc.guild.channels.find(c => c.name === 'log');
	
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

//channelUpdate
client.on('channelUpdate', (oldChannel, newChannel) => {
    if(!oldChannel.guild) return;
 
    var logChannel = oldChannel.guild.channels.find(c => c.name === 'log');
    if(!logChannel) return;
 
    if(oldChannel.type === 'text') {
        var channelType = 'Text';
    }else
    if(oldChannel.type === 'voice') {
        var channelType = 'Voice';
    }else
    if(oldChannel.type === 'category') {
        var channelType = 'Category';
    }
 
    oldChannel.guild.fetchAuditLogs().then(logs => {
        var userID = logs.entries.first().executor.id;
        var userAvatar = logs.entries.first().executor.avatarURL;
	var usertag = logs.entries.first().executor.tag;
 
        if(oldChannel.name !== newChannel.name) {
            let newName = new Discord.RichEmbed()
            .setAuthor(oldChannel.guild.name, oldChannel.guild.iconURL)
            .setColor('#ff0000')
            .setDescription(`**${channelType} channel name has been changed **\n**Old Name: \`\`${oldChannel.name}\`\`**\n**New Name: \`\`${newChannel.name}\`\`**\n by : <@${userID}>`)
            .setFooter(`${usertag}`, userAvatar)
            .setTimestamp()
 
            logChannel.send(newName);
        }
    })
});

//channel-Delete
client.on('channelDelete', dc => {
    const channel = dc.guild.channels.find(c => c.name === 'log');
	
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

     const join =  member.guild.channels.find(c => c.name === 'log');
     
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
	
    const channel = member.guild.channels.find(c => c.name === 'log');
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

//guildMemberUpdate
client.on('guildMemberUpdate', (oldm, newm) => {
	const channel = oldm.guild.channels.find(c => c.name === 'log');
	if (oldm.roles.size !== newm.roles.size) {
		
    if (oldm.roles.size > newm.roles.size) {
		
	oldm.guild.fetchAuditLogs().then(logs => {
    var userid = logs.entries.first().executor.id;
    var userava = logs.entries.first().executor.avatarURL;
    var usertag = logs.entries.first().executor.tag;
    let dif = oldm.roles.filter(r => !newm.roles.has(r.id)).first()
    
    var embed = new Discord.RichEmbed()
    .setAuthor(oldm.user.tag, oldm.user.avatarURL)
    .setDescription(`**:x: <@${oldm.id}> was removed from the \`\`${dif.name}\`\` role** by : <@${userid}>`)
    .setColor('#ff0000')
    .setFooter(`${usertag}`, userava)
    .setTimestamp();
    channel.sendEmbed(embed)
    })
        
    } else if (oldm.roles.size < newm.roles.size) {
	
       
	oldm.guild.fetchAuditLogs().then(logs => {
    var userid = logs.entries.first().executor.id;
    var userava = logs.entries.first().executor.avatarURL;
    var usertag = logs.entries.first().executor.tag;
    let dif = newm.roles.filter(r => !oldm.roles.has(r.id)).first()
    
    var embed = new Discord.RichEmbed()
    .setAuthor(oldm.user.tag, oldm.user.avatarURL)
    .setDescription(`**:white_check_mark:  <@${newm.id}> was given the \`\`${dif.name}\`\` role** by : <@${userid}>`)
    .setColor('#ff0000')
    .setFooter(`${usertag}`, userava)
    .setTimestamp();
    channel.sendEmbed(embed)
    })
    };
	}
});

//guildBanAdd
client.on('guildBanAdd', (guild, user) => {
 
 
    var logChannel = guild.channels.find(c => c.name === 'log');
    if(!logChannel) return;
 
    guild.fetchAuditLogs().then(logs => {
        var userID = logs.entries.first().executor.id;
        var userAvatar = logs.entries.first().executor.avatarURL;
	var usertag = logs.entries.first().executor.tag;
 
        if(userID === client.user.id) return;
 
        let banInfo = new Discord.RichEmbed()
        .setAuthor(user.tag, user.avatarURL)
        .setThumbnail(user.avatarURL)
        .setColor('#ff0000')
        .setDescription(`**:airplane: <@${user.id}> banned from the server**\nby : <@${userid}>`)
        .setFooter(`${usertag}`, userAvatar)
	.setTimestamp()
 
        logChannel.send(banInfo);
    })
});

//guildBanRemove
client.on('guildBanRemove', (guild, user) => {
 
    var logChannel = guild.channels.find(c => c.name === 'log');
    if(!logChannel) return;
 
    guild.fetchAuditLogs().then(logs => {
        var userID = logs.entries.first().executor.id;
        var userAvatar = logs.entries.first().executor.avatarURL;
	var usertag = logs.entries.first().executor.tag;
 
        let unBanInfo = new Discord.RichEmbed()
        .setAuthor(user.tag, user.avatarURL)
        .setThumbnail(user.avatarURL)
        .setColor('#ff0000')
        .setDescription(`**:blue_car: The ban of <@${user.id}> has been removed**\nby : <@${userid}>`)
        .setFooter(`${usertag}`, userAvatar)
		.setTimestamp()
 
        logChannel.send(unBanInfo);
    })
});

//messageDelete
client.on('messageDelete', message => {
    if (!message || !message.id || !message.content || !message.guild || message.author.bot) return;
    const channel = message.guild.channels.find(c => c.name === 'log');
    if (!channel) return;
	
	message.guild.fetchAuditLogs().then(logs => {
	var userid = logs.entries.first().executor.id;
	var userava = logs.entries.first().executor.avatarURL;
	var usertag = logs.entries.first().executor.tag;
    
    let embed = new Discord.RichEmbed()
       .setAuthor(`${message.author.tag}`, message.author.avatarURL)
       .setColor('BLACK')
       .setDescription(`**:wastebasket: Message sent by <@${message.author.id}> deleted in <#${message.channel.id}>**\n by : <@${userid}>`)
       .addField(`Message: `, `\n\n\`\`\`${message.cleanContent}\`\`\``)
       .setTimestamp()
       .setFooter(`${usertag}`, userava);
     channel.send({embed:embed});
	})
});

//messageUpdate
client.on('messageUpdate', (message, newMessage) => {
    if (!message || !message.id || !message.content || !message.guild || message.author.bot) return;
    const channel = message.guild.channels.find(c => c.name === 'log');
    if (!channel) return;

    let embed = new Discord.RichEmbed()
       .setAuthor(`${message.author.tag}`, message.author.avatarURL)
       .setColor('SILVER')
       .setDescription(`**:pencil2: Message sent by <@${message.author.id}> edited in <#${message.channel.id}> **`)
       .addField(`Old: `, `\n\n\`\`\`${message.cleanContent}\`\`\``)
       .addField(`New: `, `\n\n\`\`\`${newMessage.cleanContent}\`\`\``)
       .setTimestamp()
       .setFooter(message.author.tag, message.author.avatarURL);
     channel.send({embed:embed});


});

//roleCreate
client.on('roleCreate', rc => {
    const channel = rc.guild.channels.find(c => c.name === 'log');
	
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

//roleUpdate
client.on('roleUpdate', (old, nw) => {
    const channel = old.guild.channels.find(c => c.name === 'log');
    
    if(old.name !== nw.name) {
        old.guild.fetchAuditLogs().then(logs => {
    var userid = logs.entries.first().executor.id;
    var userava = logs.entries.first().executor.avatarURL;
    var usertag = logs.entries.first().executor.tag;
    
    var embed = new Discord.RichEmbed()
    .setAuthor(old.guild.name, old.guild.iconURL)
    .setDescription(`Role name has been changed \n**Old name: \`\`${old.name}\`\`**\n**New name: \`\`${nw.name}\`\`**\n by : <@${userid}>`)
    .setColor('#ff0000')
    .setFooter(`${usertag}`, userava)
    .setTimestamp();
    channel.sendEmbed(embed)
    })
   }
});

//roleDelete
client.on('roleDelete', rd => {
    const channel = rd.guild.channels.find(c => c.name === 'log');
	
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
  let ch = oldM.guild.channels.find(c => c.name === 'log');
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
