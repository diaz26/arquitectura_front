import axios from "axios";
import router from '../../router/index'

  const state = {
    user: {},
    token: '',
    message: ''
  }

  const getters = {
    token(state) {
      return state.token
    }
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
    async login({dispatch}, user) {
      const resp = await axios.post('auth/login' , {
        email: user.email,
        password: user.password
      })
      dispatch('me', resp.data.access_token)
      //commit('SET_TOKEN', resp.data.access_token)
    },

    async me({commit, state}, token) {
      if (token) {
        commit('SET_TOKEN', token)
      }

      if (!state.token) {
        return;
      }

      try {
        const resp = await axios.post('auth/me')
        commit('SET_USER', resp.data)
      } catch (error) {
        commit('SET_TOKEN', '')
        commit('SET_USER', {})
        console.log(error)
      }
    },

    async logout({commit}) {
      try {
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('blog_token')
        await axios.post('auth/logout')
        localStorage.removeItem('blog_token')
        commit('SET_USER', {})
        commit('SET_TOKEN', '')
        router.push('/login')
      } catch (error) {
        console.log(error)
      }
    }
  }

  export default {
      namespaced: true,
      state, mutations, actions, getters
  }
