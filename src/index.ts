import Vue from "vue";
import PokemonList from "./components/PokemonList/index.vue";
import InfoPanel from "./components/InfoPanel/index.vue";
import sortBar from "./components/sort-bar/index.vue";
import header_component from "./components/header_component/index.vue";
import axios from 'axios';

interface IPokemon {
    name: string
    img: string
    types: []
}



let v = new Vue({
    el: "#app",
    template: `
    <div>
        <header_component/>
        <sortBar/>
            <div style="display: flex; flex-wrap: wrap; justify-content: center; max-width: 600px; margin: auto">
                <pokemonList v-for="pokemon in pokemonData"
                :name="pokemon.name"
                :url="pokemon.img"
                :types="pokemon.type.toString()"
                :weaknesses="pokemon.weaknesses.toString()"
                :weight="pokemon.weight"
                :height="pokemon.height"
                />       
            </div>
        <InfoPanel/>
    </div>
    `,
    data() {
        return {
            pokemonData:[] as IPokemon[]
        };
    },
    components: {
        PokemonList,
        sortBar,
        InfoPanel,
        header_component
    },
    mounted () {
        var i = axios.get('https://raw.githubusercontent.com/Biuni/PokemonGO-Pokedex/master/pokedex.json').then ((response:any) => {
        this.pokemonData = response.data.pokemon;
        })
    }
});
