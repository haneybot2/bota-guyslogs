const Discord = require('discord.js');
const { Client, Util } = require('discord.js');
const client = new Discord.Client();
const prefix = process.env.prefix
const devs = [process.env.id1];
const id = [process.env.id1 , process.env.id2 , process.env.id3];
////////////elmewal3///////////////a7med//////////////////anas
const fs = module.require("fs"); 
const moment = require("moment"); 
const child_process = require("child_process");
let logs = JSON.parse(fs.readFileSync(`./logs.json`, `utf8`)); 

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
    const channel = cc.guild.channels.find("name", "log")
	
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
 
    var logChannel = oldChannel.guild.channels.find("name", "log")
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
    const channel = dc.guild.channels.find("name", "log")
	
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

     const join =  member.guild.channels.find("name", "log")
     
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
	
    const channel = member.guild.channels.find("name", "log")
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
	const channel = oldm.guild.channels.find("name", "log")
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
    }
    }
  if(oldm.guild.owner.id !== newm.guild.owner.id) {
    let newOwner = new Discord.RichEmbed()
    .setAuthor(oldm.guild.name, oldm.guild.iconURL)
    .setColor('#ff0000')
    .setDescription(`:star2: **Server Settings have been updated**\n:x:**OLD:**\n\`\`\`html\n<ownerID:${oldm.user.id}>\`\`\`\n:white_check_mark: **NEW:**\n\`\`\`html\n<ownerID:${newm.user.id}>\`\`\`\nby : `)
    .setFooter(oldm.guild.name, oldm.guild.iconURL)
        .setTimestamp()

    channel.send(newOwner);
}
});

//guildUpdate
client.on('guildUpdate', (oldGuild, newGuild) => {


  var logChannel = oldGuild.channels.find(c => c.name === 'log');
  if(!logChannel) return;

  oldGuild.fetchAuditLogs().then(logs => {
      var userid = logs.entries.first().executor.id;
      var userava = logs.entries.first().executor.avatarURL;
      var usertag = logs.entries.first().executor.tag;

      if(oldGuild.name !== newGuild.name) {
          let guildName = new Discord.RichEmbed()
          .setAuthor(oldGuild.name, oldGuild.iconURL)
          .setColor('#ff0000')
          .setDescription(`:star2: **Server Settings have been updated**\n:x:**OLD:\n\`\`\`html\n<name: ${oldGuild.name}>\`\`\`\n:white_check_mark:**NEW:**\`\`\`html\n<name: ${newGuild.name}>\`\`\`\nby : <@${userid}>`)
          .setFooter(usertag, userava)
          .setTimestamp()

          logChannel.send(guildName)
      }
      if(oldGuild.region !== newGuild.region) {
        let guildRegion = new Discord.RichEmbed()
        .setAuthor(oldGuild.name, oldGuild.iconURL)
        .setColor('#ff0000')
        .setDescription(`:star2: **Server Settings have been updated**\n:x:**OLD:\n\`\`\`html\n<region: ${oldGuild.region}>\`\`\`\n:white_check_mark:**NEW:**\`\`\`html\n<region: ${newGuild.region}>\`\`\`\nby : <@${userid}>`)
        .setFooter(usertag, userava)
        .setTimestamp()

        logChannel.send(guildRegion);
    }
      if(oldGuild.verificationLevel !== newGuild.verificationLevel) {
          if(oldGuild.verificationLevel === 0) {
              var oldVerLvl = 'Very Easy';
          }else
          if(oldGuild.verificationLevel === 1) {
              var oldVerLvl = 'Easy';
          }else
          if(oldGuild.verificationLevel === 2) {
              var oldVerLvl = 'Medium';
          }else
          if(oldGuild.verificationLevel === 3) {
              var oldVerLvl = 'Hard';
          }else
          if(oldGuild.verificationLevel === 4) {
              var oldVerLvl = 'Very Hard';
          }

          if(newGuild.verificationLevel === 0) {
              var newVerLvl = 'Very Easy';
          }else
          if(newGuild.verificationLevel === 1) {
              var newVerLvl = 'Easy';
          }else
          if(newGuild.verificationLevel === 2) {
              var newVerLvl = 'Medium';
          }else
          if(newGuild.verificationLevel === 3) {
              var newVerLvl = 'Hard';
          }else
          if(newGuild.verificationLevel === 4) {
              var newVerLvl = 'Very Hard';
          }

          let verLog = new Discord.RichEmbed()
          .setAuthor(oldGuild.name, oldGuild.iconURL)
          .setColor('#ff0000')
          .setDescription(`:star2: **Server Settings have been updated**\n:x:**OLD:\n\`\`\`html\n<verificationLevel: ${oldVerLvl}[${oldGuild.verificationLevel}]>\`\`\`\n:white_check_mark:**NEW:**\`\`\`html\n<verificationLevel: ${oldVerLvl}[${newGuild.verificationLevel}]>\`\`\`\nby : <@${userid}>`)
          .setFooter(usertag, userava)
          .setTimestamp()

          logChannel.send(verLog);
      }
  })
});

