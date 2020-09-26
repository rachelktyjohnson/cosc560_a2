<template>
<div class="notifications">
  <div v-for="(notification) in notificationsReversed.slice(0,5)" class="notification">
    <h6>{{ notification.content }}</h6>
    <p>{{ formatDateTime(notification.datetime) }}</p>
  </div>
  <p v-if="notifications.length > 5">(Only the latest 5 notifications will be shown)</p>
  <p v-if="notifications.length === 0">Inbox zero!</p>
</div>
</template>
<script>
import { dateMixin } from '../mixins/dateMixin';
import axios from 'axios';

export default {
  name: 'NotificationsComponent',
  mixins: [dateMixin],
  data() {
    return {
      notifications: []
    }
  },
  computed: {
    notificationsReversed() {
      return this.notifications.reverse()
    }
  },
  created() {
    if (this.$store.state.loggedIn.user!==null){
      axios.get('http://localhost:9000/notifications/byuser/'+this.$store.state.loggedIn.user._id)
          .then (response => {
            this.notifications = response.data.data
          })
          .catch (err =>{
            this.errors.push(err)
          })
    }

  }
}
</script>