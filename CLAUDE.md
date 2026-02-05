# Pipeline Test Automation

## Contexte
Workspace de génération de tests automatisés pour application web.
Framework : Robot Framework + SeleniumLibrary

## Agents disponibles
- `/discover` : Comprendre l'app, générer roadmap
- `/map` : Cartographier les écrans
- `/pom` : Générer les ressources (Page Object Model)
- `/test` : Générer les suites de tests
- `/update` : Gérer les évolutions

## Règles globales
- Toujours lire config/project.yaml en premier
- Validation humaine obligatoire avant génération finale
- Pas de mention d'IA/agent dans les fichiers générés
- Pas de commentaires excessifs
- Les layouts (navbar, sidebar, footer) ont leurs propres ressources
- Style Gherkin natif (Given/When/Then)
- Pas de keywords wrapper atomiques

## Workflow type
1. /discover → roadmap
2. Déposer screenshots dans screens/{nom}/screenshots/
3. /map → rapport d'écran
4. /pom → ressources Robot
5. Remplir les __SELECTOR__
6. /test → suites de tests
7. /update si évolution
