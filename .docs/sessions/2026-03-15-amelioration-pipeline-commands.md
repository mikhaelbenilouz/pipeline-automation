# Session — Amélioration du pipeline de commands

**Date** : 2026-03-15
**Tâches backlog** : TLK-10 `P1`

## Objectif

Corriger les incohérences et trous dans les commands du pipeline (`/discover`, `/map`, `/pom`, `/test`, `/update`) pour qu'elles s'enchaînent sans ambiguïté et qu'un agent puisse les exécuter de manière fluide.

## Brainstorm — Décisions prises

### Suppression du workflow draft

**Décision** : plus de dossier `drafts/`. Les agents écrivent directement les fichiers à leur destination finale. L'utilisateur relit le fichier généré et fait ses remarques. Plus de proposition dans le chat (trop compliqué à lire), plus de déplacement de fichiers, plus de gestion double des chemins d'import.

**Impact sur les commands** :
- `/pom` : supprimer les étapes 4-6 (draft → validation → déplacement). Remplacer par : écrire directement dans `resources/pages/` sous `output.path`
- `/test` : supprimer les étapes 3-5 (draft → validation → fichiers finaux). Remplacer par : écrire directement dans `tests/` sous `output.path`
- `/map` : supprimer l'étape de "proposition du draft". Écrire directement `screens/$ARGUMENTS/report.md`

### Transition /discover → /map

**Décision** : `/discover` doit terminer en guidant l'utilisateur vers l'étape suivante. Après la génération de la roadmap, afficher une section "Prochaines étapes" qui explique :
- Déposer les screenshots dans `screens/{nom}/screenshots/` pour chaque écran de la phase 1
- Lancer `/map {nom}` pour chaque écran

### Destination des fichiers /test

**Décision** : `/test` doit explicitement écrire dans `tests/` sous `output.path`. Ajouter cette précision dans le processus.

### Layouts traités comme des écrans séparés

**Décision** : les layouts (navbar, sidebar, footer) sont traités comme des écrans à part. On appelle `/pom navbar`, `/pom sidebar`, etc. explicitement. Cela implique :
- `/map` doit pouvoir mapper un layout (pas seulement un écran)
- La roadmap de `/discover` doit inclure les layouts comme tâches (map + pom pour chaque layout)
- Les layouts apparaissent dans `screens/navbar/`, `screens/sidebar/`, etc.

### Chemins output.path cohérents

**Décision** : partout où il est écrit `output/{framework}/...`, remplacer par une référence à `output.path`. Fichiers impactés :
- `/pom` étape 6 : `output/{framework}/resources/pages/` → `resources/pages/` sous `output.path`
- Skill `robot/test.md` : l'arbre `output/robot/tests/` → le garder comme exemple mais en référençant `output.path`

### /discover reste haut niveau

**Décision** : les journeys dans `app-context.md` restent des parcours de haut niveau (écran → action). C'est `/test` qui déduit les scénarios détaillés (cas nominal, cas d'erreur, données) à partir du report et du contexte métier.

### Roadmap reste implicite

**Décision** : la roadmap garde le format `type: map/pom/test` sans écrire la commande exacte. L'utilisateur fait le lien. Pas besoin d'alourdir.

### Critères de done

