import { IDom } from '../pal-nodejs/dom';
import { Aurelia } from 'aurelia-framework';
import { PrebootOptions } from 'preboot';
import { IGlobal } from '../pal-nodejs/global';

export interface RenderOptions {
    /**
     * The path to the bundle
     */
    bundlePath: string;

    /**
     * The requested url
     */
    url?: URL;

    /**
     * The template where server side rendered html will be inserted
     */
    template: string;

    /**
     * Whether or not to use preboot. Preboot allows you to record (and playback) events
     * that occur before the client-app is loaded (defaults to false)
     */
    preboot: boolean;

    /**
     * When using preboot, how long is the delay between Aurelia start and before the view has loaded
     */
    replayDelay?: number;

    /**
     * Options that are passed to preboot
     */
    prebootOptions?: PrebootOptions;

    /**
     * The queryselector(s) of the approot(s). Used by preboot
     * e.g. ['body']
     */
    appRoots?: string[];

    /**
     * Client request headers.
     */
    headers?: any;
}

export interface AppInitializationOptions {
    /**
     * an initialize, start and stop function for the engine to call
     * to start and stop the aurelia app
     */
    main: () => {
        initialize: () => { PLATFORM: IGlobal },
        start: (headers?: any) => Promise<{
            aurelia: Aurelia,
            pal: AureliaPal,
            palNodeJS: AureliaPalNodeJS,
            stop: () => void
        }>,
        stop: () => Promise<void>
    };

    /**
     * The module id of the server main file (e.g. 'main')
     */
    serverMainId?: string;
}

export interface TransformerContext {
    /**
     * The aurelia instance
     */
    aurelia: any;

    /**
     * The JSDOM document
     */
    document: any;
}

export interface Dom extends IDom {
    global: Window;
}

export interface AureliaPal {
    DOM: Dom;

    global: Window;

    reset(): void;
}

export interface AureliaPalNodeJS {
    configure(): void;

    initialize(): void;

    reset(): void;
}