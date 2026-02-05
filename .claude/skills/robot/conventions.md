# Conventions de nommage - Robot Framework

## Variables (éléments)

Format : `${SCREEN_PREFIX_NAME}` en SCREAMING_SNAKE_CASE

### Préfixes par type d'élément

| Type | Préfixe |
|------|---------|
| button | BTN |
| input | INP |
| link | LNK |
| text | TXT |
| list | LST |
| item | ITM |
| image | IMG |
| checkbox | CHK |
| radio | RDO |
| select | SEL |
| textarea | TXA |
| container | CTN |
| card | CRD |

### Exemples

```robot
${LOGIN_INP_EMAIL}       # input email sur écran login
${LOGIN_BTN_SUBMIT}      # bouton submit sur écran login
${DASHBOARD_TXT_TITLE}   # texte titre sur écran dashboard
${NAVBAR_LNK_HOME}       # lien home dans layout navbar
```

## Fichiers

| Type | Pattern | Exemple |
|------|---------|---------|
| Page resource | `{screen}.resource` | `login.resource` |
| Layout resource | `{layout}.resource` | `navbar.resource` |
| Test suite | `{feature}.robot` | `authentication.robot` |

## Keywords

Style : **Title Case**

```robot
Login As User
Submit Registration Form
Select Item By Title
Dashboard Should Be Visible
```

## Mapping rapport → variable

Le rapport d'écran utilise des noms descriptifs. Voici comment les convertir :

| Rapport (type + nom) | Variable Robot |
|---------------------|----------------|
| `input:email` sur `login` | `${LOGIN_INP_EMAIL}` |
| `button:submit` sur `login` | `${LOGIN_BTN_SUBMIT}` |
| `link:forgot_password` sur `login` | `${LOGIN_LNK_FORGOT_PASSWORD}` |
