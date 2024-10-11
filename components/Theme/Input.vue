<template>
  <div class="w-full p-1">
    <label class="cursor-pointer input-title" :for="id || generatedID">
      {{ title }}
    </label>

    <template v-if="type == 'select'">
      <select
        class="cursor-pointer input"
        v-model="value"
        :id="id || generatedID"
      >
        <option v-for="el in options" :value="el[selectValue]">
          {{ el[selectLabel] }}
        </option>
      </select>
    </template>

    <template v-else>
      <input
        class="input file:hover:cursor-pointer file:text-white file:rounded-md file:bg-theme2 file:hover:bg-green-700 file:border-none file:ms-0 file:me-2 file:py-1 file:text-xs file:-translate-y-[2px]"
        :type="type"
        :placeholder="placeholder"
        :id="id || generatedID"
        v-model="value"
        :multipl="multiple"
      />
    </template>
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
  type: {
    type: String,
    default: "text",
  },
  id: {
    type: String,
    default: "",
  },
  options: {
    type: Array,
    default: [],
  },
  selectLabel: {
    type: String,
    default: "",
  },
  selectValue: {
    type: String,
    default: "",
  },
  multiple: {
    type: Boolean,
    default: false,
  },
});

const value = defineModel();
</script>
