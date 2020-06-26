<template>
  <v-layout>
    <div>
      <v-container grid-list-md text-md-center fluid fill-height>
        <v-breadcrumbs :items="items" />
        <v-data-table :headers="headers" :items="values" class="elevation-1">
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
                      <v-row></v-row>
                    </v-container>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="close()">
                      cancelar
                    </v-btn>
                    <v-btn color="blue darken-1" text @click="create()">
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
      states: ['DAMAGED', 'REPAIRING', 'GOOD'],
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
      // this.values = [
      //  { id: '1', codigo: '1xWz12q', descricao: 'Blalala' },
      //  { id: '2', codigo: '1xWz45q', descricao: 'Blalala' },
      //  { id: '3', codigo: '1xWz23q', descricao: 'Blalala' }
      // ]
    },
    close() {
      this.dialog = false
      // this.$nextTick(() => {})
    },
    async create() {
      const data = await this.$api.post('/equipaments/create', {
        description: 'Elevador',
        state: 3
      })
      // eslint-disable-next-line
      console.log(data)
    },
    editItem(item) {},
    deleteItem(item) {},
    getData() {
      this.$api
        .get('/equipaments')
        .then((result) => {
          const res = result.data.data
          this.values = res
          // eslint-disable-next-line
          console.log(this.values)
        })
        .catch((error) => {
          // eslint-disable-next-line
          console.log(error)
        })
      // eslint-disable-next-line
      // console.log(data)
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
