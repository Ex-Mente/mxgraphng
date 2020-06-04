mxgraphng
#########

Purpose
^^^^^^^
``mxgraph`` is an open-source client-side JavaScript diagram tool. The purpose 
of ``mxgraphng`` is to facilitate the process of importing ``mxgraph`` into an
Angular project.

How to install
^^^^^^^^^^^^^^
Navigate to the root directory of your Angular project and install it with 
Angular's ``ng add`` command. This will run the Angular ``add`` Schematic that is
shipped with this library.

.. code-block:: bash

  ng add mxgraphng

The ``add`` Schematic makes the following changes to the project:

- Install the ``mxgraph`` package in the current project.
- Create ``mxgraph.conf.js`` file in project root directory.
- Update the project's ``angular.json`` file to include the main ``mxgraph``
  JavaScript file.

Example usage
^^^^^^^^^^^^^

``mxgraphng`` contains a set of ``generate`` Schematics that create example graphing
components for your Angular project.

``basiceditor``
*************
The ``basiceditor`` ``generate`` Schematic takes 3 optional arguments:

- ``projectName`` 

  - Description: The name of the project to create the component in.
  - Default value: Default project

- ``path`` 

  - Description: Path relative to the project root to create the component in.
  - Default value: Root path of the selected project

- ``name``

  - Description: The name of the component that will be created.
  - Default value: ``basic-editor``

.. code-block:: bash

  ng generate mxgraphng:basiceditor

Development
^^^^^^^^^^^
This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 9.1.6.

Clone the source code from GitHub 

.. code-block:: bash

  git clone https://github.com/Ex-Mente/mxgraphng

This will download the Angular workspace that contains the ``mxgraphng`` library.
You can add an application to this workspace directly to create and test a diagram
component with ``mxgraphng``.
