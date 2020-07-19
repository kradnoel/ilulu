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
        <v-card-title>RESIDENTE</v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <v-form ref="form" v-model="valid" @submit.prevent="submit">
            <v-col align="center">
              <v-row class="d-flex" cols="12" sm="6" md="4">
                <v-text-field
                  v-model="form.firstName"
                  filled
                  :rules="firstNameRules"
                  validate
                  required
                  label="Nome do Residente"
                />
              </v-row>
              <v-row class="d-flex" cols="12" sm="6" md="4">
                <v-text-field
                  v-model="form.lastName"
                  filled
                  :rules="lastNameRules"
                  validate
                  required
                  label="Sobrenome do Residente"
                />
              </v-row>
              <v-row class="d-flex" cols="12" sm="6" md="4">
                <v-select
                  v-model="select"
                  :items="TypeDocuments"
                  :rules="[
                    (v) => !!v || '*Tipo de Documento de Identidade em falta'
                  ]"
                  filled
                  label="Escolha o tipo de Documento de Identidade"
                />
              </v-row>
              <v-row class="d-flex" cols="12" sm="6" md="4">
                <v-text-field
                  v-model="form.docNumber"
                  filled
                  validate
                  :rules="[
                    (v) => !!v || '*Codigo do Documento de Identidade em falta'
                  ]"
                  required
                  label="Codigo do Documento de Identidade"
                />
              </v-row>
              <v-row class="d-flex" cols="12" sm="6" md="12">
                <date-picker
                  v-model="form.birthDate"
                  style="width: 100vh;"
                  value-type="format"
                  format="YYYY-DD-MM"
                >
                  <v-text-field
                    slot="input"
                    v-model="form.birthDate"
                    filled
                    validate
                    required
                    :rules="[(v) => !!v || '*Data de Nascimento em falta']"
                    label="Data de Nascimento"
                  />
                  <v-icon slot="icon-calendar">
                    {{ mdi_calendar }}
                  </v-icon>
                </date-picker>
              </v-row>
              <v-row class="d-flex" cols="12" sm="6" md="4">
                <v-select
                  v-model="select2"
                  :items="TypeResident"
                  filled
                  :rules="[(v) => !!v || '*Tipo de Residente em falta']"
                  label="Tipo de Residente"
                />
              </v-row>
              <v-row class="d-flex" cols="12" sm="6" md="4">
                <v-select
                  v-model="select1"
                  :items="OrphanClientAccounts"
                  filled
                  label="Escolha a conta"
                />
              </v-row>
            </v-col>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="save()">
            Adicionar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>
<style>
.mx-icon-calendar,
.mx-icon-clear {
  position: absolute;
  top: 40%;
  right: 15px;
}
</style>
<script>
import { mdiClose, mdiInformationOutline, mdiCalendar } from '@mdi/js'
import DatePicker from 'vue2-datepicker'
import 'vue2-datepicker/index.css'

export default {
  components: { DatePicker },
  data() {
    return {
      mdi_info: mdiInformationOutline,
      mdi_close: mdiClose,
      mdi_calendar: mdiCalendar,
      valid: false,
      form: {
        firstName: null,
        lastName: null,
        docNumber: '',
        birthDate: null
      },
      select: null,
      select1: null,
      select2: null,
      TypeResident: [
        {
          text: 'OWNER'
        },
        {
          text: 'TENANT'
        }
      ],
      firstNameRules: [
        (v) => !!v || 'Nome em falta',
        (v) => (v && v.length >= 2) || '*Tem que ter mais de 2 caracteres'
      ],
      lastNameRules: [
        (v) => !!v || 'Sobrenome em falta',
        (v) => (v && v.length >= 2) || '*Tem que ter mais de 2 caracteres'
      ]
    }
  },
  computed: {
    TypeDocuments: {
      get() {
        return this.$store.getters.TypeDocuments
      }
    },
    OrphanClientAccounts: {
      get() {
        return this.$store.getters.OrphanClientAccounts
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
  created() {
    this.initialize()
  },
  methods: {
    initialize() {
      this.$store
        .dispatch('fetchTypeDocuments')
        .then((r) => '')
        .catch((e) => '')
      this.$store
        .dispatch('fetchOrphanClientAccounts')
        .then((r) => '')
        .catch((e) => '')
    },
    save() {
      if (this.$refs.form.validate()) {
        const data = {}
        data.firstName = this.form.firstName
        data.lastName = this.form.lastName
        data.birthDate = this.form.birthDate
        data.docNumber = this.form.docNumber
        data.docType = this.select
        data.account = this.select1
        data.type = this.select2
        console.log(data)
        this.$store
          .dispatch('createResident', data)
          .then((r) => {
            this.$refs.form.reset()
          })
          .catch((e) => '')
      }
    }
  }
}
</script>
