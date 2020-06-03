import {
  Rule, Tree, SchematicsException,
  apply, url, move,
  chain, mergeWith, applyTemplates
} from '@angular-devkit/schematics';

import { strings, normalize, experimental } from '@angular-devkit/core';

import { Schema as BasicEditorSchema } from './schema';

export function basicEditor(options: BasicEditorSchema): Rule {
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
        input: 'src/assets/mxgraph',
        output: 'mxgraph/'
      }];

    const workspaceString = JSON.stringify(workspace, undefined, 4);
    tree.overwrite('/angular.json', workspaceString);

    if (options.path === undefined) {
      options.path = `${project.sourceRoot}/${projectType}/${options.name}`;
    }

    const templateAssets = apply(url('./files/assets'), [
      move(normalize(`${project.sourceRoot}/assets/mxgraph` as string))
    ]);

    const templateSource = apply(url('./files/component'), [
      applyTemplates({
        classify: strings.classify,
        dasherize: strings.dasherize,
        name: options.name
      }),
      move(normalize(options.path as string))
    ]);

    return chain([
      mergeWith(templateAssets),
      mergeWith(templateSource)
    ]);

  };
}
