import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import typescript from 'rollup-plugin-typescript2';
import { visualizer } from "rollup-plugin-visualizer";

const rollupConfig = {
  input: './src/index.ts',
  external: ['react', 'react-dom', 'prop-types'],
  output: [
    {
      file: "dist/index.js",
      format: 'cjs',
      sourcemap: true,
    },
    {
      file: "dist/index.es.js",
      format: 'esm',
      sourcemap: true,
    },
  ],
  plugins: [resolve(), commonjs(), typescript(), visualizer()],
};

export default rollupConfig;
