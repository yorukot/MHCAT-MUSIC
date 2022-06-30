const {
    Client,
    Message,
    MessageEmbed,
    MessageButton,
    MessageActionRow
} = require('discord.js');
const YouTube = require("youtube-sr").default;
module.exports = {
    name: '播放資訊',
    aliases: ['pi', 'playinfo', 'playui','PLAYINFO'],
    description: '創建私人頻道的訊息',
    // video: '',
    emoji: `<:chat:980101030232608828>`,

    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async (client, message, args, Discord) => {
        const embed = new MessageEmbed()
        .setTitle("該指令已不支援訊息命令!請改用斜線命令的`/播放資訊`")
        .setColor("RED")
        message.reply({embeds: [embed]})
    }
}