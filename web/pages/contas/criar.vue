<template>
  <v-layout wrap>
    <v-flex sm12 md12 offset-md0>
      <v-alert
        v-model="isAlertActive"
        :type="alertType"
        :close-icon="mdi_close"
        :icon="mdi_info"
        dismissible
      >
        {{ alertMessage }}
      </v-alert>
      <v-card elevation="4" light tag="section">
        <v-card-title>NOVA CONTA</v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <v-form ref="form" v-model="valid" @submit.prevent="submit">
            <v-col align="center">
              <v-row class="d-flex" cols="12" sm="6" md="4">
                <v-text-field
                  v-model="form.username"
                  filled
                  :rules="nameRules"
                  validate
                  required
                  label="Nome de Utilizador"
                />
              </v-row>
              <v-row class="d-flex" cols="12" sm="6" md="4">
                <v-text-field
                  v-model="form.password"
                  filled
                  validate
                  :rules="passwordRule"
                  required
                  label="Senha"
                />
              </v-row>
              <br />
              <v-row class="d-flex" cols="12" sm="6" md="4">
                <v-select
                  v-model="form.select1"
                  label="Tipo da conta"
                  :items="selections1"
                  :rules="[(v) => !!v || '*Tipo de conta em falta']"
                  filled
                />
              </v-row>
              <br />
              <v-row class="d-flex" cols="12" sm="6" md="4">
                <v-select
                  v-model="form.select"
                  :items="selections"
                  :rules="[(v) => !!v || '*Estado em falta']"
                  required
                  filled
                  label="Estado da conta"
                />
              </v-row>
            </v-col>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="save()">
            Criar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>
<script>
import { mdiClose, mdiInformationOutline } from '@mdi/js'

export default {
  data() {
    return {
      mdi_info: mdiInformationOutline,
      mdi_close: mdiClose,
      nameRules: [
        (v) => !!v || 'Name do utilizador e obrigatorio',
        (v) => (v && v.length <= 10) || '*Tem que ter menos de 10 caracteres'
      ],
      passwordRule: [
        (v) => !!v || 'Senha e obrigatoria',
        (v) =>
          (v && v.length <= 5) || '*A senha tem que ter menos de 10 caracteres'
      ],
      valid: false,
      form: {
        username: '',
        password: '',
        isActive: null,
        type: null
      },
      select: null,
      select1: null,
      selections: [
        {
          text: 'ACTIVO'
        },
        {
          text: 'DESACTIVO'
        }
      ],
      selections1: [
        {
          text: 'CLIENT'
        },
        {
          text: 'OPERATOR'
        },
        {
          text: 'ADMIN'
        }
      ],
      activeChoice: [
        {
          state: 1,
          value: 'ACTIVO'
        },
        {
          state: 0,
          value: 'DESACTIVO'
        }
      ],
      accountType: [
        {
          id: 1,
          value: 'ADMIN'
        },
        {
          id: 2,
          value: 'OPERATOR'
        },
        {
          id: 3,
          value: 'CLIENT'
        }
      ]
    }
  },
  computed: {
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
  watch: {
    select(val) {
      if (val === 'Activo') {
        this.form.isActive = 1
      } else {
        this.form.isActive = 0
      }
    }
  },
  methods: {
    changeIsActive(val) {
      let result = 0
      this.activeChoice.forEach((item) => {
        if (item.value === val) {
          result = item.state
        }
      })
      return result
    },
    changeIsAccountType(val) {
      let result = 0
      this.accountType.forEach((item) => {
        if (item.value === val) {
          result = item.id
        }
      })

      return result
    },
    save() {
      if (this.$refs.form.validate()) {
        const data = {}
        data.username = this.form.username
        data.password = this.form.password
        data.isActive = this.changeIsActive(this.form.select)
        data.role = this.changeIsAccountType(this.form.select1)
        this.$store
          .dispatch('createAccount', data)
          .then((r) => {
            this.$refs.form.reset()
          })
          .catch((e) => '')
      }
    }
  }
}
</script>
