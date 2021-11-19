import { ServerResponse, IncomingMessage } from 'http'
import { Socket } from 'net'
import fastJson from 'fast-json-stringify'
import { mime, withError, withTemplate } from '../src'

describe('mime', () => {
  it('should equal the RFC 7807 mime type for JSON response', () => {
    expect(mime).toStrictEqual('application/problem+json')
  })
})

class MockRes extends ServerResponse {
  constructor () {
    super(new IncomingMessage(new Socket()))
  }
}

describe('withError', () => {
  it('should overwrite the response\'s status code if supplied', () => {
    const res = new MockRes()
    withError(res, { status: 500 })

    expect(res.statusCode).toStrictEqual(500)
  })

  it('should set the response\'s content type header', () => {
    const res = new MockRes()
    withError(res, { status: 500 })

    expect(res.getHeader('Content-Type')).toStrictEqual(mime)
  })

  it('should support a custom stringify function', () => {
    const stringify = fastJson({
      title: 'Error',
      type: 'object',
      properties: {
        type: {
          type: 'string',
        },
        title: {
          type: 'string',
        },
        status: {
          type: 'number',
        },
        detail: {
          type: 'string',
        },
        instance: {
          type: 'string',
        },
      },
    })

    const res = new MockRes()
    expect(() => withError(res, { status: 500 }, { stringify })).not.toThrowError()
  })
})

describe('withTemplate', () => {
  it('should return a withError function', () => {
    const [withNotFound] = withTemplate(() => ({ status: 404 }))
    expect(typeof withNotFound).toStrictEqual('function')

    const res = new MockRes()
    withNotFound(res, {})
    expect(res.statusCode).toStrictEqual(404)
  })

  it('should return a raw function', () => {
    const [, withNotFound] = withTemplate<{ status: number }>(x => x)
    expect(typeof withNotFound).toStrictEqual('function')

    const res = withNotFound({ status: 200 })
    expect(res.status).toStrictEqual(200)
  })
})
