import sleep from '@/utils/sleep';

import MessengerProxyInterface from '@/api/MessengerProxyInterface';
import {
  DialogDTO, MessageDTO, Operator, TimeWhere,
} from '@/types/Messenger';

import dialogs from '@/mocks/dialogs.mock';
import messages from '@/mocks/messages.mock';

export default class MessengerProxyMock implements MessengerProxyInterface {
  async getDialogs(): Promise<DialogDTO[]> {
    await sleep(1000);
    return Promise.resolve(dialogs);
  }

  async getMessagesCount(): Promise<number> {
    await sleep(1000);
    return Promise.resolve(100500);
  }

  async getMessages(dialogId: number, timeWhere?: TimeWhere): Promise<MessageDTO[]> {
    await sleep(1000);
    if (timeWhere) {
      const timeOffset = timeWhere.operator === Operator.lt ? -60000 : 60000;

      return Promise.resolve(messages.map((message, index) => ({
        ...message,
        id: Math.random() * (2 ** 52),
        created: timeWhere.value + (index + 1) * timeOffset,
      })));
    }
    return Promise.resolve(messages);
  }

  async postMessage(dialogId: number, message: string): Promise<MessageDTO> {
    await sleep(1000);
    return {
      id: Math.random() * (2 ** 52),
      author: 'duck',
      created: Date.now(),
      text: message,
    };
  }
}
