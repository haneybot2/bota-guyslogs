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








client.login(process.env.BOT_TOKEN);
