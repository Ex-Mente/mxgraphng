/**
 * @summary:      This module defines the Angular add schematic that will be
 *                used when adding this library to a project.
 *
 * @description:  This schematic executes the following tasks:
 *                - Install the mxgraph JavaScript library which is listed as a
 *                  dependency in angular.json.
 *                - Update the 'scripts' build option in the workspace
 *                  configuration to include the mxgraph.conf.js and
 *                  mxClient.js files
 *                - Copy the mxgraph.conf.js file to the base directory of the
 *                  project.
 */

import {apply, chain, mergeWith, move, Rule, SchematicContext,
  Tree, url} from '@angular-devkit/schematics';
import { NodePackageInstallTask } from '@angular-devkit/schematics/tasks';
import {normalize} from '@angular-devkit/core';

/**
 * Main entry point of the Angular add schematic.
 *
 * @param _options: Schematic options as per the ng add command line
 *                  instruction.
 * @return Modified source tree.
 */
export function ngAdd(_options: any): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    // Install all dependencies of this library as per package.json.
    _context.addTask(new NodePackageInstallTask());

    // Read and parse the workspace configuration file.
    const workspaceConfig = tree.read('/angular.json') as any;
    const workspaceContent = workspaceConfig.toString();
    const workspace = JSON.parse(workspaceContent);

    // Update the scripts build option to include the mxgraph .js files.
    const projectName = workspace.defaultProject;
    workspace.projects[projectName].architect.build.options.scripts = [
      'mxgraph.conf.js',
      'node_modules/mxgraph/javascript/mxClient.js'
    ];
    const workspaceString = JSON.stringify(workspace, undefined, 4);
    tree.overwrite('/angular.json', workspaceString);

    // Copy the content of the ./files directory to the root source directory
    // of the project.
    const templateAssets = apply(url('./files'), [
      move(normalize(`/` as string))
    ]);

    // Apply the changes to the source tree and return it.
    return chain([
      mergeWith(templateAssets)
    ]);
  };
}
