"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("./utils");
/**
 * Look up au-ssr-id attributes in the rendered DOM and copy them to the HTML
 * @param {string} html
 * @param {TransformerContext} transformerCtx
 * @param {RenderOptions} options
 * @returns {string}
 */
function default_1(html, transformerCtx, options) {
    const ssrTags = Array.prototype.slice.call(transformerCtx.document.head.querySelectorAll('[au-ssr-id]'));
    for (let i = 0; i < ssrTags.length; i++) {
        html = (0, utils_1.replaceString)(html, '</head>', ssrTags[i].outerHTML + '</head>');
    }
    return html;
}
exports.default = default_1;
;
//# sourceMappingURL=ssr-attributes.js.map