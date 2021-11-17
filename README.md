# ⚠ Houston

> RFC 7807 compliant errors for Node.js

[![npm](https://img.shields.io/npm/v/@moducate/houston)](https://npmjs.com/package/@moducate/houston)
[![Code Climate maintainability](https://img.shields.io/codeclimate/maintainability/moducate/houston)](https://codeclimate.com/github/moducate/houston)
[![Code Climate coverage](https://img.shields.io/codeclimate/coverage/moducate/houston)](https://codeclimate.com/github/moducate/houston)
[![npms.io (score)](https://img.shields.io/npms-io/final-score/@moducate/houston)](https://api.npms.io/v2/package/%40moducate%2Fhouston)
[![Snyk Vulnerabilities for npm package](https://img.shields.io/snyk/vulnerabilities/npm/@moducate/houston)](#)
[![npm bundle size](https://img.shields.io/bundlephobia/min/@moducate/houston)](https://bundlephobia.com/package/moducate/houston)

- 📃 **Fully compliant.** Fully compliant with the [RFC 7807 specification](https://datatracker.ietf.org/doc/html/rfc7807).
- 💡 **Lightweight.** Total bundle size comes in at [< 270B minified + gzipped](https://bundlephobia.com/package/moducate/houston).
- 💪 **TypeScript.** Fully typed and self-documenting!

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

### Example Usage

Transform an `express` response:

```js
const { withError } = require("@moducate/houston");
const app = require("express")();

app.get("/not-found", (_, res) => {
  return withError(res, { type: "https://example.com/not-found", status: 404 })
});
```

## 🏷 MIME Type

The exported `mime` constant can be used to obtain the media/MIME type for RFC 7807 JSON errors.

```js
const { mime } = require("@moducate/houston");

console.log(mime);
// => 'application/problem+json'
```

This is what the `Content-Type` header of the response supplied to `withError` is set to.

## ⚖ License

Houston is licensed under the [`MIT License`](LICENSE).
