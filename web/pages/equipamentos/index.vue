<template>
  <v-layout>
    <div>
      <v-container grid-list-md text-md-center fluid fill-height>
        <v-breadcrumbs :items="items" />
        <v-data-table :headers="headers" :items="values" class="elevation-1">
          <template v-slot:item.state="{ item }">
            <v-chip :color="getColor(item.state)" dark>
              {{ getState(item.state) }}
            </v-chip>
          </template>
          <template v-slot:top>
            <v-toolbar bold color="white">
              <v-toolbar-title style="color: black;">
                Equipamentos
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
                    Novo Equipamento
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
                            v-model="form.description"
                            filled
                            label="Descricao do Equipamento"
                          />
                        </v-row>
                        <v-row class="d-flex" cols="12" sm="6" md="4">
                          <v-select
                            v-model="form.state"
                            :items="states"
                            filled
                            label="Estado do Equipamento"
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
<style scoped>
.ct {
  padding: 2.5em;
}
</style>
<script>
export default {
  data() {
    return {
      dialog: false,
      editedIndex: -1,
      values: [],
      states: ['Avariado', 'Em reparacao', 'Em bom estado'],
      form: {
        id: 0,
        description: '',
        state: 1
      },
      defaultForm: {
        description: '',
        state: 1
      },
      items: [
        {
          text: 'Dashboard',
          disabled: false,
          href: '/'
        },
        {
          text: 'Equipamentos',
          disabled: true,
          href: '/equipamentos'
        }
      ],
      headers: [
        { text: '#', value: 'id', align: 'center' },
        { text: 'Descricao', value: 'description', align: 'center' },
        { text: 'Estado', value: 'state', align: 'center' },
        { text: 'Opcoes', value: 'actions', align: 'center', sortable: false }
      ]
    }
  },
  computed: {
    formTitle() {
      return this.editedIndex === -1
        ? 'Inserir Equipamento'
        : 'Modificar Equipamento'
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
      const index = (this.states.indexOf(this.form.state) ?? 0) + 1
      const data = {
        id: this.form.id,
        description: this.form.description,
        state: index
      }
      // editing
      if (this.editedIndex > -1) {
        await this.$api.put('/equipaments/update', data)
        // creating new data
      } else {
        await this.$api.post('/equipaments/create', data)
      }
      this.$nextTick(() => {
        this.getData()
      })
      this.close()
    },
    editItem(item) {
      this.editedIndex = this.values.indexOf(item)
      this.form = Object.assign({}, item)
      this.form.state = this.getState(this.form.state)
      this.dialog = true
    },
    deleteItem(item) {},
    getData() {
      this.$api
        .get('/equipaments')
        .then((result) => {
          const res = result.data.data
          this.values = res
        })
        .catch((error) => {
          // eslint-disable-next-line
          console.log(error)
        })
    },
    getColor(state) {
      switch (state) {
        case 'GOOD':
          return 'green'
        case 'REPAIRING':
          return 'orange'
        case 'DAMAGED':
          return 'red'
      }
    },
    getState(state) {
      switch (state) {
        case 'GOOD':
          return this.states[2]
        case 'REPAIRING':
          return this.states[1]
        case 'DAMAGED':
          return this.states[0]
      }
    }
  }
}
/* export default {
  data() {
    return {
      dialog: false,
      items: [
        {
          text: 'Dashboard',
          disabled: false,
          href: '/'
        },
        {
          text: 'Equipamentos',
          disabled: true,
          href: '/equipamentos'
        }
      ],
      watch: {
        dialog(val) {
          val || this.close()
        }
      },
      methods: {
        getData() async {
          var data = await this.$axios.get('/visitors');
          console.log(data);
        },
        close() {
          this.dialog = false
          this.$nextTick(() => {})
        },
        editItem(item) {},
        deleteItem(item) {}
      }
    }
  }
}
*/
</script>
