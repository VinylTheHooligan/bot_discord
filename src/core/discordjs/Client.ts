// This class replaces the Client class in discord.js.
// given that it is currently impossible to add commands
// into the Client class. To solve this, BotClient has
// been created to allow Collection creations.

import { Client, Collection, GatewayIntentBits } from "discord.js";

export class BotClient extends Client{
  public commands: Collection<string, any>;

  constructor(_intents: GatewayIntentBits[]) {
    super({
      intents: _intents
    });

    this.commands = new Collection();
  }
}