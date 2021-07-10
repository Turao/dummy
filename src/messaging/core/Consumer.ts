export interface Consumer<Message> {
  onMessage: (message: Message) => Promise<void>;
}
