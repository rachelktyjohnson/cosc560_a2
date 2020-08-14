<template>
<div class="notifications">
  <div v-for="(notification) in notifications.slice(0,5)" class="notification">
    <h6>{{ notification.contents }}</h6>
    <p>{{ formatDateTime(notification.datetime) }}</p>
  </div>
  <p v-if="notifications.length > 5">(Only the latest 5 notifications will be shown)</p>
</div>
</template>
<script>
export default {
  name: 'NotificationsComponent',
  data() {
    return {

    }
  },
  computed: {
    notifications() {
      return this.$store.state.users[this.$store.state.loggedIn.userID].notifications;
    }
  },
  methods: {
    formatDateTime(datetime){
      return datetime.getDate() + "-" + (datetime.getMonth()) + "-" + datetime.getFullYear() + " "
          + datetime.getHours() + ":" + this.addZeroes(datetime.getMinutes()) + ":" + this.addZeroes(datetime.getSeconds())
    },
    addZeroes(i){
      if (i < 10) {
        i = "0" + i;
      }
      return i;
    }
  }
}
</script>