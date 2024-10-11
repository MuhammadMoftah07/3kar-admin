<template>
  <div class="sprite"></div>
</template>

<script>
export default {};
</script>

<style>
.sprite {
  @apply w-6 h-6;
  background: url("@/assets/img/reacts_sprite.png") no-repeat;
}

.sprite.angry {
  background-position: -10px -10px;
}
.sprite.boring {
  background-position: -54px -10px;
}
.sprite.dislike {
  background-position: -10px -54px;
}
.sprite.glasses {
  background-position: -54px -54px;
}
.sprite.heart {
  background-position: -10px -98px;
}
.sprite.joy {
  background-position: -98px -54px;
}
.sprite.happy {
  background-position: -10px -98px;
}
.sprite.grin {
  background-position: -54px -98px;
}
.sprite.silly {
  background-position: -98px -98px;
}
</style>