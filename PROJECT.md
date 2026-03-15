# Projet : Demo eXalt Automation

## Vision

Montrer comment l’IA peut **automatiser la génération de tests end-to-end** pour des applications web, à travers différentes approches complémentaires :

1. **Manuelle assistée** — L’utilisateur fournit des screenshots, l’agent analyse et génère via le pipeline `/discover` → `/map` → `/pom` → `/test`
2. **Exploration autonome** — L’agent navigue lui-même dans l’app via Playwright MCP, capture, analyse et génère en une seule passe
3. **Analyse de code source** *(extension de l’approche autonome, priorité basse)* — Quand le code de l’app est accessible, l’agent l’exploite en complément de l’exploration pour en déduire les éléments, selectors et parcours utilisateur

## Objectif de la démo

Positionner les différentes approches d'automatisation IA sur une même application de démo :

- **Approche manuelle assistée** : l'utilisateur capture les écrans, l'agent génère les tests via le pipeline structuré
- **Approche autonome** : l'agent explore, capture et génère sans intervention (Playwright MCP)
- **Approche hybride** *(à explorer)* : l'agent combine exploration et lecture du code source

La démo live se concentre sur les approches manuelle et autonome. L'analyse de code source est documentée comme piste d'évolution.

## Application de démo

**Type** : Gestionnaire de tâches (todo/kanban)

**Écrans** :
- **Login** — formulaire email/mot de passe
- **Dashboard** — liste des tâches avec filtres et statuts
- **Création de tâche** — formulaire avec titre, description, priorité, assignation
- **Édition de tâche** — même formulaire, pré-rempli
- **Profil** — informations utilisateur, paramètres

**Stack** : HTML / CSS / JS vanilla, localStorage, sans backend

**Layouts partagés** : navbar (navigation + user menu), sidebar (filtres/catégories), footer

## Architecture technique

```txt
demo-app/                    # Application de démo
├── index.html               # Login
├── dashboard.html           # Dashboard
├── task-new.html            # Création tâche
├── task-edit.html           # Édition tâche
├── profile.html             # Profil
├── css/style.css
└── js/
    ├── app.js               # State management (localStorage)
    ├── auth.js              # Auth simulée
    └── tasks.js             # CRUD tâches

screens/                     # Généré par /explore
├── {screen}/
│   ├── screenshot.png       # Capture Playwright
│   └── map.json             # Éléments, selectors, journeys

output/robot/                # Généré par /pom et /test
├── resources/
│   ├── pages/               # POM par écran
│   ├── layouts/             # navbar, sidebar, footer
│   └── common/              # Keywords partagés
└── tests/                   # Suites de tests
```

## Workflow

```txt
Lancer l'app (http-server)
        │
        ▼
   /explore (Playwright MCP)
        │
        ├── Navigate chaque écran
        ├── Screenshot
        ├── Extraire éléments DOM (selectors, types, labels)
        └── Générer map.json
        │
        ▼
  Validation humaine des mappings
        │
        ▼
  Génération POM + Tests (Robot Framework)
        │
        ▼
     Review final
```

## Contraintes

- Aucune dépendance lourde (pas de framework frontend, pas de backend)
- L'app doit être visuellement propre (crédible pour une démo client)
- Les tests générés doivent être exécutables (syntaxe Robot valide)

## Stack & outils

| Outil | Usage |
|---|---|
| HTML/CSS/JS | App de démo |
| localStorage | Persistance des données |
| http-server | Serveur local |
| Playwright MCP | Exploration automatisée |
| Claude Code | Agent de génération |
| Robot Framework | Framework de test cible |

## Décisions

- **Markdown pur** — Abandonner le XML embarqué dans les fichiers markdown. Tous les formats de sortie (app-context, roadmap, reports, plans) et la configuration dans CLAUDE.md doivent utiliser du markdown pur avec des sections bien établies. Les commandes dans `.claude/commands/` doivent être adaptées en conséquence.
