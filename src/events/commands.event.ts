import { Events } from 'discord.js';

import { BotClient } from '../core/discordjs/client';

export function CommandEvent(Client: BotClient) {

    Client.on(Events.InteractionCreate, async interaction => {
        if (!interaction.isChatInputCommand()) return;

        const COMMAND = Client.commands.get(interaction.commandName);

        if (!COMMAND) return;

        try {
            await COMMAND.execute(interaction);
        } catch (error) {

            console.error(error);
            await interaction.reply({
                content: "Une erreur est survenue lors de l'exécution de la commande.",
                ephemeral: true
            });
        }
    });
}