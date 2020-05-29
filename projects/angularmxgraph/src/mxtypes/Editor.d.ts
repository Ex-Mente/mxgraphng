declare class mxObjectCodec {
  static allowEval: boolean;
}

declare class mxUtils {
  static load(config: any): any;
}

declare class mxEditor {
  constructor(node: any);
  graph;
  addListener(name, funct);
  setStatus(status);
}

declare class mxPanningManager {
  constructor(node: any);

  border;
}
