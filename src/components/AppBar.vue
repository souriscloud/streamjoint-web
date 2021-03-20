<template>
  <v-app-bar
    app
    color="success"
    dark
  >
    <div class="d-flex align-center">
      <h1>StreamJoint</h1>
    </div>

    <v-spacer></v-spacer>

    <v-btn
      v-show="!loggedIn"
      @click="requestSignIn"
      text
    >
      <span v-show="!busy" class="mr-2">Sign in using Twitch</span>
      <v-icon>mdi-twitch</v-icon>
    </v-btn>
    <v-btn
      v-show="loggedIn"
      text
    >
      <span class="mr-2">{{ email }}</span>
    </v-btn>
  </v-app-bar>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'AppBar',

  computed: {
    ...mapState('auth', ['busy', 'loggedIn', 'email'])
  },

  data () {
    return {}
  },

  methods: {
    async requestSignIn () {
      await this.$store.dispatch('auth/oauthTwitch', this.$feathers)
    }
  }
}
</script>
