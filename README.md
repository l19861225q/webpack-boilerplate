<img src="./logo.svg" width="100" />

# Webpack Boilerplate

A develop boilerplate of `webpack`, `es6+`, `jsx`, `react`, `react-dom` :shipit:

## Installing / Getting started

Git clone the repo and install the dependencies.

```shell
git clone https://github.com/l19861225q/webpack-boilerplate.git
cd webpack-boilerplate
npm i
```

## Developing

### Built With
- [eslint](https://eslint.org)
- [babel](https://babeljs.io)
  - es6+
- [webpack](https://webpack.js.org)
  - dev server + hmr `develop mode`
  - jsx
  - scss (postcss.autoprefixer)
  - minify of assets
  - gzip of assets `product mode`
  - dll
- [react](https://reactjs.org)
  - [react-dom](https://reactjs.org/docs/react-dom.html)

### Prerequisites
Based on `node@8.3.0`

### Dll
> Split bundles in order to drastically improve build time, [more info](https://webpack.js.org/plugins/dll-plugin).

If you added new vendor dependencies like `lodash`, please update
```javascript
// webpack.config.dll.babel.js
const alias = {
  // Add your dependencies
  'lodash$': '' // The `lodash` absolute file path
}
...
export default {
  entry: {
    [dllName]: [
      // Add your dependencies
      'lodash'
    ]
  }
}
```

And generate the dll file

```shell
# develop mode: will generate vendors-manifest.development.json, vendors.dll.js
npm run dll:dev

# product mode: will generate vendors-manifest.production.json, vendors.dll.min.js
npm run dll:pro
```

### Developing

```shell
npm start
```

### Building

```shell
npm run build
```

### Deploying / Publishing

## Versioning

We can maybe use [SemVer](http://semver.org) for versioning. For the versions available, see the [link to tags on this repository](https://github.com/l19861225q/webpack-boilerplate/tags).

## Configuration

You can set `.env` to config some options.

## Tests

## Style guide

## Api Reference

## Database

## Licensing

MIT
