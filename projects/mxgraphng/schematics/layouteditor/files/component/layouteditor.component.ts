// tslint:disable-next-line:no-reference
/// <reference path='../../../node_modules/angularmxgraph/mxtypes.d.ts'/>

import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild
} from '@angular/core';

declare var mxClient: any;

@Component({
  selector: 'app-layouteditor',
  templateUrl: './layouteditor.component.html',
  styleUrls: ['./layouteditor.component.css']
})
export class LayouteditorComponent implements OnInit, AfterViewInit {
  title = 'mxgraph-example-editor';

  createEditor(config: any): any {

    try {
      if (!mxClient.isBrowserSupported())
      {
        console.log('Browser not supported');
      } else {
        console.log('Browser is supported');
        mxObjectCodec.allowEval = true;
        const node = mxUtils.load(config).getDocumentElement();
        const editor = new mxEditor(node);
        mxObjectCodec.allowEval = false;

        // Adds active border for panning inside the container
        editor.graph.createPanningManager = function()
        {
          const pm = new mxPanningManager(this);
          pm.border = 30;

          return pm;
        };

        editor.graph.allowAutoPanning = true;
        editor.graph.timerAutoScroll = true;

        // Updates the window title after opening new files
        const title = document.title;
        const funct = (sender) =>
        {
          document.title = title + ' - ' + sender.getTitle();
        };

        editor.addListener(mxEvent.OPEN, funct);

        // Prints the current root in the window title if the
        // current root of the graph changes (drilling).
        editor.addListener(mxEvent.ROOT, funct);
        funct(editor);

        // Displays version in statusbar
        editor.setStatus('mxGraph ' + mxClient.VERSION);

      }
    } finally {
      console.log('Done initialisation!');
    }

    // return editor;
  }

  ngOnInit(): void {
    // this.createEditor(null);

  }

  ngAfterViewInit(): void {
    this.createEditor('config/layouteditor.xml');
  }
}
