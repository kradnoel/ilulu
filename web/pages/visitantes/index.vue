<template>
  <v-layout>
    <div>
      <v-container grid-list-md text-md-center fluid fill-height>
        <v-breadcrumbs :items="items" />
        <v-data-table :headers="headers" :items="values" class="elevation-1">
        </v-data-table>
      </v-container>
    </div>
  </v-layout>
</template>
<script>
export default {
  data() {
    return {
      values: [],
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
  created() {
    this.initialize()
  },
  methods: {
    initialize() {
      this.getData()
    },
    async getData() {
      const data = await this.$api.get('/visitors')
      this.values = data.data.data
      // eslint-disable-next-line
      console.log(data)
    }
  }
}
</script>
