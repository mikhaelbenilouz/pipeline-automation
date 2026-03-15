# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/).

---

## [0.2.0] - 2026-03-15

### Added

- Command `/explore` — exploration autonome d'applications web via Playwright MCP
- Navigation breadth-first avec backlog d'exploration auto-piloté
- Rapport incrémental avec mapping écrans, selectors réels, user stories, journeys et plan de tests
- Génération POM + tests agnostique au framework (chargement dynamique des skills)
- Support de la reprise de session (backlog checklist dans le rapport)

## [0.1.0] - 2026-03-15

### Added

- Application de démo "TaskFlow" — gestionnaire de tâches HTML/CSS/JS vanilla
- Page login avec auth simulée (email/mot de passe, "Se souvenir de moi")
- Dashboard avec double vue liste/kanban, filtres par statut et priorité, compteurs
- CRUD tâches (titre, description, priorité, statut, échéance, assignation, tags, pièce jointe simulée)
- CRUD utilisateurs (nom, email, rôle admin/user)
- Page profil avec édition inline
- Layouts partagés (navbar avec user dropdown, sidebar filtres, footer)
- Données de démo pré-chargées (4 utilisateurs, 10 tâches variées)
- Design system CSS complet (variables, composants, badges, kanban, modales)