//guildBanAdd
client.on('guildBanAdd', (guild, user) => {
 
 
    var logChannel = guild.channels.find("name", "log")
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
 
    var logChannel = guild.channels.find("name", "log")
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
 
    if(message.author.bot) return;
    if(message.channel.type === 'dm') return;
    if(!message.guild.member(client.user).hasPermission('EMBED_LINKS')) return;
    if(!message.guild.member(client.user).hasPermission('MANAGE_MESSAGES')) return;
 
    var logChannel = message.guild.channels.find("name", "log")
    if(!logChannel) return;
 
    let messageDelete = new Discord.RichEmbed()
       .setAuthor(`${message.author.tag}`, message.author.avatarURL)
       .setColor('BLACK')
       .setDescription(`**:wastebasket: Message sent by <@${message.author.id}> deleted in <#${message.channel.id}>**`)
       .addField(`Message: `, `\n\n\`\`\`${message}\`\`\``)
       .setTimestamp()
       .setFooter(`${message.author.tag}`, message.author.avatarURL);
 
    logChannel.send(messageDelete);
});

//messageUpdate
client.on('messageUpdate', (oldMessage, newMessage) => {
 
    if(oldMessage.author.bot) return;
    if(!oldMessage.channel.type === 'dm') return;
    if(!oldMessage.guild.member(client.user).hasPermission('EMBED_LINKS')) return;
    if(!oldMessage.guild.member(client.user).hasPermission('MANAGE_MESSAGES')) return;
 
    var logChannel = oldMessage.guild.channels.find("name", "log")
    if(!logChannel) return;
 
    if(oldMessage.content.startsWith('https://')) return;
 
    let messageUpdate = new Discord.RichEmbed()
       .setAuthor(oldMessage.author.tag, oldMessage.author.avatarURL)
       .setColor('SILVER')
       .setDescription(`**:pencil2: Message sent by <@${oldMessage.author.id}> edited in <#${oldMessage.channel.id}> **`)
       .addField(`Old: `, `\n\n\`\`\`${oldMessage.cleanContent}\`\`\``)
       .addField(`New: `, `\n\n\`\`\`${newMessage.cleanContent}\`\`\``)
       .setTimestamp()
       .setFooter(oldMessage.author.tag, oldMessage.author.avatarURL);
 
    logChannel.send(messageUpdate);
});

