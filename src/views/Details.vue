<template>
  <div>
    <p>This is detail page of user {{ id }}</p>
  </div>
</template>

<script>
export default {
  props: ["id"],
  /*
  data() {
    return {
      id: this.$route.params.id,
    };
  },
  */
};
</script>


