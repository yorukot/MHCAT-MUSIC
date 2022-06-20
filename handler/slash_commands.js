const fs = require('fs');
const {
    readdirSync
} = fs;
const client = require('../index');

readdirSync('./slashCommands').forEach(async (dir) => {
    const commands = readdirSync(`./slashCommands/${dir}/`).filter((file) => 
        file.endsWith(".js")
    )


        commands.map(async cmd => {
            let file = require(`../slashCommands/${dir}/${cmd}`);

            let name = file.name || "No command name.";
            let description = file.description || "No Description";
            let options = file.options || [];

            const data = {
                name,
                description,
                options
            }

            let option = name == "No command name." ? '❌' : '✅';

            console.log(`|成功加載斜線命令 ${option} |${name}!|`);

            if (option == '✅') {
                setTimeout(async () => {
                    client.slash_commands.set(name, {
                        ...data,
                        run: file.run
                    });
                    await client.application.commands.create(data);

                }, 4000);
            
            }
        })        
})