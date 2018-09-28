# webpack-jquery
基于webpack，jquery搭建的多页面项目。webpack不同环境配置，包含dev和prod两个配置。
function resolve(dir) {
  return path.join(__dirname, dir);
}

const targetPath = path.resolve(__dirname, '../src/client')
  , files = fs.readdirSync(targetPath)

function getEntryPoint(folder) {
  const filename = path.resolve(folder, 'index.js');
  if (fs.existsSync(filename)) {
    return filename;
  }

  return `${filename}x`;
}

const folders = _.chain(files)
  .map(v => ({ name: v, path: path.resolve(targetPath, v) }))
  .filter(v => fs.statSync(v.path).isDirectory()).map(v => [v.name, getEntryPoint(v.path)])
  .object()
  .value();


entry: {
  vendor: [
    'jquery',
     resolve('../src/res'),
  ],
  ...folders,
}
已上是页面配置。

HtmlWebpackPlugin插件设置：
const targetPath = path.resolve(__dirname, '../src/client')
  , files = fs.readdirSync(targetPath)

const folders = _.chain(files)
  .map(v => ({ name: v, path: path.resolve(targetPath, v) }))
  .filter(v => fs.statSync(v.path).isDirectory()).map(v => new HtmlWebpackPlugin({
    filename: v.name === 'index' ? `${v.name}.html` : `${v.name}/index.html`,
    inlineSource: /manifest\.js$/,
    template: path.resolve(v.path, 'index.html'),
    chunks: ['manifest', 'vendor', v.name],
  }))
  .value();
  
  有用的给个star^^.
  
