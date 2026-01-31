# ENIDiscord Bot

Ce dépôt contient un bot Discord écrit en TypeScript. Le README suivant décrit l'architecture, les stacks principales, les conventions de code, les tests, le workflow de contribution (pull request depuis un fork) et la licence.

--

**Stacks principales**

- **Runtime:** Node.js (>=18 recommandé)
- **Langage:** TypeScript
- **Lib client Discord:** discord.js
- **Gestion des variables d'environnement:** dotenv
- **Tests unitaires:** Jest + ts-jest
- **Outils de dev:** ts-node, typescript

--

**Type d'architecture**

Architecture modulaire pilotée par événements (Event-driven modular architecture) avec pattern Command pour les commandes slash. Le code est organisé par responsabilités : `core` pour l'infrastructure client/chargers, `commands` pour les modules de commande, `events` pour les handlers d'événements.

--

**Description détaillée de l'architecture**

Résumé : le bot initialise un client Discord (`BotClient`), charge dynamiquement les commandes depuis `src/commands` et attache des handlers d'événements (p.ex. `InteractionCreate`) pour déléguer à la commande correspondante.

Diagramme (Mermaid) pour visualiser le flux :

```mermaid
flowchart TD
  A[Start: Process start] --> B[Init BotClient]
  B --> C{Load Core}
  C --> D[CommandLoader: read src/commands]
  D --> E[Register commands in client.commands]
  C --> F[Attach event handlers - src/events]
  F --> G[On InteractionCreate]
  G --> H{Is ChatInputCommand?}
  H -- yes --> I[Resolve command from client.commands]
  I --> J[Execute command.execute(interaction)]
  H -- no --> K[Ignore]
  J --> L[Reply / Error handling]
  style D fill:#f9f,stroke:#333,stroke-width:1px
```

Explication :
- `BotClient` contient une `Map`/`Collection` `commands` et le client discord.js.  
- `CommandLoader` effectue un parcours des fichiers `*.command.ts` et les enregistre sous la clé `command.data.name`.  
- `events/commands.event.ts` gère `InteractionCreate` et appelle `execute` de la commande.

--

**Conventions de nommage et qualité d'écriture (requirements)**

Les règles attendues pour ce projet :

- **Fichiers de commandes** : suffixe `.command.ts` (ex : `test.command.ts`).
- **Noms des fichiers** : kebab-case ou dot-separated pour modules (`my-feature.command.ts`).
- **Exports** : chaque commande exporte `default` un objet `{ data, execute }`.  
- **Typage** : utiliser des interfaces/types dans `src/types` (ex : `Command`) et typer systématiquement les fonctions publiques.  
- **Nommage des symboles** :
  - Classes / Types / Enum : `PascalCase`
  - Fonctions / méthodes / variables : `camelCase`
  - Constantes exportées : `UPPER_SNAKE_CASE` si nécessaire
- **Qualité d'écriture du code** :
  - Préférer des fonctions courtes et lisibles.
  - Ajouter les JSDoc/TSdoc pour fonctions publiques et comportements non triviaux.
  - Respecter l'indentation et les règles TypeScript du projet.

--

Personne n'aura accès aux fichiers `.env`, car information trop sensible.

--

**Tests et validation**

- Framework : `jest` + `ts-jest`.  
- Emplacements : tests unitaires côte à côte ou dans `__tests__` suivant préférence.  
- Scénarios recommandés :
  - Loader de commandes : mocker le système de fichiers et vérifier que `client.commands` contient les commandes attendues.
  - Event handler : simuler une interaction et vérifier que `execute` est appelé correctement.
  - Commandes : mocker `ChatInputCommandInteraction` et vérifier les appels à `interaction.reply`.

Commandes utiles :

```bash
npm install
npm test        # lance jest
npm run test:watch
```

Conseil : ajouter des tests CI (GitHub Actions) pour exécuter `npm test` sur chaque PR.

--

**Tutoriel : Pull Request à partir d'un fork**

1. Forke le dépôt depuis GitHub (bouton "Fork").
2. Clone ton fork localement :

```bash
git clone https://github.com/<ton-utilisateur>/<repo>.git
cd <repo>
```

3. Ajoute la remote upstream pour rester synchronisé :

```bash
git remote add upstream https://github.com/<original-owner>/<repo>.git
git fetch upstream
git checkout main
git pull upstream main
```

4. Crée une branche pour ta modification :

```bash
git checkout -b feat/ma-fonctionnalite
```

5. Implémente les changements localement. Respecte les conventions de nommage et les tests.

6. Ajoute, commit et push :

```bash
git add .
git commit -m "feat: description concise de la fonctionnalité"
git push origin feat/ma-fonctionnalite
```

7. Depuis GitHub, ouvre une Pull Request depuis ta branche sur ton fork vers `main` du dépôt original.  
   - Fournis une description claire des changements, étapes pour tester, et les références d'issue si besoin.

8. CI/Tests : s'assurer que `npm test` passe localement avant d'ouvrir la PR. Si CI est configuré, attendre le retour automatique.

9. Demander une revue en mentionnant les reviewers pertinents.

Bonnes pratiques de PR :
- Petites PRs ciblées plutôt que de gros paquets.  
- Un seul objectif par PR (bugfix / feature / refactor).  
- Inclure tests pour le comportement modifié.

--

**Fichiers importants**

- `src/core` : initialisation du client et loaders.
- `src/commands` : commandes `.command.ts`.
- `src/events` : handlers d'événements.

--

**Licence**

Ce projet est distribué sous la licence Creative Commons. Voici le texte résumé :

```
bot_discord © 2026 by WILIAM SALEMBIEN is licensed under CC BY-NC-SA 4.0. To view a copy of this license, visit https://creativecommons.org/licenses/by-nc-sa/4.0/