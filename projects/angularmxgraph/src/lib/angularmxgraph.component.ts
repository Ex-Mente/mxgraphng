/// <reference path='../mxtypes.d.ts'/>

import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild
} from '@angular/core';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'angularmxgraph',
  template: `
    <div #graphContainer id="graphContainer"></div>
  `,
  styles: [
  ]
})
export class AngularmxgraphComponent implements OnInit, AfterViewInit {

  constructor() { }

  @ViewChild('graphContainer') graphContainer: ElementRef;

  // xml input

  ngAfterViewInit(): void {
    const graph = new mxGraph(this.graphContainer.nativeElement);

    try {
      const parent = graph.getDefaultParent();
      graph.getModel().beginUpdate();

      const vertex1 = graph.insertVertex(parent, '1', 'Vertex 1', 0, 0, 200, 80);
      const vertex2 = graph.insertVertex(parent, '2', 'Vertex 2', 0, 0, 200, 80);

      graph.insertEdge(parent, '', '', vertex1, vertex2);
    } finally {
      graph.getModel().endUpdate();
      new mxHierarchicalLayout(graph).execute(graph.getDefaultParent());
    }
  }

  ngOnInit(): void {
  }

}
