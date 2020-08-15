<template>
<div class="notifications">
  <div v-for="(notification) in notifications.slice(0,5)" class="notification">
    <h6>{{ notification.contents }}</h6>
    <p>{{ formatDateTime(notification.datetime) }}</p>
  </div>
  <p v-if="notifications.length > 5">(Only the latest 5 notifications will be shown)</p>
  <p v-if="notifications.length === 0">Inbox zero!</p>
</div>
</template>
<script>
import { dataMixin } from '../mixins/dataMixin';
export default {
  name: 'NotificationsComponent',
  mixins: [dataMixin],
  data() {
    return {}
  },
  computed: {
    notifications() {
      let currentUser = this.$store.getters.getCurrentUser;
      return currentUser.notifications
    }
  }
}
</script>