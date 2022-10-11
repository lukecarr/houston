import type { HandlerEvent, HandlerResponse } from '@netlify/functions'
import type { HoustonError, Options } from '.'
import { mime } from '.'

/**
 * Generates an RFC 7807 compliant error and sends it as a Netlify Functions response.
 *
 * @param event The Netlify `HandlerEvent` object to retrieve the instance property (`event.path`) from.
 * @param err The error details to send.
 * @param opts Additional options for Houston.
 * @returns The Netlify `HandlerResponse` containing the error.
 */
export function withError (event: HandlerEvent, err: Partial<HoustonError> & { status: number }, opts?: Partial<Options>): HandlerResponse {
  return {
    statusCode: err.status,
    body: (opts?.stringify || JSON.stringify)({ instance: event.path, ...err }),
    headers: {
      'content-type': mime
    }
  }
}

/**
 * Generates functions which can be invoked to produce errors from a
 * predefined template.
 *
 * @param template A function which accepts a `HandlerEvent` object and
 * the template's parameters, and produces an error as a `HandlerResponse`.
 * @param opts Additional options for Houston.
 * @returns A `withError` function which can be invoked to apply the error
 * template to a `HandlerResponse` object, and a `raw` function to
 * generate a plaiin object from the template.
 */
export function withTemplate <T = {}> (template: (params: T) => Partial<HoustonError> & { status: number }, opts?: Partial<Options>): [(event: HandlerEvent, params: T) => HandlerResponse, (event: HandlerEvent, params: T) => Partial<HoustonError> & { status: number }] {
  return [(event, params) => withError(event, { ...template(params) }, { ...opts }), (event, params) => ({ instance: event.path, ...template(params) })]
}
