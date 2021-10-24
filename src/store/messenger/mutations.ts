import Vue from 'vue';
import { MutationTree } from 'vuex';

import { MessageDTO, DialogDTO } from '@/types/Messenger';

import { MessengerState } from './state';

const mutations: MutationTree<MessengerState> = {
  setDialogs(state: MessengerState, dialogs: DialogDTO[]) {
    state.dialogs = dialogs;
  },

  updateLastMessage(state: MessengerState,
    { dialogId, message }: { dialogId: number, message: MessageDTO | undefined }) {
    const dialog = state.dialogs.find((d) => d.id === dialogId);

    if (dialog) {
      Vue.set(dialog, 'lastMessage', message);
    }
  },

  setMessagesCount(state: MessengerState, count: number) {
    state.messagesCount = count;
  },

  setMessages(state: MessengerState, messages: MessageDTO[]) {
    state.messages = messages;
  },

  prependMessages(state: MessengerState, messages: MessageDTO[]) {
    state.messages = [
      ...messages,
      ...state.messages,
    ];
  },

  appendMessages(state: MessengerState, messages: MessageDTO[]) {
    state.messages = [
      ...state.messages,
      ...messages,
    ];
  },
};

export default mutations;
