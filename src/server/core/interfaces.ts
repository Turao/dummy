// Domain Layer
export interface Entity<ID> {
  getId: () => ID;
}

// Controller-ish layer
export interface Handler {
  handle: (request: unknown) => Promise<unknown>;
}

// Use-Cases / Service Layer
interface UseCase<Request, Response> {
  execute: (request: Request) => Promise<Response> | Response;
}

export type Query<Request, Response> = UseCase<Request, Response>;

export type Command<Request> = UseCase<Request, void>;
