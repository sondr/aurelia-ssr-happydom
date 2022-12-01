import * as preboot from 'preboot';
import { RenderOptions, TransformerContext } from '../interfaces';
import { replaceString } from './utils';

/**
 * Append Angular preboot to the rendered HTML
 * @see https://github.com/angular/preboot
 * @param {string} html
 * @param {TransformerContext} transformerCtx
 * @param {RenderOptions} options
 * @returns {string}
 */
export default function (html: string, transformerCtx: TransformerContext, options: RenderOptions) {
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
        html = replaceString(html, '</head>', `\r\n<script>${inlinePrebootCode}</script>\r\n</head>`);

        // preboot_browser can replay events that were stored by the preboot code
        html = replaceString(html, '</body>', `\r\n<script src="preboot_browser.js"></script>
      <script>
      document.addEventListener('aurelia-started', function () {
        setTimeout(function () { preboot.complete(); }, ${options.replayDelay});
      });
      </script>\r\n</body>`);
    }

    return html;
};