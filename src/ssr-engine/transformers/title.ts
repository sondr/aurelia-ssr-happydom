import { replaceString } from './utils';
import { RenderOptions, TransformerContext } from '../interfaces';

/**
 * Copy style content of the title from the aurelia instance DOM to the rendered HTML
 * @param {string} html
 * @param {TransformerContext} transformerCtx
 * @param {RenderOptions} options
 * @returns {string}
 */
export default function (html: string, transformerCtx: TransformerContext, options?: RenderOptions) {
    const title = transformerCtx.document.head.querySelector('title');
    return replaceString(html, /<title>((.|[\n\r])*)<\/title>/im, title.outerHTML);
};