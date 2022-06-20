const {
    MessageActionRow,
    MessageButton,
    MessageEmbed,
} = require('discord.js');
const client = require('../index');
client.on('interactionCreate', async (interaction) => {
    function errors(content) {
        const embed = new MessageEmbed().setTitle(`${content}`).setColor("RED");
        
        interaction.reply({
            embeds: [embed],
            ephemeral: true
        })
    }
    function greate(content) {
        const embed = new MessageEmbed().setTitle(`${content}`).setColor("GREEN");
        interaction.reply({
            embeds: [embed],
            ephemeral: true
        })
    }
    if (!interaction.isModalSubmit()) return;
    const text = interaction.fields.components[0].components[0].customId
    if (text.includes("music")) {
        const lyricsFinder = require('lyrics-finder');
        const songname = interaction.fields.getTextInputValue("musicsongname");
        const songauthor = interaction.fields.getTextInputValue("musicsongauthor") || ""
        let lyrics = await lyricsFinder(songauthor, songname + '歌詞') || "<a:error:980086028113182730> | 很抱歉，我找不到這首歌的歌詞!";
        const aaaaa = new MessageActionRow()
        .addComponents(
            new MessageButton()
            .setCustomId("lyricsaaamusic")
            .setEmoji("<a:arrow:986268851786375218>")
            .setLabel("找不到嗎?點我手動輸入歌名")
            .setStyle('SUCCESS'),
        );
        const embed = new MessageEmbed()
        .setTitle("<:filesandfolders:986636182349828166> 以下是查詢結果")
        .setDescription(lyrics)
        .setColor("RANDOM")
        interaction.reply({embeds: [embed],components: [aaaaa],ephemeral: true})
        return
    }
});