import { Commit } from 'vuex';
import createActions from '@/store/messenger/actions';
import MessengerProxyInterface from '@/api/MessengerProxyInterface';
import { DialogDTO, MessageDTO } from '@/types/Messenger';

function defaultProxy(data?: Partial<MessengerProxyInterface>): MessengerProxyInterface {
  return {
    getDialogs(): Promise<DialogDTO[]> {
      throw Error('unexpected call');
    },
    getMessagesCount(): Promise<number> {
      throw Error('unexpected call');
    },
    getMessages(): Promise<MessageDTO[]> {
      throw Error('unexpected call');
    },
    postMessage(): Promise<MessageDTO> {
      throw Error('unexpected call');
    },
    ...data,
  };
}

function defaultDialog(data?: Partial<DialogDTO>): DialogDTO {
  return {
    id: 1,
    subject: 'super-duper',
    created: 1635070814253,
    ...data,
  };
}

describe('messenger module actions', () => {
  describe('fetchDialogs', () => {
    it('can resolve', async () => {
      const dialogs = [
        defaultDialog(),
      ];
      const commitMock = jest.fn();
      const getDialogs = jest.fn(() => Promise.resolve(dialogs));
      const fetchDialogs = createActions(defaultProxy({ getDialogs }))
        .fetchDialogs as ({ commit }: { commit: Commit }) => Promise<void>;

      await fetchDialogs({ commit: commitMock });

      expect(commitMock.mock.calls).toEqual([
        ['setDialogs', dialogs],
      ]);
      expect(getDialogs).toBeCalled();
    });

    it('can reject', async () => {
      const commitMock = jest.fn();
      const getDialogs = jest.fn(() => Promise.reject(Error('no no no')));
      const fetchDialogs = createActions(defaultProxy({ getDialogs }))
        .fetchDialogs as ({ commit }: { commit: Commit }) => Promise<void>;

      await expect(fetchDialogs({ commit: commitMock }))
        .rejects.toHaveProperty('message', 'no no no');

      expect(commitMock).not.toBeCalled();
      expect(getDialogs).toBeCalled();
    });
  });
});
