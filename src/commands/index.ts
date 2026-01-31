// Commands Index load all the commands into client => commands (a collection of command object).

import fs from 'node:fs';
import path from 'node:path';

import { BotClient } from '../core/discordjs/client';

import { Command } from '../types/command.type';

export function CommandIndex(client: BotClient) {
    const COMMANDS_PATH = path.join(__dirname, "./");
    const FILES = fs.readdirSync(COMMANDS_PATH);

    for (const FILE of FILES) {
        if (!FILE.endsWith(`.command.${process.env.NODE_ENV ?? 'ts'}`)) continue;

        const FULL_PATH = path.join(COMMANDS_PATH, FILE);

        let mod: any; // command substitution variable
        try {

            mod = require(FULL_PATH);
        } catch (error) {

            console.error(`Erreur lors du chargement de ${FILE}`, error);
            continue;
        }

        if (!mod?.default) {
            console.warn(`Le module ${FILE} n'exporte pas de default`);
            continue;
        }

        // mod validation to command
        const COMMAND: Command = mod.default;

        if (!COMMAND.data?.name) {
            console.warn(`Commande invalide danss ${FILE} : data.name manquant`);
            continue;
        }

        if (typeof COMMAND.execute !== "function") {
            console.warn(`Commande invalide dans ${FILE}: execute() manquant`);
            continue;
        }

        client.commands.set(COMMAND.data.name, COMMAND);
        console.log(`Commande chargée: ${COMMAND.data.name}`);
    }
}