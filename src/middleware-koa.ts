import { RenderOptions, AppInitializationOptions, render } from './ssr-engine/aurelia-ssr-engine';
import { Context } from 'koa';

export const aureliaKoaMiddleware = (renderOptions: RenderOptions, initializationOptions: AppInitializationOptions) => {
    return (ctx: Context, next: () => void) => {
        const url = (ctx.request as any).URL;
        const pathname = url.pathname;

        // skip requests where urls have an extension
        const extensionMatcher = /^.*\.[^\\]+$/;
        if (pathname.match(extensionMatcher)) {
            return next();
        }

        // set client request headers
        renderOptions.headers = Object.assign({}, ctx.req.headers);

        return render(Object.assign({ url }, renderOptions), initializationOptions)
            .then((html: string) => {
                ctx.body = html;
            })
            .catch((e: Error) => {
                ctx.body = `<html><body>Failed to render ${pathname}</body></html>`;
                console.log(`Failed to render ${pathname}`);
                console.log(e);
            });
    };
};