import type { NextApiRequest, NextApiResponse } from 'next'
import type { HoustonError, Options } from '.'
import { withError as withErrorOriginal } from '.'

/**
 * Generates an RFC 7807 compliant error and sends it as a Next.js API Route response.
 *
 * @param req The `NextApiRequest` object to retrieve the instance property (`req.url`) from.
 * @param res The `NextApiResponse` object to send the error to.
 * @param err The error details to send.
 * @param opts Additional options for Houston.
 */
export function withError (req: NextApiRequest, res: NextApiResponse, err: Partial<HoustonError>, opts?: Partial<Options>): void {
  return withErrorOriginal(res, { instance: req.url, ...err }, opts)
}

/**
 * Generates functions which can be invoked to produce errors from a
 * predefined template.
 *
 * @param template A function which accepts a `NextApiRequest` object, `NextApiResponse` object, and
 * the template's parameters, and produces an error.
 * @param opts Additional options for Houston.
 * @returns A `withError` function which can be invoked to apply the error
 * template to a `NextApiResponse` object, and a `raw` function to
 * generate a plaiin object from the template.
 */
export function withTemplate <T = {}> (template: (params: T) => Partial<HoustonError>, opts?: Partial<Options>): [(req: NextApiRequest, res: NextApiResponse, params: T) => void, (req: NextApiRequest, params: T) => Partial<HoustonError>] {
  return [(req, res, params) => withErrorOriginal(res, { instance: req.url, ...template(params) }, { ...opts }), (req, params) => ({ instance: req.url, ...template(params) })]
}
