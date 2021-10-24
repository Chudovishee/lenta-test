import { MessageDTO, DialogDTO, TimeWhere } from '@/types/Messenger';

export default interface MessengerProxyInterface {
  getDialogs(): Promise<DialogDTO[]>;
  getMessagesCount(): Promise<number>;
  getMessages(dialogId: number, timeWhere?: TimeWhere): Promise<MessageDTO[]>;

  postMessage(dialogId: number, message: string): Promise<MessageDTO>;
}
