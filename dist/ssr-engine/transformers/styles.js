"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("./utils");
/**
 * Copy style tags created by the aurelia instance from the DOM to the rendered HTML
 * @param {string} html
 * @param {TransformerContext} transformerCtx
 * @param {RenderOptions} options
 * @returns {string}
 */
function default_1(html, transformerCtx, options) {
    const headStyleTags = Array.prototype.slice.call(transformerCtx.document.head.querySelectorAll('style'));
    for (let i = 0; i < headStyleTags.length; i++) {
        html = (0, utils_1.replaceString)(html, '</head>', headStyleTags[i].outerHTML + '</head>');
    }
    return html;
}
exports.default = default_1;
;
//# sourceMappingURL=styles.js.map