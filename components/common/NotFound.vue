<template>
  <div class="my-4 d-flex flex-column align-center">
    <v-row>
        <span class="primary--text not-found-error">4</span>
        <span class="neutral--text not-found-error">0</span>
        <span class="primary--text not-found-error">4</span>
    </v-row>

    <v-row class="not-found-description">There is nothing found :'( </v-row>
</div>
</template>

<script>

export default {
  name:'weather-not-found',
  data() {
    return {};
  }
};
</script>

<style lang="scss">
.not-found-error {
  font-size: 120px;
  font-weight: bold;
}
.not-found-description {
  font-size: 60px;
  font-weight: bold;
}
</style>