//roleCreate
client.on('roleCreate', rc => {
    const channel = rc.guild.channels.find("name", "log")
	
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
    const channel = old.guild.channels.find("name", "log")
    
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
    const channel = rd.guild.channels.find("name", "log")
	
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
client.on('voiceStateUpdate', (voiceOld, voiceNew) => {
 
  if(!voiceOld.guild.member(client.user).hasPermission('EMBED_LINKS')) return;
  if(!voiceOld.guild.member(client.user).hasPermission('VIEW_AUDIT_LOG')) return;

  var logChannel = voiceOld.guild.channels.find("name", "log")
  if(!logChannel) return;

  voiceOld.guild.fetchAuditLogs().then(logs => {
    let user = logs.entries.first().executor.tag;
    let userid = logs.entries.first().executor.id;
    let useravatar = logs.entries.first().executor.avatarURL;

// Server Muted Voice
      if(voiceOld.serverMute === false && voiceNew.serverMute === true) {
          let serverMutev = new Discord.RichEmbed()
          .setThumbnail(`http://i8.ae/Rp5g5`)
          .setAuthor(`${voiceOld.user.tag}`, voiceOld.user.avatarURL)
          .setDescription(`:microphone: **${voiceOld} has been muted **By : <@${userid}>`)
          .setFooter(`${user}`, useravatar)
          .setColor('#ff0000')
          .setTimestamp()

          logChannel.send(serverMutev);
      }
// Server UnMuted Voice
      if(voiceOld.serverMute === true && voiceNew.serverMute === false) {
          let serverUnmutev = new Discord.RichEmbed()
          .setThumbnail(`http://i8.ae/iR3rK`)
          .setAuthor(`${voiceOld.user.tag}`, voiceOld.user.avatarURL)
          .setDescription(`:microphone: **${voiceOld} has been unmuted **By : <@${userid}>`)
          .setFooter(`${user}`, useravatar)
          .setColor('#ff0000')
          .setTimestamp()

          logChannel.send(serverUnmutev);
      }
// Server Deafen Voice
      if(voiceOld.serverDeaf === false && voiceNew.serverDeaf === true) {
          let serverDeafv = new Discord.RichEmbed()
          .setThumbnail(`http://i8.ae/5dBeC`)
          .setAuthor(`${voiceOld.user.tag}`, voiceOld.user.avatarURL)
          .setDescription(`:mute: **${voiceOld} has been deafen **By : <@${userid}>`)
          .setFooter(`${user}`, useravatar)
          .setColor('#ff0000')
          .setTimestamp()

          logChannel.send(serverDeafv);
      }
// Server UnDeafen Voice
      if(voiceOld.serverDeaf === true && voiceNew.serverDeaf === false) {
          let serverUndeafv = new Discord.RichEmbed()
          .setThumbnail(`http://i8.ae/XEgMM`)
          .setAuthor(`${voiceOld.user.tag}`, voiceOld.user.avatarURL)
          .setDescription(`:headphones: **${voiceOld} has been undeafen **By : <@${userid}>`)
          .setFooter(`${user}`, useravatar)
          .setColor('#ff0000')
          .setTimestamp()

          logChannel.send(serverUndeafv);
      }
  })
// Join Voice Channel
  if(voiceOld.voiceChannelID !== voiceNew.voiceChannelID && !voiceOld.voiceChannel) {
      let voiceJoin = new Discord.RichEmbed()
      .setAuthor(`${voiceOld.user.tag}`, voiceOld.user.avatarURL)
      .setThumbnail(voiceOld.user.avatarURL)
      .setDescription(`**:arrow_lower_right: <@${voiceOld.id}> has been Join From \`\`${voiceNew.voiceChannel.name}\`\`.**`)
      .setFooter(voiceOld.user.tag, voiceOld.user.avatarURL)
      .setColor('#ff0000')
      .setTimestamp()

      logChannel.send(voiceJoin);
  }
// Leave Voice Channel
  if(voiceOld.voiceChannelID !== voiceNew.voiceChannelID && !voiceNew.voiceChannel) {
      let voiceLeave = new Discord.RichEmbed()
      .setAuthor(`${voiceOld.user.tag}`, voiceOld.user.avatarURL)
      .setThumbnail(voiceOld.user.avatarURL)
      .setDescription(`**:arrow_upper_left: <@${voiceOld.id}> has been Leave From \`\`${voiceOld.voiceChannel.name}\`\`.**`)
      .setFooter(voiceOld.user.tag, voiceOld.user.avatarURL)
      .setColor('#ff0000')
      .setTimestamp()

      logChannel.send(voiceLeave);
  }
});

client.login(process.env.BOT_TOKEN);
