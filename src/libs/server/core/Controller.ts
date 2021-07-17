// Controller-ish layer
export interface Controller<Request, Response> {
  handle: (request: Request) => Promise<Response>;
}
