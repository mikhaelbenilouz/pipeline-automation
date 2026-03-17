# Présentation — Demo eXalt Automation

## Intro

Comment l'IA peut automatiser la génération de tests end-to-end pour des applications web.

On part d'une application web existante et on arrive à des **tests Robot Framework fonctionnels**, générés par un agent IA (Claude Code), avec deux approches :

- **Approche manuelle assistée** : l'utilisateur capture les écrans, l'agent génère
- **Approche autonome** : l'agent explore, capture et génère sans intervention

---  

## Concepts clés

![Screenshot](assets/image1.png)   
![Screenshot](assets/image2.png)  
![Screenshot](assets/image3.png)  
![Screenshot](assets/image4.png)  

### Les skills

Les skills sont des **fichiers de connaissances spécialisées** chargés par les commandes au moment de l'exécution. Ils contiennent les conventions, patterns et règles propres à un framework ou un domaine.

Dans ce projet, les skills sont dans `.claude/skills/robot/` :

| Skill | Contenu |
|---|---|
| `conventions.md` | Nommage des variables, fichiers, keywords Robot |
| `pom.md` | Structure des fichiers `.resource`, règles de génération POM |
| `test.md` | Structure des fichiers `.robot`, style Gherkin, organisation |

**Relation commande → skill** : une commande comme `/pom` charge dynamiquement le skill `pom.md` du framework configuré. Cela rend le pipeline **agnostique du framework** — on pourrait ajouter des skills Cypress, Playwright Test, etc.

```mermaid
flowchart TB
    CMD["/pom screen"] --> LOAD["Charge le skill du framework configuré"]
    LOAD --> CONV["skills/robot/conventions.md"]
    LOAD --> POM["skills/robot/pom.md"]
    CONV --> GEN["Génération .resource"]
    POM --> GEN

    LOAD -.-> CY_POM["skills/cypress/pom.md"]
    LOAD -.-> PW_POM["skills/playwright/pom.md"]

    style CMD fill:#4f46e5,color:#fff
    style LOAD fill:#fef3c7,stroke:#d97706
    style CONV fill:#dbeafe,stroke:#2563eb
    style POM fill:#dbeafe,stroke:#2563eb
    style GEN fill:#f0fdf4,stroke:#16a34a
    style CY_POM fill:#f3f4f6,stroke:#9ca3af,stroke-dasharray: 5 5
    style PW_POM fill:#f3f4f6,stroke:#9ca3af,stroke-dasharray: 5 5
```

### MCP (Model Context Protocol)

MCP est un **protocole standard** qui permet à Claude Code de communiquer avec des outils externes. Au lieu de tout faire via le terminal, l'agent peut piloter directement des applications.

Dans ce projet, on utilise **Playwright MCP** : un serveur qui expose les capacités de Playwright (navigateur headless) à travers le protocole MCP.

Concrètement, l'agent peut :
- Ouvrir un navigateur et naviguer vers une URL
- Cliquer, remplir des formulaires, interagir avec la page
- Prendre des screenshots
- Lire le DOM et extraire des selectors
- Tout cela **sans écrire une seule ligne de code Playwright**

La configuration se fait dans `.mcp.json` :
```json
{
  "mcpServers": {
    "playwright": {
      "command": "npx",
      "args": ["@playwright/mcp@latest"]
    }
  }
}
```

```mermaid
flowchart LR
    CC["Claude Code<br/>(Agent IA)"] <-->|"Protocole MCP<br/>JSON-RPC"| SRV["Serveur<br/>Playwright MCP"]
    SRV <-->|"Pilotage"| NAV["Navigateur<br/>Chromium"]
    NAV <-->|"HTTP"| APP["Application<br/>web"]

    CC ---|"navigate, click,<br/>fill, screenshot"| SRV
    SRV ---|"DOM, captures,<br/>résultats"| CC

    style CC fill:#4f46e5,color:#fff
    style SRV fill:#fef3c7,stroke:#d97706
    style NAV fill:#dbeafe,stroke:#2563eb
    style APP fill:#f0fdf4,stroke:#16a34a
```

---

## Les deux approches en détail

### Approche manuelle assistée

L'utilisateur pilote le processus :

1. Capturer les écrans de l'application (screenshots)
2. `/discover` — L'agent pose des questions, comprend l'app, génère une roadmap
3. `/map {écran}` — L'agent analyse les screenshots, identifie les éléments et interactions
4. `/pom {écran}` — L'agent génère les Page Object Models (`.resource`)
5. L'utilisateur remplit les selectors CSS/XPath (`__SELECTOR__`)
6. `/test {écran}` — L'agent génère les suites de tests (`.robot`)

**Avantages** : contrôle total, pas besoin que l'app tourne, fonctionne avec des maquettes

**Limites** : effort de capture manuelle, selectors à remplir à la main

```mermaid
sequenceDiagram
    participant U as Utilisateur
    participant A as Agent (Claude Code)
    participant F as Fichiers générés

    U->>U: Capture screenshots
    U->>A: /discover
    A->>U: Questions sur l'app
    U->>A: Réponses
    A->>F: roadmap.md

    U->>A: /map login
    A->>F: screens/login/report.md

    U->>A: /pom login
    A->>F: login.resource (__SELECTOR__)
    U->>F: Remplit les selectors

    U->>A: /test login
    A->>F: login.robot
    U->>F: Review final
```

### Approche autonome (Playwright MCP)

