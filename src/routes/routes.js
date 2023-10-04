import Login from "../components/Login.vue"
import Compras from "../components/Compras.vue"
import Ventas from "../components/Ventas.vue"
import {createRouter, createWebHashHistory} from "vue-router"


const routes = [
    {path:"/", component:Login},
    {path:"/compras", component:Compras},
    {path:"/ventas", component:Ventas}
]

export const router = createRouter({
    history:createWebHashHistory(),
    routes
})