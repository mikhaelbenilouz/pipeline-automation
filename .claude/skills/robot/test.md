# Skill Test - Robot Framework

Instructions spécifiques pour générer des suites de tests Robot Framework en style Gherkin.

## Structure fichier .robot

```robot
*** Settings ***
Library     SeleniumLibrary
Resource    ../resources/pages/{screen}.resource
Resource    ../resources/layouts/navbar.resource

*** Variables ***
${URL}        ${EMPTY}
${BROWSER}    firefox

*** Test Cases ***
Test Case Name
    Given I Am On {Screen} Page
    When I {Action}
    And I {Another Action}
    Then {Expected Result}

*** Keywords ***
I Am On {Screen} Page
    ...

I {Action}
    ...
```

## Format Gherkin

Les test cases utilisent Given/When/Then/And/But sur des lignes séparées :

```robot
*** Test Cases ***
User Can Login With Valid Credentials
    Given I Am On Login Page
    When I Enter Valid Credentials
    And I Submit Login Form
    Then I Should See Dashboard

User Cannot Login With Invalid Password
    Given I Am On Login Page
    When I Enter Invalid Password
    And I Submit Login Form
    Then I Should See Login Error

User Can Reset Password
    Given I Am On Login Page
    When I Click Forgot Password Link
    Then I Should See Password Recovery Form
```

## Keywords correspondants

Chaque step Gherkin a son keyword dans la section `*** Keywords ***` :

```robot
*** Keywords ***
I Am On Login Page
    Open Browser    ${URL}/login    ${BROWSER}
    Wait Until Element Is Visible    ${LOGIN_INP_EMAIL}

I Enter Valid Credentials
    Login As User    valid@example.com    validpassword

I Enter Invalid Password
    Login As User    valid@example.com    wrongpassword

I Submit Login Form
    Click Element    ${LOGIN_BTN_SUBMIT}

I Click Forgot Password Link
    Click Element    ${LOGIN_LNK_FORGOT}

I Should See Dashboard
    Wait Until Element Is Visible    ${DASHBOARD_CTN_MAIN}

I Should See Login Error
    Login Should Have Failed

I Should See Password Recovery Form
    Wait Until Element Is Visible    ${RECOVERY_INP_EMAIL}
```

## Organisation des fichiers

```
output/robot/tests/
├── authentication/
│   ├── login.robot
│   └── logout.robot
├── navigation/
│   └── dashboard.robot
└── features/
    └── user_management.robot
```

## Règles

- Un test case = un scénario métier clair
- Les keywords de test appellent les keywords métier des ressources
- Synchronisation sur éléments, jamais de `Sleep`
- Setup/Teardown pour la gestion du navigateur si nécessaire :

```robot
*** Settings ***
Test Setup       Open Browser    ${URL}    ${BROWSER}
Test Teardown    Close Browser
```

## Ce qu'il ne faut PAS faire

```robot
# MAUVAIS - Given/When/Then sur une seule ligne
User Can Login
    Given I Am On Login Page When I Login Then I See Dashboard

# MAUVAIS - Steps trop détaillés (atomiques)
User Can Login
    Given I Open Browser
    And I Navigate To Login Page
    When I Enter Email
    And I Enter Password
    And I Click Submit Button
    Then I See Dashboard
```
