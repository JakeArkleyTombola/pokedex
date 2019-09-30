import Vue from "vue";
import MyComponent from "./components/my-component/index.vue";
import axios from 'axios';

interface IPokemon {
    name: string
    img: string
    types: []
}

let v = new Vue({
    el: "#app",
    template: `
    <div style="display: flex; flex-wrap: wrap; justify-content: center; max-width: 600px; margin: auto">
        <my-component v-for="pokemon in pokemonData"
        :name="pokemon.name"
        :url="pokemon.img"
        :types="pokemon.type.toString()"
        :weaknesses="pokemon.weaknesses.toString()"
        :weight="pokemon.weight"
        :height="pokemon.height"
        />       
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
