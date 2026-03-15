# Session — Créer l'app de gestion de tâches

**Date** : 2026-03-15
**Tâche backlog** : TLK-1 `P0`

## Objectif

Créer l'application de démo du projet : un gestionnaire de tâches (todo/kanban) en HTML/CSS/JS vanilla. Cette app servira de cible pour démontrer les capacités d'automatisation de tests (pipeline manuel et exploration autonome via Playwright MCP).

L'app doit être visuellement crédible pour une démo client, fonctionnelle (CRUD réel avec localStorage), et sans aucune dépendance lourde.

## Brainstorm — Décisions prises

### Stack & contraintes

- **HTML/CSS/JS vanilla** — Pas de framework frontend
- **CSS custom simple** — Pas de Tailwind, pas de template externe. Design minimaliste et propre
- **localStorage** — Persistance des données côté client
- **Multi-pages** — Chaque écran est un fichier HTML distinct (pas de SPA)
- **Servie via** `npx http-server`

### Niveau de complexité : Réaliste légère

Formulaires avec validation, filtres sur le dashboard, transitions fluides. Crédible pour un client sans être trop lourde à construire.

### Écrans (8 pages)

#### 1. Login (`index.html`)
- Formulaire email + mot de passe avec validation (champs requis, format email)
- Auth simulée avec credentials en dur
- Checkbox "Se souvenir de moi"
- Lien "Mot de passe oublié" (non fonctionnel, présent pour la démo)
- Message d'erreur animé en cas d'échec

#### 2. Dashboard (`dashboard.html`)
- **Double vue** : toggle entre liste (tableau/cartes) et kanban (colonnes par statut)
- Filtres par statut et priorité
- Compteurs (total, par statut)
- Accès rapide à création/édition de tâche

#### 3. Création de tâche (`task-new.html`)
- Champs : titre, description (textarea), priorité (select), statut (select), date d'échéance (date picker natif), assignation (select peuplé depuis les users), tags/catégories, pièce jointe (simulée)
- Validation des champs requis

#### 4. Édition de tâche (`task-edit.html`)
- Même formulaire que la création, pré-rempli avec les données existantes
- Bouton supprimer

#### 5. Liste des utilisateurs (`users.html`)
- Tableau/liste des utilisateurs existants
- Actions : voir, éditer, supprimer
- Bouton ajouter un utilisateur

#### 6. Création d'utilisateur (`user-new.html`)
- Champs : nom, email, rôle (admin/user)
- Validation

#### 7. Édition d'utilisateur (`user-edit.html`)
- Même formulaire, pré-rempli
- Bouton supprimer

#### 8. Profil (`profile.html`)
- Infos utilisateur : nom, email, avatar (placeholder)
- Bouton éditer les informations

### Layouts partagés (fonctionnels, non responsive)

- **Navbar** : navigation principale + user dropdown (nom, avatar, lien profil, déconnexion)
- **Sidebar** : filtres par statut/priorité (visible sur dashboard et pages listes)
- **Footer** : simple, informations basiques

### Données

- **Pré-remplies** : l'app démarre avec un jeu de données de démo (5-10 tâches variées, quelques utilisateurs) injecté dans localStorage au premier chargement

### Critères de done

- [ ] Les 8 pages sont navigables et visuellement cohérentes
- [ ] CRUD tâches fonctionnel (localStorage)
- [ ] CRUD utilisateurs fonctionnel (localStorage)
- [ ] Auth simulée fonctionnelle (login/logout)
- [ ] Toggle liste/kanban opérationnel sur le dashboard
- [ ] Données de démo pré-chargées au premier lancement
- [ ] Servable via `npx http-server`
- [ ] Aucun framework ou dépendance lourde
- [ ] App visuellement crédible pour une démo client

## Scope — Plan d'implémentation

### Artefacts à créer

