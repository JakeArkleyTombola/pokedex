import Vue from "vue";
import PokemonList from "./components/PokemonList/index.vue";
import InfoPanel from "./components/InfoPanel/index.vue";
import SortBar from "./components/SortBar/index.vue";
import Header from "./components/Header/index.vue";
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
        <Header/>
        <SortBar/>
            <div v-on:click="changePokemon" style="display: flex; flex-wrap: wrap; justify-content: center; max-width: 600px; margin: auto">
                <PokemonList v-for="pokemon in pokemonData"
                :name="pokemon.name"
                :url="pokemon.img"
                :types="pokemon.type.toString()"
                :weaknesses="pokemon.weaknesses.toString()"
                :weight="pokemon.weight"
                :height="pokemon.height"
                />       
            </div>
        <InfoPanel v-on:dismiss="changePokemon" v-if="infoPanelToggle"/>
    </div>
    `,
    data: {
        pokemonData:[] as IPokemon[],
        infoPanelToggle: false
    },
    components: {
        PokemonList,
        SortBar,
        InfoPanel,
        Header
    },
    mounted () {
        var i = axios.get('https://raw.githubusercontent.com/Biuni/PokemonGO-Pokedex/master/pokedex.json').then ((response:any) => {
        this.pokemonData = response.data.pokemon;
        })
    },
    methods: {
        changePokemon () {
            this.infoPanelToggle = !this.infoPanelToggle;
        }
    }
});