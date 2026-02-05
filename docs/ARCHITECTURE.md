# Architecture du Workspace

## Vue d'ensemble

Workspace de génération de tests automatisés pour applications web via des agents spécialisés.

## Arborescence

```
pipeline-automation/
├── .claude/
│   ├── settings.json
│   ├── commands/              # Agents (agnostiques)
│   │   ├── discover.md        # /discover
│   │   ├── map.md             # /map [screen]
│   │   ├── pom.md             # /pom [screen]
│   │   ├── test.md            # /test [screen|journey]
│   │   └── update.md          # /update
│   └── skills/                # Skills par framework
│       └── robot/
│           ├── pom.md         # Templates POM Robot
│           └── test.md        # Templates tests Robot
│
├── docs/
│   ├── ARCHITECTURE.md        # Ce fichier
│   ├── app-context.md         # Contexte applicatif (généré)
│   └── roadmap.md             # Roadmap (générée)
│
├── screens/
│   ├── _template/
│   └── {ecran}/
│       ├── screenshots/       # Captures d'écran
│       └── report.md          # Rapport cartographie
│
├── drafts/                    # Validation avant génération
│   ├── pom/
│   └── tests/
│
├── output/{framework}/        # Fichiers finaux
│   ├── resources/
│   │   ├── pages/
│   │   ├── layouts/
│   │   └── common/
│   └── tests/
│
├── CLAUDE.md                  # Config + règles (source de vérité)
└── .gitignore
```

## Flux

```
/discover ──► docs/app-context.md + docs/roadmap.md
    │
    ▼ (screenshots)
/map ──► screens/{x}/report.md
    │
    ▼
/pom ──► drafts/pom/ ──► output/{framework}/resources/
    │
    ▼ (humain: __SELECTOR__)
/test ──► drafts/tests/ ──► output/{framework}/tests/

/update ──► Plan d'impacts ──► Mise à jour ciblée
```

## Configuration

Toute la configuration est dans `CLAUDE.md` :
- `<config>` : projet, langue, framework, validation, output
- `<naming-conventions>` : patterns de nommage

## Skills par framework

Les commands sont agnostiques. Elles délèguent au skill du framework configuré :
- `robot` : `.claude/skills/robot/`
- `cypress` : `.claude/skills/cypress/` (à créer)
- etc.
