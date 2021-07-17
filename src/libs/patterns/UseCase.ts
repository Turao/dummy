// Use-Cases / Service Layer
interface UseCase<Request, Response> {
  execute: (request: Request) => Promise<Response> | Response;
}

export type Query<Request, Response> = UseCase<Request, Response>;

export type Command<Request> = UseCase<Request, void>;
