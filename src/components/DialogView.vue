<template>
  <div
    class="dialog-view"
    :class="{ active }"
  >
    <div class="dialog-view__head">
      <div class="dialog-view__subject">
        {{ dialog.subject }}
      </div>
      <div class="dialog-view__date">
        {{ date }}
      </div>
    </div>

    <div
      v-if="lastMessage"
      class="dialog-view__last-message"
    >
      {{ lastMessageText }}
    </div>

    <div
      v-else
      class="dialog-view__empty-last-message"
    >
      ...
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { MessageDTO, DialogDTO } from '@/types/Messenger';

@Component({
  components: {
  },
})
export default class DialogView extends Vue {
  @Prop({
    type: Object,
    required: true,
  })
  dialog!: DialogDTO;

  @Prop({
    type: Boolean,
  })
  active!: boolean;

  get lastMessage(): MessageDTO | undefined {
    return this.dialog.lastMessage;
  }

  get lastMessageText(): string | undefined {
    return this.lastMessage?.text;
  }

  get date(): string {
    return new Date(this.lastMessage?.created || this.dialog.created)
      .toLocaleDateString();
  }
}
</script>

<style scoped lang="scss">
.dialog-view {
  display: flex;
  flex-direction: column;

  padding: 24px 32px;

  border-bottom: 1px solid #dfe3e6;

  cursor: pointer;

  &:hover {
    background-color: rgba(255, 255, 255, 0.5);
  }

  &.active {
    background-color: rgba(255, 255, 255, 0.9);
  }

  &__head {
    display: flex;
    margin-bottom: 8px;
  }

  &__subject {
    flex: 1 0;
    margin-right: 8px;

    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;

    font-weight: bold;
  }

  &__date {
    flex: 0 0;

    color: #808080;
  }

  &__last-message {
    line-height: 24px;
    height: 48px;
    overflow: hidden;
    word-break: break-word;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }

  &__empty-last-message {
    line-height: 24px;
    height: 48px;
  }
}
</style>
