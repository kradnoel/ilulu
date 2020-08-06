<template>
  <div>
    <nav class="main-header navbar navbar-expand navbar-white navbar-light">
      <!-- Left navbar links -->
      <ul class="navbar-nav">
        <li class="nav-item">
          <a class="nav-link" data-widget="pushmenu" href="#" role="button">
            <i class="fas fa-bars"></i>
          </a>
        </li>
      </ul>
    </nav>
    <!-- /.navbar -->

    <!-- Main Sidebar Container -->
    <aside class="main-sidebar sidebar-dark-primary elevation-4">
      <!-- Brand Logo -->
      <a href="/" class="brand-link" style="text-align:center; margin:auto;">
        <span>ILULU</span>
      </a>
      <!-- Sidebar -->
      <div class="sidebar">
        <nav class="mt-2">
          <ul
            class="nav nav-pills nav-sidebar flex-column"
            data-widget="treeview"
            role="menu"
            data-accordion="false"
          >
            <li v-for="item in items" :key="item.title" class="nav-item">
              <a :href="item.href" class="nav-link">
                <i :class="item.icon"></i>
                <p>{{ item.title }}</p>
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#" @click="save">
                <i class="nav-icon fas fa-power-off"></i>
                <p>Logout</p>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </aside>
    <div class="content-wrapper">
      <transition name="fade">
        <nuxt />
      </transition>
    </div>
    <!-- Main Footer -->
    <footer class="main-footer">
      <!-- To the right -->
      <div class="float-right d-none d-sm-inline">
        <strong>Developed by FIREDEV</strong>
      </div>
      <!-- Default to the left -->
      <strong>Copyright &copy; 2020 ILULU.</strong> All rights reserved.
    </footer>
  </div>
</template>
<script>
export default {
  data() {
    return {
      nav: 'main-header navbar navbar-expand navbar-white navbar-light',
      items: [
        {
          title: 'Inicio',
          href: '/',
          icon: 'nav-icon fas fa-home'
        },
        {
          title: 'Contas',
          href: '/contas',
          icon: 'nav-icon fas fa-shield-alt'
        },
        {
          title: 'Equipamentos',
          href: '/equipamentos',
          icon: 'nav-icon fas fa-box'
        },
        {
          title: 'Operadores',
          href: '/operadores',
          icon: 'nav-icon fas fa-user-shield'
        },
        {
          title: 'Residentes',
          href: '/residentes',
          icon: 'nav-icon fas fa-users'
        },
        {
          title: 'Visitantes',
          href: '/visitantes',
          icon: 'nav-icon fas fa-user'
        }
      ]
    }
  },
  methods: {
    save() {
      console.log('asas')
    }
  },
  head: {}
}
</script>
