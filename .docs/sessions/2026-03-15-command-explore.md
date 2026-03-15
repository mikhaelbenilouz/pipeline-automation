# Session — Créer le command /explore

**Date** : 2026-03-15
**Tâche backlog** : TLK-2 `P0`

## Objectif

Créer le command `/explore` : une commande Claude qui orchestre l'exploration autonome d'une application web via Playwright MCP. L'agent navigue dans l'app, prend des screenshots, extrait les éléments du DOM (selectors réels), et génère un rapport complet (mapping, user stories, journeys, plan de tests) — le tout en une seule passe.

`/explore` est l'approche **autonome** du projet, complémentaire au pipeline manuel (`/discover` → `/map` → `/pom` → `/test`) qui reste disponible.

## Brainstorm — Décisions prises

### Positionnement

- **Coexistence** avec le pipeline manuel — `/explore` est l'alternative autonome, les commands existantes restent pour l'approche screenshots
- `/explore` combine en une seule commande ce que font `/discover` + `/map` + `/pom` + `/test`, alimenté par Playwright MCP au lieu de screenshots fournis par l'utilisateur

### Prérequis

- **TLK-9** (configurer Playwright MCP) est un prérequis séparé, non inclus dans cette session
- Playwright MCP est supposé opérationnel quand `/explore` est invoqué

### Flux du command — 4 phases

#### Phase 1 — Onboarding

L'agent pose les questions nécessaires à l'utilisateur :
- URL de l'application
- Credentials si auth requise
- Contexte métier (type d'app, utilisateurs cibles, fonctionnalités clés)

Utilise `AskUserQuestion` pour structurer le dialogue. Objectif : collecter le minimum pour démarrer l'exploration. L'agent n'a pas besoin de tout savoir — il va découvrir le reste en explorant.

#### Phase 2 — Exploration autonome (Playwright MCP)

**Pattern d'exploration : breadth-first avec backlog**

L'agent maintient un **backlog d'exploration** — une file d'éléments à visiter/tester, enrichie au fur et à mesure des découvertes :

1. Démarrer par l'URL fournie (souvent la page d'accueil ou le login)
2. À chaque page visitée :
   - Prendre un screenshot → `screens/{nom}/screenshots/`
   - Extraire les éléments interactifs du DOM (selectors, types, labels, états)
   - Identifier les layouts partagés (navbar, sidebar, footer) et leurs éléments
   - Ajouter au backlog les liens, boutons et pages découverts mais non encore visités
3. Dépiler le backlog : visiter la prochaine page/action non explorée
4. Répéter jusqu'à épuisement du backlog

