// Core Index load all sequential core files

import { BotClient } from './discordjs/client';
import { initCoreCommand } from './commandLoader.core';

export function CoreIndex(Client: BotClient) {
    initCoreCommand(Client);
}