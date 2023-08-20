import * as esbuild from 'esbuild-wasm';

export const startService = (() => {
  let esBuildRef: typeof esbuild;
  return async () => {
    if (esBuildRef) {
      return esBuildRef;
    } else {
      await esbuild.initialize({
        wasmURL: './esbuild.wasm',
      });
      esBuildRef = esbuild;
      return esBuildRef;
    }
  };
})();
