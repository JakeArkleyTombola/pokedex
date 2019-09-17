import Vue from "vue";
import MyComponent from "./components/my-component/index.vue";

let v = new Vue({
    el: "#app",
    template: `
    <div>
        <my-component v-for="name in names" :name="name" />       
    </div>
    `,
    data() {
        return {
            names: ["Ryan", "Archer", "Jack"]
        };
    },
    components: {
        MyComponent
    }
});
