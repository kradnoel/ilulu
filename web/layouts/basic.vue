<template>
  <v-app
    app
    data-app="true"
    class="v-application v-application--is-ltr theme--dark"
  >
    <v-container class="v-application--wrap">
      <nuxt />
      <v-footer :fixed="fixed" app class="py-3">
        <span class="ml-auto overline">
          <span> ILULU &copy;2020. Developed by FireDevz</span>
        </span>
      </v-footer>
    </v-container>
  </v-app>
</template>
<script>
export default {
  data() {
    return {
      dark: false,
      light: true,
      fixed: false
    }
  }
}
</script>
