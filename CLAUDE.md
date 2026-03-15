# Pipeline Test Automation

Workspace de génération de tests automatisés pour applications web.

## Agents disponibles

- `/discover` : Comprendre l'app, générer roadmap
- `/map [screen]` : Cartographier un écran
- `/pom [screen]` : Générer les ressources (Page Object Model)
- `/test [screen|journey]` : Générer les suites de tests
- `/update` : Gérer les évolutions

## Configuration

```xml
<config>
  <project>
    <name>MonApp</name>
    <language>fr</language>
    <framework>robot</framework>
  </project>

  <validation>
    <require-draft-approval>true</require-draft-approval>
  </validation>

  <output>
    <path>./output/robot</path>
  </output>
</config>
```

## Règles globales

- Validation humaine obligatoire avant génération finale
- Pas de mention d'IA/agent dans les fichiers générés
- Pas de commentaires excessifs
- Les layouts (navbar, sidebar, footer) ont leurs propres ressources
- Les commands chargent le skill du framework indiqué dans `<framework>`

## Workflow type

1. `/discover` → roadmap
2. Déposer screenshots dans `screens/{nom}/screenshots/`
3. `/map {nom}` → rapport d'écran
4. `/pom {nom}` → ressources (draft puis final)
5. Remplir les `__SELECTOR__`
6. `/test {nom}` → suites de tests
7. `/update` si évolution

## Structure des fichiers générés

```
output/{framework}/
├── resources/
│   ├── pages/          # POM par écran
│   ├── layouts/        # navbar, sidebar, footer
│   └── common/         # Keywords partagés
└── tests/              # Suites de tests
```
