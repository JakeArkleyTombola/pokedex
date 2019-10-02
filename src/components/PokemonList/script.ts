import Vue from "vue";


export default Vue.extend({
    props: ['pokemon', 'favourited'],
    methods: {
        onClick() {
          this.$emit("selectPokemon", this.pokemon.id)
          this.$forceUpdate()
        },
        update() {
          this.$forceUpdate()
        }
    }
});