- [ ] Plus aucune mention de `drafts/` dans les commands
- [ ] `/discover` termine avec des prochaines étapes claires
- [ ] `/test` indique explicitement le chemin de destination des fichiers
- [ ] `/pom` et `/map` peuvent traiter des layouts comme des écrans
- [ ] Plus de `output/{framework}` résiduel — tout utilise `output.path`
- [ ] Le processus de chaque command reflète le nouveau workflow (écriture directe, relecture par l'utilisateur)

## Scope — Plan d'implémentation

### Artefacts à modifier

| Artefact | Chemin | Modification |
|----------|--------|--------------|
| Command discover | `.claude/commands/discover.md` | Ajouter prochaines étapes, inclure layouts dans roadmap |
| Command map | `.claude/commands/map.md` | Supprimer étape draft, écriture directe, clarifier support layouts |
| Command pom | `.claude/commands/pom.md` | Supprimer workflow draft, écriture directe sous `output.path`, distinguer pages/layouts |
| Command test | `.claude/commands/test.md` | Supprimer workflow draft, écriture directe sous `output.path/tests/` |
| Skill robot/test | `.claude/skills/robot/test.md` | Corriger arbre `output/robot/tests/` en dur |
| Config projet | `CLAUDE.md` | Supprimer `validation.require-draft-approval`, mettre à jour workflow et structure |

### Tâches d'implémentation

- [ ] **T1** Mettre à jour `/discover` — Fichiers : `.claude/commands/discover.md`. Complexité : faible
  - Ajouter une section `## Prochaines étapes` dans le processus : après génération de la roadmap, afficher un message guidant l'utilisateur (déposer screenshots dans `screens/{nom}/screenshots/`, lancer `/map {nom}`)
  - Dans le format roadmap.md : ajouter un exemple de ligne layout (type `map`/`pom` pour navbar, sidebar, footer) pour que l'agent pense à les inclure
  - Supprimer l'étape "Propose un draft" (étape 3) et "Après validation" (étape 4) → remplacer par : générer directement `docs/app-context.md`
  - Idem étapes 5-6 pour roadmap → générer directement `docs/roadmap.md`
  - Supprimer la règle "Ne génère jamais de fichiers sans validation explicite"

- [ ] **T2** Mettre à jour `/map` — Fichiers : `.claude/commands/map.md`. Complexité : faible
  - Supprimer les étapes 6-7 (propose draft, après validation génère) → remplacer par une seule étape : écrire directement `screens/$ARGUMENTS/report.md`
  - Mettre à jour la description de l'agent pour inclure les layouts : "analyser un écran ou un layout"
  - Préciser dans les règles que pour un layout, le rapport couvre les éléments partagés visibles sur tous les écrans

- [ ] **T3** Mettre à jour `/pom` — Fichiers : `.claude/commands/pom.md`. Complexité : moyenne
  - Supprimer les étapes 4-6 (draft → validation → déplacement). Remplacer par : écrire directement le fichier `.resource` dans `resources/pages/` sous `output.path` (ou `resources/layouts/` si c'est un layout)
  - L'agent doit détecter si l'argument est un layout (navbar, sidebar, footer) et adapter le chemin de sortie en conséquence
  - Remplacer `output/{framework}/resources/pages/` par une référence à `output.path`
  - Supprimer la règle "Layouts dans `resources/layouts/`" qui est implicite maintenant que les layouts sont traités comme des écrans séparés — la remplacer par une règle expliquant que si `$ARGUMENTS` est un layout, le fichier va dans `resources/layouts/` au lieu de `resources/pages/`

- [ ] **T4** Mettre à jour `/test` — Fichiers : `.claude/commands/test.md`. Complexité : faible
  - Supprimer les étapes 3-5 (drafts → validation → fichiers finaux). Remplacer par : écrire directement les fichiers `.robot` dans `tests/` sous `output.path`
  - Ajouter `output.path` dans la section Contexte (il manque actuellement)

- [ ] **T5** Mettre à jour le skill `robot/test.md` — Fichiers : `.claude/skills/robot/test.md`. Complexité : faible
  - Dans la section "Organisation des fichiers", remplacer l'arbre `output/robot/tests/` par `tests/` (relatif à `output.path`, comme indiqué dans la config)

- [ ] **T6** Mettre à jour `CLAUDE.md` — Fichiers : `CLAUDE.md`. Complexité : faible
  - Supprimer la ligne `validation.require-draft-approval : true` de la section Configuration (plus de workflow draft)
  - Mettre à jour la règle globale "Validation humaine obligatoire avant génération finale" → "L'utilisateur relit les fichiers générés et fait ses remarques"
  - Workflow étape 4 : remplacer "ressources (draft puis final)" par "ressources"
  - Structure : remplacer `output/{framework}/` par le chemin défini dans `output.path`

### Mode d'exécution

- **Tout parallèle** : les 6 tâches sont indépendantes (chacune modifie un fichier différent, sauf T3 et T6 qui n'ont pas de conflit). Lancer les 6 sous-agents en parallèle.

## Exécution

### Tâches

- [x] **T1** Mettre à jour `/discover` — workflow draft supprimé, prochaines étapes ajoutées, layouts dans roadmap
- [x] **T2** Mettre à jour `/map` — workflow draft supprimé, support layouts (description + règle)
- [x] **T3** Mettre à jour `/pom` — workflow draft supprimé, écriture directe sous output.path, détection layout → resources/layouts/
- [x] **T4** Mettre à jour `/test` — workflow draft supprimé, écriture directe sous output.path/tests/, output.path ajouté au contexte
- [x] **T5** Mettre à jour skill `robot/test.md` — arbre output/robot/tests/ → tests/ relatif à output.path
- [x] **T6** Mettre à jour `CLAUDE.md` — validation.require-draft-approval supprimé, règle + workflow + structure mis à jour

### Problèmes rencontrés

- **P1** : T6 avait mis `./output/robot/` en dur dans la structure de CLAUDE.md au lieu de `{output.path}/`. Corrigé.
- **P2** : `/map`, `/pom` et `/test` n’invitaient pas l’utilisateur à relire ou passer à l’étape suivante après génération. Corrigé — ajout d’une dernière étape dans chaque processus.

### Tests manuels à effectuer

- [x] Relire `/discover` — processus simplifié, prochaines étapes, layouts dans roadmap
- [x] Relire `/map` — support layouts, écriture directe, invitation prochaine étape
- [x] Relire `/pom` — écriture directe, détection layout, invitation prochaine étape
- [x] Relire `/test` — écriture directe, output.path dans contexte, invitation prochaine étape
- [x] Relire `robot/test.md` — arbre de fichiers corrigé
- [ ] Relire `CLAUDE.md` — config, règles, workflow, structure avec {output.path}
- [x] Vérifier : aucune mention de `drafts/` restante (grep → 0 ✅)
- [x] Vérifier : aucune mention de `output/{framework}` restante (grep → 0 ✅)

### Ecarts d’implémentation vs plan

- **T6** : le sous-agent avait mis `./output/robot/` en dur dans la structure → corrigé en `{output.path}/`
- **P2** : les invitations à relire/passer à l’étape suivante n’étaient pas dans le plan initial — ajoutées suite aux commentaires Tailk

## Bilan

### Réalisé

- **T1-T6** : Les 6 tâches du plan complétées — 5 commands + 1 skill + CLAUDE.md mis à jour
- **P1-P2** : 2 corrections post-exécution suite aux commentaires Tailk (chemin en dur dans CLAUDE.md, invitations à relire/poursuivre)
- **Tous les critères de done validés** : plus de drafts, plus de `output/{framework}`, transitions fluides entre commands

### Drift

- **Tâches ajoutées** : P2 — invitations à relire ou passer à l'étape suivante dans `/map`, `/pom`, `/test` (non prévu dans le scope initial, issu des commentaires Tailk)
- **Tâches reportées** : aucune

### Nouveaux tickets

Aucun nouveau ticket créé.

### Mises à jour effectuées

- [x] BACKLOG.md — TLK-10 retiré
- [x] ARCHIVE.md — TLK-10 archivé avec détails
- [ ] CLAUDE.md — pas de nouvelle convention (les changements font partie de T6)
- [x] Mémoire agent — préférence "pas de drafts dans le chat" sauvegardée
- [x] CHRONICLE.md — entrée ajoutée
- [ ] CHANGELOG.md — pas de changement visible utilisateur (outillage interne)
