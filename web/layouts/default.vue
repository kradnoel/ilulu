<template>
  <v-app>
    <v-app-bar app color="primary" dark elevation="0">
      <v-app-bar-nav-icon @click.stop="sidebarMenu = !sidebarMenu" />
      <v-spacer></v-spacer>
      <v-icon>mdi-brightness-3</v-icon>
      <v-btn color="primary" class="mr-2" @click="toggleTheme">
        <v-icon>{{ iconType }}</v-icon>
      </v-btn>
      <v-icon>mdi-brightness-7</v-icon>
    </v-app-bar>
    <v-navigation-drawer
      v-model="sidebarMenu"
      app
      floating
      :permanent="sidebarMenu"
      :mini-variant.sync="mini"
    >
      <v-list nav color="primary" dark>
        <v-list-item dense>
          <v-list-item-action>
            <v-icon @click.stop="sidebarMenu = !sidebarMenu">
              mdi-chevron-left
            </v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>
              <h3 class="font-weight-thin">ILULU Dashboard</h3>
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item @click="toggleMini = !toggleMini">
          <v-list-item-avatar>
            <v-icon left>mdi-account-outline</v-icon>
          </v-list-item-avatar>
          <v-list-item-content class="text-truncate">
            Nome Sobrenome
          </v-list-item-content>
          <v-btn icon small>
            <v-icon>mdi-chevron-left</v-icon>
          </v-btn>
        </v-list-item>
        <v-divider></v-divider>
        <v-list>
          <v-list-item
            v-for="item in items"
            :key="item.title"
            link
            :to="item.href"
          >
            <v-list-item-icon>
              <v-icon>
                {{ item.icon }}
              </v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>
                {{ item.title }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item @click="logoutUser">
            <v-list-item-icon>
              <v-icon>
                mdi-power
              </v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>
                Logout
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-list>
    </v-navigation-drawer>
    <v-main>
      <v-container class="px-4 py-0 fill-height" fluid>
        <v-row class="fill-height">
          <v-col>
            <transition name="fade">
              <nuxt />
            </transition>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
    <v-footer class="py-3">
      <span class="ml-auto overline">
        ILULU &copy;2020. Developed by FireDevz
      </span>
    </v-footer>
  </v-app>
</template>
<style>
.fade-enter-active,
.fade-leave-active {
  transition-property: opacity;
  transition-duration: 0.25s;
}

.fade-enter-active {
  transition-delay: 0.25s;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
}
/*
.v-navigation-drawer__content {
  background-color: red;
  background-color: #03a9f4 !important;
  border-color: #03a9f4 !important;
}
*/

.theme--light.v-navigation-drawer {
  background: #eee;
}

.theme--light.v-application::-webkit-scrollbar {
  width: 13px;
}

.theme--light.v-application::-webkit-scrollbar-track {
  background: #e6e6e6;
  border-left: 1px solid #dadada;
}

.theme--light.v-application::-webkit-scrollbar-thumb {
  background: #b0b0b0;
  border: solid 3px #e6e6e6;
  border-radius: 7px;
}

.theme--light.v-application::-webkit-scrollbar-thumb:hover {
  background: red;
}

.theme--dark.v-application::-webkit-scrollbar {
  width: 13px;
}

.theme--dark.v-application::-webkit-scrollbar-track {
  background: #202020;
  border-left: 1px solid #2c2c2c;
}

.theme--dark.v-application::-webkit-scrollbar-thumb {
  background: #3e3e3e;
  border: solid 3px #202020;
  border-radius: 7px;
}

.theme--dark.v-application::-webkit-scrollbar-thumb:hover {
  background: red;
}
</style>
<script>
import { mdiMenu } from '@mdi/js'

export default {
  middleware: 'authenticated',
  data() {
    return {
      mdi_menu: mdiMenu,
      sidebarMenu: true,
      toggleMini: false,
      isDark: true,
      items: [
        {
          title: 'Inicio',
          href: '/',
          icon: 'mdi-home-outline'
        },
        {
          title: 'Contas',
          href: '/contas',
          icon: 'mdi-shield-account'
        },
        {
          title: 'Equipamentos',
          href: '/equipamentos',
          icon: 'mdi-stove'
        },
        {
          title: 'Visitantes',
          href: '/visitantes',
          icon: 'mdi-account-clock-outline'
        },
        {
          title: 'Settings',
          href: '/settings',
          icon: 'mdi-cog-outline'
        }
      ]
    }
  },
  computed: {
    mini() {
      return this.$vuetify.breakpoint.smAndDown || this.toggleMini
    },
    iconType() {
      return !this.$vuetify.theme.dark ? 'mdi-ray-end' : 'mdi-ray-start'
    }
  },
  methods: {
    toggleTheme() {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark
      this.isDark = !this.isDark
    },
    logoutUser() {
      this.$store.dispatch('logout')
      this.$nuxt.$router.replace({ path: '/login' })
    }
  }
}
</script>
