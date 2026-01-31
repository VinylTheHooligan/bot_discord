import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";

export default {
    data: new SlashCommandBuilder()
        .setName("test")
        .setDescription("Répond test !"),

    async execute(interaction: ChatInputCommandInteraction) {
        await interaction.reply("Test !");
    }
}