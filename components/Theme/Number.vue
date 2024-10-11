<template>
  <div class="w-full p-1">
    <label class="cursor-pointer input-title" :for="id || generatedID">
      {{ title }}
    </label>
    <input
      class="input"
      type="number"
      :placeholder="placeholder"
      :id="id || generatedID"
      v-model="value"
      @input="$event.target.value = $event.target.value.replace(/[^0-9]/g, '')"
    />
  </div>
</template>

<script setup>
const generatedID = useId();
defineProps({
  title: {
    type: String,
    default: "",
  },
  placeholder: {
    type: String,
    default: "",
  },
  id: {
    type: String,
    default: "",
  },
});

const value = defineModel();
</script>
