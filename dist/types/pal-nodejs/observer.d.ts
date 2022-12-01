export interface IObserver {
    target: Node;
    options?: MutationObserverInit;
    callback: (mutations: MutationRecord[]) => void;
}
//# sourceMappingURL=observer.d.ts.map