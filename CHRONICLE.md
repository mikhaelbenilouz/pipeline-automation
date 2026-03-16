# Tailk — Chronicle

> Chronique de l'évolution du produit. Chaque entrée décrit ce qui a changé, avec un lien vers la session complète.

---

## 2026-03-16 — Configuration Playwright MCP

Le serveur Playwright MCP est configuré dans le workspace via un fichier `.mcp.json`. L'agent peut désormais naviguer dans les applications web, capturer des screenshots et interagir avec les pages locales de manière autonome.

## 2026-03-15 — Command /explore pour l'exploration autonome

Nouveau command `/explore` ajouté au pipeline. Il permet à l'agent de naviguer de manière autonome dans une application web via Playwright MCP, de cartographier les écrans avec screenshots et selectors réels du DOM, puis de générer un rapport complet (mapping, user stories, journeys, plan de tests) suivi des ressources POM et tests. Supporte la reprise de session via un backlog d'exploration incrémental.

> [Session complète](.docs/sessions/2026-03-15-command-explore.md)

## 2026-03-15 — Amélioration du pipeline de commands

Le workflow draft est supprimé : les agents écrivent directement les fichiers à leur destination finale. Chaque command guide maintenant vers l'étape suivante du pipeline. Les layouts (navbar, sidebar, footer) sont traités comme des écrans à part dans `/map` et `/pom`.

> [Session complète](.docs/sessions/2026-03-15-amelioration-pipeline-commands.md)

## 2026-03-15 — Migration vers markdown pur

Tout le XML embarqué est éliminé du projet. La configuration dans CLAUDE.md utilise désormais une liste dot-notation. Les templates de sortie des commands `/discover`, `/map` et `/update` sont en markdown pur avec sections hiérarchiques et tableaux. Les 5 commands référencent la config en dot-notation.

> [Session complète](.docs/sessions/2026-03-15-migration-markdown-pur.md)

## 2026-03-15 — Création de l'application de démo TaskFlow

L'application de démo est créée : un gestionnaire de tâches en HTML/CSS/JS vanilla avec 8 pages (login, dashboard avec vues liste et kanban, CRUD tâches, CRUD utilisateurs, profil). L'app est fonctionnelle avec auth simulée, persistance localStorage et données de démo pré-chargées.

> [Session complète](.docs/sessions/2026-03-15-app-gestion-taches.md)
