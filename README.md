# ENI Discord — Bot de promotion

Un bot Discord conçu pour le serveur d'une promotion ENI. Ce projet sert de base modulaire pour ajouter, tester et maintenir des fonctionnalités destinées aux étudiants et à la vie de la promo.

## Objectif

- Fournir des outils utiles au serveur de la promotion (annonces, rappels, gestion des rôles, mini-jeux, utilitaires, etc.).
- Offrir une base de code claire et maintenable en TypeScript où l'ajout de nouvelles fonctionnalités se fait par Pull Request.

## Caractéristiques principales

- Écrit entièrement en **TypeScript**.
- Utilise uniquement des fichiers de configuration et de données au format **JSON** (pas de YAML, pas d'ENV non structurés dans le repo).
- Architecture modulaire : chaque fonctionnalité peut être ajoutée comme un module indépendant.
- Processus de contribution clair : forker le projet et proposer des Pull Requests.

## Exemples de fonctionnalités possibles

- Annonces automatiques pour les événements de la promo
- Commandes d'administration pour les modérateurs
- Rappels d'échéances (projets, inscriptions)
- Mini-jeux et sondages
- Intégrations externes (calendrier, GitHub, etc.)

## Structure recommandée du projet

- `src/` : code TypeScript
- `config/` : fichiers JSON de configuration (ex. `bot.config.json`)
- `data/` : fichiers JSON pour stocker des données non sensibles (ex. templates, mappings)
- `index.ts` : point d'entrée du bot

> Tous les fichiers de configuration et de données versionnés doivent être en JSON.

## Prérequis

- Node.js (version LTS recommandée)
- npm ou pnpm

## Installation locale (développement)

1. Forkez le dépôt sur GitHub.
2. Clonez votre fork :

```bash
git clone https://github.com/<votre-utilisateur>/ENIDiscord.git
cd ENIDiscord
```

3. Installez les dépendances :

```bash
npm install
```

4. Configurez le bot via un fichier JSON (ex. `config/bot.config.json`). Exemple minimal :

```json
{
  "token": "VOTRE_TOKEN_ICI",
  "prefix": "!",
  "ownerId": "ID_DISCORD_DU_PROPRIETAIRE"
}
```

Important : Le token de production **n'est pas partagé** avec les contributeurs - il reste la propriété des mainteneurs du serveur (normal).

Remarques complémentaires :
- Les contributeurs ne recevront pas le token et ne doivent pas s'attendre à exécuter une instance du bot en production.
- Pour proposer une fonctionnalité, développez en TypeScript en utilisant des fichiers de configuration exemples (`*.example.json`), des données factices ou des mocks, et fournissez des instructions de test dans la PR.
- Si vous avez besoin qu'un mainteneur teste votre contribution avec le vrai bot, indiquez clairement les étapes et demandez explicitement la validation dans la PR.

Ajoutez `config/*.json` au `.gitignore` si vous préférez ne pas versionner certains fichiers de configuration.

## Scripts utiles

- `npm run build` — compile TypeScript en JavaScript
- `npm run start` — exécute le bot (en production ou après compilation)
- `npm run dev` — lance en mode développement (ex. `ts-node-dev` si configuré)

(Vérifiez les scripts dans `package.json` pour les commandes précises.)

## Bonnes pratiques de développement

- Respectez le typage strict TypeScript.
- Stockez toutes les configurations et données versionnées au format JSON.
- Ne commitez jamais d'informations sensibles (tokens, secrets). Utilisez des fichiers locaux non suivis pour ça.
- Écrivez des modules réutilisables et documentez les commandes/événements que vous ajoutez.

### Style de code

- **Langue des commentaires et identifiants :** tous les commentaires et les noms de variables/fonctions doivent être écrits en **English** afin de garantir une collaboration inter‑équipe plus facile.
- **Constantes :** utilisez la convention SCREAMING_SNAKE_CASE pour les constantes (par exemple `MAX_RETRY_COUNT`, `DEFAULT_PREFIX`).
- **Variables mutables :** utilisez `camelCase` pour les variables déclarées avec `let` (par exemple `retryCount`, `userCache`).
- **Immutables locales / top-level readonly :** préférez `const` lorsque la valeur ne doit pas être réaffectée ; nommez ces constantes selon SCREAMING_SNAKE_CASE si elles sont des valeurs globales/constantes de configuration.

Exemples :

```ts
// Correct
const DEFAULT_PREFIX = '!';
let retryCount = 0;
// Incorrect
// let retry_count = 0; (snake_case interdit pour mutable, préférer camelCase)
// const defaultPrefix = '!'; (préférer SCREAMING_SNAKE_CASE pour constantes globales)
```

## Contribution - comment participer

Nous accueillons toutes les contributions ! Pour participer :

1. Forkez ce dépôt sur GitHub.
2. Créez une branche dédiée pour votre fonctionnalité : `git checkout -b feat/ma-fonctionnalite`.
3. Ajoutez et testez votre code localement.
4. Assurez-vous que votre code est en TypeScript et que toute configuration ajoutée est en JSON.
5. Ouvrez une Pull Request depuis votre fork vers la branche principale du dépôt original.

Remarques :
- Décrivez clairement la fonctionnalité et comment la tester dans la PR.
- Si votre modification ajoute des fichiers JSON de configuration exemples, nommez-les `*.example.json`.

Important : le token du bot reste privé.

- Les contributeurs ne disposeront pas du token de production. Ne demandez pas le token dans une PR ou une issue.
- Testez vos fonctionnalités avec des fichiers `*.example.json`, mocks ou tests automatisés.
- Dans la description de la PR, incluez des étapes claires permettant aux mainteneurs de reproduire et valider votre changement localement avant fusion.

## Processus de revue

 - Toutes les contributions passent par PR et revue par les mainteneurs.
 - Les PR doivent inclure des descriptions, captures d'écran ou étapes de test si nécessaire.
 - Les mainteneurs se réservent le droit de demander des modifications avant fusion.

## Tests et validation

- Ajoutez des tests unitaires si possible (optionnel selon la nature de la fonctionnalité).
- Vérifiez le linting et la compilation TypeScript avant d'ouvrir la PR.

## Sécurité

 - Ne publiez jamais vos tokens dans le repo.
 - Pour les intégrations sensibles, documentez clairement comment fournir les secrets à l'environnement d'exécution (fichiers locaux non suivis, variables d'environnement CI/CD sécurisées, etc.).

## Contact

Pour toute question sur le projet ou la contribution, ouvrez une issue sur GitHub ou contactez VinylTheHooligan via Discord.

---

Merci d'aider à construire et maintenir ce bot pour la promotion — contributions bienvenues via fork + Pull Request !


bot_discord © 2026 by WILIAM SALEMBIEN is licensed under CC BY-NC-SA 4.0. To view a copy of this license, visit https://creativecommons.org/licenses/by-nc-sa/4.0/