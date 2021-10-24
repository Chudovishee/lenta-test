<template>
  <div
    class="message-list"
    @scroll="handleScroll"
  >
    <div
      v-for="(message, index) in messages"
      :key="message.id"
      class="message-list__message-container"
      :class="{ first: index === 0 }"
    >
      <message-view
        :message="message"
        :align="renderMeta[index].align"
        :stucked="renderMeta[index].stucked"
      />
    </div>
  </div>
</template>

<script lang="ts">
import {
  Component, Prop, Watch, Vue,
} from 'vue-property-decorator';
import MessageView from '@/components/MessageView.vue';
import { MessageDTO } from '@/types/Messenger';
import { MessageAlign } from '@/types/MessageView';

interface renderMeta {
  align: MessageAlign;
  stucked: boolean;
}

@Component({
  components: {
    MessageView,
  },
})
export default class MessageList extends Vue {
  @Prop({
    type: Array,
    required: true,
  })
  messages!: MessageDTO[];

  get renderMeta(): renderMeta[] {
    return this.messages.reduce((result: renderMeta[], message: MessageDTO, index: number) => {
      if (index === 0) {
        return [{ align: MessageAlign.left, stucked: false }];
      }

      const prevMeta = result[result.length - 1];
      if (message.author === this.messages[index - 1].author) {
        prevMeta.stucked = true;
        result.push({
          align: prevMeta.align,
          stucked: false,
        });
      } else {
        result.push({
          align: prevMeta.align === MessageAlign.left ? MessageAlign.right : MessageAlign.left,
          stucked: false,
        });
      }
      return result;
    }, []);
  }

  get lowerDate(): number | undefined {
    return this.messages[this.messages.length - 1]?.created;
  }

  @Watch('lowerDate', { immediate: true })
  async onDownMessagePushed(): Promise<void> {
    await this.$nextTick();
    this.$el.scrollTop = this.$el.scrollHeight;
  }

  handleScroll(): void {
    if (this.$el.scrollTop === 0) {
      this.$emit('scroll-top');
    }
  }
}
</script>

<style scoped lang="scss">
.message-list {
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;

  overflow-y: auto;

  &__message-container {
    margin: 8px 16px;

    &.first {
      margin-top: auto;
    }
  }
}
</style>