**Rapport écrit au fil de l'eau** : chaque écran exploré est ajouté au rapport **immédiatement** après exploration, pas à la fin. Avantages :
- Pas de perte d'information sur les apps volumineuses
- Possibilité de reprendre dans une session ultérieure (l'agent peut déduire où il en était)
- L'utilisateur peut suivre la progression

**Questions en cours de route** : l'agent peut poser des questions via `AskUserQuestion` s'il est bloqué (credentials, URL spécifique, choix de navigation). Mais il doit rester le plus autonome possible.

#### Phase 3 — Rapport & plan de tests

Le rapport est déjà construit incrémentalement (phase 2). L'agent finalise :
- Synthèse des user stories identifiées
- Journeys utilisateur déduits de la navigation
- Plan de tests proposé (organisation, couverture)

**Une seule validation** : l'utilisateur review le rapport complet (mapping + plan de tests) avant la génération.

#### Phase 4 — Génération POM + Tests
<!-- tailk-comment: {"id":"mms7thw3m2nefs","text":"attention, ici tu est trop spécifique en mentionnant \"robot\". le but de ce workflow est de pouvoir écrire les tests pour n’importe quel framework à partir du moment qu’on a les SKILL qu’il faut. actuellement effectivement on a que le skill robotframework mais faut que ce soit agnostique.","author":"","date":"2026-03-15T20:36:47.955Z","type":"commentaire"} -->

Après validation, l'agent génère :
- Resources POM (`.resource`) dans `output/robot/resources/pages/` et `layouts/`
- Suites de tests (`.robot`) dans `output/robot/tests/`

Charge les skills du framework configuré (`project.framework` dans CLAUDE.md) pour respecter les conventions.

### Format de sortie

- **Markdown pur** — Cohérent avec la décision projet (pas de JSON/XML)
- **Même structure de fichiers** que le pipeline manuel :
  - Screenshots : `screens/{nom}/screenshots/`
  - POM : `output/robot/resources/pages/` et `layouts/`
  - Tests : `output/robot/tests/`
- **Rapport global** : un seul fichier markdown synthétique (pas un fichier par écran)

### Selectors

- **Vrais selectors du DOM** extraits par Playwright MCP — plus de placeholders `__SELECTOR__`
- L'utilisateur les valide dans le rapport avant génération des POM

### Reprise de session

Le rapport incrémental et le backlog d'exploration permettent de reprendre une exploration interrompue. L'agent peut relire le rapport existant pour déduire :
- Quels écrans ont déjà été explorés
- Quels éléments du backlog restent à visiter

### Critères de done

- [ ] Le command `/explore` existe dans `.claude/commands/`
- [ ] L'agent peut naviguer dans l'app via Playwright MCP
- [ ] Les screenshots sont capturés et stockés dans `screens/{nom}/screenshots/`
- [ ] Les selectors réels sont extraits du DOM
- [ ] Un rapport global markdown est généré incrémentalement
- [ ] Le backlog d'exploration guide la navigation sans oubli
- [ ] L'agent propose un plan de tests dans le rapport
- [ ] Après validation, POM et tests sont générés avec les conventions du framework
- [ ] Le command est compatible avec la reprise de session

## Scope — Plan d'implémentation

### Prise en compte du commentaire Tailk (Brainstorm, Phase 4)

> La génération POM + Tests doit être **agnostique au framework**. Le command ne mentionne pas "robot" ni des extensions spécifiques — il lit `project.framework` et `output.path` depuis la config CLAUDE.md et charge dynamiquement les skills correspondants (`@.claude/skills/{framework}/pom.md`, `@.claude/skills/{framework}/test.md`). Les chemins de sortie utilisent `output.path`, pas un chemin en dur.

### Artefacts à créer/modifier

| Artefact | Chemin | Rôle |
|----------|--------|------|
| Command explore | `.claude/commands/explore.md` | Command principal — orchestre les 4 phases |
| Config CLAUDE.md | `CLAUDE.md` | Ajouter `/explore` dans la liste des agents disponibles |

### Architecture du command

Le command est un unique fichier markdown (`.claude/commands/explore.md`) qui contient :

1. **Gestion des arguments** — Déterminer le mode (nouveau ou reprise)
2. **Phase 1 — Onboarding** — Questions via `AskUserQuestion`
3. **Phase 2 — Exploration** — Algorithme breadth-first avec backlog, rapport incrémental
4. **Phase 3 — Finalisation du rapport** — User stories, journeys, plan de tests, validation
5. **Phase 4 — Génération** — Chargement dynamique des skills framework, génération POM + tests

#### Gestion des arguments

- **Sans argument** → Nouvelle exploration. Demander l'URL.
- **Argument = chemin vers un rapport existant** → Reprise. Lire le rapport, déduire l'état du backlog, continuer l'exploration.

#### Format du rapport global (`docs/explore-report.md`)

Le rapport est le livrable central. Il est écrit incrémentalement et sert à la fois de documentation et de checkpoint de reprise. Structure :

```markdown
# Rapport d'exploration

## Application
- **URL** : {url}
- **Nom** : {nom}
- **Description** : {description}

## Layouts

### Navbar
| Élément | Type | Selector | Description |
|---------|------|----------|-------------|
| {nom} | {type} | {selector CSS/XPath} | {description} |

### Sidebar
...

### Footer
...

## Écrans

### {Nom de l'écran} (`{url-relative}`)
Screenshot : `screens/{slug}/screenshots/screenshot.png`

#### Éléments
| Élément | Type | Selector | Description |
|---------|------|----------|-------------|
| {nom_descriptif} | {type} | {selector} | {description} |

#### États
- **{état}** — {description}

#### Transitions
- → {écran cible} via {action}

### {Écran suivant}
...

## User Stories
- **US-{n}** : En tant que {rôle}, je veux {action} afin de {bénéfice}

## Journeys
### {Nom du journey}
1. **{écran}** — {action}
2. **{écran}** — {action}

## Plan de tests
### {Feature / User Story}
- {Test case proposé}
- {Test case proposé}

## Backlog d'exploration
- [x] {page/action déjà explorée}
- [ ] {page/action restante}
```

#### Backlog d'exploration (in-rapport)

Le backlog est intégré directement dans le rapport (dernière section). Format checklist markdown :
- `- [x]` = exploré
- `- [ ]` = à explorer

L'agent le met à jour après chaque page visitée. En cas de reprise, il lit cette section pour savoir où reprendre.

#### Chargement dynamique des skills

Pour la génération POM + Tests (Phase 4), le command lit `project.framework` dans CLAUDE.md et charge :
- `@.claude/skills/{framework}/pom.md` + `@.claude/skills/{framework}/conventions.md` pour les POM
- `@.claude/skills/{framework}/test.md` pour les tests

Si le skill n'existe pas pour le framework configuré, l'agent le signale et s'arrête.

Les fichiers sont générés dans `output.path` (de CLAUDE.md) :
- POM pages → `{output.path}/resources/pages/`
- POM layouts → `{output.path}/resources/layouts/`
- Tests → `{output.path}/tests/`

### Tâches d'implémentation

- [ ] **T1** Écrire le command `explore.md` — Fichiers : `.claude/commands/explore.md`. Complexité : haute
  - Rédiger le command complet avec les 4 phases
  - Définir la gestion d'arguments (nouveau vs reprise)
  - Décrire l'algorithme d'exploration breadth-first avec backlog
  - Spécifier le format du rapport (template markdown intégré dans le command)
  - Intégrer le chargement dynamique des skills (`project.framework`)
  - Spécifier les interactions `AskUserQuestion` (onboarding, blocages, validation)
  - Documenter la mécanique de reprise de session
  - S'aligner sur le style et les patterns des commands existants (`discover.md`, `map.md`, `pom.md`, `test.md`)

- [ ] **T2** Mettre à jour CLAUDE.md — Fichiers : `CLAUDE.md`. Complexité : faible
  - Dépend de : T1
  - Ajouter `/explore` dans la section "Agents disponibles" avec sa description

### Mode d'exécution

- **Tout séquentiel** : T1 → T2. Pas de parallélisme nécessaire — T2 est trivial et dépend de T1.

## Exécution

### Tâches

- [x] **T1** Écrire le command `explore.md`
- [x] **T2** Mettre à jour CLAUDE.md — `/explore [rapport]` ajouté dans la section "Agents disponibles"

### Problèmes rencontrés

*(aucun)*

### Tests manuels à effectuer

- [ ] Lancer `/explore` sans argument → vérifier que l'onboarding pose les bonnes questions (URL, credentials, contexte)
- [ ] Vérifier que le command charge correctement les skills du framework configuré en Phase 4
- [ ] Tester la reprise : lancer `/explore docs/explore-report.md` avec un rapport contenant un backlog partiel → vérifier que l'agent reprend aux items `[ ]`
- [ ] Vérifier que le rapport est bien écrit incrémentalement pendant l'exploration
- [ ] Vérifier que les selectors extraits du DOM se retrouvent dans les POM générés (pas de `__SELECTOR__`)

### Ecarts d'implémentation vs plan

- T2 a été exécuté dans le même sous-agent que T1 (pas de dépendance bloquante en pratique)

## Bilan

### Réalisé

- **T1** — Command `.claude/commands/explore.md` créé : 4 phases (onboarding, exploration breadth-first, rapport incrémental, génération POM+tests), chargement dynamique des skills framework, mécanique de reprise de session
- **T2** — `CLAUDE.md` mis à jour : `/explore [rapport]` ajouté dans la liste des agents disponibles

### Drift

- **Tâches ajoutées** : aucune
- **Tâches reportées** : aucune
- **Écart mineur** : T2 exécuté dans le même sous-agent que T1 (pas de dépendance bloquante en pratique)

### Nouveaux tickets

Aucun nouveau ticket créé.

### Mises à jour effectuées

- [x] BACKLOG.md — TLK-2 retiré
- [x] ARCHIVE.md — TLK-2 archivé avec détails
- [x] CLAUDE.md — `/explore` ajouté aux agents disponibles
- [ ] Mémoire agent — pas de nouveau pattern à retenir
- [x] CHRONICLE.md — entrée ajoutée
- [x] CHANGELOG.md — version 0.2.0 ajoutée
