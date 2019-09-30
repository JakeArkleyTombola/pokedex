import Vue from "vue";
import PokemonList from "./components/PokemonList/index.vue";
import InfoPanel from "./components/InfoPanel/index.vue";
import SortBar from "./components/SortBar/index.vue";
import Header from "./components/Header/index.vue";
import axios from 'axios';

interface IPokemon {
    id: string
    name: string
    img: string
    types: []
    weaknesses: []
    weight: string
    height: string
    favourite: boolean
    shown: boolean
}

let v = new Vue({
    el: "#app",
    template: `
    <div>
        <Header/>
        <SortBar/>
            <div v-on:click="changePokemon" style="display: flex; flex-wrap: wrap; justify-content: center; max-width: 600px; margin: auto">
                <PokemonList v-for="pokemon in pokemonData" v-if=pokemon.shown
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
        this.pokemonData = response.data.pokemon
        for (let pokemon of this.pokemonData) {pokemon.favourite = false;}
        for (let pokemon of this.pokemonData) {pokemon.shown = true;}
        })
    },
    methods: {
        changePokemon () {
            this.infoPanelToggle = !this.infoPanelToggle;
        },
        aZSort() {
            this.pokemonData.sort(function(a, b) {
                var x = a.name.toLowerCase();
                var y = b.name.toLowerCase();
                if (x < y) {return -1;}
                if (x > y) {return 1;}
                return 0;
            })
        },
        zASort() {
            this.aZSort()
            this.pokemonData.reverse()
        },
        heightSort() {
            this.pokemonData.sort(function(a, b) {
                var x:number = +a.height.replace(/[^\d.-]/g, '')
                var y:number = +b.height.replace(/[^\d.-]/g, '')
                return x - y})
        },
        weightSort() {
            this.pokemonData.sort(function(a, b) {
                var x:number = +a.weight.replace(/[^\d.-]/g, '')
                var y:number = +b.weight.replace(/[^\d.-]/g, '')
                return x - y})
        },
        numberSort() {
            this.pokemonData.sort(function(a, b) {return +a.id - +b.id})
        }

    }
});