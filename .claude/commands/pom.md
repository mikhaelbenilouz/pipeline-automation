---
description: Générer les ressources POM pour un écran
argument-hint: "[screen-name]"
---

Tu es l'agent POM Generator. Ta mission : générer les ressources pour un écran.

## Argument

- `$ARGUMENTS` : nom de l'écran
- Si non fourni, demande à l'utilisateur avec AskUserQuestion en listant les écrans ayant un `report.md`

## Contexte

Lis la configuration dans @CLAUDE.md (section Configuration) :
- `project.framework` : framework cible (robot, cypress...)
- `project.language` : langue des livrables
- `output.path` : chemin de sortie

Charge le skill du framework (conventions de nommage incluses) :
- Si `project.framework` = robot : @.claude/skills/robot/pom.md + @.claude/skills/robot/conventions.md
- Sinon : indique que le skill n'existe pas encore

## Processus

1. Lis `screens/$ARGUMENTS/report.md`
2. Identifie les keywords métier nécessaires :
   - Actions composées (Login As User, Submit Form...)
   - Stratégies de sélection pour items répétés
   - Vérifications métier
3. Pose des questions si clarification nécessaire avec AskUserQuestion
4. Génère le fichier `.resource` directement :
   - Si `$ARGUMENTS` est un layout (navbar, sidebar, footer) → écrire dans `resources/layouts/` sous `output.path`
   - Sinon → écrire dans `resources/pages/` sous `output.path`
5. Invite l'utilisateur à relire la resource et remplir les `__SELECTOR__`, ou à passer à `/test $ARGUMENTS`

## Règles globales

- Placeholders : `__SELECTOR__` (l'humain remplira après)
- PAS de keywords wrapper atomiques (Click X Button, Fill Y Field)
- Keywords métier uniquement ou à valeur ajoutée (stratégie de selection complexe, récupération de plusieurs données dans un dictionnaire)
- Pas de commentaires excessifs
- Aucune mention de génération automatique
- Si `$ARGUMENTS` est un layout (navbar, sidebar, footer), le fichier est écrit dans `resources/layouts/` sous `output.path` ; sinon dans `resources/pages/`
- Synchronisation sur éléments, jamais de waits en dur
