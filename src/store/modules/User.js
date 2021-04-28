import axios from 'axios'

const state = {
    listUsers: []
}

const actions = {
    async getList({commit}) {
        const resp = await axios.get('admin/users')
        commit('SET_USERS', resp.data.users)
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
