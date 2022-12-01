import { Window as HappyDomWindow } from 'happy-dom';
export interface IGlobal extends Window {
    MutationObserver: typeof MutationObserver;
    Element: typeof Element;
    NodeList: typeof NodeList;
    happyDom: HappyDomWindow;
    SVGElement: typeof SVGElement;
    XMLHttpRequest: typeof XMLHttpRequest;
    CustomEvent: typeof CustomEvent;
}
//# sourceMappingURL=global.d.ts.map