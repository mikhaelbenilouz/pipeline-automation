# Pipeline Test Automation

Template de génération de tests automatisés pour applications web avec Claude Code.

## Prérequis

- [Claude Code](https://claude.ai/claude-code) installé

## Installation

```bash
gh repo clone mikhaelbenilouz/pipeline-automation mon-app-tests
cd mon-app-tests
```

## Configuration

Modifier `CLAUDE.md` pour votre projet :

```xml
<config>
  <project>
    <name>MonApp</name>
    <language>fr</language>
    <framework>robot</framework>
  </project>
</config>
```

## Commandes disponibles

| Commande | Description |
|----------|-------------|
| `/discover` | Analyser l'application et générer une roadmap de tests |
| `/map {screen}` | Cartographier un écran depuis ses screenshots |
| `/pom {screen}` | Générer les ressources Page Object Model |
| `/test {screen}` | Générer les suites de tests |
| `/update` | Gérer les évolutions de l'application |

## Workflow

1. `/discover` → Générer la roadmap
2. Déposer les screenshots dans `screens/{nom}/screenshots/`
3. `/map {nom}` → Obtenir le rapport d'écran
4. `/pom {nom}` → Générer les ressources (draft → validation → final)
5. Compléter les sélecteurs `__SELECTOR__`
6. `/test {nom}` → Générer les tests

## Structure générée

```
output/{framework}/
├── resources/
│   ├── pages/          # POM par écran
│   ├── layouts/        # navbar, sidebar, footer
│   └── common/         # Keywords partagés
└── tests/              # Suites de tests
```

## Licence

MIT
