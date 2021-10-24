<template>
  <div :class="classes">
    <div class="message-view__text">
      {{ message.text }}
    </div>

    <div
      v-if="!stucked"
      class="message-view__footer"
    >
      <div class="message-view__author">
        {{ message.author }}
      </div>
      <div class="message-view__date">
        {{ date }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { MessageDTO } from '@/types/Messenger';
import { MessageAlign } from '@/types/MessageView';

@Component
export default class MessageView extends Vue {
  @Prop({
    type: Object,
    required: true,
  })
  message!: MessageDTO;

  @Prop({
    type: String,
    default: MessageAlign.left,
  })
  align!: MessageAlign;

  @Prop({
    type: Boolean,
    default: false,
  })
  stucked!: boolean;

  get classes(): string[] {
    return [
      'message-view',
      this.align === MessageAlign.right ? 'right' : 'left',
    ];
  }

  get date(): string {
    return new Date(this.message.created)
      .toLocaleString();
  }
}
</script>

<style scoped lang="scss">
.message-view {
  &__text {
    word-break: break-word;
    padding: 24px 32px;
    border-radius: 8px;
  }

  &__footer {
    display: flex;
    margin-top: 8px;
  }

  &__author {
    margin-right: 8px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    font-weight: bold;
  }

  &__date {
    white-space: nowrap;
    color: #808080;
  }

  &.left {
    margin-right: 30%;

    .message-view__text {
      background-color: #f6f7f9;
      border-bottom-left-radius: 0;
    }

    .message-view__footer {
      justify-content: left;
    }
  }

  &.right {
    margin-left: 30%;

    .message-view__text {
      background-color: #e9f5f5;
      border-bottom-right-radius: 0;
    }

    .message-view__footer {
      justify-content: right;
    }
  }
}
</style>
