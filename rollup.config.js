import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import typescript from 'rollup-plugin-typescript2';

import packageJson from './package.json' assert { type: 'json' };

const rollupConfig = {
  input: './src/index.ts',
  external: ['react', 'react-dom', 'prop-types'],
  output: [
    {
      file: packageJson.main,
      format: 'cjs',
      sourcemap: true,
    },
    {
      file: packageJson.module,
      format: 'esm',
      sourcemap: true,
    },
  ],
  plugins: [resolve(), commonjs(), typescript()],
};

export default rollupConfig;
