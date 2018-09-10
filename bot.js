const Discord = require('discord.js');
const { Client, Util } = require('discord.js');
const client = new Discord.Client();
const prefix = "!";
const moment = require("moment"); 

//channel-Create
client.on('channelCreate', channelc => {

    const logchannel = channelc.guild.channels.find('name', 'log');
	
    if(channelc.type === 'text') {
        var roomType = ':pencil: #';
    }else
    if(channelc.type === 'voice') {
        var roomType = ':microphone: ';
    }else
    if(channelc.type === 'category') {
        var roomType = '';
    }
    
	    channelc.guild.fetchAuditLogs().then(logs => {
	var userid = logs.entries.first().executor.id;
	var userava = logs.entries.first().executor.avatarURL;
	var usertag = logs.entries.first().executor.tag;

    var channelCreate = new Discord.RichEmbed()
    .setAuthor(channelc.guild.name, channelc.guild.iconURL)
    .setDescription(`***Channel Created Name: *** **${roomType}${channelc.name}**\n by : <@${userid}>`)
    .setFooter(`${usertag}`, userava)
    .setTimestamp()
    .setColor('#ff0000')
    logchannel.sendEmbed(channelCreate)
   })
});

//channel-Delete
client.on('channelDelete', channeld => {

    const logchannel = channeld.guild.channels.find('name', 'log');
	
	if(channeld.type === 'text') {
        var roomType = ':pencil: #';
    }else
    if(channeld.type === 'voice') {
        var roomType = ':microphone: ';
    }else
    if(channeld.type === 'category') {
        var roomType = '';
    }
	    channeld.guild.fetchAuditLogs().then(logs => {
	var userid = logs.entries.first().executor.id;
	var userava = logs.entries.first().executor.avatarURL;
	var usertag = logs.entries.first().executor.tag;

    var channelCreate = new Discord.RichEmbed()
    .setAuthor(channeld.guild.name, channeld.guild.iconURL)
    .setDescription(`***Channel Deleted Name : *** **${roomType}${channeld.name}**\n by : <@${userid}>`)
    .setFooter(`${usertag}`, userava)
    .setTimestamp()
    .setColor('#ff0000')
    logchannel.sendEmbed(channelCreate)
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
