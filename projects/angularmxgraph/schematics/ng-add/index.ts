import {apply, chain, mergeWith, move, Rule, SchematicContext, Tree, url} from '@angular-devkit/schematics';
import { NodePackageInstallTask } from '@angular-devkit/schematics/tasks';
import {normalize} from "@angular-devkit/core";

// Just return the tree
export function ngAdd(_options: any): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    _context.addTask(new NodePackageInstallTask());

    const workspaceConfig = tree.read('/angular.json') as any;

    // convert workspace to string
    const workspaceContent = workspaceConfig.toString();

    // parse workspace string into JSON object
    const workspace = JSON.parse(workspaceContent);

    const projectName = workspace.defaultProject;

    workspace.projects[projectName].architect.build.options.scripts = [
      'mxgraph.conf.js',
      'node_modules/mxgraph/javascript/mxClient.js'
    ];
    const workspaceString = JSON.stringify(workspace, undefined, 4);
    tree.overwrite('/angular.json', workspaceString);

    const templateAssets = apply(url('./files'), [
      move(normalize(`/` as string))
    ]);

    return chain([
      mergeWith(templateAssets)
    ]);
  };
}
