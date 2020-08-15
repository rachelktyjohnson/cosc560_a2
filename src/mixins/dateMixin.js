export const dateMixin = {
    methods: {
        formatDateTime(datetime, option = 'datetime') {
            let dateSep = '/';
            if (option === 'date') {
                return datetime.getDate() + dateSep + (datetime.getMonth() + 1) + dateSep + datetime.getFullYear()
            } else if (option === 'time') {
                return datetime.getHours() + ":" + this.addZeroes(datetime.getMinutes()) + ":" + this.addZeroes(datetime.getSeconds())
            } else {
                return datetime.getDate() + dateSep + (datetime.getMonth() + 1) + dateSep + datetime.getFullYear() + ' at '
                    + datetime.getHours() + ":" + this.addZeroes(datetime.getMinutes()) + ":" + this.addZeroes(datetime.getSeconds())
            }
        },
        addZeroes(i) {
            if (i < 10) {
                i = "0" + i;
            }
            return i;
        },
    }
}

//to import into a component
//import { dateMixin } from '../mixins/dataMixin';
//mixins:[dateMixin]