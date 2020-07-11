<template>
  <v-layout>
    <div>
      <v-container grid-list-md text-md-center fluid fill-height>
        <v-breadcrumbs :items="items" />
        <v-data-table :headers="headers" :items="values" class="elevation-1">
          <template v-slot:top>
            <v-toolbar bold color="white">
              <v-toolbar-title style="color: black;">
                Visitantes
              </v-toolbar-title>
              <v-divider class="mx-4" inset vertical></v-divider>
              <v-spacer></v-spacer>
              <v-dialog v-model="dialog" bold max-width="500px">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    color="primary"
                    dark
                    class="mb-2"
                    v-bind="attrs"
                    v-on="on"
                  >
                    Novo Visitante
                  </v-btn>
                </template>
                <v-card>
                  <v-card-title>
                    <span class="headline">{{ formTitle }}</span>
                  </v-card-title>
                  <v-card-text>
                    <v-container>
                      <v-col align="center">
                        <v-row class="d-flex" cols="12" sm="6" md="4">
                          <v-text-field
                            v-model="form.fullName"
                            filled
                            label="Nome Completo"
                          />
                        </v-row>
                        <v-row class="d-flex" cols="12" sm="6" md="4">
                          <v-text-field
                            v-model="form.docNumber"
                            filled
                            label="Numero do Documento"
                          />
                        </v-row>
                        <v-row class="d-flex" cols="12" sm="6" md="4">
                          <v-select
                            v-model="form.entryDate"
                            filled
                            label="Data de Entrada"
                          />
                        </v-row>
                      </v-col>
                    </v-container>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="close()">
                      cancelar
                    </v-btn>
                    <v-btn color="blue darken-1" text @click="save()">
                      Guardar
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
          <template v-slot:no-data>
            <v-btn color="primary" @click="initialize">Reset</v-btn>
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
      dialog: false,
      editedIndex: -1,
      values: [],
      form: {
        fullName: '',
        docNumber: '',
        entryDate: ''
      },
      defaultForm: {
        fullName: '',
        docNumber: '',
        entryDate: ''
      },
      items: [
        {
          text: 'Dashboard',
          disabled: false,
          href: '/'
        },
        {
          text: 'Visitantes',
          disabled: true,
          href: '/visitantes'
        }
      ],
      headers: [
        { text: '#', value: 'id', align: 'center' },
        { text: 'Nome', value: 'fullName', align: 'center' },
        { text: 'Identidade', value: 'docNumber', align: 'center' },
        { text: 'Entrada', value: 'entryDate', align: 'center' },
        { text: 'Opcoes', value: 'actions', align: 'center', sortable: false }
      ]
    }
  },
  computed: {
    formTitle() {
      return this.editedIndex === -1
        ? 'Inserir Visitante'
        : 'Modificar Visitante'
    }
  },
  watch: {
    dialog(val) {
      val || this.close()
    }
  },
  created() {
    this.initialize()
  },
  methods: {
    initialize() {
      this.getData()
    },
    close() {
      this.dialog = false
      this.$nextTick(() => {
        this.form = Object.assign({}, this.defaultForm)
        this.editedIndex = -1
      })
    },
    // async create() {
    async save() {
      // const index = (this.states.indexOf(this.form.state) ?? 0) + 1
      const data = {
        id: this.form.id,
        fullName: this.form.fullName,
        docNumber: this.form.docNumber,
        entryDate: this.form.entryDate
        // state: index
      }
      // editing
      if (this.editedIndex > -1) {
        await this.$api.put('/visitors/update', data)
        // creating new data
      } else {
        await this.$api.post('/visitors/create', data)
      }
      this.$nextTick(() => {
        this.getData()
      })
      this.close()
    },
    editItem(item) {},
    deleteItem(item) {},
    async getData() {
      const data = await this.$api.get('/visitors')
      this.values = data.data.data
      // eslint-disable-next-line
      console.log(data)
    }
  }
}
</script>
