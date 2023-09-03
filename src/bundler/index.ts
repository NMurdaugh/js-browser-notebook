import {
  inputCodePathResolver,
  outputCodeFetcher,
  startEsbuildService,
} from './plugins';

const bundler = async (rawCode: string) => {
  const bundleService = await startEsbuildService();

  try {
    const bundledResult = await bundleService.build({
      entryPoints: ['index.js'],
      sourcemap: 'external',
      bundle: true,
      write: false,
      plugins: [inputCodePathResolver(), outputCodeFetcher(rawCode)],
      outdir: 'out',
      define: {
        // 'process.env.NODE_ENV': '"production"',
        global: 'window',
      },
    });

    return {
      code: bundledResult.outputFiles[1].text,
      error: '',
    };
  } catch (error) {
    return {
      code: '',
      error: error.message,
    };
  }
};

export default bundler;