| Artefact | Chemin | Rôle |
|----------|--------|------|
| Structure app | `demo-app/` | Répertoire racine de l'application |
| Feuille de style | `demo-app/css/style.css` | CSS unique : variables, reset, layout grid, composants, formulaires |
| State manager | `demo-app/js/app.js` | Gestion localStorage, seed data, utilitaires partagés, injection layouts |
| Module auth | `demo-app/js/auth.js` | Auth simulée : login, logout, session, guard pages protégées |
| Module tâches | `demo-app/js/tasks.js` | CRUD tâches : create, read, update, delete dans localStorage |
| Module users | `demo-app/js/users.js` | CRUD utilisateurs : create, read, update, delete dans localStorage |
| Login | `demo-app/index.html` | Page de connexion |
| Dashboard | `demo-app/dashboard.html` | Liste + kanban, filtres, compteurs |
| Création tâche | `demo-app/task-new.html` | Formulaire création tâche |
| Édition tâche | `demo-app/task-edit.html` | Formulaire édition tâche (param `?id=`) |
| Liste users | `demo-app/users.html` | Tableau des utilisateurs |
| Création user | `demo-app/user-new.html` | Formulaire création utilisateur |
| Édition user | `demo-app/user-edit.html` | Formulaire édition utilisateur (param `?id=`) |
| Profil | `demo-app/profile.html` | Page profil utilisateur connecté |

### Architecture JS

```
app.js (chargé par toutes les pages)
├── localStorage wrapper (getItems, setItems, generateId)
├── Seed data (injecté si localStorage vide)
├── Layout injection (navbar, sidebar, footer en HTML dynamique)
├── Auth guard (redirige vers index.html si non connecté)
└── Utilitaires (formatDate, getUrlParam, showNotification)

auth.js (chargé par index.html + app.js pour logout)
├── login(email, password) → boolean
├── logout() → redirect index.html
├── getCurrentUser() → user object
└── isAuthenticated() → boolean

tasks.js (chargé par dashboard, task-new, task-edit)
├── getTasks(filters?) → array
├── getTaskById(id) → task
├── createTask(data) → task
├── updateTask(id, data) → task
├── deleteTask(id) → void
└── getTaskStats() → {total, byStatus}

users.js (chargé par users, user-new, user-edit, + task forms pour le select assignation)
├── getUsers() → array
├── getUserById(id) → user
├── createUser(data) → user
├── updateUser(id, data) → user
└── deleteUser(id) → void
```

### Design system CSS

- Variables CSS : couleurs (primaire, secondaire, succès, danger, warning), espacements, border-radius, ombres
- Layout : grille avec sidebar 250px + zone principale fluide
- Composants : boutons, inputs, selects, cards, badges (statut/priorité), tableaux, modales de confirmation
- Login : layout centré pleine page (pas de sidebar/navbar)
- Kanban : colonnes flexbox par statut (To Do, In Progress, Done)

### Seed data

Utilisateurs de démo (3-4) :
- Admin : `admin@demo.com` / `admin123` (credentials de connexion)
- Users : Marie Dupont, Jean Martin, Sophie Bernard

Tâches de démo (8-10) variées en statut, priorité, assignation et dates.

### Tâches d'implémentation

