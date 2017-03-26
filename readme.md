## Synopsis
Application in Angular 1.6 that reads Membership functions and shows them as bars - fuzzy zones are striped and core zones are fully coloured.

## Installation and start
```
npm run setup (tested on Windows10)
node httpserver.js (for local HTTP server)
```

Access in browser http://localhost:8080

## Requirements
Ruby, Ruby gem, NodeJS, JAVA SDK 1.8

## Demo
http://functions.lukaskalcok.com

## Technology
Angular.js (1.6+), GULP, CSS3, SCSS, HTML5, Karma, Jasmine, Protractor, 

## Tests

### E2E tests

Install JDK 1.8 according to OS.

Install Ruby according to OS.

In a separate consoles.

console 1: (install requirements and start server)
```
npm run setup
webdriver-manager start
```

then

console 2: (run e2e tests)
```
protractor
```

### Unit tests
```
npm run setup
npm run karma
```

## Contributors
lukaskalcok@gmail.com (Lukas Kalcok)


