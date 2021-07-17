export interface Publisher<Message> {
  publish: (message: Message) => Promise<void>;
}
