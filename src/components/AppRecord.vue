<template>
  <div class="record">
    <div>
      Ваш рекорд: <strong>{{ record }}</strong>
    </div>
    <div class="extra">Сохраняется локально</div>
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
  text-align: right;
}

.extra {
  opacity: 0.5;
  font-weight: 300;
  font-size: 0.75rem;
}
</style>
