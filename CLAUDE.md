# Pipeline Test Automation

Workspace de génération de tests automatisés pour applications web.

## Agents disponibles

- `/discover` : Comprendre l'app, générer roadmap
- `/map [screen]` : Cartographier un écran
- `/pom [screen]` : Générer les ressources (Page Object Model)
- `/test [screen|journey]` : Générer les suites de tests
- `/update` : Gérer les évolutions

## Configuration

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

<naming-conventions>
  <elements>
    <pattern>{prefix}_{name}_{screen}</pattern>
    <prefixes>
      <button>btn</button>
      <input>inp</input>
      <link>lnk</link>
      <text>txt</text>
      <list>lst</list>
      <item>itm</item>
      <image>img</image>
      <checkbox>chk</checkbox>
      <radio>rdo</radio>
      <select>sel</select>
      <textarea>txa</textarea>
      <container>ctn</container>
      <card>crd</card>
    </prefixes>
  </elements>

  <files>
    <page>{screen_name}.resource</page>
    <layout>{layout_name}.resource</layout>
    <test>{feature}.robot</test>
  </files>

  <keywords>
    <style>Title Case</style>
  </keywords>
</naming-conventions>

## Règles globales

- Validation humaine obligatoire avant génération finale
- Pas de mention d'IA/agent dans les fichiers générés
- Pas de commentaires excessifs
- Les layouts (navbar, sidebar, footer) ont leurs propres ressources
- Style Gherkin natif (Given/When/Then/And/But) sur lignes séparées
- Pas de keywords wrapper atomiques
- Synchronisation sur éléments, jamais de waits en dur
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
