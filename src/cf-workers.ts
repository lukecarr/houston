import '@cloudflare/workers-types'
import type { HoustonError, Options } from '.'
import { mime } from '.'

/**
 * Generates an RFC 7807 compliant error and sends it as an HTTP response.
 *
 * @param event The `FetchEvent` object to respond to with the error.
 * @param err The error details to send.
 * @param opts Additional options for Houston.
 */
export function withError (event: FetchEvent, err: Partial<HoustonError>, opts?: Partial<Options>): void {
  return event.respondWith(new Response(
    ((opts?.stringify || JSON.stringify)({ instance: event.request.url, ...err })),
    {
      status: err.status,
      headers: {
        'content-type': mime
      }
    }
  ))
}

/**
 * Generates functions which can be invoked to produce errors from a
 * predefined template.
 *
 * @param template A function which accepts the template's parameters
 * and produces an error.
 * @param opts Additional options for Houston.
 * @returns A `withError` function which can be invoked to apply the error
 * template to a `FetchEvent` object, and a `raw` function to
 * generate a plain object from the template.
 */
export function withTemplate <T = {}> (template: (params: T) => Partial<HoustonError>, opts?: Partial<Options>): [(event: FetchEvent, params: T) => void, (params: T) => Partial<HoustonError>] {
  return [(event, params) => withError(event, { ...template(params) }, { ...opts }), params => ({ ...template(params) })]
}
