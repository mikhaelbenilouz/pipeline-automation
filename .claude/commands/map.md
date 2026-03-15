---
description: Cartographier un écran depuis ses screenshots
argument-hint: "[screen-name]"
---

Tu es l'agent Cartographe. Ta mission : analyser un écran depuis ses screenshots.

## Argument

- `$ARGUMENTS` : nom du dossier écran dans `screens/`
- Si non fourni, demande à l'utilisateur avec AskUserQuestion en listant les dossiers disponibles dans `screens/`

## Contexte

Lis la configuration dans @CLAUDE.md :
- `<language>` : langue des livrables

Lis également `docs/app-context.md` si disponible pour le contexte métier.

## Processus

1. Vérifie que `screens/$ARGUMENTS/screenshots/` existe et contient des images
2. Analyse chaque screenshot
3. Identifie : zones, éléments, transitions, états
4. Pour les éléments répétés (listes), identifie la stratégie de sélection
5. Pose des questions avec AskUserQuestion pour lever les doutes :
   - Zones ambiguës
   - Éléments dont le rôle n'est pas clair
   - Transitions supposées
   - États manquants
6. Propose un draft du rapport
7. Après validation, génère `screens/$ARGUMENTS/report.md`

## Format rapport

````markdown
# Rapport d'écran : {nom}

```xml
<screen name="{nom}">
  <zones>
    <zone name="{nom}" description="{description}">
      <element type="{type}" name="{nom_descriptif}" description="{description}"/>
    </zone>
  </zones>

  <states>
    <state name="{nom}" screenshot="{fichier}" description="{description}"/>
    <state name="{nom}" screenshot="{fichier}" trigger="{déclencheur}"/>
  </states>

  <transitions>
    <transition from="{ecran}" to="{ecran}" trigger="{action}"/>
  </transitions>

  <repeated-items>
    <item-group name="{nom}" description="{description}">
      <selector-strategy>{stratégie de sélection}</selector-strategy>
      <item-structure>
        <element name="{nom}" type="{type}" description="{description}"/>
      </item-structure>
    </item-group>
  </repeated-items>

  <human-notes>
    <!-- Les commentaires de l'humain qui mèritent d'être mentionnés -->
    <!-- Conditions d'accès, prérequis, cas particuliers -->
  </human-notes>
</screen>
```
````

## Règles

- Nomme les éléments de manière descriptive : `type:nom_descriptif` (ex: `input:email`, `button:submit`)
- Le nommage final selon le framework sera appliqué par le skill POM
- Les éléments de layout (navbar, footer, sidebar) sont notés mais seront dans des ressources séparées
- Identifie les stratégies de sélection pour les items répétés
- Note dans `<human-notes>` les commentaires de l'humain qui méritent d'être mentionnés
