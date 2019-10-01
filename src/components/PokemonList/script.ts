import Vue from "vue";


export default Vue.extend({
    props: ['pokemon'],
    methods: {
        onClick() {
          this.$emit("selectPokemon", this.pokemon.id - 1)
        }
    }
});
