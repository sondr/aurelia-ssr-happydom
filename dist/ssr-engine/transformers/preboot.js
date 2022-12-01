"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const preboot = __importStar(require("preboot"));
const utils_1 = require("./utils");
/**
 * Append Angular preboot to the rendered HTML
 * @see https://github.com/angular/preboot
 * @param {string} html
 * @param {TransformerContext} transformerCtx
 * @param {RenderOptions} options
 * @returns {string}
 */
function default_1(html, transformerCtx, options) {
    if (options.preboot) {
        if (options.replayDelay === undefined) {
            options.replayDelay = 10;
        }
        // preboot catches all events that happens before Aurelia gets loaded client-side
        // so that they can be replayed afterwards
        const prebootOptions = Object.assign({
            appRoot: options.appRoots || ['body'],
            eventSelectors: [
                // for recording changes in form elements
                { selector: 'input,textarea', events: ['keypress', 'keyup', 'keydown', 'input', 'change'] },
                { selector: 'select,option', events: ['change'] },
                // when user hits return button in an input box
                { selector: 'input', events: ['keyup'], preventDefault: true, keyCodes: [13], freeze: true },
                // for tracking focus (no need to replay)
                { selector: 'input,textarea', events: ['focusin', 'focusout', 'mousedown', 'mouseup'], noReplay: true },
                { selector: 'button[type="submit"]', events: ['submit'], preventDefault: false, freeze: true },
                { selector: 'form', events: ['submit'], preventDefault: true, freeze: true },
                // user clicks on a button
                { selector: 'button:not([type="submit"])', events: ['click'], preventDefault: true, freeze: true }
            ]
        }, options.prebootOptions);
        //const inlinePrebootCode = preboot.getInlineDefinition(prebootOptions); 
        const inlinePrebootCode = preboot.getInlineCode(prebootOptions); // v.4
        html = (0, utils_1.replaceString)(html, '</head>', `\r\n<script>${inlinePrebootCode}</script>\r\n</head>`);
        // preboot_browser can replay events that were stored by the preboot code
        html = (0, utils_1.replaceString)(html, '</body>', `\r\n<script src="preboot_browser.js"></script>
      <script>
      document.addEventListener('aurelia-started', function () {
        setTimeout(function () { preboot.complete(); }, ${options.replayDelay});
      });
      </script>\r\n</body>`);
    }
    return html;
}
exports.default = default_1;
;
//# sourceMappingURL=preboot.js.map