# Getting Started 

This repository is an Ionic Angular implementation that creates Domain Pages, and Profile Pages. All that you need on the front end to have one up and running. Ideally. 

  

$>   schematics ../../savvato-schematics/ionic/savvato-ionic-schematics:page --name=domain-object-name



### Testing

To test locally, install `@angular-devkit/schematics-cli` globally and use the `schematics` command line tool. That tool acts the same as the `generate` command of the Angular CLI, but also has a debug mode.

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
