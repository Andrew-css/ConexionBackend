<template>
  <div class="body">
    <div class="tabla">
      <h1>Tabla</h1>
      <table>
        <thead>
          <tr>
            <th>Cédula</th>
            <th>Cliente</th>
            <th>Teléfono</th>
            <th>Opciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(dato, index) in datos" :key="index">
            <td>{{ dato.cedula }}</td>
            <td>{{ dato.nombre }}</td>
            <td>{{ dato.telefono }}</td>
            <td>
              <button @click="eliminar(index)" id="eliminar">❌</button>
              <button @click="editar(dato, index)" id="editar" data-bs-toggle="modal"
                data-bs-target="#exampleModal">📋</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
  



<script setup>
import { ref, onMounted } from 'vue';
import axios from "axios"
const cedula = ref('');
const nombre = ref('');
const telefono = ref();
const precio = ref(0);
const datos = ref([]);
let boton = ref("Agregar")
let indiceEdicion = ref(-1); // Agrega una referencia para almacenar el índice del producto en edición
const alerta1 = ref('');
const alerta2 = ref('');
const alerta3 = ref('');
const alerta4 = ref('');
const alerta5 = ref('');




async function ObtenerDatos() {
  try {
    const response = await axios.get(`https://transporte-0ydp.onrender.com/api/cliente/clientebusca`);
    const data = response.data;
    cedula.value = data.cliente[0].CC_cliente,
      nombre.value = data.cliente[0].Nombre_cliente,
      telefono.value = data.cliente[0].Telefono_cliente

  } catch (error) {
    console.error('Error al obtener datos:', error);
  }
}


async function DatosTransportePush() {
  const response = await axios.get(`https://transporte-0ydp.onrender.com/api/cliente/clientebusca`);
  const data = response.data;

  datos.value.push({
    cedula: data.cliente[0].CC_cliente,
    nombre: data.cliente[0].Nombre_cliente,
    telefono: data.cliente[0].Telefono_cliente,
  })
  console.log(data);

}




onMounted(() => {
  DatosTransportePush()
  ObtenerDatos()
})


/* function validar(){
  let validacion = true;
  if (!codigo.value) {
      alerta1.value = "Por favor, digite código"
      al.style.color = "Orange"
      al.style.fontSize = "30px"
      al.style.fontWeight = "Bolder"
      setTimeout(function () {
        alerta1.value = "";
        alerta1.style = "";
      }, 2500)
      validacion = false;
    ;
   
  } else if (!nombre.value) {
      alerta2.value = "Por favor, digite nombre"
      ale.style.color = "Orange"
      ale.style.fontSize = "30px"
      ale.style.fontWeight = "Bolder"
      setTimeout(function () {
        alerta2.value = "";
        alerta2.style = "";
      }, 2500)
      validacion = false;
    
  } else if (!cantidad.value) {
      alerta3.value = "Por favor, digite una cantidad mayor a 0"
      aler.style.color = "Orange"
      aler.style.fontSize = "30px"
      aler.style.fontWeight = "Bolder"
      setTimeout(function () {
        alerta3.value = "";
        alerta3.style = "";
      }, 2500)
      validacion = false;
    
  } else if (!precio.value) {

      alerta4.value = "Por favor, digite un precio mayor a 0"
      alertt.style.color = "Orange"
      alertt.style.fontSize = "30px"
      alertt.style.fontWeight = "Bolder"
      setTimeout(function () {
        alerta4.value = "";
        alerta4.style = "";
      }, 2500)
      validacion = false;
  } else if (!costo.value) {

      alerta5.value = "Por favor, digite un costo mayor a 0"
      alerta.style.color = "Orange"
      alerta.style.fontSize = "30px"
      alerta.style.fontWeight = "Bolder"
      setTimeout(function () {
        alerta5.value = "";
        alerta5.style = "";
      }, 2500)
      validacion = false;
    
  } else if (costo.value>precio.value) {
      alerta5.value = "El costo no puede ser mayor a el precio del producto"
      alerta.style.color = "Orange"
      alerta.style.fontSize = "30px"
      alerta.style.fontWeight = "Bolder"
      setTimeout(function () {
        alerta5.value = "";
        alerta5.style = "";
      }, 2500)
      validacion = false;

  }else{
      alerta5.value = "Datos guardados exitosamente, por favor presione click en 'Cerrar'"
      alerta.style.color = "Green"
      alerta.style.fontSize = "30px"
      alerta.style.fontWeight = "Bolder"
      setTimeout(function () {
        alerta5.value = "";
        alerta5.style = "";
      }, 3500)
      validacion = false;
  }
  return validacion
} */



function eliminar(index) {
  datos.value.splice(index, 1)
}
/* function editar(dato, index) {
  codigo.value = dato.codigo
  nombre.value = dato.nombre
  cantidad.value = dato.cantidad
  precio.value = dato.precio
  costo.value = dato.costo
  boton.value = "Editar"
  indiceEdicion.value = index; // Almacena el índice del producto en edición
} */

</script>


<style scoped>
.body {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  height: 100vh;
  background-color: #3defff;
  font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
  line-height: 1.5;
  font-weight: 400;
  color-scheme: light dark;
  color: rgba(0, 0, 0, 0.87);
  font-synthesis: none;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  -webkit-text-size-adjust: 100%;
  justify-content: center;
}

.modal-body {
  display: flex;
  flex-direction: column;
  gap: 25px;
  background-color: rgb(80, 80, 80);
  color: white;
}

.tabla {
  border-radius: 10px;
  border: 5px solid black;
  padding: 20px;
  background-color: rgb(255, 255, 255);
}

#bt {
  color: rgb(255, 255, 255);
  font-weight: bolder;
  font-size: 17px;
}

table {
  border-collapse: collapse;
  font-size: 20px;
  text-align: center;
  width: 1300px;
}

th,
td {
  border: 3px solid rgb(0, 0, 0);
  padding: 5px;

}

th {
  background-color: rgb(244, 240, 14);
}

button {
  margin: 5px;
}

#BT {
  background-color: rgb(14, 182, 45);
  border-radius: 20px;
  font-size: 25px;
  font-weight: bolder;
  padding: 10px;
}

.h {
  background-color: rgb(80, 78, 78);
  border: 3px solid black;
}

#eliminar {
  background-color: orange;
}

#editar {
  background-color: cornflowerblue;
}

.error-message {
  color: red;
}
</style>
