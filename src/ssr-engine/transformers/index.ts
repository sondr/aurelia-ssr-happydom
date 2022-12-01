import { RenderOptions, TransformerContext } from '../interfaces';

// tslint:disable:no-var-requires
const transformers = [
    require('./template').default,
    require('./title').default,
    require('./styles').default,
    require('./ssr-attributes').default,
    require('./preboot').default
];
// tslint:enable:no-var-requires

/**
 * Render HTML by passing transformer context and rendering options to registered transformers
 * @param {TransformerContext} transformerCtx
 * @param {RenderOptions} options
 * @returns {string}
 */
export function transform(transformerCtx: TransformerContext, options: RenderOptions) {
    let html = options.template;

    for (let i = 0; i < transformers.length; i++) {
        html = transformers[i](html, transformerCtx, options);
    }

    return html;
}