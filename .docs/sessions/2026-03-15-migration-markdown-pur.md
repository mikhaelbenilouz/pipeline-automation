# Session — Migration vers markdown pur

**Date** : 2026-03-15
**Tâches backlog** : TLK-6 `P1`, TLK-7 `P1`

## Objectif

Éliminer tout le XML embarqué du projet : la configuration dans CLAUDE.md et les templates de sortie des commands `/discover`, `/map` et `/update`. Tout doit être en markdown pur avec des sections bien structurées.

## Brainstorm — Décisions prises

### TLK-6 — Configuration CLAUDE.md

**Format retenu** : liste simple dot-notation.

Le bloc `<config>` XML est remplacé par une section `## Configuration` avec des clés en dot-notation :

```markdown
## Configuration

- **project.name** : MonApp
- **project.language** : fr
- **project.framework** : robot
- **validation.require-draft-approval** : true
- **output.path** : ./output/robot
```

**Règles globales** : la règle "Les commands chargent le skill du framework indiqué dans `<framework>`" devient "Les commands chargent le skill du framework indiqué dans `project.framework`".

### TLK-7 — Formats de sortie des commands

**Format retenu** : sections hiérarchiques + listes à puces + tableaux (pas de YAML, pas de XML).

3 commands à migrer (formats de sortie) + 5 commands à mettre à jour (références à la config) :

#### `/discover` — app-context.md

Remplacer `<app-context>` XML par des sections markdown :

```markdown
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
```

#### `/discover` — roadmap.md

Remplacer `<roadmap>` XML par :

```markdown
# Roadmap Test Automation

## Phase 1 — {nom}

| Écran | Type | Description |
|-------|------|-------------|
| {écran} | map | {description} |
| {écran} | pom | {description} |
| {écran} | test | {description} |

## Phase 2 — {nom}

...
```

#### `/map` — report.md

Remplacer `<screen>` XML par :

```markdown
# Rapport d'écran : {nom}

## Zones

### {nom de la zone}

{description}

| Élément | Type | Description |
|---------|------|-------------|
| {nom_descriptif} | {type} | {description} |

## États

- **{nom}** ({fichier screenshot}) — {description}
- **{nom}** ({fichier screenshot}) — Déclencheur : {trigger}

## Transitions

- {écran source} → {écran cible} — {action déclencheur}

## Éléments répétés

### {nom du groupe}

{description}

**Stratégie de sélection** : {stratégie}

| Élément | Type | Description |
|---------|------|-------------|
| {nom} | {type} | {description} |

## Notes

- {commentaires humains, conditions d'accès, prérequis, cas particuliers}
```

#### `/update` — plan de mise à jour

Remplacer `<update-plan>` XML par :

```markdown
# Plan de mise à jour

**Date** : {date}
**Résumé** : {résumé des changements}

## Changements

### {type} — {écran}

**Source** : {origine du changement}

**Impacts** :

| Fichier | Action | Description |
|---------|--------|-------------|
| {chemin} | update/create/delete | {description} |

## Nouvelle phase (si applicable)

### Phase {n} — {nom}

| Écran | Type | Description |
|-------|------|-------------|
| {écran} | map/pom/test | {description} |
```

### Références config dans les commands

Les 5 commands (`/discover`, `/map`, `/pom`, `/test`, `/update`) doivent être mises à jour :

- Remplacer toute mention de `<config>`, `<language>`, `<framework>`, `<output><path>` par les clés dot-notation : `project.language`, `project.framework`, `output.path`
- Remplacer "Lis la configuration dans @CLAUDE.md (balises `<config>` et `<naming-conventions>`)" par "Lis la configuration dans @CLAUDE.md (section Configuration)"
- Supprimer toute mention de `<naming-conventions>` (les conventions sont dans les skills du framework)

### Critères de done

- [ ] CLAUDE.md ne contient plus de XML — section Configuration en liste dot-notation
- [ ] Règles globales mises à jour (plus de référence à `<framework>`)
- [ ] `/discover` : templates app-context.md et roadmap.md en markdown pur
- [ ] `/map` : template report.md en markdown pur
- [ ] `/update` : template plan de mise à jour en markdown pur
- [ ] Les 5 commands référencent la config en dot-notation (plus de `<balises>`)
- [ ] Aucune balise XML restante dans CLAUDE.md ni dans les commands

## Scope — Plan d'implémentation

### Artefacts à modifier

| Artefact | Chemin | Modification |
|----------|--------|--------------|
| Config projet | `CLAUDE.md` | Remplacer bloc `<config>` XML par liste dot-notation, adapter règles globales |
| Command discover | `.claude/commands/discover.md` | Remplacer templates XML (app-context + roadmap) + refs config |
| Command map | `.claude/commands/map.md` | Remplacer template XML (report) + refs config |
| Command update | `.claude/commands/update.md` | Remplacer template XML (update-plan) + refs config |
| Command pom | `.claude/commands/pom.md` | Mettre à jour refs config (pas de template XML en sortie) |
| Command test | `.claude/commands/test.md` | Mettre à jour refs config (pas de template XML en sortie) |

### Tâches d'implémentation

- [ ] **T1** Migrer la configuration CLAUDE.md — Fichiers : `CLAUDE.md`. Complexité : faible
  - Remplacer le bloc ```xml `<config>...</config>` ``` (lignes 15-31) par la section `## Configuration` en liste dot-notation
  - Mettre à jour la règle globale : `<framework>` → `project.framework`

