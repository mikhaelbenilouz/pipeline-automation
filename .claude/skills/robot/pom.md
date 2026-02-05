# Skill POM - Robot Framework

Instructions spécifiques pour générer des ressources Robot Framework avec SeleniumLibrary.

Applique les conventions de nommage définies dans @.claude/skills/robot/conventions.md

## Structure fichier .resource

```robot
*** Settings ***
Library    SeleniumLibrary

*** Variables ***
${SCREEN_ELEMENT_NAME}    __SELECTOR__

*** Keywords ***
Keyword Name
    [Arguments]    ${arg1}    ${arg2}
    ...
```

## Conventions

### Variables (éléments)

Format : `${SCREEN_ELEMENT_NAME}` en SCREAMING_SNAKE_CASE

```robot
*** Variables ***
${LOGIN_INP_EMAIL}    __SELECTOR__
${LOGIN_INP_PASSWORD}    __SELECTOR__
${LOGIN_BTN_SUBMIT}    __SELECTOR__
${LOGIN_TXT_ERROR}    __SELECTOR__
```

### Keywords métier

Format : Title Case, verbes d'action métier

```robot
*** Keywords ***
Login As User
    [Arguments]    ${email}    ${password}
    Wait Until Element Is Visible    ${LOGIN_INP_EMAIL}
    Input Text    ${LOGIN_INP_EMAIL}    ${email}
    Input Text    ${LOGIN_INP_PASSWORD}    ${password}
    Click Element    ${LOGIN_BTN_SUBMIT}

Login Should Have Failed
    Wait Until Element Is Visible    ${LOGIN_TXT_ERROR}

Login Should Have Succeeded
    Wait Until Element Is Not Visible    ${LOGIN_INP_EMAIL}
```

### Stratégies de sélection pour items répétés

```robot
*** Keywords ***
Select Item By Title
    [Arguments]    ${title}
    ${item}=    Get WebElement    xpath=//div[contains(@class,'item')][.//span[text()='${title}']]
    Click Element    ${item}

Click Action For Item
    [Arguments]    ${item_title}    ${action}
    ${item}=    Get WebElement    xpath=//div[contains(@class,'item')][.//span[text()='${item_title}']]
    Click Element    ${item}//button[@data-action='${action}']

Get Item Count
    ${items}=    Get WebElements    xpath=//div[contains(@class,'item')]
    ${count}=    Get Length    ${items}
    RETURN    ${count}
```

## Synchronisation

Toujours utiliser des attentes explicites, jamais `Sleep` :

```robot
# BON
Wait Until Element Is Visible    ${ELEMENT}
Wait Until Element Is Enabled    ${ELEMENT}
Wait Until Page Contains Element    ${ELEMENT}

# MAUVAIS - NE PAS FAIRE
Sleep    2s
```

## Ce qu'il ne faut PAS faire

```robot
# MAUVAIS - Keywords wrapper atomiques
Click Login Button
    Click Element    ${LOGIN_BTN_SUBMIT}

Fill Email Field
    [Arguments]    ${email}
    Input Text    ${LOGIN_INP_EMAIL}    ${email}
```

Les keywords SeleniumLibrary sont suffisamment explicites. On crée des keywords métier composés, pas des wrappers.
