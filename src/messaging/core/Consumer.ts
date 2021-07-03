export interface Consumer<Message> {
  onMessage: (message: Message) => void;
}
