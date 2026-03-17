---
view: board
---
# Tailk - Archive

> Items terminés, conservés pour référence.
> Organisés en épiques (sections ##)

Pour les tâches à faire [voir backlog.](BACKLOG.md)

---

## App de démo

- [x] **TLK-1** `P0` #app **Créer l'app de gestion de tâches** — App HTML/CSS/JS multi-pages (login, dashboard, création/édition tâche, profil). Navigation fonctionnelle, CRUD avec localStorage, layouts réutilisables (navbar, sidebar, footer). Servie via `npx http-server`. Fait : 8 pages HTML (login, dashboard liste+kanban, CRUD tâches 2 pages, CRUD utilisateurs 3 pages, profil), 4 modules JS (app, auth, tasks, users), CSS design system complet. Données de démo pré-chargées (4 users, 10 tâches). App nommée "TaskFlow". [Session](.docs/sessions/2026-03-15-app-gestion-taches.md)
- [x] **TLK-5** `P2` #demo **Dry-run approche autonome** — Lancer l'app → `/explore` → review des mappings → génération POM + tests → vérifier que le résultat est cohérent et présentable.
- [x] **TLK-8** `P2` #demo **Dry-run approche manuelle** — Tester le pipeline complet screenshots → `/discover` → `/map` → `/pom` → `/test` sur l'app de démo. Vérifier la cohérence des livrables.

## Commands

- [x] **TLK-9** `P0` #explore **Configurer Playwright MCP** — Installer et configurer le serveur Playwright MCP dans le workspace. Fait : fichier `.mcp.json` ajouté, agent capable de naviguer, capturer et interagir avec une page locale.
- [x] **TLK-2** `P0` #explore **Créer le command `/explore`** — Command Claude qui orchestre l'exploration automatique de l'app via Playwright MCP : navigation écran par écran, prise de screenshots, extraction des éléments interactifs du DOM (selectors, types, labels), génération de fichiers markdown de mapping dans `screens/{nom}/`. Fait : command `.claude/commands/explore.md` créé avec 4 phases (onboarding, exploration breadth-first avec backlog, rapport incrémental avec plan de tests, génération POM+tests), chargement dynamique des skills framework, mécanique de reprise de session, selectors réels du DOM. CLAUDE.md mis à jour. [Session](.docs/sessions/2026-03-15-command-explore.md)
- [x] **TLK-6** `P1` #tooling **Migrer CLAUDE.md vers markdown pur** — Remplacer le bloc `<config>` XML par des sections markdown. Adapter la règle sur `<framework>` dans les règles globales. Fait : bloc XML remplacé par liste dot-notation (`project.name`, `project.language`, `project.framework`, `validation.require-draft-approval`, `output.path`), règle globale mise à jour. [Session](.docs/sessions/2026-03-15-migration-markdown-pur.md)
- [x] **TLK-7** `P1` #tooling **Migrer les formats de sortie des commandes** — Réécrire les templates de `/discover`, `/map` et `/update` pour produire du markdown pur avec des sections bien établies au lieu de XML embarqué. Fait : templates XML remplacés par sections markdown + tableaux dans les 3 commands, références config migrées en dot-notation dans les 5 commands. [Session](.docs/sessions/2026-03-15-migration-markdown-pur.md)
- [x] **TLK-10** `P1` #pipeline **Améliorer l'enchaînement des commands du pipeline** — Supprimer le workflow draft (écriture directe), ajouter les prochaines étapes dans `/discover`, préciser les chemins de destination dans `/test`, clarifier le traitement des layouts, corriger les chemins `output/{framework}` résiduels. Fait : workflow draft supprimé dans les 5 commands, écriture directe aux destinations finales, `/discover` guide vers `/map`, layouts traités comme écrans séparés dans `/map` et `/pom`, chemins `output.path` cohérents partout, invitations à relire/poursuivre en fin de chaque command. [Session](.docs/sessions/2026-03-15-amelioration-pipeline-commands.md)

## Skills

*(aucune tâche archivée)*

## Agents

*(aucune tâche archivée)*
