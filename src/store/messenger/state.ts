import { MessageDTO, DialogDTO } from '@/types/Messenger';

export interface MessengerState {
  messagesCount: number;
  dialogs: DialogDTO[];
  messages: MessageDTO[];
}

export default function getDefaultState(): MessengerState {
  return {
    messagesCount: 0,
    dialogs: [],
    messages: [],
  };
}
