import axios from 'axios'

const state = {
    listUsers: []
}

const actions = {
    async getList({commit}) {
        const resp = await axios.get('admin/users')
        commit('SET_USERS', resp.data.users)
    },

    async saveUser(context, user) {
        return await axios.post('admin/users', user)
    },

    async updateUser(context, user) {
        return await axios.put('admin/users/' + user.id, user)
    },

    async destroyUser(context, id) {
        return await axios.delete('admin/users/' + id)
    }
    
}


const mutations = {
    SET_USERS(state, data) {
        state.listUsers = data
    }
}



export default {
    namespaced: true,
    state, mutations, actions
}
