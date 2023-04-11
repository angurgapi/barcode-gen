# barrcode

## Build Setup

```bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start

# generate static project
$ npm run generate
```
# description
- the application generates various types of barcodes (3 default options added as an example)
- axios library was added to the project for handling requests proxifying (server rejects cross-origin requests otherwise)
- no UI libraries added for bundle size sake: the app has a limited amount of components, so everything is custom
- nuxt-property-decorator and typescript-build added to have readable typescript-based components
- @nuxtjs/svg-sprite added to avoid iconpack providing dependencies and have a potentially scalable ui
- 


# weak spots
- there content validation only happens on server side
- TO DO with a detailed rulemap (for all barcode types) there might be a frontend regex-based validation, so the request wouldn't be sent to server in case of invalid input
- 'not enough space' error is unclear
- lack of style variables (fonts, colors, etc)
- user's input might be stored in localstorage in case page is refreshed