L'agent pilote tout :

1. L'utilisateur lance l'app et fournit l'URL
2. `/explore` — L'agent navigue dans l'app, capture chaque écran, extrait les éléments DOM, génère les mappings, les POM et les tests en une seule passe

**Avantages** : minimal d'effort humain, selectors extraits automatiquement, couverture exhaustive

**Limites** : l'app doit tourner, exploration parfois incomplète sur les apps complexes

```mermaid
flowchart TB
    START["/explore"] --> P1["Phase 1 — Onboarding"]
    P1 -->|"URL, credentials, contexte"| P2["Phase 2 — Exploration"]

    subgraph P2SUB["Backlog d'exploration"]
        direction TB
        BL["Dépile la prochaine page"]
        BL --> PAGE

        subgraph PAGE["📸 Screenshot + 🔍 DOM"]
            direction LR
            L["Login<br/>📸 🔍 📝"] --> D["Dashboard<br/>📸 🔍 📝"]
            D --> TN["Task New<br/>📸 🔍 📝"]
            TN --> MORE["...<br/>📸 🔍 📝"]
        end

        PAGE -->|"nouveaux liens découverts"| BL
    end

    P2 --> P2SUB
    P2SUB -->|"backlog vide"| REPORT["explore-report.md"]
    REPORT --> P3["Phase 3 — Finalisation<br/>User Stories, Journeys, Plan de tests"]
    P3 -->|"Validation utilisateur"| P4["Phase 4 — Génération"]
    P4 --> RES[".resource + .robot"]

    style START fill:#4f46e5,color:#fff
    style P1 fill:#fef3c7,stroke:#d97706
    style P2 fill:#dbeafe,stroke:#2563eb
    style P2SUB fill:#e0e7ff22,stroke:#6366f1
    style BL fill:#e0e7ff,stroke:#6366f1
    style PAGE fill:#dbeafe22,stroke:#2563eb
    style L fill:#dbeafe,stroke:#2563eb
    style D fill:#dbeafe,stroke:#2563eb
    style TN fill:#dbeafe,stroke:#2563eb
    style MORE fill:#f3f4f6,stroke:#9ca3af
    style REPORT fill:#f0fdf4,stroke:#16a34a
    style P3 fill:#fef3c7,stroke:#d97706
    style P4 fill:#4f46e5,color:#fff
    style RES fill:#f0fdf4,stroke:#16a34a
```

---

## Fichiers générés

### Structure de sortie

```txt
output/robot/
├── resources/
│   ├── pages/           # Un .resource par écran
│   │   ├── login.resource
│   │   ├── dashboard.resource
│   │   └── ...
│   ├── layouts/         # Composants partagés
│   │   ├── navbar.resource
│   │   ├── sidebar.resource
│   │   └── footer.resource
│   └── common/          # Keywords transverses
└── tests/               # Suites de tests Gherkin
    ├── authentication/
    │   ├── login.robot
    │   └── logout.robot
    ├── dashboard/
    ├── tasks/
    └── users/
```

### Exemple de POM généré

```robot
*** Settings ***
Library    SeleniumLibrary

*** Variables ***
${LOGIN_INP_EMAIL}        id=email
${LOGIN_INP_PASSWORD}     id=password
${LOGIN_BTN_SUBMIT}       css=button[type="submit"]

*** Keywords ***
Fill Login Form
    [Arguments]    ${email}    ${password}
    Wait Until Element Is Visible    ${LOGIN_INP_EMAIL}
    Input Text    ${LOGIN_INP_EMAIL}    ${email}
    Input Text    ${LOGIN_INP_PASSWORD}    ${password}

Submit Login Form
    Click Button    ${LOGIN_BTN_SUBMIT}
```

### Exemple de test généré

```robot
*** Settings ***
Library     SeleniumLibrary
Resource    ../resources/pages/login.resource

*** Test Cases ***
User Can Login With Valid Credentials
    Given I Am On Login Page
    When I Fill Login Form    admin@test.com    password123
    And I Submit Login Form
    Then I Should See Dashboard
```

---

## Vue d'ensemble — Les deux approches

```mermaid
flowchart TB
    APP["Application web"]

    subgraph MANUEL["Approche manuelle assistée"]
        direction TB
        S["Screenshots"] --> DIS["/discover"]
        DIS --> MAP["/map"]
        MAP --> POM1["/pom"]
        POM1 --> SEL["Selectors manuels"]
        SEL --> TEST1["/test"]
    end

    subgraph AUTO["Approche autonome"]
        direction TB
        URL["URL + credentials"] --> EXP["/explore"]
        EXP --> NAV["Navigation Playwright"]
        NAV --> DOM["Extraction DOM"]
        DOM --> GEN["Génération auto"]
    end

    APP --> MANUEL
    APP --> AUTO

    TEST1 --> OUT["output/robot/<br/>.resource + .robot"]
    GEN --> OUT

    style APP fill:#4f46e5,color:#fff
    style MANUEL fill:#dbeafe22,stroke:#2563eb
    style AUTO fill:#fef3c722,stroke:#d97706
    style OUT fill:#f0fdf4,stroke:#16a34a
    style DIS fill:#7c3aed,color:#fff
    style MAP fill:#7c3aed,color:#fff
    style POM1 fill:#7c3aed,color:#fff
    style TEST1 fill:#7c3aed,color:#fff
    style EXP fill:#7c3aed,color:#fff
```
