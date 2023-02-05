# Getting Started 

This repository is an Ionic Angular implementation that creates Domain Pages, and Profile Pages. All that you need on the front end to have one up and running. Ideally. 

Be sure you've run:

$> npm i -g @angular-devkit/schematics-cli

Then..

$>   cd your-savvato-ionic-application-directory/
$>   schematics ../savvato-ionic-schematics/schematics/:page --styleext=scss --name=domainObjectName


NOTE: we should be able to use 'ng generate' to call our schematic, but at present that is not working. We still have the functionality, but somebody may want to figure out why one day.


### How I see schematics working

Imagine you're adding a new Page. This library contains the directory structure for the files necessary to support a new Page. The index.ts file in the ./Page directory contains a function which says "Put these files in to place". It also references the variables that are passed in when the schematics process runs. So, the process is the executable, and it looks for this function (thats the ../savvato-ionic-schematics/schematics part), find the function, and passes into the function, the variables like Name and CSS Style Extension. The schematics executable replaces placeholders for those variables with the value passed in. It can also run functions like capitalize() or dasherize() to format the values passed in. This is all then written out according to the directory structure into the frontend project. 

### Testing

To test locally, use the `schematics` command line tool. That tool acts the same as the `generate` command of the Angular CLI, but also has a debug mode.

Check the documentation with

```bash
schematics --help
```

### Unit Testing

`npm run test` will run the unit tests, using Jasmine as a runner and test framework.

### Publishing

To publish, simply do:

```bash
npm run build
npm publish
```

That's it!


