# Houston

> ⚠ RFC 7807 compliant errors for Node.js

[![npm](https://img.shields.io/npm/v/@moducate/houston?color=blue)](https://npmjs.com/package/@moducate/houston)
[![npm bundle size](https://img.shields.io/bundlephobia/minzip/@moducate/houston)](https://bundlephobia.com/package/moducate/houston)
[![Code Climate maintainability](https://img.shields.io/codeclimate/maintainability/moducate/houston)](https://codeclimate.com/github/moducate/houston)
[![Code Climate coverage](https://img.shields.io/codeclimate/coverage/moducate/houston)](https://codeclimate.com/github/moducate/houston)
[![Snyk Vulnerabilities for npm package](https://img.shields.io/snyk/vulnerabilities/npm/@moducate/houston)](#)
[![Dependencies](https://img.shields.io/badge/dependencies-0-success)](https://www.npmjs.com/package/@moducate/houston?activeTab=dependencies)
[![Tree-shakeable](https://img.shields.io/badge/esm-tree--shakeable-success)](#)

- 📃 **Fully compliant.** Fully compliant with the [RFC 7807 specification](https://datatracker.ietf.org/doc/html/rfc7807)!
- 🐁 **Tiny.** Total bundle size comes in at [< 300B minified + gzipped](https://bundlephobia.com/package/moducate/houston)!
- 💡 **Lightweight.** Tiny (see above), zero dependencies, and tree-shakeable!
- 💪 **TypeScript.** Fully typed and self-documenting!
- 🎉 **Support for Node.js >=10.24!**
- ⚙ **Configurable.** Supports [custom JSON stringify functions](#optionsstringify)!

## 🚀 Quick Start

### Install

```bash
# npm
npm i @moducate/houston

# or yarn
yarn add @moducate/houston
```

### Import

```js
// ESM / TypeScript
import { withError } from "@moducate/houston";

// or CommonJS
const { withError } = require("@moducate/houston");
```

## 📄 Templates

You can create error templates using the exported `withTemplate` function:

```js
const { withTemplate } = require("@moducate/houston");
const app = require("express")();

const [withNotFound, rawNotFound] = withTemplate({ type: "https://example.com/not-found", status: 404 });

app.get("/not-found", (_, res) => {
  return withNotFound(res); // The second parameter is optional when using templates
});

const res = rawNotFound({ status: 401 });
// => The second function returned by withTemplate transforms and returns an object (decoupled from http.ServerResponse)
// => The supplied status (401) will override the template's status (404)

console.log(JSON.stringify(res));
// => { "type": "https://example.com/not-found", "status": 401 }
```

If you are not needing to use both functions, you can use this handy shorthand to obtain one of them:

```js
const { withTemplate } = require("@moducate/houston");

const [withNotFound] = withTemplate({ type: "https://example.com/not-found", status: 404 });
// => Returns the function that transforms a http.ServerResponse

const [, withNotFound] = withTemplate({ type: "https://example.com/not-found", status: 404 });
// => Returns the raw function for transforming an object
```

## 🏷 MIME Type

The exported `mime` constant can be used to obtain the media/MIME type for RFC 7807 JSON errors.

```js
const { mime } = require("@moducate/houston");

console.log(mime);
// => 'application/problem+json'
```

This is what the `Content-Type` header of the response supplied to `withError` is set to.

## ⚙ Options

You can supply options as an additional parameter to `withError` and `withTemplate` (and the subsequent `withError` function
returned by the template) to configure Houston's behaviour:

```js
...

withError(
  res,
  { type: "https://example.com/not-found", status: 404 },
  { /* options */ },
);

...
```

### `options.stringify`

You can supply a custom function used to stringify the error response's JSON body.

> By default, `JSON.stringify` is used.

## 💡 Examples

> 📁 Full source code for these examples can be found in the `examples` directory.

### Express

```js
const { withError } = require("@moducate/houston");
const app = require("express")();

app.get("/not-found", (_, res) => {
  return withError(res, { type: "https://example.com/not-found", status: 404 });
});
```

### Next.js API Routes

```js
import { withError } from "@moducate/houston";

export default function handler(req, res) {
  return withError(res, { type: "https://example.com/not-found", status: 404 });
}
```

### Fastify

> ⚠ Fastify uses a custom `Reply` class, rather than `http.ServerResponse`.
>
> This means you need to supply `reply.raw` (instead of `reply`) to `withError()`.

```js
const { withError } = require("@moducate/houston");
const app = require("fastify")();

app.get("/not-found", (_, reply) => {
  return withError(reply.raw, { type: "https://example.com/not-found", status: 404 });
});
```

## ⚖ License

Houston is licensed under the [`MIT License`](LICENSE).
