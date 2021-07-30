<template>
  <div>
    <ul v-if="posts && posts.length">
      <li v-for="(post, key) in posts" :key="key">
        <p v-rainbow>
          <strong>{{ post.title }}</strong>
        </p>
        <p>{{ post.body }}</p>
      </li>
    </ul>

    <ul v-if="errors && errors.length">
      <li v-for="(error, key) of errors" :key="key">
        {{ error.message }}
      </li>
    </ul>
  </div>
</template>

<script>
import HTTP from "../services/axiosInstance";

export default {
  data() {
    return {
      posts: [],
      errors: [],
    };
  },

  created() {
    HTTP.get("posts")
      .then((response) => {
        console.log(response.data);
        this.posts = response.data;
      })
      .catch((e) => {
        this.errors.push(e);
      });
  },

  methods: {
    async getPosts() {
      let response = await HTTP.get("posts");
      console.log(response.data);
      this.posts = response.data;
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
