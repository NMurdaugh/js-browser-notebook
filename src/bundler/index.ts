import {
  inputCodePathResolver,
  outputCodeFetcher,
  startEsbuildService,
} from './plugins';

const bundler = async (rawCode: string) => {
  const bundleService = await startEsbuildService();

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

  return bundledResult.outputFiles[1].text;
};

export default bundler;
