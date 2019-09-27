import Vue from "vue";
import MyComponent from "./components/my-component/index.vue";
import axios from 'axios';

interface IPokemon {
    name: string
    img: string
}

let v = new Vue({
    el: "#app",
    template: `
    <div>
        <my-component v-for="pokemon in pokemonData" :name="pokemon.name" :url="pokemon.img" />       
    </div>
    `,
    data() {
        return {
            names: ["Ryan", "Archer", "Jack"],
            pokemonData:[] as IPokemon[]
        };
    },
    components: {
        MyComponent
    },
    mounted () {
        var i = axios.get('https://raw.githubusercontent.com/Biuni/PokemonGO-Pokedex/master/pokedex.json').then ((response:any) => {
        this.pokemonData = response.data.pokemon;

        })
         }
});
