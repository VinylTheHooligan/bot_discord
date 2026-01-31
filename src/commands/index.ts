// Commands Index load all the commands into client => commands (a collection of command object).

import fs from 'node:fs';
import path from 'node:path';
import { BotClient } from '../core/discordjs/client';

export function CommandIndex(client: BotClient) {
    const COMMANDS_PATH = path.join(__dirname, "./");
    const FILES = fs.readdirSync(COMMANDS_PATH);

    for (const FILE of FILES) {
        if (!FILE.endsWith(".command.ts")) continue;

        const COMMAND = require(path.join(COMMANDS_PATH, FILE)).default;

        client.commands.set(COMMAND.data.name, COMMAND);
    }
}