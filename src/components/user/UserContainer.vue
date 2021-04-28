<template>
    <div>
        <v-simple-table>
            <template v-slot:default>
            <thead>
                <tr>
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
                    <td>{{ item.name }}</td>
                    <td>{{ item.email }}</td>
                    <td>{{ item.created_at }}</td>
                </tr>
            </tbody>
            </template>
        </v-simple-table>
    </div>
</template>
<script>

import { mapState } from 'vuex'

export default {

    data() {
        return {
            message: 'Hola mundo'
        }
    },

    computed: {
        ...mapState('user', ['listUsers'])
    },

    created() {
        this.$store.dispatch('user/getList')
    }
}
</script>