- [ ] **T2** Migrer `/discover` — Fichiers : `.claude/commands/discover.md`. Complexité : moyenne
  - Remplacer la section "Format app-context.md" : supprimer le bloc XML `<app-context>`, le remplacer par le template markdown (sections Application, Utilisateurs, Fonctionnalités, Journeys avec tableaux)
  - Remplacer la section "Format roadmap.md" : supprimer le bloc XML `<roadmap>`, le remplacer par le template markdown (phases avec tableaux Écran/Type/Description)
  - Mettre à jour le contexte : remplacer "Lis la configuration dans @CLAUDE.md (balises `<config>` et `<naming-conventions>`)" par "Lis la configuration dans @CLAUDE.md (section Configuration)"
  - Remplacer `<language>` par `project.language`

- [ ] **T3** Migrer `/map` — Fichiers : `.claude/commands/map.md`. Complexité : moyenne
  - Remplacer la section "Format rapport" : supprimer le bloc XML `<screen>`, le remplacer par le template markdown (Zones avec tableaux, États, Transitions, Éléments répétés, Notes)
  - Mettre à jour le contexte : "Lis la configuration dans @CLAUDE.md" → section Configuration
  - Remplacer `<language>` par `project.language`

- [ ] **T4** Migrer `/update` — Fichiers : `.claude/commands/update.md`. Complexité : moyenne
  - Remplacer la section "Format plan de mise à jour" : supprimer le bloc XML `<update-plan>`, le remplacer par le template markdown (Changements avec tableaux impacts, Nouvelle phase)
  - Mettre à jour le contexte : refs config en dot-notation
  - Remplacer `output/{framework}` par `output/{project.framework}` ou référence directe à `output.path`

- [ ] **T5** Mettre à jour `/pom` et `/test` — Fichiers : `.claude/commands/pom.md`, `.claude/commands/test.md`. Complexité : faible
  - `/pom` : remplacer `<framework>` → `project.framework`, `<language>` → `project.language`, `<output><path>` → `output.path`, "Si robot" → "Si `project.framework` = robot"
  - `/test` : remplacer `<framework>` → `project.framework`, `<language>` → `project.language`, "Si robot" → "Si `project.framework` = robot"

### Mode d'exécution

- **Tout séquentiel** : pas de parallélisme nécessaire. Les 5 tâches sont indépendantes mais petites (éditions de fichiers markdown). L'exécution séquentielle T1 → T2 → T3 → T4 → T5 permet de valider la cohérence au fur et à mesure. Le surcoût d'Agent Team n'est pas justifié pour 6 fichiers.

## Exécution

### Tâches

- [x] **T1** Migrer la configuration CLAUDE.md — bloc XML → liste dot-notation + règle globale mise à jour
- [x] **T2** Migrer `/discover` — templates app-context.md et roadmap.md en markdown pur + refs config
- [x] **T3** Migrer `/map` — template report.md en markdown pur + refs config + correction ref `<human-notes>` dans les règles
- [x] **T4** Migrer `/update` — template plan de mise à jour en markdown pur + refs config (output.path)
- [x] **T5** Mettre à jour `/pom` et `/test` — refs config en dot-notation dans les 2 fichiers

### Problèmes rencontrés

*(aucun)*

### Tests manuels à effectuer

- [x] Relire `CLAUDE.md` — vérifier que la section Configuration est correcte et lisible
- [x] Relire `.claude/commands/discover.md` — vérifier les templates app-context et roadmap
- [x] Relire `.claude/commands/map.md` — vérifier le template report
- [x] Relire `.claude/commands/update.md` — vérifier le template plan de mise à jour
- [x] Relire `.claude/commands/pom.md` et `test.md` — vérifier les refs config
- [ ] Vérifier qu'aucune balise XML ne subsiste (grep `<[a-z-]+>` → 0 résultat ✅)

### Ecarts d'implémentation vs plan

- **T3** : correction supplémentaire non prévue — la référence `<human-notes>` dans la section Règles de `/map` a été remplacée par "la section Notes" pour cohérence avec le nouveau template. Ajustement mineur et logique.

## Bilan

### Réalisé

- **T1-T5** : Les 5 tâches complétées — configuration CLAUDE.md migrée, 3 templates de sortie migrés, 5 commands mises à jour
- **0 balise XML restante** dans CLAUDE.md et les commands (vérifié par grep)
- Tous les critères de done validés

### Drift

- **Tâches ajoutées** : correction de la référence `<human-notes>` dans les règles de `/map` (découverte en T3, ajustement mineur)
- **Tâches reportées** : aucune

### Nouveaux tickets

Aucun nouveau ticket créé.

### Mises à jour effectuées

- [x] BACKLOG.md — TLK-6 et TLK-7 retirés
- [x] ARCHIVE.md — TLK-6 et TLK-7 archivés avec détails
- [ ] CLAUDE.md — pas de nouvelle convention à ajouter (la migration elle-même est le changement)
- [ ] Mémoire agent — pas de nouveau pattern à retenir
- [x] CHRONICLE.md — entrée ajoutée
- [ ] CHANGELOG.md — pas de changement visible utilisateur (migration interne)
