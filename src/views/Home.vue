<template>
  <v-app id="inspire">
    <v-app id="inspire">
      <v-navigation-drawer
        v-model="drawer"
        app
      >
        <v-list dense>
          <v-list-item link color="indigo" to="/home">
            <v-list-item-action>
              <v-icon>mdi-home</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Home</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-group
            :prepend-icon="model ? 'mdi-chevron-up' : 'mdi-chevron-down'"
            append-icon=""
          >
            <template v-slot:activator>
              <v-list-item-content>
                <v-list-item-title> Acceso </v-list-item-title>
              </v-list-item-content>
            </template>
            <v-list-item to="/user" color="indigo">
              <v-list-item-action>
                <v-icon>mdi-account</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title> Users </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-group>

          <v-list-item link @click="close()" color="indigo">
            <v-list-item-action>
              <v-icon>mdi-power</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Logout</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
  
      <v-app-bar
        app
        color="indigo"
        dark
      >
        <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
        <v-toolbar-title>Application</v-toolbar-title>
      </v-app-bar>
  
      <v-main>
        <v-container>
          <router-view/>
        </v-container>
      </v-main>
      <v-footer
        color="indigo"
        app
      >
        <span class="white--text">&copy; {{ new Date().getFullYear() }}</span>
      </v-footer>
    </v-app>
  </v-app>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'Home',
  data() {
    return {
      drawer: null,
      model: false
    }
  },
  
  computed: {
    ...mapState('login', ['token'])
  },

  methods: {
    ...mapActions('login', ['logout']),
    close() {
      this.logout()
    }
  }
}
</script>

<style>
.v-application .primary--text{
  color: #3f51b5!important;
  caret-color: #3f51b5!important;
}
</style>
