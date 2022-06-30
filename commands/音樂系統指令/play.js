const {
    Client,
    Message,
    MessageEmbed,
    MessageButton,
    MessageActionRow
} = require('discord.js');
const YouTube = require("youtube-sr").default;
module.exports = {
    name: '播放',
    aliases: ['p', 'P', 'play'],
    description: '播放音樂',
    // video: '',
    usage: '[輸入音樂!(支持 YT收尋|YT網址|YT清單)]',
    emoji: `<:chat:980101030232608828>`,

    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async (client, message, args, Discord) => {
        const embed = new MessageEmbed()
        .setTitle("該指令已不支援訊息命令!請改用斜線命令的`/播放 音樂:`")
        .setColor("RED")
        message.reply({embeds: [embed]})
    }
}