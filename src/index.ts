import type { ServerResponse } from 'http'

/**
 * An RFC 7807 compliant error.
 */
export type Error = {
  /**
   * A URI reference that identifies the problem type.
   */
  type: string
  /**
   * A short, human-readable summary of the problem type.
   *
   * This should not change between occurrences of the same problem type,
   * except for purposes of localization.
   */
  title: string
  /**
   * The HTTP status code for this ocurrence of the problem type.
   */
  status: number
  /**
   * A human-readable explanation specific to this ocurrence of the
   * problem type.
   */
  detail: string
  /**
   * A URI reference that identifies the specific occurrence of the problem
   * type.
   */
  instance: string
};

/**
 * The MIME/media type for RFC 7807 error responses (in JSON).
 */
export const mime = 'application/problem+json'

/**
 * Generates an RFC 7807 compliant error and sends it as an HTTP response.
 *
 * @param res The `http.ServerResponse` object to send the error to.
 * @param err The error details to send.
 */
export function withError (res: ServerResponse, err: Partial<Error>): void {
  if (typeof err.status !== 'undefined') {
    res.statusCode = err.status
  }
  return res.setHeader('Content-Type', mime).end(JSON.stringify(err))
}

/**
 * Generates an RFC 7807 compliant error template which can be invoked to
 * make errors with common values.
 *
 * @param template The template's values.
 * @returns A `withError` function which can be invoked to apply the error
 * template to a `http.ServerResponse` object.
 */
export function withTemplate (template: Partial<Error>): (res: ServerResponse, err?: Partial<Error>) => void {
  return (res, err) => withError(res, { ...template, ...err })
}
