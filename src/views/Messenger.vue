<template>
  <div class="messenger">
    <loading v-if="loading" />

    <div class="messenger__dialog-list-container">
      <dialog-list
        :messagesCount="messagesCount"
        :dialogs="dialogs"
        :active-dialog-id="dialogId"
        @activate="handleActivate"
      />
    </div>
    <div class="messenger__right-side">
      <div class="messenger__message-list-container">
        <loading v-if="messagesLoading" />
        <message-list
          v-if="dialogId"
          :messages="messages"
          @scroll-top="handleUpMessages"
        />
        <messages-placeholder v-else/>
      </div>

      <input-message
        :pending="postLoading"
        @send="handleSend"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { mapActions, mapGetters } from 'vuex';
import {
  Component, Prop, Watch, Vue,
} from 'vue-property-decorator';

import DialogList from '@/components/DialogList.vue';
import Loading from '@/components/Loading.vue';
import { DialogDTO, MessageDTO } from '@/types/Messenger';
import MessagesPlaceholder from '@/components/MessagesPlaceholder.vue';
import MessageList from '@/components/MessageList.vue';
import InputMessage from '@/components/InputMessage.vue';

@Component({
  components: {
    InputMessage,
    MessageList,
    MessagesPlaceholder,
    Loading,
    DialogList,
  },
  computed: {
    ...mapGetters({
      messagesCount: 'messenger/messagesCount',
      dialogs: 'messenger/dialogs',
      messages: 'messenger/messages',
    }),
  },
  methods: {
    ...mapActions({
      fetchDialogs: 'messenger/fetchDialogs',
      fetchMessagesCount: 'messenger/fetchMessagesCount',
      fetchMessages: 'messenger/fetchMessages',
      fetchUpMessages: 'messenger/fetchUpMessages',
      postMessage: 'messenger/postMessage',
    }),
  },
})
export default class Messenger extends Vue {
  @Prop({
    type: Number,
  })
  dialogId!: number;

  loading = false;

  messagesLoading = false;

  postLoading = false;

  fetchDialogs!: () => Promise<void>;

  fetchMessagesCount!: () => Promise<void>;

  fetchMessages!: (dialogId: number) => Promise<void>;

  fetchUpMessages!: (dialogId: number) => Promise<void>;

  postMessage!: ({ dialogId, message }: { dialogId: number, message: string }) => Promise<void>;

  messagesCount!: number;

  dialogs!: DialogDTO[];

  messages!: MessageDTO[];

  mounted(): void {
    this.fetchInit();
  }

  @Watch('dialogId')
  async onDialogHandler(dialogId: number): Promise<void> {
    if (dialogId) {
      this.messagesLoading = true;
      await this.fetchMessages(this.dialogId);
      this.messagesLoading = false;
    }
  }

  async fetchInit(): Promise<void> {
    this.loading = true;
    await Promise.all([
      this.fetchMessagesCount(),
      this.fetchDialogs(),
    ]);
    await this.onDialogHandler(this.dialogId);
    this.loading = false;
  }

  handleActivate(dialog: DialogDTO): void {
    this.$router.push({
      name: this.$route.name || undefined,
      params: { dialogId: dialog.id.toString() },
    });
  }

  handleUpMessages(): void {
    this.fetchUpMessages(this.dialogId);
  }

  async handleSend(message: string): Promise<void> {
    this.postLoading = true;
    await this.postMessage({ dialogId: this.dialogId, message });
    this.postLoading = false;
  }
}
</script>

<style scoped lang="scss">
.messenger {
  width: 100%;
  height: 100%;

  display: flex;

  &__dialog-list-container {
    width: 300px;
    flex: 0 0 300px;
  }

  &__right-side {
    flex: 1 0;
    display: flex;
    flex-direction: column;
  }

  &__message-list-container {
    position: relative;
    flex: 1 0;
    overflow: hidden;
  }
}
</style>
