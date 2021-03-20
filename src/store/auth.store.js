export default {
  namespaced: true,

  state: {
    busy: false,
    loggedIn: false,
    userId: null,
    email: null,
    accessToken: null,
    error: null
  },
  getters: {},
  actions: {
    async oauthTwitch ({ commit }, feathers) {
      return new Promise((resolve, reject) => {
        commit('authStarted')

        const popupOptions = {
          menubar: true,
          location: true,
          resizable: false,
          scrollbar: true,
          status: true,
          width: 400,
          height: 780
        }
        const windowFeaturesString = Object.entries(popupOptions).map(([key, value]) => {
          return `${key}=${(typeof value === 'boolean') ? (value ? 'yes' : 'no') : value}`
        }).join(',')

        const messageListener = async event => {
          if (event.origin === window.location.origin) {
            return
          }

          console.log('messageListener', event.origin)

          if (event.data.token) {
            try {
              await feathers.authenticate({
                strategy: 'jwt',
                accessToken: event.data.token
              })

              const { user, accessToken } = await feathers.get('authentication')
              commit('authSuccess', { data: user, accessToken })
            } catch (err) {
              commit('authFailed', err)
              reject(err)
            }
          } else if (event.data.error) {
            console.error(event.data.error)
            commit('authFailed', event.data.error)
            reject(event.data.error)
          }
        }

        window.addEventListener('message', messageListener)
        setTimeout(() => window.removeEventListener('message', messageListener), 3 * 60 * 1000)
        window.open('http://localhost:3030/oauth/twitch', 'streamJointOAuth', windowFeaturesString)
      })
    }
  },
  mutations: {
    authFailed (state, error = new Error('Unknown error')) {
      state.busy = false
      state.loggedIn = false
      state.error = error
    },
    authSuccess (state, { data, accessToken }) {
      console.log('ahooj', data)
      state.busy = false
      state.loggedIn = true
      state.userId = data._id
      state.email = data.email
      state.error = null
      state.accessToken = accessToken
    },
    authStarted (state) {
      state.busy = true
    }
  }
}
