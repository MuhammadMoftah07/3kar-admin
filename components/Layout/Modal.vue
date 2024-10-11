<template>
  <dialog class="modal modal-open">
    <div class="overflow-y-auto modal-box" :class="modalClasses">
      <h3 class="text-lg font-bold text-slate-900">
        <slot name="modal-title"></slot>
      </h3>
      <p class="py-4">
        <slot name="modal-body"></slot>
      </p>

      <slot name="modal-footer">
        <footer class="gap-2 modal-action">
          <button class="btn h-9 btn-theme" @click="$emit('submitted')">
            إتمام
          </button>
          <button
            @click="$modal.value = ''"
            class="font-medium btn h-9 btn-ghost text-slate-700"
          >
            اغلاق
          </button>
        </footer>
      </slot>
    </div>

    <aside method="dialog" class="modal-backdrop" @click="$closeModal()">
      <button>close</button>
    </aside>
  </dialog>
</template>
<script setup lang="ts">
defineProps(["modalClasses"]);
</script>
