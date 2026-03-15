---
view: board
---
# Backlog

> Détail des tâches et spécifications techniques.
> Priorités : `P0` (critique) → `P1` (important) → `P2` (souhaitable). Cocher quand terminé puis déplacer dans l'archive.
> Exemple : - [ ] **TLK-5** `P2` #tag **Titre** — Description.
> IDs : `TLK-<numéro séquentiel>`. Prochain ID : **TLK-10**.
> TLK-3 et TLK-4 retirés (obsolètes : le format de sortie de `/explore` passe en markdown pur, cf. TLK-2).

Pour les tâches terminée [voir archive.](ARCHIVE.md)

---

## App de démo

*(aucune tâche en cours)*

## Pipeline & outillage

*(aucune tâche en cours)*

## Exploration autonome (Playwright MCP)

- [ ] **TLK-9** `P0` #explore **Configurer Playwright MCP** — Installer et configurer le serveur Playwright MCP dans le workspace (`.mcp.json` ou `.claude/settings.json`). Vérifier que l'agent peut naviguer, capturer et interagir avec une page locale.
- [ ] **TLK-2** `P0` #explore **Créer le command `/explore`** — Command Claude qui orchestre l'exploration automatique de l'app via Playwright MCP : navigation écran par écran, prise de screenshots, extraction des éléments interactifs du DOM (selectors, types, labels), génération de fichiers **markdown** de mapping dans `screens/{nom}/` (cohérent avec le format markdown pur de TLK-6/TLK-7).

## Démo & validation

- [ ] **TLK-8** `P2` #demo **Dry-run approche manuelle** — Tester le pipeline complet screenshots → `/discover` → `/map` → `/pom` → `/test` sur l'app de démo. Vérifier la cohérence des livrables.
- [ ] **TLK-5** `P2` #demo **Dry-run approche autonome** — Lancer l'app → `/explore` → review des mappings → génération POM + tests → vérifier que le résultat est cohérent et présentable.
