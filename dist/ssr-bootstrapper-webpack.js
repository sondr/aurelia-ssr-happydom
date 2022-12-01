"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bootstrapper = void 0;
const aurelia_framework_1 = require("aurelia-framework");
const aurelia_loader_webpack_1 = require("aurelia-loader-webpack");
const aurelia_binding_1 = require("aurelia-binding");
// disable the dirty checker
// otherwise the setTimeout of the dirty checker
// prevents nodejs from garbage collecting the app
aurelia_binding_1.DirtyCheckProperty.prototype.subscribe = () => { };
// https://github.com/angular/angular-cli/issues/8412
// https://github.com/ag-grid/ag-grid-react/issues/24
global.Element = typeof Element === 'undefined' ? () => { } : Element;
global.HTMLElement = typeof HTMLElement === 'undefined' ? () => { } : HTMLElement;
global.HTMLSelectElement = typeof HTMLSelectElement === 'undefined' ? () => { } : HTMLSelectElement;
const palNodeJS = require('./pal-nodejs');
//const palNodeJS = require('aurelia-pal-nodejs');
//const pal = require('aurelia-pal');
const pal = require("aurelia-pal");
function initialize() {
    const { initialize } = palNodeJS;
    const { PLATFORM } = pal;
    initialize();
    // expose anything the ssr-engine needs
    return {
        PLATFORM,
    };
}
function start(configure, headers) {
    const aurelia = new aurelia_framework_1.Aurelia(new aurelia_loader_webpack_1.WebpackLoader());
    aurelia.host = pal.DOM.querySelectorAll('body')[0];
    const attribute = pal.DOM.createAttribute('aurelia-app');
    attribute.value = 'main';
    aurelia.host.attributes.setNamedItem(attribute);
    return new Promise(resolve => {
        // we need to wait for aurelia-composed as otherwise
        // the router hasn't been fully initialized and 
        // generated routes by route-href will be undefined
        pal.DOM.global.window.addEventListener('aurelia-composed', () => {
            setTimeout(() => {
                resolve({ aurelia, pal, palNodeJS, stop });
            }, 20);
        });
        return configure(aurelia, headers);
    });
}
function stop() {
    require('aurelia-pal').reset();
    require('./pal-nodejs').reset(pal.DOM.global.window);
    palNodeJS.reset(pal.DOM.global.window);
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
function bootstrapper(configure) {
    return {
        initialize,
        stop,
        start: function (headers) {
            return start(configure, headers);
        }
    };
}
exports.bootstrapper = bootstrapper;
;
//# sourceMappingURL=ssr-bootstrapper-webpack.js.map