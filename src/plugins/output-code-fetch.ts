import axios from 'axios';
import * as esbuild from 'esbuild-wasm';
import localforage from 'localforage';

const fileCache = localforage.createInstance({
  name: 'fileCache',
});

export const outputCodeFetch = (inputCode: string) => {
  return {
    name: 'output-code-fetch',
    setup(build: esbuild.PluginBuild) {
      build.onLoad({ filter: /.*/ }, async (args: esbuild.OnLoadArgs) => {
        if (args.path === 'index.js') {
          return {
            loader: 'jsx',
            contents: inputCode,
          };
        }

        const cachedResult = await fileCache.getItem(args.path);

        if (cachedResult) {
          return cachedResult;
        }

        const { data, request } = await axios.get(args.path);
        const axiosResult = {
          loader: 'jsx',
          contents: data,
          resolveDir: new URL('./', request.responseURL).pathname,
        };

        await fileCache.setItem(args.path, axiosResult);
      });
    },
  };
};
