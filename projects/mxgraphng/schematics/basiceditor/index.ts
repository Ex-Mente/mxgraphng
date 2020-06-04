/**
 * @summary:      This module defines the Angular generate schematic that will
 *                be used to generate a basic diagram editor in a project.
 *
 * @description:  This schematic executes the following tasks:
 *                - Set up the mount location for the mxgraph assets by
 *                  modifying the angular.json configuration.
 *                - Copy the mxgraph asset files into the correct location.
 *                - Copy the component files to the correct location and
 *                  run the content and path template function.
 */

import {
  Rule, Tree, SchematicsException,
  apply, url, move,
  chain, mergeWith, applyTemplates
} from '@angular-devkit/schematics';
import { strings, normalize, experimental } from '@angular-devkit/core';
import { Schema as BasicEditorSchema } from './schema';

/**
 * Main entry point of the Angular add schematic.
 *
 * @param options: Schematic options as per the ng add command line
 *                 instruction.
 * @return Modified source tree.
 */
export function basicEditor(options: BasicEditorSchema): Rule {
  return (tree: Tree) => {
    // Read and parse the angular.json configuration file.
    const workspaceConfig = tree.read('/angular.json');
    if (!workspaceConfig) {
      throw new SchematicsException('Could not find Angular workspace configuration');
    }
    const workspaceContent = workspaceConfig.toString();
    const workspace: experimental.workspace.WorkspaceSchema = JSON.parse(workspaceContent);

    // Determine that project name and type
    if (!options.project) {
      options.project = workspace.defaultProject;
    }
    const projectName = options.project as string;
    const project = workspace.projects[projectName];
    const projectType = project.projectType === 'application' ? 'app' : 'lib';

    // Update the assets build option to mount the asset files at the required
    // URL.
    (workspace.projects[projectName].architect as any).build.options.assets = [
      'src/favicon.ico',
      'src/assets',
      {
        glob: '**/*',
        input: 'src/assets/mxgraph',
        output: 'mxgraph/'
      }];
    const workspaceString = JSON.stringify(workspace, undefined, 4);
    tree.overwrite('/angular.json', workspaceString);

    // Set up the path variable for the copy task
    if (options.path === undefined) {
      options.path = `${project.sourceRoot}/${projectType}/${options.name}`;
    }

    // The the asset files
    const templateAssets = apply(url('./files/assets'), [
      move(normalize(`${project.sourceRoot}/assets/mxgraph` as string))
    ]);

    // Copy the component files and apply the template to the content and file
    // names.
    const templateSource = apply(url('./files/component'), [
      applyTemplates({
        classify: strings.classify,
        dasherize: strings.dasherize,
        name: options.name
      }),
      move(normalize(options.path as string))
    ]);

    // Chain the operations and return the source tree object.
    return chain([
      mergeWith(templateAssets),
      mergeWith(templateSource)
    ]);
  };
}
