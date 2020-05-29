import {
  Rule, Tree, SchematicsException,
  apply, url, move,
  chain, mergeWith
} from '@angular-devkit/schematics';

import { normalize, experimental } from '@angular-devkit/core';

import { Schema as MyServiceSchema } from './schema';

export function layoutEditor(options: MyServiceSchema): Rule {
  return (tree: Tree) => {
    const workspaceConfig = tree.read('/angular.json');
    if (!workspaceConfig) {
      throw new SchematicsException('Could not find Angular workspace configuration');
    }

    // convert workspace to string
    const workspaceContent = workspaceConfig.toString();

    // parse workspace string into JSON object
    const workspace: experimental.workspace.WorkspaceSchema = JSON.parse(workspaceContent);
    if (!options.project) {
      options.project = workspace.defaultProject;
    }

    const projectName = options.project as string;

    const project = workspace.projects[projectName];

    const projectType = project.projectType === 'application' ? 'app' : 'lib';

    (workspace.projects[projectName].architect as any).build.options.assets = [
                            'src/favicon.ico',
                            'src/assets',
                            {
                              glob: '**/*',
                              input: 'src/assets/config',
                              output: 'config/'
                            },
                            {
                              glob: '**/*',
                              input: 'src/assets/images',
                              output: 'images/'
                            },
                            {
                              glob: '**/*',
                              input: 'node_modules/mxgraph/javascript/src/css',
                              output: 'css/'
                            }
                        ];

    const workspaceString = JSON.stringify(workspace, undefined, 4);
    tree.overwrite('/angular.json', workspaceString);

    if (options.path === undefined) {
      options.path = `${project.sourceRoot}/${projectType}/layouteditor`;
    }

    const templateAssets = apply(url('./files/assets'), [
      move(normalize(`${project.sourceRoot}/assets` as string))
    ]);

    const templateSource = apply(url('./files/component'), [
      move(normalize(options.path as string))
    ]);

    return chain([
      mergeWith(templateAssets),
      mergeWith(templateSource)
    ]);

  };
}
