# Survicate Web Package
This package allows you to run a web survey directly in your code. 
It's built on top of [Preact](https://github.com/preactjs/preact) using [Typescript](https://github.com/Microsoft/TypeScript) and [CSS Modules](https://github.com/css-modules/css-modules).

# Installation
`npm install @survicate/survicate-web-package --save` 


# Initialization 
Find your workspace key in the [Survicate Panel](https://panel.survicate.com/o/0/w/0/settings/access-keys). 

```
import Survicate from '@survicate/survicate-web-package/survicate_widget'

const key = "..." // Your key from the panel
Survicate.init({workspaceKey: key});
```

# Available methods
All available methods can be found in our [documentation](https://developers.survicate.com/javascript/methods/).


## Examples:

Based on the respondent's interaction with our surveys you can trigger actions in your app or website:

```
Survicate.addEventListener(Survicate.ApiEvent.questionAnswered, () => console.log("question answered"));

```