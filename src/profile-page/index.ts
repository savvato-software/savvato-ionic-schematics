

import {
  apply,
  chain,
  MergeStrategy,
  mergeWith,
  Rule,
  SchematicContext,
  SchematicsException,
  template,
  Tree,
  url
} from '@angular-devkit/schematics';
import { classify, dasherize, camelize, capitalize, underscore } from '@angular-devkit/core/src/utils/strings';
import { getWorkspace } from '@schematics/angular/utility/workspace';

export async function setupOptions(host: Tree, options: any): Promise<Tree> {
  const workspace = await getWorkspace(host);
  if (!options.project) {
    options.project = workspace.projects.keys().next().value;
  }
  const project = workspace.projects.get(options.project);
  if (!project) {
    throw new SchematicsException(`Invalid project name: ${options.project}`);
  }

    options.path = "src/" + options.path;

    options.selector = "profile-page-selector";

  return host;
}

export function profilePage(_options: any): Rule {
  return async (tree: Tree, _context: SchematicContext) => {
    await setupOptions(tree, _options);

    const stringUtils = {classify, dasherize, capitalize, camelize, underscore };

    const templateSource = apply(url('./files'), [
      template({...stringUtils, ..._options}),
    ]);

    return chain([mergeWith(templateSource, MergeStrategy.Overwrite)]);
  };
}

