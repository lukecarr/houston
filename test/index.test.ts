import { ServerResponse, IncomingMessage } from 'http'
import { Socket } from 'net'
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
})

describe('withTemplate', () => {
  it('should return a function', () => {
    const withNotFound = withTemplate({ status: 404 })
    expect(typeof withNotFound).toStrictEqual('function')
  })

  it('should merge the defaults with the supplied error', () => {
    const withNotFound = withTemplate({ status: 404 })
    const res = new MockRes()
    withNotFound(res)

    expect(res.statusCode).toStrictEqual(404)
  })
})
