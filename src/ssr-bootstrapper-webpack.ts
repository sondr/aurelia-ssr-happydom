import { Aurelia } from 'aurelia-framework';
import { WebpackLoader } from 'aurelia-loader-webpack';
import { DirtyCheckProperty } from 'aurelia-binding';

// disable the dirty checker
// otherwise the setTimeout of the dirty checker
// prevents nodejs from garbage collecting the app
DirtyCheckProperty.prototype.subscribe = () => { };

// https://github.com/angular/angular-cli/issues/8412
// https://github.com/ag-grid/ag-grid-react/issues/24
(<any>global).Element = typeof Element === 'undefined' ? () => { } : Element;
(<any>global).HTMLElement = typeof HTMLElement === 'undefined' ? () => { } : HTMLElement;
(<any>global).HTMLSelectElement = typeof HTMLSelectElement === 'undefined' ? () => { } : HTMLSelectElement;

const palNodeJS = require('./pal-nodejs');
//const palNodeJS = require('aurelia-pal-nodejs');

//const pal = require('aurelia-pal');
import pal = require('aurelia-pal');

function initialize() {
    const { initialize } = palNodeJS;
    const { PLATFORM } = pal;

    initialize();

    // expose anything the ssr-engine needs
    return {
        PLATFORM,
    };
}

function start(configure: any, headers?: any) {
    const aurelia = new Aurelia(new WebpackLoader());

    aurelia.host = pal.DOM.querySelectorAll('body')[0] as HTMLBodyElement;

    const attribute = pal.DOM.createAttribute('aurelia-app');
    attribute.value = 'main';
    aurelia.host.attributes.setNamedItem(attribute);
    
    return new Promise(resolve => {
        // we need to wait for aurelia-composed as otherwise
        // the router hasn't been fully initialized and 
        // generated routes by route-href will be undefined
        ((pal.DOM as any).global as typeof globalThis).window.addEventListener('aurelia-composed', () => {
            setTimeout(() => {
                resolve({ aurelia, pal, palNodeJS, stop });
            }, 20);
        });

        return configure(aurelia, headers);
    });
}

function stop() {
    require('aurelia-pal').reset();
    require('./pal-nodejs').reset(((pal.DOM as any).global as typeof globalThis).window);
    palNodeJS.reset(((pal.DOM as any).global as typeof globalThis).window);
}

// export const bootstrapper = function (configure: any) {
//     return {
//         initialize,
//         stop,
//         start: function (headers?: any) {
//             return start(configure, headers);
//         }
//     };
// };

export function bootstrapper(configure: any) {
    return {
        initialize,
        stop,
        start: function (headers?: any) {
            return start(configure, headers);
        }
    };
};