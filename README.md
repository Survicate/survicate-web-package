# Survicate Web Package
This package allows you to run a web survey directly in your code. 
It's built on top of [Preact](https://github.com/preactjs/preact) using [Typescript](https://github.com/Microsoft/TypeScript) and [CSS Modules](https://github.com/css-modules/css-modules).

# Installation
`npm install @survicate/survicate-web-package --save` 


# Initialization 
Find your workspace key in the [Survicate Panel](https://panel.survicate.com/o/0/w/0/settings/access-keys). 

```javascript
import Survicate from '@survicate/survicate-web-package/survicate_widget'

const key = "..." // Your key from the panel
Survicate.init({workspaceKey: key});
```

## Examples:

To call available methods:

```javascript
import Survicate from '@survicate/survicate-web-package/survicate_widget'

// Initialize survicate:
const key = "..." // Your key from the panel
Survicate.init({workspaceKey: key});

// Show survey with force option
Survicate.showSurvey('surveyId', { forceDisplay: true });

// Set user attributes
Survicate.setVisitorTraits({name: 'userName', lastName: 'userLastName'});

// Add event listener
Survicate.addEventListener(ApiEvent.questionAnswered , () => console.log('question answered'));

// Remove eventListener
Survicate.removeEventListener(ApiEvent.questionAnswered);

```
*Please refer to the [documentation](https://developers.survicate.com/javascript/methods/) for the rest of the methods.*