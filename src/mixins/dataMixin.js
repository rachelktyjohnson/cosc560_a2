export const dataMixin = {
    computed: {
    isLoggedIn() {
        return this.$store.state.loggedIn.user !== null;
    }
}
}

//to import into a component
//import { dataMixin } from '../mixins/dataMixin';
//mixins:[dataMixin]