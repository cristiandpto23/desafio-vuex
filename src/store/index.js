import { createStore } from 'vuex';
import juegos from '../store/data/juegos.json';

export default createStore({
    state: {
        juegos: juegos.map((juego) => ({
            ...juego,
            stock: parseInt(juego.stock),
            precio: parseInt(juego.precio),
        })),
    },

    mutations: {
        ACTUALIZAR_STOCK(state, { codigo, cantidad }) {
            const juego = state.juegos.find((j) => j.codigo === codigo);
            if (juego) {
                juego.stock = cantidad;
            }
        },
    },

    actions: {
        actualizarStock({ commit }, payload) {
            commit('ACTUALIZAR_STOCK', payload);
        },
    },

    getters: {
        getJuegos: (state) => state.juegos,
        getJuegoById: (state) => (codigo) => {
            return state.juegos.find((juego) => juego.codigo === codigo);
        },
    },
});
