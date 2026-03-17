---
view: board
---
# Backlog

> Détail des tâches et spécifications techniques.
> Priorités : `P0` (critique) → `P1` (important) → `P2` (souhaitable). Cocher quand terminé puis déplacer dans l'archive.
> Exemple : - [ ] **TLK-5** `P2` #tag **Titre** — Description.
> IDs : `TLK-<numéro séquentiel>`. Prochain ID : **TLK-19**.

Pour les tâches terminée [voir archive.](ARCHIVE.md)

---

## App de démo

*(aucune tâche en cours)*

## Commands

- [ ] **TLK-11** `P1` #pipeline **Limiter `/explore` au rapport** — Restreindre `/explore` à la génération du premier rapport (mapping écrans, selectors, user stories, plan de tests). Les phases POM et tests sont déclenchées séparément via `/pom` et `/test`.
- [ ] **TLK-16** `P1` #explore **Command `/autotest`** — Nouvelle commande qui orchestre le pipeline complet : lance `/explore` pour générer le rapport, passe le relais à l'agent QA ISTQB pour enrichir les tests, puis génère les POM et suites de tests. Combine TLK-11 + TLK-12 en un workflow bout-en-bout.
- [ ] **TLK-17** `P2` #explore **Exploration par code source** — Quand l'agent a accès au code source de l'app, l'exploiter pour comprendre le fonctionnement des features, trouver des sélecteurs fiables et produire des remarques de review sur le code.
- [ ] **TLK-18** `P1` #explore **Analyse visuelle multimodale** — Exploiter la capacité multimodale de l'agent pour analyser visuellement les screenshots capturés par `/explore`, en complément de l'extraction DOM.

## Skills

- [ ] **TLK-13** `P0` #tooling **Skill Playwright** — Créer un skill de framework pour générer des tests Playwright (alternative à Robot Framework).
- [ ] **TLK-14** `P2` #tooling **Skill WebdriverIO** — Créer un skill de framework pour générer des tests WebdriverIO (alternative à Robot Framework).
- [ ] **TLK-15** `P2` #tooling **Skill Cypress** — Créer un skill de framework pour générer des tests Cypress (alternative à Robot Framework).

## Agents

- [ ] **TLK-12** `P1` #explore **Agent QA ISTQB** — Agent spécialisé QA ISTQB qui récupère le rapport de `/explore`, analyse les tests proposés, dialogue pour comprendre les règles métier et s'appuie sur ses connaissances ISTQB pour enrichir/compléter les tests. Intégration via MCP NotebookLM.