- [ ] **T1** Créer la structure du projet et le CSS foundation — Fichiers : `demo-app/`, `demo-app/css/style.css`. Complexité : moyenne
  - Créer le répertoire `demo-app/` avec `css/` et `js/`
  - Écrire `style.css` complet : variables, reset, layout grid, composants (boutons, inputs, cards, badges, tableaux), états (hover, focus, disabled, error), animations (fade-in pour messages d'erreur)

- [ ] **T2** Créer le module core `app.js` — Fichiers : `demo-app/js/app.js`. Complexité : haute
  - Dépend de : T1
  - localStorage wrapper (CRUD générique)
  - Seed data : utilisateurs + tâches de démo (injectés au premier chargement)
  - Layout injection : fonctions qui génèrent le HTML de la navbar, sidebar, footer et les insèrent dans des `<div>` placeholder
  - Auth guard : vérifier la session, rediriger si non connecté
  - Utilitaires : formatDate, getUrlParam, showNotification (toast), populateSelect

- [ ] **T3** Créer le module `auth.js` — Fichiers : `demo-app/js/auth.js`. Complexité : faible
  - Dépend de : T2
  - Credentials en dur (email/password)
  - Login : valider credentials, stocker session dans localStorage, "Se souvenir de moi" via flag
  - Logout : supprimer session, rediriger
  - getCurrentUser, isAuthenticated

- [ ] **T4** Créer le module `tasks.js` — Fichiers : `demo-app/js/tasks.js`. Complexité : faible
  - Dépend de : T2
  - CRUD : getTasks (avec filtres statut/priorité optionnels), getTaskById, createTask, updateTask, deleteTask
  - getTaskStats : compteurs par statut

- [ ] **T5** Créer le module `users.js` — Fichiers : `demo-app/js/users.js`. Complexité : faible
  - Dépend de : T2
  - CRUD : getUsers, getUserById, createUser, updateUser, deleteUser

- [ ] **T6** Page Login — Fichiers : `demo-app/index.html`. Complexité : moyenne
  - Dépend de : T1, T3
  - Layout centré (pas de navbar/sidebar)
  - Formulaire avec validation HTML5 + JS
  - Gestion erreurs avec animation
  - Checkbox "Se souvenir de moi", lien "Mot de passe oublié"
  - Redirection vers dashboard.html après login réussi

- [ ] **T7** Page Dashboard — Fichiers : `demo-app/dashboard.html`. Complexité : haute
  - Dépend de : T2, T4, T5
  - Layout avec navbar + sidebar + footer (via app.js)
  - Vue liste : tableau/cartes avec colonnes (titre, statut, priorité, assigné, date)
  - Vue kanban : colonnes par statut (To Do, In Progress, Done) avec cartes
  - Toggle liste ↔ kanban (boutons, préférence sauvée)
  - Filtres sidebar : par statut, par priorité (filtrage dynamique)
  - Compteurs en haut (total, par statut)
  - Liens vers création/édition de tâche

- [ ] **T8** Pages Création/Édition de tâche — Fichiers : `demo-app/task-new.html`, `demo-app/task-edit.html`. Complexité : moyenne
  - Dépend de : T2, T4, T5
  - Formulaire partagé : titre, description, priorité, statut, date échéance, assignation (select users), tags, pièce jointe (input file simulé)
  - task-new : formulaire vide, soumission → createTask → redirect dashboard
  - task-edit : lire `?id=` param, pré-remplir, soumission → updateTask, bouton supprimer → deleteTask avec confirmation

- [ ] **T9** Pages Liste/Création/Édition utilisateurs — Fichiers : `demo-app/users.html`, `demo-app/user-new.html`, `demo-app/user-edit.html`. Complexité : moyenne
  - Dépend de : T2, T5
  - users.html : tableau avec colonnes (nom, email, rôle, actions), bouton "Ajouter"
  - user-new.html : formulaire (nom, email, rôle select), validation, redirect users
  - user-edit.html : lire `?id=`, pré-remplir, bouton supprimer avec confirmation

- [ ] **T10** Page Profil — Fichiers : `demo-app/profile.html`. Complexité : faible
  - Dépend de : T2, T3
  - Afficher infos du user connecté (nom, email, rôle, avatar placeholder)
  - Bouton "Éditer" → formulaire inline ou section éditable
  - Sauvegarde dans localStorage

- [ ] **T11** Intégration et polish — Fichiers : tous. Complexité : moyenne
  - Dépend de : T6, T7, T8, T9, T10
  - Vérifier la navigation cross-pages (tous les liens fonctionnent)
  - Vérifier la cohérence visuelle (même style sur toutes les pages)
  - Tester le CRUD complet (créer, lire, modifier, supprimer)
  - Vérifier le seed data au premier lancement
  - Tester login/logout flow
  - Ajuster les animations et transitions
  - Vérifier que `npx http-server demo-app` fonctionne correctement

### Mode d'exécution

- **Phase 1 — Fondations** (séquentiel) : T1 → T2
- **Phase 2 — Modules JS** (parallèle via Agent Team) : T3 + T4 + T5
- **Phase 3 — Pages** (parallèle via Agent Team) : T6 + T7 + T8 + T9 + T10
- **Phase 4 — Intégration** (séquentiel) : T11

Justification du parallélisme :
- T3/T4/T5 sont indépendants : chacun est un module JS avec son propre scope, tous dépendent uniquement de T2
- T6→T10 sont des pages HTML indépendantes : chacune a sa propre logique d'affichage, elles partagent les modules JS mais ne se modifient pas mutuellement
- T11 nécessite que tout soit en place pour valider l'intégration

## Exécution

### Tâches

- [x] **T1** Structure projet + CSS foundation
- [x] **T2** Module core app.js
- [x] **T3** Module auth.js
- [x] **T4** Module tasks.js
- [x] **T5** Module users.js
- [x] **T6** Page Login
- [x] **T7** Page Dashboard
- [x] **T8** Pages Création/Édition tâche
- [x] **T9** Pages Liste/Création/Édition utilisateurs
- [x] **T10** Page Profil
- [x] **T11** Intégration et polish

### Problèmes rencontrés

- **P1** : Lien "Tâches" dans la navbar pointait vers `task-new.html` au lieu de `dashboard.html` — corrigé en T11
- **P2** : Page `users.html` avait une sidebar avec filtres statut/priorité (destinés aux tâches) — supprimée en T11, layout changé en `app-layout--no-sidebar`
- **P3** : Les divs containers (`#navbar-container`, `#sidebar-container`, `#footer-container`) n'avaient pas de `grid-area` CSS — seules les classes internes (`.navbar`, `.sidebar`, `.footer`) l'avaient, mais le grid ne voit que les enfants directs. Corrigé en ajoutant `grid-area` aux containers dans style.css
- **P4** : Sidebar ne descendait pas sur toute la hauteur — `.sidebar` manquait de `height: 100%`. Corrigé.
- **P5** : Formulaires trop larges, prenaient toute la page — ajout d'une classe `.form-container` (max-width 640px, centrée) sur les 4 pages de formulaires
- **P6** : Lien "Tâches" redondant dans la navbar — supprimé + surlignage "Dashboard" actif sur pages task-*
- **P7** : Lien "Dashboard" restait actif sur task-new/task-edit — condition retirée, aucun lien actif sur ces pages

### Tests manuels à effectuer
<!-- tailk-comment: {"id":"mmrubyd2yqmo5w","text":"le lien dashboard dans la navbar reste selectionné lorsqu’on edit ou crée une tâche.","author":"","date":"2026-03-15T14:19:14.486Z","type":"bug"} -->

- [x] Lancer `npx http-server demo-app` et ouvrir dans le navigateur
- [x] **Login** : Se connecter avec `admin@demo.com` / `admin123` → doit rediriger vers le dashboard
- [x] **Login erreur** : Tester un mauvais mot de passe → message d'erreur animé
- [x] **Dashboard liste** : Vérifier les compteurs, le tableau avec badges statut/priorité
- [x] **Dashboard kanban** : Basculer en vue kanban, vérifier les 3 colonnes et les cartes
- [x] **Filtres** : Cocher/décocher les filtres sidebar → les tâches affichées se mettent à jour
- [x] **Créer une tâche** : Dashboard → "Nouvelle tâche" → remplir → sauvegarder → retour dashboard avec la nouvelle tâche
- [x] **Éditer une tâche** : Cliquer "Éditer" sur une tâche → modifier → sauvegarder
- [x] **Supprimer une tâche** : En édition → "Supprimer" → confirmer → tâche disparaît
- [x] **Liste utilisateurs** : Navbar → "Utilisateurs" → tableau visible
- [x] **CRUD utilisateurs** : Créer, éditer, supprimer un utilisateur
- [x] **Profil** : Aller sur le profil → vérifier infos → éditer nom/email → sauvegarder
- [x] **Déconnexion** : Dropdown user → "Déconnexion" → retour login
- [ ] **Seed data** : Vider localStorage (DevTools) → recharger → les données de démo réapparaissent

### Ecarts d'implémentation vs plan

- Aucun écart majeur sur T1-T11. 7 corrections post-intégration (P1-P7) : layout grid, sidebar, formulaires, navbar.

## Bilan

### Réalisé

- **T1-T11** : Les 11 tâches du plan complétées — structure, CSS, 4 modules JS, 8 pages HTML, intégration
- **P1-P7** : 7 corrections post-intégration suite aux tests manuels (layout grid, sidebar, formulaires, navbar)
- **Tous les critères de done validés** sauf seed data (non testé explicitement par l'utilisateur)

### Drift

- **Tâches ajoutées** : P3 (grid-area containers), P4 (sidebar height), P5 (form-container), P6 (suppression lien Tâches), P7 (nav active state) — corrections non prévues au scope, découvertes lors des tests manuels
- **Tâches reportées** : aucune
- **Écran supplémentaire** : le CRUD utilisateurs (3 pages) a été ajouté lors du brainstorm, intégré dans le scope. PROJECT.md mentionne encore 5 écrans au lieu de 8.

### Nouveaux tickets

Aucun nouveau ticket créé. Note : PROJECT.md est désormais obsolète sur le nombre d'écrans (5 → 8) et le nom de l'app (TaskFlow).

### Mises à jour effectuées

- [x] BACKLOG.md — TLK-1 retiré
- [x] ARCHIVE.md — TLK-1 archivé avec détails
- [ ] CLAUDE.md — pas de nouvelle convention à ajouter
- [ ] Mémoire agent — pas de nouveau pattern à retenir
- [x] CHRONICLE.md — entrée ajoutée
- [x] CHANGELOG.md — version 0.1.0 ajoutée
