import Vue from "vue";


export default Vue.extend({
    props: ['pokemon'],
    methods: {
        changeSort() {
            var sort = document.getElementById("sort")
            this.$emit("changeSort", sort.value)
        },
        changeFilter() {
            var filter = document.getElementById("filter")
            this.$emit("changeFilter", filter.value)
        }
    }
});
