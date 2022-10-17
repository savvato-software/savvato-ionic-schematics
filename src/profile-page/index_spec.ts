import { SchematicTestRunner, UnitTestTree } from '@angular-devkit/schematics/testing';
import * as path from 'path';

describe('page', () => {
  const schematicRunner = new SchematicTestRunner(
    'schematics',
    path.join(__dirname, './../collection.json'),
  );

  const workspaceOptions: any = { 
    name: 'workspace',
    newProjectRoot: 'projects',
    version: '0.5.0',
  };

  const appOptions: any = { 
    name: 'page'
  };

  const schemaOptions: any = { 
    name: 'foo'
  };

  let appTree: UnitTestTree;

  beforeEach(async () => { 
    appTree = await schematicRunner.runExternalSchematicAsync('@schematics/angular', 'workspace', workspaceOptions).toPromise();
    appTree = await schematicRunner.runExternalSchematicAsync('@schematics/angular', 'application', appOptions, appTree).toPromise();
  });

  it('works', (done) => {
    schematicRunner.runSchematicAsync('page', schemaOptions, appTree).toPromise().then(tree => {
      const appComponent = tree.readContent('/projects/page/src/app/app.component.ts'); 
      expect(appComponent).toContain(`name = '${schemaOptions.name}'`); 
      done();
    }, done.fail);
  });
});

