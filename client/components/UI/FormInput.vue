<template>
  <div>
    <label
      ><strong>{{ label }}</strong></label
    >
    <input
      class="bg-slate-100 rounded-md p-2 border border-neutral-300 w-[100%]"
      :value="modelValue"
      v-bind="$attrs"
      @input="handleInput"
    />
  </div>
</template>

<script lang="ts">
export default {
  props: ["modelValue", "label"],
  methods: {
    handleInput(event: Event) {
      const target = event.target as HTMLInputElement;
      this.$emit("update:modelValue", target.value);
    },
  },
  inheritAttrs: false,
};
</script>
