import Vue from "vue";


export default Vue.extend({
    props: ['pokemon'],
    methods: {
        dismiss() {
          this.$emit("dismiss")
        },
        favourite() {
          this.$emit("toggleFavourite", this.pokemon)
          this.$forceUpdate();
        }
    }
});
