import Vue from "vue";
import PokemonList from "./components/PokemonList/index.vue";
import InfoPanel from "./components/InfoPanel/index.vue";
import SortBar from "./components/SortBar/index.vue";
import Header from "./components/Header/index.vue";
import SplashScreen from "./components/SplashScreen/index.vue";
import EasterEgg from "./components/EasterEgg/index.vue";
import axios from 'axios';

interface IPokemon {
    id: string
    name: string
    img: string
    type: []
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
        <SplashScreen/>
        <Header/>
        <SortBar v-on:changeSort="selectSort" v-on:changeFilter="selectFilter"/>
            <div style="display: flex; flex-wrap: wrap; justify-content: center; max-width: 600px; margin: auto">
                <PokemonList v-for="pokemon in pokemonData" v-if=pokemon.shown :pokemon="pokemon" v-on:selectPokemon="changePokemon"/>       
            </div>
        <InfoPanel v-on:toggleFavourite="toggleFavourite" v-on:dismiss="dismiss" v-if="infoPanelToggle" :pokemon="currentPokemon"/>
    </div>
    `,
    data: {
        pokemonData:[] as IPokemon[],
        infoPanelToggle: false,
        currentSort: "",
        currentFilter: "",
        currentPokemon: {} as IPokemon
    },
    components: {
        PokemonList,
        SortBar,
        InfoPanel,
        Header,
        SplashScreen,
    
    },
    mounted () {
        var i = axios.get('https://raw.githubusercontent.com/Biuni/PokemonGO-Pokedex/master/pokedex.json').then ((response:any) => {
        this.pokemonData = response.data.pokemon
        for (let pokemon of this.pokemonData) {pokemon.favourite = false;}
        this.selectFilter("all");

        })
    },
    methods: {
        changePokemon (id:any) {
            this.infoPanelToggle = true
            this.currentPokemon = this.pokemonData.find(pokemon => pokemon.id === id) || {} as IPokemon
        },
        dismiss () {
            this.infoPanelToggle = false
        },
        toggleFavourite(pokemon:IPokemon) {
            pokemon.favourite = !pokemon.favourite
            this.filter()
        },
        selectSort(sort:string = "") {
            this.currentSort = sort;
            this.sort()
        },
        sort() {
            switch(this.currentSort) {
                case "number":
                    this.numberSort(); break
                case "az":
                    this.aZSort(); break
                case "za":
                    this.zASort(); break
                case "height":
                    this.heightSort(); break
                case "weight":
                    this.weightSort(); break
                default:
                    this.numberSort(); break
            }
            this.$forceUpdate()
        },
        selectFilter(filter:string = "") {
            this.currentFilter = filter
            this.filter()
        },
        filter() {
            switch(this.currentFilter) {
                case "all": 
                    for (let pokemon of this.pokemonData) {pokemon.shown = true}; break
                case "favourites": 
                    for (let pokemon of this.pokemonData) {pokemon.shown = pokemon.favourite}; break
                case "non-favourites": 
                    for (let pokemon of this.pokemonData) {pokemon.shown = !pokemon.favourite}; break
                default: 
                    for (let pokemon of this.pokemonData) {pokemon.shown = true}; break
            }
            this.$forceUpdate();
        },
        aZSort() {
            this.pokemonData.sort(function(a, b) {
                var x = a.name.toLowerCase()
                var y = b.name.toLowerCase()
                if (x < y) {return -1;}
                if (x > y) {return 1;}
                return 0
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