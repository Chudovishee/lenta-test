import { GetterTree } from 'vuex';
import { MessengerState } from '@/store/messenger/state';
import { DialogDTO, MessageDTO } from '@/types/Messenger';
import { GlobalState } from '@/store/state';

const getters: GetterTree<MessengerState, GlobalState> = {
  messagesCount(state): number {
    return state.messagesCount;
  },

  dialogs(state: MessengerState): DialogDTO[] {
    return state.dialogs;
  },

  messages(state: MessengerState): MessageDTO[] {
    return state.messages;
  },
};

export default getters;
