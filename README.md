# Development guide
## NPM commands
- npm run dev (start vite local server)
    * you need to be in the directory "/frontend" to run
    * if this is your first time initialising, you will have to execute "npm install" first 
- npm run format (code formatting with prettier)

## Unit testing 
- to execute unit tests run: npm run test:unit

## Learning Snippets
- to use learning snippets you need to copy their contents and paste them into App.vue

## Developing the backend
- to start devoping the backend you will have to execute the following commands:
- cd /backend 
- npm install

## Using Docker 
- to build images use: "make build-dev" 
- to run the containers use "make run-dev"
- to stop the containers use "make stop-dev"