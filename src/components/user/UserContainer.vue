<template>
    <div>
        <v-simple-table>
            <template v-slot:default>
            <thead>
                <tr>
                    <th class="text-center" colspan="2">Actions</th>
                    <th class="text-left">Name</th>
                    <th class="text-left">Email</th>
                    <th class="text-left">Created</th>
                </tr>
            </thead>
            <tbody>
                <tr
                    v-for="item in listUsers"
                    :key="item.name"
                    >
                    <td class="text-right">
                        <v-icon
                            color="#3f51b5"
                            @click="openDialog('edit', item)"
                        >
                            mdi-pencil
                        </v-icon>
                    </td>
                    <td>
                        <v-icon
                            color="red"
                            @click="destroy(item.id)"
                        >
                            mdi-delete
                        </v-icon>
                    </td>
                    <td>{{ item.name }}</td>
                    <td>{{ item.email }}</td>
                    <td>{{ item.created_at }}</td>
                </tr>
            </tbody>
            </template>
        </v-simple-table>
        <v-btn
            bottom
            color="green"
            dark
            fab
            fixed
            right
            @click="openDialog('create')"
        >
            <v-icon>mdi-plus</v-icon>
        </v-btn>
        <v-dialog
            v-model="dialog"
            width="500px"
        >
            <v-card>
                <v-card-title style="background-color: #3f51b5; color: white">
                    {{ titleModal }}
                </v-card-title>
                <v-container>
                    <v-row class="mx-2">
                        <v-col cols="12" >
                            <v-text-field
                                v-model="user.name"
                                prepend-icon="mdi-account"
                                placeholder="Name"
                                clearable
                            ></v-text-field>
                            <span style="font-size: 12px; color: red">{{ errors.name }}</span>
                        </v-col>
                        <v-col cols="12">
                            <v-text-field
                                v-model="user.email"
                                prepend-icon="mdi-mail"
                                placeholder="Email"
                                clearable
                            ></v-text-field>
                            <span style="font-size: 12px; color: red">{{ errors.email }}</span>
                        </v-col>
                        <v-col cols="6">
                            <v-switch
                                v-if="typeAction == 2"
                                v-model="changePass"
                                @click="changeRules()"
                                :label="`Cambiar contraseña`"
                            ></v-switch>
                        </v-col>
                        <v-col cols="6">
                            <v-text-field
                                :disabled="!changePass"
                                v-if="typeAction == 2"
                                v-model="user.password"
                                :rules="rules.password"
                                type="password"
                                prepend-icon="mdi-key"
                                clearable
                            ></v-text-field>
                        </v-col>
                    </v-row>
                </v-container>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                    text
                    @click="dialog = false"
                    >Cancel</v-btn>
                    <v-btn v-if="typeAction == 1"
                    color="success"
                    @click="save()"
                    >Create</v-btn>
                    <v-btn v-if="typeAction == 2"
                    color="success"
                    @click="update()"
                    >Edit</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-snackbar v-model="snackbar" color="green">
            {{ message }}
        </v-snackbar>
    </div>
</template>
<script>

import { mapActions, mapState } from 'vuex'

export default {

    data() {
        return {
            changePass: false,
            snackbar: false,
            message: '',
            dialog: false,
            titleModal: '',
            typeAction: 0,
            errors: {
                email: '',
                name: ''
            },
            user: {
                id: null,
                name: '',
                email: '',
                password: ''
            },
            rules: {
                password: [],
            }
        }
    },

    computed: {
        ...mapState('user', ['listUsers'])
    },

    methods: {
        ...mapActions('user', ['saveUser', 'updateUser', 'destroyUser', 'getList']),
        openDialog(action, data = null) {
            this.errors.email = ''
            this.errors.name = ''
            this.dialog = true
            switch (action) {
                case 'create':
                    this.typeAction = 1
                    this.titleModal = 'Crear nuevo usuario'
                    this.user.name = ''
                    this.user.email = ''
                    break;
                case 'edit':
                    this.typeAction = 2
                    this.titleModal = 'Editar usuario: ' + data['name']
                    this.user.name = data['name']
                    this.user.email = data['email']
                    this.user.id = data['id']
                    this.user.password = ''
                    this.changePass = false
                    break;
                default:
                    break;
            }
        },

        validate() {
            this.errors.email = (this.user.email !== '') ? '' : 'El campo es requerido'
            this.errors.name = (this.user.name !== '') ? '' : 'El campo es requerido'
            return (this.user.email !== '' && this.user.name !== '' && (this.user.password != '' || !this.changePass))
        },

        save() {
            if (this.validate()) {
                this.saveUser(this.user)
                .then((res) => {
                    this.message = res.data.message
                    this.snackbar = true
                    this.dialog = false
                    this.getList()
                }).catch((res) => {
                    console.log(res.data.error)
                    this.message = res.data.message
                    this.snackbar = true
                })
            }
            return
        },

        update() {
            if (this.validate()) {
                let data = this.user
                if (!this.changePass) delete(data.password)
                this.updateUser(this.user)
                .then((res) => {
                    this.message = res.data.message
                    this.snackbar = true
                    this.dialog = false
                    this.getList()
                }).catch((res) => {
                    console.log(res.data.error)
                    this.message = res.data.message
                    this.snackbar = true
                })
            }
            return
        },

        destroy(id) {
            this.destroyUser(id)
            .then((res) => {
                this.message = res.data.message
                this.snackbar = true
                this.getList()
            }).catch((res) => {
                console.log(res.data.error)
                this.message = res.data.message
                this.snackbar = true
            })
            return
        },

        changeRules() {
            if (this.changePass) {
                this.rules.password = [v => v != '' || 'El campo es requerido']
            } else {
                this.rules.password = []
            }
        }

    },

    created() {
        this.$store.dispatch('user/getList')
    }
}
</script>
