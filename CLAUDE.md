# Pipeline Test Automation

Workspace de génération de tests automatisés pour applications web.

## Agents disponibles

- `/discover` : Comprendre l'app, générer roadmap
- `/map [screen]` : Cartographier un écran
- `/pom [screen]` : Générer les ressources (Page Object Model)
- `/test [screen|journey]` : Générer les suites de tests
- `/update` : Gérer les évolutions

## Configuration

- **project.name** : MonApp
- **project.language** : fr
- **project.framework** : robot
- **output.path** : ./output/robot

## Règles globales

- L'utilisateur relit les fichiers générés et fait ses remarques
- Pas de mention d'IA/agent dans les fichiers générés
- Pas de commentaires excessifs
- Les layouts (navbar, sidebar, footer) ont leurs propres ressources
- Les commands chargent le skill du framework indiqué dans `project.framework`

## Workflow type

1. `/discover` → roadmap
2. Déposer screenshots dans `screens/{nom}/screenshots/`
3. `/map {nom}` → rapport d'écran
4. `/pom {nom}` → ressources
5. Remplir les `__SELECTOR__`
6. `/test {nom}` → suites de tests
7. `/update` si évolution

## Structure des fichiers générés

```
{output.path}/
├── resources/
│   ├── pages/          # POM par écran
│   ├── layouts/        # navbar, sidebar, footer
│   └── common/         # Keywords partagés
└── tests/              # Suites de tests
```
