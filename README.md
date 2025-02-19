# Survicate Web Package

This package enables you to seamlessly integrate Survicate surveys into your web application. Built with [Preact](https://github.com/preactjs/preact), [TypeScript](https://github.com/Microsoft/TypeScript), and [CSS Modules](https://github.com/css-modules/css-modules).

## Installation

Install the package using npm:

```bash
npm install @survicate/survicate-web-package --save
```

## Initialization

To initialize Survicate, you'll need your workspace key, which can be found in the [Survicate Panel](https://panel.survicate.com/o/0/w/0/settings/access-keys).

```javascript
import Survicate from '@survicate/survicate-web-package/survicate_widget';

// Replace with your actual workspace key
const workspaceKey = 'Your workspace key';

Survicate.init({ workspaceKey });
```

## Usage Examples

Here are some common methods you can utilize:

```javascript
import Survicate from '@survicate/survicate-web-package/survicate_widget';

// Initialize Survicate and provide user attributes
const config = {
  workspaceKey: 'Your workspace key',
  traits: {
    'user_id': 'Your user ID here',
    'company_name': 'Value here',
    'subscription_status': 'Value here',
    'signed_up': 'Value here'
  }
};

Survicate.init(config);

// Force display a specific survey
Survicate.showSurvey('survey id', { forceDisplay: true });

// Set visitor attributes and retarget afterwards
Survicate.setVisitorTraits({
  email: 'john_doe@example.com',
  first_name: 'John',
  last_name: 'Doe',
});

Survicate.retarget();

// Add an event listener for when a question is answered
Survicate.addEventListener(Survicate.ApiEvent.questionAnswered, (surveyId, surveyName) => {
  console.log(`A question was answered - survey: ${surveyName} ${surveyId}`);
});

// Remove the event listener
Survicate.removeEventListener(Survicate.ApiEvent.questionAnswered);
```

For a comprehensive list of available methods and their detailed usage, please refer to the [Survicate JavaScript API Documentation](https://developers.survicate.com/javascript/methods/).

## Changelog

Stay updated with the latest changes and improvements by reviewing the [Survicate JavaScript SDK Changelog](https://developers.survicate.com/javascript/js-sdk-changelog/).
