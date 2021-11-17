import type { ServerResponse } from 'http'

export type Error = {
  type: string
  title: string
  status: number
  detail: string
  instance: string
};

export const mime = 'application/problem+json'

export function withError (res: ServerResponse, err: Partial<Error>): void {
  if (typeof err.status !== 'undefined') {
    res.statusCode = err.status
  }
  return res.setHeader('Content-Type', mime).end(JSON.stringify(err))
}
