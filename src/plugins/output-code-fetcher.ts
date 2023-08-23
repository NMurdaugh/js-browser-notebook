import axios from 'axios';
import * as esbuild from 'esbuild-wasm';
import localforage from 'localforage';

const fileCache = localforage.createInstance({
  name: 'fileCache',
});

export const outputCodeFetcher = (inputCode: string) => {
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

        console.log(request);

        const fileType = args.path.match(/.css$/) ? 'css' : 'jsx';

        const escapedData = (data: string) => {
          return data
            .replace(/\n/g, '')
            .replace(/"/g, '\\"')
            .replace(/'/g, "\\'");
        };

        const contents =
          fileType === 'css'
            ? `
          const style = document.createElement('style');
          style.innerText = '${escapedData(data)}';
          document.head.appendChild(style);
        `
            : data;
        const axiosResult = {
          loader: 'jsx',
          contents: contents,
          resolveDir: new URL('./', request.responseURL).pathname,
        };

        await fileCache.setItem(args.path, axiosResult);
        return axiosResult;
      });
    },
  };
};
