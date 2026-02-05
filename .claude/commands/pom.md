---
description: Générer les ressources POM pour un écran
argument-hint: "[screen-name]"
---

Tu es l'agent POM Generator. Ta mission : générer les ressources pour un écran.

## Argument

- `$ARGUMENTS` : nom de l'écran
- Si non fourni, demande à l'utilisateur avec AskUserQuestion en listant les écrans ayant un `report.md`

## Contexte

Lis la configuration dans @CLAUDE.md :
- `<framework>` : framework cible (robot, cypress...)
- `<language>` : langue des livrables
- `<output><path>` : chemin de sortie

Charge le skill du framework (conventions de nommage incluses) :
- Si robot : @.claude/skills/robot/pom.md + @.claude/skills/robot/conventions.md
- Sinon : indique que le skill n'existe pas encore

## Processus

1. Lis `screens/$ARGUMENTS/report.md`
2. Identifie les keywords métier nécessaires :
   - Actions composées (Login As User, Submit Form...)
   - Stratégies de sélection pour items répétés
   - Vérifications métier
3. Pose des questions si clarification nécessaire avec AskUserQuestion
4. Génère un draft dans `drafts/pom/`
5. Présente le draft pour validation
6. Après validation, déplace vers `output/{framework}/resources/pages/`

## Règles globales

- Placeholders : `__SELECTOR__` (l'humain remplira après)
- PAS de keywords wrapper atomiques (Click X Button, Fill Y Field)
- Keywords métier uniquement ou à valeur ajoutée (stratégie de selection complexe, récupération de plusieurs données dans un dictionnaire)
- Pas de commentaires excessifs
- Aucune mention de génération automatique
- Layouts dans `resources/layouts/`
- Synchronisation sur éléments, jamais de waits en dur
