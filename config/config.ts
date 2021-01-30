import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  history: {
    type: 'hash'
  },
  hash: true,
  dynamicImport: {},
  ignoreMomentLocale: true,
  autoprefixer:{ 
    flexbox: 'no-2009'
  },
  inlineLimit: 1,
  chainWebpack: memo => {
     memo.module.rule("其他文件使用url导入").test(/\.(gif|mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/).use("otherFile").loader('url-loader').options({limit: 0});
  },
  targets: { ie: 9, ios: 8, android: 4 },
  dva: {
    immer: true,
    hmr: true,
  },
});
