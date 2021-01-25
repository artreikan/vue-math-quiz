<template>
  <div class="record">
    Ваш рекорд: <strong>{{ record }}</strong>
  </div>
</template>

<script>
export default {
  name: "AppRecord",

  props: {
    record: {
      type: Number,
      default: 0,
    },
  },
};
</script>

<style>
.record {
  position: fixed;
  top: 1.5vw;
  right: 1.5vw;
}
</style>
