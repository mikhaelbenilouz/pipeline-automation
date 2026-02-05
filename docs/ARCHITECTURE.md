# Architecture du Workspace

## Vue d'ensemble

Ce workspace permet de générer des tests automatisés pour applications web via une approche conversationnelle avec des agents spécialisés.

## Arborescence

```
pipeline-automation/
├── .claude/
│   ├── settings.json              # Config Claude Code
│   └── commands/
│       ├── discover.md            # /discover - Agent Discovery
│       ├── map.md                 # /map - Agent Cartographe
│       ├── pom.md                 # /pom - Agent POM Generator
│       ├── test.md                # /test - Agent Test Generator
│       └── update.md              # /update - Agent Updater
│
├── config/
│   ├── project.yaml               # Config projet (langue, framework)
│   └── naming-conventions.yaml    # Patterns de nommage
│
├── docs/
│   ├── ARCHITECTURE.md            # Ce fichier
│   ├── roadmap.md                 # Roadmap générée (phases + tâches)
│   └── app-context.md             # Contexte applicatif
│
├── screens/
│   ├── _template/                 # Template pour nouvel écran
│   └── {ecran}/
│       ├── screenshots/           # Captures d'écran (états)
│       └── report.md              # Rapport de cartographie
│
├── drafts/                        # Drafts pour validation
│   ├── pom/
│   └── tests/
│
├── output/robot/                  # Fichiers générés finaux
│   ├── resources/
│   │   ├── pages/                 # POM par écran
│   │   ├── layouts/               # navbar, sidebar, footer
│   │   └── common/                # Keywords partagés
│   └── tests/                     # Suites de tests
│
├── CLAUDE.md                      # Instructions globales
└── .gitignore
```

## Flux inter-agents

```
┌─────────────┐
│  /discover  │ ──► docs/app-context.md + docs/roadmap.md
└─────────────┘
       │
       ▼ (humain dépose screenshots)
┌─────────────┐
│    /map     │ ──► screens/{x}/report.md
└─────────────┘
       │
       ▼
┌─────────────┐
│    /pom     │ ──► drafts/pom/ ──► output/robot/resources/
└─────────────┘
       │
       ▼ (humain remplit __SELECTOR__)
┌─────────────┐
│    /test    │ ──► drafts/tests/ ──► output/robot/tests/
└─────────────┘

       ═══════════════
       Si évolution :
       ═══════════════

┌─────────────┐
│   /update   │ ──► Analyse + Plan d'impacts ──► Mise à jour ciblée
└─────────────┘
```

## Règles de génération

- Validation humaine obligatoire avant génération finale
- Pas de mention d'IA/agent dans les fichiers générés
- Pas de commentaires excessifs
- Style Gherkin natif (Given/When/Then)
- Pas de keywords wrapper atomiques
- Layouts séparés des pages
- Placeholders `__SELECTOR__` pour les sélecteurs
