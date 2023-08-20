import * as esbuild from 'esbuild-wasm';

export const inputCodePathResolver = () => {
  return {
    name: 'unpkg-package-path',
    setup(build: esbuild.PluginBuild) {
      // handle root file index.js
      build.onResolve({ filter: /(^index\.js$)/ }, () => {
        return { path: 'index.js', namespace: 'a' };
      });

      // handle relative file paths in a module
      build.onResolve({ filter: /^\.+\// }, (args: esbuild.OnResolveArgs) => {
        return {
          namespace: 'a',
          path: new URL(args.path, `https://unpkg.com${args.resolveDir}/`).href,
        };
      });

      // handle main file in module
      build.onResolve({ filter: /.*/ }, async (args: esbuild.OnResolveArgs) => {
        return {
          namespace: 'a',
          path: `https://unpkg.com/${args.path}`,
        };
      });
    },
  };
};
