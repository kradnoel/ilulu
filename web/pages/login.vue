<template>
  <v-container>
    <v-layout wrap>
      <v-flex sm12 md6 offset-md3>
        <v-alert v-model="isAlertActive" :type="alertType" dismissible>
          {{ alertMessage }}
        </v-alert>
        <v-card elevation="4" light tag="section">
          <v-divider></v-divider>
          <v-card-text>
            <v-form @submit.prevent="submit">
              <v-text-field v-model="form.username" outlined label="Username" />
              <v-text-field
                v-model="form.password"
                outlined
                hide-details
                type="password"
                label="Password"
              />
            </v-form>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions :class="{ 'pa-3': $vuetify.breakpoint.smAndUp }">
            <v-btn color="info" text>
              Forgot password?
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn
              color="info"
              :large="$vuetify.breakpoint.smAndUp"
              @click="login"
            >
              <v-icon left>mdi-lock</v-icon>
              Login
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<style scoped>
.text-definition {
  border-radius: 5%;
  backgroud-color: red;
}
.v-btn,
.v-card {
  border-radius: 4px;
}

.v-card__title {
  text-transform: uppercase;
}
</style>
<script>
export default {
  layout: 'basic',
  data() {
    return {
      form: {
        username: '',
        password: ''
      },
      platformName: 'ILULU'
    }
  },
  computed: {
    loggedIn: {
      get() {
        return this.$store.getters.loggedIn
        // return true
      }
      // return this.$auth.loggedIn
    },
    token: {
      get() {
        return this.$store.getters.getToken
      }
    },
    isAlertActive: {
      get() {
        return this.$store.getters.isAlertActive
      },
      set(value) {
        this.$store.commit('setAlertActive', value)
      }
    },
    alertType: {
      get() {
        return this.$store.getters.alertType
      }
    },
    alertMessage: {
      get() {
        return this.$store.getters.alertMessage
      }
    }
  },
  methods: {
    initiateAlert() {
      this.$store.commit('setAlertActive', false)
    },
    login() {
      // const res = await this.$api.get('http://localhost:3001/Equipaments')
      // eslint-disable-next-line
      // localStorage.setItem('access_token',`eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImRqYW1hbCIsInJvbGUiOiJDTElFTlQiLCJpYXQiOjE1OTM4NzMwNjF9.IoMUErcyjVN2mEjjCG_KQc6Kla7ZBHy6hQ2iaCs72p8`)
      // eslint-disable-next-line
     // console.log(`resultado = ${res}`)
      this.$store
        .dispatch('login', this.form)
        .then(() => this.$nuxt.$router.replace({ path: '/' }))
        .catch(() => '')
    }
  }
}
</script>
