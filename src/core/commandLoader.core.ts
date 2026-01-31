// Load all related commands modules

import { BotClient } from '../core/discordjs/client';
import { CommandIndex } from '../commands/index';
import { CommandEvent } from '../events/commands.event';

export function initCoreCommand(Client: BotClient) {
    CommandIndex(Client);
    CommandEvent(Client);
}