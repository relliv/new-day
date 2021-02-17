import CopyPlugin from "copy-webpack-plugin";
import WriteFilePlugin from 'write-file-webpack-plugin';

export const plugins = [
  new WriteFilePlugin(),
  new CopyPlugin({
    patterns: [{
      from: path.resolve(
        __dirname,
        "node_modules/@mdi/angular-material",
        "mdi.svg"
      ),
      //from: '/node_modules/@mdi/angular-material/mdi.svg',
      //to: 'assets/mdi.svg'
      to: path.resolve(
        __dirname,
        "src/assets",
        "mdi.svg"
      ),
    }],
  }),
];
