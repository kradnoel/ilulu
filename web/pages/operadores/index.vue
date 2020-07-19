<template>
  <v-layout>
    <div>
      <v-container grid-list-md text-md-center fluid fill-height>
        <v-col>
          <v-flex md12>
            <v-row>
              <v-breadcrumbs :items="items" />
            </v-row>
            <v-row>
              <v-data-table
                :headers="headers"
                :items="Operators"
                class="elevation-1"
              >
                <template v-slot:top>
                  <v-toolbar bold color="white">
                    <v-toolbar-title style="color: black;">
                      Operatores
                    </v-toolbar-title>
                    <v-divider class="mx-4" inset vertical></v-divider>
                    <v-spacer></v-spacer>
                    <v-btn
                      color="primary"
                      dark
                      class="mb-2"
                      link
                      to="/operators/criar"
                    >
                      Novo Operador
                    </v-btn>
                  </v-toolbar>
                </template>
                <template v-slot:item.actions="{ item }">
                  <!-- <v-icon small class="mr-2" @click="editItem(item)"> -->
                  <v-btn color="grey darken-1" icon link :to="getId(item)">
                    <v-icon small>
                      mdi-pencil
                    </v-icon>
                  </v-btn>
                  <!-- </v-icon> -->
                  <v-icon small @click="deleteItem(item)">
                    mdi-delete
                  </v-icon>
                </template>
              </v-data-table>
            </v-row>
          </v-flex>
        </v-col>
      </v-container>
    </div>
  </v-layout>
</template>
<style>
/*
.mx-input {
  background-color: red;
  padding: 2em;
  width: 100vh;
}
*/

.mx-icon-calendar,
.mx-icon-clear {
  position: absolute;
  top: 40%;
  right: 15px;
}
</style>
<script>
export default {
  data() {
    return {
      dialog: false,
      editedIndex: -1,
      date: null,
      select: null,
      select1: null,
      menu: false,
      form: {
        firstName: '',
        lastName: '',
        docNumber: '',
        birthDate: null
      },
      valid: false,
      items: [
        {
          text: 'Dashboard',
          disabled: false,
          href: '/'
        },
        {
          text: 'Operadores',
          disabled: true,
          href: '/operadores'
        }
      ],
      headers: [
        { text: '#', value: 'id', align: 'center' },
        { text: 'Nome', value: 'firstName', align: 'center' },
        { text: 'Sobrenome', value: 'lastName', align: 'center' },
        {
          text: 'Nome de Utilizador',
          value: 'Account.username',
          align: 'center'
        },
        { text: 'Opcoes', value: 'actions', align: 'center', sortable: false }
      ],
      values: [],
      nameRules: [
        (v) => !!v || 'Name do utilizador e obrigatorio',
        (v) => (v && v.length <= 10) || '*Tem que ter menos de 10 caracteres'
      ]
    }
  },
  computed: {
    Operators: {
      get() {
        return this.$store.getters.Operators
      }
      // set(value) {
      //   this.$store.commit('setAlertActive', value)
      // }
    }
  },
  watch: {},
  created() {
    this.initialize()
  },
  methods: {
    initialize() {
      this.$store
        .dispatch('fetchOperators')
        .then((r) => '')
        .catch((e) => '')
    },
    editItem(item) {
      this.editedIndex = this.values.indexOf(item)
      this.form = Object.assign({}, item)
      // this.form.state = this.getState(this.form.state)
      // console.log(this.form)
      this.dialog = true
    },
    save() {},
    getId(item) {
      return `/operadores/${item.id}`
    }
  }
}
</script>
