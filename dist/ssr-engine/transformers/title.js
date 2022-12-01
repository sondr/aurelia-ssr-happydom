"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("./utils");
/**
 * Copy style content of the title from the aurelia instance DOM to the rendered HTML
 * @param {string} html
 * @param {TransformerContext} transformerCtx
 * @param {RenderOptions} options
 * @returns {string}
 */
function default_1(html, transformerCtx, options) {
    const title = transformerCtx.document.head.querySelector('title');
    return (0, utils_1.replaceString)(html, /<title>((.|[\n\r])*)<\/title>/im, title.outerHTML);
}
exports.default = default_1;
;
//# sourceMappingURL=title.js.map