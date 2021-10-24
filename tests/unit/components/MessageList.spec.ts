import {
  createLocalVue, Wrapper, ShallowMountOptions, shallowMount,
} from '@vue/test-utils';

import MessageList from '@/components/MessageList.vue';
import { MessageDTO } from '@/types/Messenger';
import { MessageAlign } from '@/types/MessageView';

const localVue = createLocalVue();
function defaultMount(options: ShallowMountOptions<Vue>): Wrapper<typeof MessageList.prototype> {
  return shallowMount<typeof MessageList.prototype>(MessageList, {
    localVue,
    ...options,
  });
}

function defaultMessage(data?: Partial<MessageDTO>): MessageDTO {
  return {
    id: 1,
    author: 'duck',
    created: 1635070814253,
    text: 'duck puck',
    ...data,
  };
}

describe('MessageList component', () => {
  it('can render with empty messages', () => {
    const component = defaultMount({
      propsData: {
        messages: [],
      },
    });
    expect(component.element).toMatchSnapshot();
  });

  it('can render with messages', () => {
    const component = defaultMount({
      propsData: {
        messages: [
          defaultMessage({ id: 1 }),
          defaultMessage({ id: 2 }),
          defaultMessage({ id: 3 }),
          defaultMessage({ id: 4 }),
        ],
      },
    });
    expect(component.element).toMatchSnapshot();
  });

  describe('renderMeta getter', () => {
    it('can work with empty messages', () => {
      const component = defaultMount({
        propsData: {
          messages: [],
        },
      });

      expect(component.vm.renderMeta).toEqual([]);
    });

    it('can work with one message', () => {
      const component = defaultMount({
        propsData: {
          messages: [
            defaultMessage(),
          ],
        },
      });

      expect(component.vm.renderMeta).toEqual([
        { align: MessageAlign.left, stucked: false },
      ]);
    });

    it('can stuck messages', () => {
      const component = defaultMount({
        propsData: {
          messages: [
            defaultMessage({ id: 1 }),
            defaultMessage({ id: 2 }),
            defaultMessage({ id: 3 }),
            defaultMessage({ id: 4 }),
          ],
        },
      });

      expect(component.vm.renderMeta).toEqual([
        { align: MessageAlign.left, stucked: true },
        { align: MessageAlign.left, stucked: true },
        { align: MessageAlign.left, stucked: true },
        { align: MessageAlign.left, stucked: false },
      ]);
    });

    it('can align messages', () => {
      const component = defaultMount({
        propsData: {
          messages: [
            defaultMessage({ id: 1, author: 'duck' }),
            defaultMessage({ id: 2, author: 'duck' }),
            defaultMessage({ id: 3, author: 'puck' }),
            defaultMessage({ id: 4, author: 'puck' }),
            defaultMessage({ id: 5, author: 'duck' }),
          ],
        },
      });

      expect(component.vm.renderMeta).toEqual([
        { align: MessageAlign.left, stucked: true },
        { align: MessageAlign.left, stucked: false },
        { align: MessageAlign.right, stucked: true },
        { align: MessageAlign.right, stucked: false },
        { align: MessageAlign.left, stucked: false },
      ]);
    });
  });
});
