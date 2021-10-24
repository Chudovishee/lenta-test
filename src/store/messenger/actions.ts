import { ActionTree } from 'vuex';
import MessengerProxyInterface from '@/api/MessengerProxyInterface';

import { MessengerState } from './state';
import { MessageDTO, DialogDTO, Operator } from '@/types/Messenger';
import { GlobalState } from '@/store/state';

export default function createActions(messengerProxy: MessengerProxyInterface):
  ActionTree<MessengerState, GlobalState> {
  return {
    async fetchDialogs({ commit }): Promise<void> {
      const dialogs: DialogDTO[] = await messengerProxy.getDialogs();
      commit('setDialogs', dialogs);
    },

    async fetchMessagesCount({ commit }): Promise<void> {
      const count: number = await messengerProxy.getMessagesCount();
      commit('setMessagesCount', count);
    },

    async fetchMessages({ commit }, dialogId: number): Promise<void> {
      const messages: MessageDTO[] = await messengerProxy.getMessages(dialogId);
      commit('setMessages', messages);
      commit('updateLastMessage', { dialogId, message: messages[messages.length - 1] });
    },

    async fetchUpMessages({ commit, getters }, dialogId: number): Promise<void> {
      const messages = getters.messages as MessageDTO[];
      const upperTime: number | undefined = messages[0]?.created;

      if (upperTime !== undefined) {
        const fetchMessages: MessageDTO[] = await messengerProxy.getMessages(dialogId, {
          operator: Operator.lt,
          value: upperTime,
        });
        commit('prependMessages', fetchMessages);
      }
    },

    async fetchDownMessages({ commit, getters }, dialogId: number): Promise<void> {
      const messages = getters.messages as MessageDTO[];
      const lowerTime: number | undefined = messages[messages.length - 1]?.created;

      if (lowerTime !== undefined) {
        const fetchMessages: MessageDTO[] = await messengerProxy.getMessages(dialogId, {
          operator: Operator.gt,
          value: lowerTime,
        });
        commit('appendMessages', fetchMessages);
        commit('updateLastMessage', { dialogId, message: fetchMessages[fetchMessages.length - 1] });
      }
    },

    async postMessage({ commit },
      { dialogId, message }: { dialogId: number, message: string }): Promise<void> {
      const newMessage: MessageDTO = await messengerProxy.postMessage(dialogId, message);

      commit('appendMessages', [newMessage]);
      commit('updateLastMessage', { dialogId, message: newMessage });
    },
  };
}
