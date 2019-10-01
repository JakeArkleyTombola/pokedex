import Vue from "vue";


export default Vue.extend({
    props: ['pokemon'],
    data: {
        sort: "",
        filter: ""
    },
    methods: {
        changeSort() {
            this.$emit("changeSort", this.sort)
        },
        changeFilter() {
            this.$emit("changeFilter", this.filter)
        }
    }
});
