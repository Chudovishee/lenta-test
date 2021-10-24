<template>
  <div class="dialog-list">
    <div class="dialog-list__counter-container">
      <span class="dialog-list__counter-label">Messages</span>
      <span class="dialog-list__counter">{{ messagesCount }}</span>
    </div>

    <div class="dialog-list__list">
      <dialog-view
        v-for="dialog in dialogs"
        :key="dialog.id"
        :dialog="dialog"
        :active="dialog.id === activeDialogId"
        @click.native="handleActivate(dialog)"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

import DialogView from '@/components/DialogView.vue';

import { DialogDTO } from '@/types/Messenger';

@Component({
  components: {
    DialogView,
  },
})
export default class DialogList extends Vue {
  @Prop({
    type: Number,
    required: true,
  })
  messagesCount!: number;

  @Prop({
    type: Array,
    required: true,
  })
  dialogs!: DialogDTO[];

  @Prop({
    type: Number,
  })
  activeDialogId!: number;

  handleActivate(dialog: DialogDTO): void {
    this.$emit('activate', dialog);
  }
}
</script>

<style scoped lang="scss">
.dialog-list {
  position: relative;
  display: flex;
  flex-direction: column;

  width: 100%;
  height: 100%;
  background-color: #eff3f6;

  &:after {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    width: 8px;
    box-shadow: inset -8px 0 8px -8px #dfe3e6;
  }

  &__counter-container {
    flex: 0 0;
    height: 56px;
    line-height: 56px;

    padding: 0 32px;

    border-bottom: 1px solid #dfe3e6;
  }

  &__counter-label {
    margin-right: 8px;
  }

  &__counter {
    color: #808080;
    font-weight: bold;
  }

  &__list {
    flex: 1 0;
    overflow-y: auto;
  }
}
</style>
