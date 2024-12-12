<template>
    <div class="container">
        <h1>Tienda 32bits</h1>
        <h4>Lista de juegos</h4>
        <table>
            <thead>
                <tr>
                    <th>Código</th>
                    <th>Nombre</th>
                    <th>Stock</th>
                    <th>Precio</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="juego in juegos" :key="juego.codigo" :style="{ borderLeft: `4px solid ${juego.color}` }">
                    <td>{{ juego.codigo }}</td>
                    <td>{{ juego.nombre }}</td>
                    <td>{{ juego.stock }}</td>
                    <td>${{ juego.precio }}</td>
                    <td>
                        <div class="button-group">
                            <button @click="aumentarStock(juego.codigo)" class="btn-add">+</button>
                            <button @click="venderJuego(juego.codigo)" :disabled="juego.stock <= 0" class="btn-sell">-</button>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
    computed: {
        ...mapState(['juegos']),
    },
    methods: {
        venderJuego(codigo) {
            this.$store.dispatch('actualizarStock', {
                codigo,
                cantidad: this.juegos.find((j) => j.codigo === codigo).stock - 1,
            });
        },
        aumentarStock(codigo) {
            this.$store.dispatch('actualizarStock', {
                codigo,
                cantidad: this.juegos.find((j) => j.codigo === codigo).stock + 1,
            });
        },
    },
};
</script>

<style scoped>
.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
}

h1 {
    text-align: center;
    color: #2c3e50;
    margin-bottom: 20px;
}

table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
}

th,
td {
    padding: 12px;
    text-align: left;
    border-bottom: 1px solid #ddd;
}

th {
    background-color: #f5f5f5;
    font-weight: bold;
}

tr:hover {
    background-color: #f9f9f9;
}

.color-box {
    width: 20px;
    height: 20px;
    border-radius: 4px;
}

.button-group {
    display: flex;
    gap: 8px;
}

.btn-add,
.btn-sell {
    padding: 8px 16px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-weight: bold;
}

.btn-add {
    background-color: #42b883;
    color: white;
}

.btn-sell {
    background-color: #e74c3c;
    color: white;
}

.btn-sell:disabled {
    background-color: #ccc;
    cursor: not-allowed;
}
</style>
