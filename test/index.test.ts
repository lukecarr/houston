import { mime } from '../src'

describe('mime', () => {
  it('should equal the RFC 7807 mime type for JSON response', () => {
    expect(mime).toStrictEqual('application/problem+json')
  })
})
