# MeetingAgenda

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.0.3.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

## TAIGAUI installation

========================

You can easily install Taiga UI using Angular CLI by running the following command:
ng add taiga-ui

Use this guide to install Taiga UI manually:

1. Install packages of Taiga UI
   Main Taiga UI packages

npm i @taiga-ui/cdk,
npm i @taiga-ui/core,
npm i @taiga-ui/kit,
npm i @taiga-ui/icons

npm i @taiga-ui/addon-mobile // Components and tools specific to mobile version of the app
npm i @taiga-ui/addon-table // Interactive table component and related utilities

2. Add theme and Taiga UI global styles to your angular.json :

angular.json

{
"projects": {
"your-app": {
"architect": {
"build": {
"options": {
"styles": [
"node_modules/@taiga-ui/core/styles/taiga-ui-global.less",
"node_modules/@taiga-ui/core/styles/taiga-ui-theme.less"
"src/styles.css",
]
}
}
}
}
}
}

my.component.less / my.component.scss

@import '~@taiga-ui/core/styles/taiga-ui-local';

3. Many of our components need your app to be wrapped into tui-root . Import TuiRootModule in your main module (app.module.ts).

4. Icons are not included in the bundle. They go into your app's assets.

angular.json

"assets": [
{
"glob": "**/*",
"input": "node_modules/@taiga-ui/icons/src",
"output": "assets/taiga-ui/icons"
}
],

## PDFMAKE installation

=======================

You can install pdfmake in your application using this command.
npm i pdfmake

In your component import this packages

import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';

## ESLint installation

======================

Install ESLint by using the following command in your project.

npm i -D eslint

Initialize the ESLint by using the command

npx eslint --init

it will install the required dependencies and update the package.json. Also, it will create.eslintrc.json file.

Add the following scripts to run the lint in package.json file

"lint": "eslint ."
"lint:fix": "npm run lint --fix"
