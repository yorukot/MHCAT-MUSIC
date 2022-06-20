const {
    MessageActionRow,
    MessageButton,
    MessageEmbed,
} = require('discord.js');
const YouTube = require("youtube-sr").default;
module.exports = {
    name: '播放',
    description: '播放音樂',
    options: [{
        name: '音樂',
        type: 'STRING',
        description: '輸入音樂!(支持 YT收尋|YT網址|YT清單)',
        required: true,
    }],
    run: async (client, interaction, options) => {
        await interaction.deferReply().catch(e => { });
        const get_member = interaction.options.getString("音樂")
        const Genius = require("genius-lyrics");
        const lodding = new MessageEmbed().setTitle("<a:load:986319593444352071> | 我正在玩命幫你尋找音樂及播放!").setColor("GREEN")
        const lodding_msg = await interaction.followUp({
            embeds: [lodding]
        })
        if (!interaction.member.voice.channel) return errors("你必須先進一個語音頻道!")
        const channel111 = interaction.guild.channels.cache.get(interaction.channel.id);
        const hasPermissionInChannel = channel111
            .permissionsFor(interaction.guild.me)
            .has('SEND_MESSAGES', false)
        const hasPermissionInChannel1 = channel111
            .permissionsFor(interaction.guild.me)
            .has('VIEW_CHANNEL', false)
        const channel11 = interaction.guild.channels.cache.get(interaction.member.voice.channel.id);
        const hasPermissionInChannel0 = channel11
            .permissionsFor(interaction.guild.me)
            .has('SPEAK', false)
        const hasPermissionInChannel01 = channel11
            .permissionsFor(interaction.guild.me)
            .has('VIEW_CHANNEL', false)
        const hasPermissionInChannel02 = channel11
            .permissionsFor(interaction.guild.me)
            .has('CONNECT', false)
        if (!hasPermissionInChannel || !hasPermissionInChannel1) {
            return interaction.user.send(":x: | 我沒辦法在這個頻道發送一般消息，請通知管理員!")
        }
        if (!hasPermissionInChannel0 || !hasPermissionInChannel01 || !hasPermissionInChannel02) {
            return interaction.user.send(":x: | 我沒辦法加入所在的語音頻道，請通知管理員!!")
        }
        if (interaction.member.voice.channel && interaction.guild.me.voice.channel && interaction.member.voice.channel.id !== interaction.guild.me.voice.channel.id) {
            return errors('有其他人也在播音樂，請等他們播放完，或是你去叫他換你聽音樂!')
        }
        function errors(content) {
            const embed = new MessageEmbed().setTitle(`<a:error:980086028113182730> | ${content}`).setColor("RED");
            lodding_msg.edit({
                embeds: [embed]
            })
        }

        function greate(content) {
            const embed = new MessageEmbed().setTitle(`<a:greentick:980496858445135893> | ${content}`).setColor("GREEN");
            lodding_msg.edit({
                embeds: [embed],
                ephemeral: true
            })
        }
        let guildQueue = client.player.getQueue(interaction.guild.id);
        if (guildQueue && guildQueue.songs.length > 2000) {
            return errors("你的音樂太多啦!我沒辦法承受這麼多QWQ")
        }
        let queue = client.player.createQueue(interaction.guild.id, {
            data: {
                pause: false,
                channel: interaction.channel.id,
                random: false,
            }
        });
        if (get_member.includes("list") && (get_member.includes("youtube.com") || get_member.includes("youtu.be"))) {
            await queue.join(interaction.member.voice.channel);
            let song = await queue.playlist(get_member).catch(_ => {
                setTimeout(() => {
                    console.error(_)
                    if (!guildQueue) {
                        queue.stop();
                        return errors("找不到這個音樂欸QWQ")
                    }
                }, 1000);
            });
        } else {
            await queue.join(interaction.member.voice.channel);
            let song = await queue.play(get_member).catch(_ => {
                console.error(_)
                setTimeout(() => {
                    if (!guildQueue) {
                        queue.stop();
                        return errors("找不到這個音樂欸QWQ")
                    }
                }, 1000);
            });
        }
        if (guildQueue) {
            return lodding_msg.delete()
        }
        setTimeout(() => {
            let Q = client.player.getQueue(interaction.guild.id);
            if(!Q) {return errors("這部影片可能為私人影片或設有年齡限制")}
            const obj = Object.fromEntries(Q.player.queues);
            const id = Object.keys(obj)[0]
            const pause = "stopmusic"
            const emoji = "<:pause:986060615510544424>"
            const pausemsg = "暫停"
            const loop = "loopsongmusic"
            const loopemoji = "🔂"
            if (!Q.songs[0]) return
            YouTube.getVideo(`${Q.songs[0].url}`, {
                    limit: 1
                })
                .then(x => {
                    const bt1 = new MessageActionRow()
                        .addComponents(
                            new MessageButton()
                            .setCustomId(pause)
                            .setEmoji(emoji)
                            .setLabel(pausemsg)
                            .setStyle('PRIMARY'),
                            new MessageButton()
                            .setCustomId('randommusic')
                            .setLabel('隨機排序')
                            .setEmoji("<:shuffle1:981935542461685760>")
                            .setStyle('SUCCESS'),
                            new MessageButton()
                            .setCustomId(loop)
                            .setLabel("切換重複播放")
                            .setEmoji(loopemoji)
                            .setStyle('PRIMARY'),
                        );
                    const bt2 = new MessageActionRow()
                        .addComponents(
                            new MessageButton()
                            .setCustomId("updatamusic")
                            .setEmoji("<:reload:982146410134786071>")
                            .setLabel('刷新')
                            .setStyle('SUCCESS'),
                            new MessageButton()
                            .setCustomId('skipmusic')
                            .setLabel('下一首')
                            .setEmoji("<:nextbutton:981971559814135839>")
                            .setStyle('PRIMARY'),
                            new MessageButton()
                            .setCustomId('leavemusic')
                            .setLabel('中斷連線')
                            .setEmoji("<:plug:981573581278433311>")
                            .setStyle('DANGER'),
                        );
                    const bt3 = new MessageActionRow()
                        .addComponents(
                            new MessageButton()
                            .setCustomId("newmsgmusic")
                            .setEmoji("<:uparrow:981974801591713832>")
                            .setLabel('置頂訊息')
                            .setStyle('SECONDARY'),
                            new MessageButton()
                            .setCustomId("0getmusic")
                            .setEmoji("<:musicalbum:982146620336508958>")
                            .setLabel('取得播放清單')
                            .setStyle('PRIMARY'),
                            new MessageButton()
                            .setCustomId("lyricsmusic")
                            .setEmoji("<:filesandfolders:986636182349828166>")
                            .setLabel('取得歌詞')
                            .setStyle('PRIMARY'),
                        );
                    const embed = new MessageEmbed()
                        .setAuthor(`${x.channel.name}`, x.channel.icon.url, `${x.channel.url}`)
                        .setThumbnail(x.thumbnail.url)
                        .setTitle(x.title)
                        .setURL(`https://www.youtube.com/watch?v=${x.id}`)
                        .setDescription(`<:videomarketing:982356519922331698> 影片長度:${x.durationFormatted} ┃ <:views:982267320502206524> 觀看數:${x.views}
<:loop1:981588918187229236> 目前重複播放狀態:${obj[id].repeatMode === 0 ? "無" : obj[id].repeatMode === 1 ? "單曲重播" : "清單重播"}   
<:shuffle1:981935542461685760> 隨機排序:無
            `)
                        .setColor("RANDOM")
                        .setTimestamp()
                        .setFooter(
                            `${interaction.user.tag}的音樂`,
                            interaction.user.displayAvatarURL({
                                dynamic: true
                            }));
                            lodding_msg.edit({
                        embeds: [embed],
                        components: [bt1, bt2, bt3]
                    })
                })
                .catch(console.error);
        }, 1000);
        return
    }
}