import { Events, Collection, GatewayIntentBits } from "discord.js";
import { BotClient } from './src/core/discordjs/client';
import { initCoreIndex } from './src/core/index';
import dotenv from "dotenv";

const IS_BUILD = __filename.endsWith(".js");
process.env.NODE_ENV = IS_BUILD ? "js" : "ts";

dotenv.config({
    path: IS_BUILD ? ".env.production" : ".env"
}); // loads environment files depending if the project is build or not

// Create a new client instance
const CLIENT = new BotClient([ GatewayIntentBits.Guilds ]); // guild = Discord Server  
const MOCK: boolean = process.env.MOCK === "true";   /* MOCK is a simulation mode that prevents unnecessary 
                                                        calls to the bot on Discord. In production, MOCK is
                                                        set to false */  

// When CLIENT is ready, it run this code once
CLIENT.once(Events.ClientReady, (readyClient) => {
    CLIENT.commands = new Collection();
    
    initCoreIndex(CLIENT);

    console.log(`Ready! Logged in as ${readyClient.user.tag}`);
});


////////////////////////////////////////////////////////////////////////////////
// Allows the backend to connect to the discord bot "account" if in MOCK mode //
////////////////////////////////////////////////////////////////////////////////
if(MOCK) console.log("MOCK mode activated, no Discord login!");
else {
    if (!process.env.DISCORD_TOKEN) {
        console.error("ERROR: DISCORD_TOKEN is missing in environnements");
        process.exit(1);
    }

    CLIENT.login(process.env.DISCORD_TOKEN);
}
////////////////////////////////////////////////////////////////////////////////