<template>
  <v-layout wrap>
    <v-flex sm12 md12 offset-md0>
      <v-card elevation="4" light tag="section">
        <v-card-title>OPERADOR</v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <v-form ref="form" v-model="valid" @submit.prevent="submit">
            <v-col align="center">
              <v-row class="d-flex" cols="12" sm="6" md="4">
                <v-text-field
                  v-model="form.firstName"
                  filled
                  validate
                  required
                  label="Nome do Operador"
                />
              </v-row>
              <v-row class="d-flex" cols="12" sm="6" md="4">
                <v-text-field
                  v-model="form.lastName"
                  filled
                  validate
                  required
                  label="Sobrenome do Operador"
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
                  required
                  label="Codigo do Documento de Identidade"
                />
              </v-row>
              <v-row class="d-flex" cols="12" sm="6" md="4">
                <v-select
                  v-model="select1"
                  :items="OrphanAccounts"
                  filled
                  label="Escolha a conta"
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
                    label="Data de Nascimento"
                  />
                  <v-icon slot="icon-calendar">
                    {{ mdi_calendar }}
                  </v-icon>
                </date-picker>
              </v-row>
            </v-col>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="save()">
            Modificar
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
import { mdiCalendar } from '@mdi/js'
import DatePicker from 'vue2-datepicker'
import 'vue2-datepicker/index.css'

export default {
  components: { DatePicker },
  data() {
    return {
      form: {},
      valid: false,
      select: null,
      select1: null,
      mdi_calendar: mdiCalendar,
      nameRules: [
        (v) => !!v || 'Name do utilizador e obrigatorio',
        (v) => (v && v.length <= 10) || '*Tem que ter menos de 10 caracteres'
      ]
    }
  },
  computed: {
    OperatorItem: {
      get() {
        return this.$store.getters.OperatorItem
      }
    },
    TypeDocuments: {
      get() {
        return this.$store.getters.TypeDocuments
      }
    },
    OrphanAccounts: {
      get() {
        return this.$store.getters.OrphanAccounts
      }
    }
  },
  created() {
    this.initialize()
  },
  methods: {
    initialize() {
      this.$store
        .dispatch('fetchOperatorItem', {
          id: this.$route.params.id
        })
        .then(() => {
          this.form = Object.assign({}, this.OperatorItem)
        })
        .catch((e) => '')
      this.$store
        .dispatch('fetchTypeDocuments')
        .then((r) => '')
        .catch((e) => '')
      this.$store
        .dispatch('fetchOrphanAccounts')
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
        data.account =
          this.select1 == null ? this.form.Account.username : this.select1
        console.log(data)
      }
    }
  }
}
</script>
