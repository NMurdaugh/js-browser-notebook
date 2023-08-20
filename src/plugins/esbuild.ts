import * as esbuild from 'esbuild-wasm';

const startService = (() => {
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

export default startService;
