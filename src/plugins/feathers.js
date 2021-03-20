import io from 'socket.io-client'
import feathers from '@feathersjs/client'
import socketio from '@feathersjs/socketio-client'

export default async function install (Vue) {
  const socketClient = io('localhost:3030', {
    transports: ['websocket']
  })
  const feathersApp = feathers()
  feathersApp.configure(socketio(socketClient, {
    timeout: 20000
  }))
  feathersApp.configure(feathers.authentication({
    storage: window.localStorage
  }))

  Vue.prototype.$feathers = feathersApp
}
