<template>
  <div class="body">
    <div class="butonadd">
      <q-btn id="agregar" label="Agregar" @click="medium = true" />
    </div>
    <div class="tabla">
      <h1 id="datos">Datos Clientes</h1>
        <div class="q-pa-md">
          <q-table :rows="rows" :columns="columns" row-key="name" />
        </div>

      <!-- <table>
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
              <button id="editar">📋</button>
            </td>
          </tr>
        </tbody>
      </table> -->
      <q-dialog v-model="medium">
        <q-card style="width: 700px; max-width: 80vw;">
          <q-card-section>
            <div class="text-h6">Datos</div>
          </q-card-section>

          <q-card-section class="q-pt-none">
            <q-p class="text-h5">Cédula</q-p>
            <q-input type="number" label="Digite cédula" class="q-ml-xs"></q-input>
          </q-card-section>
          <q-card-section>
            <q-p class="text-h5">Nombre</q-p>
            <q-input label="Digite nombre del cliente" class="q-ml-xs"></q-input>
          </q-card-section>
          <q-card-section>
            <q-p class="text-h5">Télefono</q-p>
            <q-input type="number" label="Digite número de télfono" class="q-ml-xs"></q-input>
          </q-card-section>



          <q-card-actions align="right" class="bg-white text-teal">
            <q-btn flat label="OK" v-close-popup />
          </q-card-actions>
        </q-card>
      </q-dialog>


    </div>
  </div>
</template>
  



<script setup>
import { ref, onMounted } from 'vue';
import axios from "axios"
const cedula = ref('');
const nombre = ref('');
const telefono = ref();
const datos = ref([])
const medium = ref(false);
const rows = ref([])

const columns = [

  { name: 'Cedula', align: 'center', label: 'Cedula', field: 'Cedula', sortable: true },
  { name: 'Nombre', label: 'Nombre', field: 'fat', sortable: true },
  { name: 'Telefono', label: 'Telefono', field: 'carbs' },
  { name: 'Estado', label: 'Estado', field: 'Estado' },
]



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

  rows.value = datos
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
  gap: 80px;
}

button {
  margin-right: 5px;
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



#eliminar {
  background-color: orange;
}

#editar {
  background-color: cornflowerblue;
}

.error-message {
  color: red;
}

.butonadd {
  display: flex;
  justify-content: flex-end;
  width: 100%;
  margin-right: 30%;
}

#agregar {
  width: 200px;
  height: 60px;
  border-radius: 10px;
  font-size: 25px;
  font-weight: bolder;
  background-color: white;
  color: rgb(0, 0, 0);
}


.bg-primary {
  width: 100%;
  height: 100%;
}
</style>