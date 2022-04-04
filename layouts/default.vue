<template>
  <v-app dark>
    <Header />
    <v-main>
      <nuxt />
    </v-main>
  </v-app>
</template>

<script>
import Header from "~/components/common/Header";

export default {
  components: {
    Header
  },
  methods: {},
};
</script>
