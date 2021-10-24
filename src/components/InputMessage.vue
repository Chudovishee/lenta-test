<template>
  <div class="input-message">
    <div class="input-message__input-wrapper">
      <input
        v-model="value"
        class="input-message__input"
        @keypress.enter="handleSend"
      />
    </div>
    <button
      class="input-message__button"
      :disabled="pending"
      @click="handleSend"
    >
      <loading v-if="pending" />
      <span v-else>➤</span>
    </button>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import Loading from '@/components/Loading.vue';

@Component({
  components: {
    Loading,
  },
})
export default class InputMessage extends Vue {
  @Prop({
    type: Boolean,
    default: false,
  })
  pending!: boolean;

  value = '';

  handleSend(): void {
    if (this.value && !this.pending) {
      this.$emit('send', this.value);
      this.value = '';
    }
  }
}
</script>

<style scoped lang="scss">
.input-message {
  display: flex;
  height: 80px;
  border-top: 1px solid #dfe3e6;

  &__input-wrapper {
    flex: 1 0;
    margin: 32px;
  }

  input {
    display: block;
    width: 100%;
    height: 16px;
    line-height: 16px;
    border: none;
    outline: none;
    margin: 0;
    padding: 0;
  }

  &__button {
    position: relative;
    width: 80px;
    height: 80px;
    line-height: 80px;

    font-size: 50px;

    border: none;

    background-color: #398bff;

    cursor: pointer;
  }
}
</style>
