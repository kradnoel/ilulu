<template>
  <v-layout>
    <div>
      <v-container grid-list-md text-md-center fluid fill-height>
        <v-breadcrumbs :items="items" />
        <v-data-table :headers="headers" :items="Accounts" class="elevation-1">
          <template v-slot:top>
            <v-toolbar bold color="white">
              <v-toolbar-title style="color: black;">
                Contas
              </v-toolbar-title>
              <v-divider class="mx-4" inset vertical></v-divider>
              <v-spacer></v-spacer>
              <v-btn color="primary" dark class="mb-2" link to="/contas/criar">
                Nova Conta
              </v-btn>
              <v-dialog v-model="dialog" bold max-width="500px">
                <v-card>
                  <v-card-title>
                    <span class="headline">{{ formTitle }}</span>
                  </v-card-title>
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
                            disabled
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
                      Modificar
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-toolbar>
          </template>
          <template v-slot:item.actions="{ item }">
            <v-icon small class="mr-2" @click="editItem(item)">
              mdi-pencil
            </v-icon>
            <v-icon small @click="deleteItem(item)">
              mdi-delete
            </v-icon>
          </template>
        </v-data-table>
      </v-container>
    </div>
  </v-layout>
</template>
<script>
export default {
  data() {
    return {
      formTitle: 'Criar Conta',
      dialog: false,
      editedIndex: -1,
      headers: [
        { text: '#', value: 'id', align: 'center' },
        { text: 'Nome de Utilizador', value: 'username', align: 'center' },
        { text: 'Tipo', value: 'role', align: 'center' },
        { text: 'Esta activo?', value: 'isActive', align: 'center' },
        { text: 'Opcoes', value: 'actions', align: 'center', sortable: false }
      ],
      values: [],
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
      ],
      items: [
        {
          text: 'Dashboard',
          disabled: false,
          href: '/'
        },
        {
          text: 'Contas',
          disabled: true,
          href: '/contas'
        }
      ]
    }
  },
  computed: {
    Accounts: {
      get() {
        return this.$store.getters.Accounts
      }
      // set(value) {
      //   this.$store.commit('setAlertActive', value)
      // }
    }
  },
  watch: {
    select(val) {}
  },
  created() {
    this.initialize()
  },
  methods: {
    initialize() {
      this.$store
        .dispatch('fetchAccounts')
        .then((r) => '')
        .catch((e) => '')
    },
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
      // eslint-disable-next-line
      //  console.log(this.form)
      if (this.$refs.form.validate()) {
        const data = {}
        data.username = this.form.username
        data.password = this.form.password
        data.isActive = this.changeIsActive(this.form.select)
        data.role = this.changeIsAccountType(this.form.select1)
        //  console.log(data)
        this.$store
          .dispatch('updateAccount', data)
          .then((r) => {
            this.$refs.form.reset()
          })
          .catch((e) => '')
      }
    },
    deleteItem(item) {
      this.$store
        .dispatch('deleteAccount', { id: item.id })
        .then((r) => '')
        .catch((e) => '')
    },
    editItem(item) {
      this.editedIndex = this.values.indexOf(item)
      this.form = Object.assign({}, item)
      // this.form.state = this.getState(this.form.state)
      // console.log(this.form)
      this.dialog = true
    }
  }
}
</script>
