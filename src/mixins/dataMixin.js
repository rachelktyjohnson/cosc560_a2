export const dataMixin = {
    computed: {
        userInfo: function() {
            return this.$store.getters.getCurrentUser;
        },
        isLoggedIn: function() {
            return this.userInfo.userId !== null;
        }
    }
}

//to import into a component
//import { dataMixin } from '../mixins/dataMixin';
//mixins:[dataMixin]