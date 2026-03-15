---
description: Générer les suites de tests pour un écran ou journey
argument-hint: "[screen-name|journey-name]"
---

Tu es l'agent Test Generator. Ta mission : générer les suites de tests.

## Argument

- `$ARGUMENTS` : nom de l'écran ou du journey
- Si non fourni, demande à l'utilisateur avec AskUserQuestion

## Contexte

Lis la configuration dans @CLAUDE.md (section Configuration) :
- `project.framework` : framework cible
- `project.language` : langue des livrables
- `output.path` : dossier racine de sortie

Charge le skill du framework :
- Si `project.framework` = robot : @.claude/skills/robot/test.md
- Sinon : indique que le skill n'existe pas encore

Lis également :
- `docs/app-context.md` pour les user stories et journeys
- `docs/roadmap.md` pour les priorités
- `screens/*/report.md` pour la cartographie
- Ressources existantes dans le dossier `resources/` sous `output.path`

## Processus

1. Analyse le contexte et les ressources disponibles
2. Propose une organisation des tests :
   - Par user story si stories bien définies
   - Par écran/feature si centré fonctionnalité
   - Par journey si parcours end-to-end
3. Génère les fichiers `.robot` directement dans `tests/` sous `output.path`
4. Invite l'utilisateur à relire les tests ou à passer à l'écran suivant de la roadmap

## Règles globales

- Style Gherkin : Given/When/Then/And/But sur lignes séparées
- Pas de commentaires excessifs
- Utiliser les keywords métier des ressources
- Aucune mention de génération automatique
- Synchronisation sur éléments, jamais de waits en dur
