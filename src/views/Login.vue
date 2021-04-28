<template>
    <v-app id="inspire">
    <v-app id="inspire">
      <v-main>
        <v-container
          class="fill-height"
          fluid
        >
          <v-row
            align="center"
            justify="center"
          >
            <v-col
              cols="12"
              sm="8"
              md="4"
            >
              <v-card class="elevation-12">
                <v-toolbar
                  color="primary"
                  dark
                  flat
                >
                  <v-toolbar-title>Login form</v-toolbar-title>
                  <v-spacer></v-spacer>
                </v-toolbar>
                <v-card-text>
                  <v-form>
                    <v-text-field
                      label="Login"
                      name="login"
                      prepend-icon="mdi-account"
                      type="text"
                      v-model="user.email"
                    ></v-text-field>
  
                    <v-text-field
                      label="Password"
                      name="password"
                      prepend-icon="mdi-lock"
                      type="password"
                      v-model="user.password"
                    ></v-text-field>
                  </v-form>
                  <div>
                    <div style="color: red; text-align: center">{{ message }}</div>
                  </div>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="primary"
                  @click="login()"
                  >Login</v-btn>
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-main>
    </v-app>
  </v-app>
</template>
<script>
import { mapState } from 'vuex'
export default {
    data() {
        return {
            user: {
                email: '',
                password: ''
            }
        }
    },

    computed: {
      ...mapState('login', ['token','message'])
    },

    methods: {
      login() {
        this.$store.dispatch('login/login', this.user)
        .then(() => {
          this.$router.push('/home')
        })
        .catch((error) => {
          if (error.response.status == 401) {
            this.$store.commit('login/SET_MESSAGE', 'Usuario y/o contraseña incorrecta!')
          }
        })

      }
    }
}
</script>