//import { DOMWindow, JSDOM } from 'jsdom';
import { Window as HappyDomWindow } from 'happy-dom';

export interface IGlobal extends Window {
  MutationObserver: typeof MutationObserver;
  Element: typeof Element;
  NodeList: typeof NodeList;
  //jsdom: typeof JSDOM;
  happyDom:HappyDomWindow;
  SVGElement: typeof SVGElement;
  XMLHttpRequest: typeof XMLHttpRequest;
  CustomEvent: typeof CustomEvent;
}

// let s: IGlobal;
// s.happyDom.frag