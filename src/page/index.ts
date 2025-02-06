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

// If you want to read a real file from the filesystem:
import * as fs from 'fs';
import * as path from 'path';

export async function setupOptions(host: Tree, options: any): Promise<Tree> {
  const workspace = await getWorkspace(host);

  if (!options.project) {
    options.project = workspace.projects.keys().next().value;
  }

  const project = workspace.projects.get(options.project);
  if (!project) {
    throw new SchematicsException(`Invalid project name: ${options.project}`);
  }

  // options.path = options.path;
  options.selector = 'page-' + dasherize(options.name);

  return host;
}

export function page(_options: any): Rule {
  return async (tree: Tree, _context: SchematicContext) => {


    await setupOptions(tree, _options);

    const stringUtils = { classify, dasherize, capitalize, camelize, underscore };

    // We'll store the parsed fields array here
    let fields: any[] = [];

    // If the user passed --entityMetadata (either a file path or a JSON string)
    console.log("options:", _options)

    if (_options.entitymetadata) {
      console.log(process.cwd())
      // Attempt to interpret it as a file path on disk
      // e.g. `schematics/metadata/campaign.fields.json`
      const potentialPath = path.join(process.cwd(), _options.entitymetadata);

      if (fs.existsSync(potentialPath)) {
        // It's a file, read from disk
        const fileContent = fs.readFileSync(potentialPath, 'utf8');
        try {
          const metadata = JSON.parse(fileContent);
          fields = metadata.fields || [];
          console.log("11111111111111111")
        } catch (err) {
          throw new SchematicsException(`Error parsing JSON file: ${_options.entitymetadata}\n${err}`);
        }
      } else {
        // Not a file, so try to parse as raw JSON
        try {
          const metadata = JSON.parse(_options.entitymetadata);
          fields = metadata.fields || [];
          console.log("22222222222222222")
        } catch (err) {
          throw new SchematicsException(`entitymetadata is neither a valid file path nor valid JSON.\n${err}`);
        }
      }
    }

    // Now pass 'fields' into the template context
    const templateSource = apply(url('./files'), [
      template({
        ...stringUtils,
        ..._options,
        fields // <--- Make sure we include our parsed fields
      }),
    ]);

    console.log('fields:', fields);

    return chain([
      mergeWith(templateSource, MergeStrategy.Overwrite)
    ]);
  };
}
