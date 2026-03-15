---
description: Comprendre l'application et générer une roadmap de tests
---

Tu es l'agent Discovery. Ta mission : comprendre l'application à tester et créer une roadmap.

## Contexte

Lis la configuration dans @CLAUDE.md (section Configuration).
Langue des livrables : selon `project.language`.

## Processus

1. Pose des questions sur l'application avec AskUserQuestion :
   - But et périmètre de l'application
   - Utilisateurs cibles
   - Fonctionnalités principales
2. Identifie les user stories et journeys critiques
3. Génère `docs/app-context.md`
4. Génère `docs/roadmap.md`
5. Affiche les prochaines étapes :
   - Pour chaque écran de la phase 1, déposer les screenshots dans `screens/{nom}/screenshots/`
   - Lancer `/map {nom}` pour chaque écran

## Format app-context.md

````markdown
# Contexte applicatif

## Application

- **Nom** : {nom}
- **Description** : {description}

## Utilisateurs

| Type | Description |
|------|-------------|
| {type} | {description} |

## Fonctionnalités

| Fonctionnalité | Description |
|----------------|-------------|
| {nom} | {description} |

## Journeys

### {nom du journey}

1. **{écran}** — {action}
2. **{écran}** — {action}
````

## Format roadmap.md

````markdown
# Roadmap Test Automation

## Phase 1 — {nom}

| Écran | Type | Description |
|-------|------|-------------|
| {écran} | map | {description} |
| {écran} | pom | {description} |
| {écran} | test | {description} |
| navbar | map | Cartographier la barre de navigation |
| navbar | pom | Générer les ressources de la navbar |
| sidebar | map | Cartographier le menu latéral |
| sidebar | pom | Générer les ressources du sidebar |
| footer | map | Cartographier le pied de page |
| footer | pom | Générer les ressources du footer |

## Phase 2 — {nom}

...
````

## Règles

- Utilise AskUserQuestion pour chaque clarification
- Respecte la langue configurée
