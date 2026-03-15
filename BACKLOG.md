---
view: board
---
# Backlog

> Détail des tâches et spécifications techniques.
> Priorités : `P0` (critique) → `P1` (important) → `P2` (souhaitable). Cocher quand terminé puis déplacer dans l'archive.
> Exemple : - [ ] **TLK-5** `P2` #tag **Titre** — Description.
> IDs : `TLK-<numéro séquentiel>`. Prochain ID : **TLK-10**.

Pour les tâches terminée [voir archive.](ARCHIVE.md)

---

## App de démo

- [ ] **TLK-1** `P0` #app **Créer l'app de gestion de tâches** — App HTML/CSS/JS multi-pages (login, dashboard, création/édition tâche, profil). Navigation fonctionnelle, CRUD avec localStorage, layouts réutilisables (navbar, sidebar, footer). Servie via `npx http-server`.

## Pipeline & outillage

- [ ] **TLK-6** `P1` #tooling **Migrer CLAUDE.md vers markdown pur** — Remplacer le bloc `<config>` XML par des sections markdown. Adapter la règle sur `<framework>` dans les règles globales.
- [ ] **TLK-7** `P1` #tooling **Migrer les formats de sortie des commandes** — Réécrire les templates de `/discover`, `/map` et `/update` pour produire du markdown pur avec des sections bien établies au lieu de XML embarqué.
- [ ] **TLK-3** `P1` #pipeline **Adapter `/pom` pour accepter `map.json`** — Modifier le skill `/pom` pour qu'il puisse consommer les `map.json` générés automatiquement (en plus des screenshots manuels) et produire les ressources Robot Framework.
- [ ] **TLK-4** `P1` #pipeline **Adapter `/test` pour accepter `map.json`** — Modifier le skill `/test` pour qu'il exploite les données structurées des `map.json` (éléments, journeys) pour générer les suites de tests Robot Framework.

## Exploration autonome (Playwright MCP)

- [ ] **TLK-9** `P0` #explore **Configurer Playwright MCP** — Installer et configurer le serveur Playwright MCP dans le workspace (`.mcp.json` ou `.claude/settings.json`). Vérifier que l'agent peut naviguer, capturer et interagir avec une page locale.
- [ ] **TLK-2** `P0` #explore **Créer le command `/explore`** — Command Claude qui orchestre l'exploration automatique de l'app via Playwright MCP : navigation écran par écran, prise de screenshots, extraction des éléments interactifs du DOM (selectors, types, labels), génération des fichiers `map.json` intermédiaires dans `screens/{nom}/`.

## Démo & validation

- [ ] **TLK-8** `P2` #demo **Dry-run approche manuelle** — Tester le pipeline complet screenshots → `/discover` → `/map` → `/pom` → `/test` sur l'app de démo. Vérifier la cohérence des livrables.
- [ ] **TLK-5** `P2` #demo **Dry-run approche autonome** — Lancer l'app → `/explore` → review des mappings → génération POM + tests → vérifier que le résultat est cohérent et présentable.
