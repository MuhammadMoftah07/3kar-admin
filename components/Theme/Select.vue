<template>
  <section class="w-full p-1">
    <label v-if="title" class="input-title">
      {{ title }}
    </label>

    <multiselect
      :id="id"
      :label="label"
      track-by="id"
      ref="select"
      dir="rtl"
      v-model="value"
      :options="options"
      :loading="loading"
      :placeholder="'بحث...'"
      :multiple="multiple"
      :modelValue="modelValue"
      @update:modelValue="$emit('update:modelValue', $event)"
      @select="$emit('select', $event)"
    ></multiselect>
  </section>
</template>

<script lang="ts" setup>
import Multiselect from "vue-multiselect";
import "vue-multiselect/dist/vue-multiselect.css";
// let options = ["الثالث", "الثاني", "الاول"];
let options = ref([]);
const value = defineModel();
const loading = ref(false);
const props = defineProps({
  id: { type: String },
  title: { type: String },
  label: { type: String, default: "name" },
  multiple: { default: false },
  staticOptions: { type: Array },
  url: { default: String },
  params: { type: String, default: "" },
  modelValue: {},
  customLabel: {},
});

onBeforeMount(() => {
  getOptions();
});

function getOptions() {
  if (props.staticOptions) {
    options.value = props.staticOptions;
    return;
  }
  loading.value = true;
  $http(`${props.url}?per_page=999&${props.params}`)
    .then((res) => {
      options.value = res.response.data;
      loading.value = false;
      return res;
    })
    .catch((err) => {
      loading.value = false;
      useToast().errorHandler(err);
    });
}
</script>

<style scoped>
/* select arrow  */
:deep(.multiselect__select::before) {
  @apply top-[22px];
}

:deep(.multiselect__tags) {
  @apply w-full text-sm font-semibold bg-white border rounded-lg shadow-inner  border-slate-200 text-right cursor-pointer p-0 pt-[7px] min-h-0 px-2 h-[37.6px];
}
:deep(
    .multiselect,
    .multiselect__input,
    .multiselect__single,
    .multiselect__tag
  ) {
  @apply text-sm;
}
:deep(.multiselect__single) {
  @apply text-sm;
}
:deep(.multiselect__tag) {
  margin-right: 0;
  margin-left: 3px;
  @apply text-xs p-[3px_19px_4px_5px];
}

:deep(.multiselect__placeholder) {
  @apply pt-0 text-sm;
}

:deep(.multiselect__option) {
  @apply border-b border-slate-200 py-0 grid items-center h-8 text-[13px] min-h-0;
}

/* the green and red text on select */
:deep(.multiselect__option::after) {
  @apply px-2 top-2 text-xs;
}
:deep(.multiselect__spinner) {
  top: 2px;
  width: 38px;
  height: 33px;
  left: 5px;
  @apply bg-white;
}
</style>
