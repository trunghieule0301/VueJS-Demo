<template>
  <div class="home">
    <p>This is filter page</p>
    <p>{{ date | globalDate | transformDate | secondFilter(true, "World") }}</p>
    <p>
      {{
        new Date()
          | moment(
            "add",
            "2 years, 8 days",
            "subtract",
            "3 days",
            "ddd, MMM Do YYYY"
          )
      }}
    </p>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  data: () => {
    return {
      date: "2021-01-23",
      date2: "7/10/2005",
    };
  },
  filters: {
    transformDate(value) {
      return "Start on " + value;
    },
    secondFilter(value, boolean, arg) {
      return value + ", Hello " + (boolean ? arg : "");
    },
  },
};
</script>

<style scoped>
p {
  font-size: 30px;
}
</style>
