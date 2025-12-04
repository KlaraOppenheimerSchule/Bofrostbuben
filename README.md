# Development guide

## Installing and Running the Application
if this is your first time initialising, you will have to execute 'make startup-dev'
- this builds the required docker containers
- installs required npm dependencies locally
- runs all containers 

if you need to build the containers again use:
- make build-dev

to simply run or stop all containers use:
- make run-dev
- make stop-dev

to restart the containers in one command:
- make restart-dev



### Code Formating
- code formatting with prettier `npm run format`

## Testing

### Unit Tests
- to execute unit tests run: `npm run test:unit`

## Learning Snippets
- to use learning snippets you need to copy their contents and paste them into App.vue