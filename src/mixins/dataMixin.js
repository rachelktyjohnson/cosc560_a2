export const dataMixin = {
    computed: {
    isLoggedIn() {
        return this.$store.state.loggedIn.userId !== null;
    }
}
}

//to import into a component
//import { dataMixin } from '../mixins/dataMixin';
//mixins:[dataMixin]