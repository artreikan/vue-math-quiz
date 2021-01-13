<template>
  <ul class="full-stats">
    <li
      v-for="statItem in fullStats"
      :key="statItem.answer"
      :class="statItem.type"
    >
      {{ statItem.answer }}
    </li>
  </ul>
</template>

<script>
export default {
  name: "AppFullStats",
  props: {
    fullStats: {
      type: Array,
      default: () => [],
    },
  },
};
</script>

<style lang="scss">
.full-stats {
  padding-left: 0;
  list-style-position: inside;

  .correct {
    color: #52ebb5;
  }

  .incorrect {
    color: #eb5252;
  }
}
</style>
