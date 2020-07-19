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
                :items="Residents"
                class="elevation-1"
              >
                <template v-slot:top>
                  <v-toolbar bold color="white">
                    <v-toolbar-title style="color: black;">
                      Residentes
                    </v-toolbar-title>
                    <v-divider class="mx-4" inset vertical></v-divider>
                    <v-spacer></v-spacer>
                    <v-btn
                      color="primary"
                      dark
                      class="mb-2"
                      link
                      to="/residentes/criar"
                    >
                      Novo Residente
                    </v-btn>
                  </v-toolbar>
                </template>
                <template v-slot:item.actions="{ item }">
                  <v-btn color="grey darken-1" icon link :to="getId(item)">
                    <v-icon small>
                      mdi-pencil
                    </v-icon>
                  </v-btn>
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
<script>
export default {
  data() {
    return {
      items: [
        {
          text: 'Dashboard',
          disabled: false,
          href: '/'
        },
        {
          text: 'Residentes',
          disabled: true,
          href: '/residentes'
        }
      ],
      headers: [
        { text: '#', value: 'id', align: 'center' },
        { text: 'Nome', value: 'firstName', align: 'center' },
        { text: 'Sobrenome', value: 'lastName', align: 'center' },
        { text: 'Tipo', value: 'type', align: 'center' },
        {
          text: 'Nome de Utilizador',
          value: 'Account.username',
          align: 'center'
        },
        { text: 'Opcoes', value: 'actions', align: 'center', sortable: false }
      ]
    }
  },
  computed: {
    Residents: {
      get() {
        return this.$store.getters.Residents
      }
    }
  },
  created() {
    this.initialize()
  },
  methods: {
    initialize() {
      this.$store
        .dispatch('fetchResidents')
        .then((r) => '')
        .catch((e) => '')
    },
    getId(item) {
      return `/residentes/${item.id}`
    },
    deleteItem(item) {
      this.$store
        .dispatch('deleteResident', { id: item.id })
        .then((r) => '')
        .catch((e) => '')
    }
  }
}
</script>
