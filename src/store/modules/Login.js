import axios from "axios";
import router from '../../router/index'

  const state = {
    user: {},
    token: '',
    message: ''
  }

  const mutations = {
    SET_USER(state, data) {
      state.user = data
    },

    SET_TOKEN(state, data) {
      state.token = data
    },

    SET_MESSAGE(state, data) {
      state.message = data
    }
  }
  
  const actions = {
    async login({commit}, user) {
      const resp = await axios.post('auth/login' , {
        email: user.email,
        password: user.password
      })
      commit('SET_USER', user)
      commit('SET_TOKEN', resp.data.access_token)
    },

    async logout({commit}) {
      const resp = await axios.post('auth/logout')
      if (resp) {
        localStorage.removeItem('blog_token')
        commit('SET_USER', {})
        commit('SET_TOKEN', '')
        router.push('/login')
      }
    }
  }

  export default {
      namespaced: true,
      state, mutations, actions
  }
