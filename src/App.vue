<template>
  <div class="body">
    <div class="butonadd">
      <q-btn id="agregar" label="Agregar" @click="medium = true" />
    </div>
    <div class="tabla">
      <h1 id="datos">Datos Clientes</h1>
      <div class="q-pa-md">
        <q-table  :rows="rows" :columns="columns" row-key="name">
          <template v-slot:body-cell-Opciones="{ row: route }">
            <q-td :props="props">
              <q-btn v-if="route.estado">✍</q-btn>
              <q-btn v-if="route.estado">❌</q-btn>
              <q-btn v-else>✔</q-btn>
            </q-td>
          </template>
        </q-table>
  
      </div>
      <q-dialog v-model="medium">
        <q-card style="width: 700px; max-width: 80vw;">
          <q-card-section>
            <div class="text-h6">Datos</div>
          </q-card-section>
  
          <q-card-section class="q-pt-none">
            <q-p class="text-h5">Cédula</q-p>
            <q-input label="Digite cédula" class="q-ml-xs" v-model="cedulaNueva"></q-input>
          </q-card-section>
          <q-card-section>
            <q-p class="text-h5">Nombre</q-p>
            <q-input label="Digite nombre del cliente" class="q-ml-xs" v-model="nombreNuevo"></q-input>
          </q-card-section>
          <q-card-section>
            <q-p class="text-h5">Télefono</q-p>
            <q-input label="Digite número de télfono" class="q-ml-xs" v-model="telefonoNuevo"></q-input>
          </q-card-section>
  
          <q-card-actions align="right" class="bg-white text-teal">
            <q-btn flat label="OK" v-close-popup @click="AgregarCliente()" />
          </q-card-actions>
        </q-card>
      </q-dialog>
  
  
    </div>
  </div>
</template>
  



<script setup>
import { ref, onMounted, computed } from 'vue';
import axios from "axios"
const cedula = ref();
const nombre = ref('');
const telefono = ref();
const estado = ref()
const fechacreacion = ref()
const cedulaNueva = ref()
const nombreNuevo = ref('')
const telefonoNuevo = ref()
const datos = ref([])
const medium = ref(false);
const rows = ref([])

const columns = [
  { name: 'cedula', align: 'center', label: 'Cedula', field: 'CC_cliente', sortable: true },
  { name: 'nombre', label: 'Nombre', field: 'Nombre_cliente', sortable: true },
  { name: 'telefono', label: 'Telefono', field: 'Telefono_cliente' },
  { name: 'estado', label: 'Estado', field: 'estado', format: (val) => obtenerTextoEstado(val),},
  { name: 'createdAt', label: 'Fecha Creación', field: 'createdAt' },
  {name: "Opciones", align: "center", label: "Opciones", field: "Opciones", sortable: true},
]




async function ObtenerDatos() {
  try {
    const response = await axios.get(`clientebusca`);
    const data = response.data;
    cedula.value = data.cliente[0].CC_cliente,
      nombre.value = data.cliente[0].Nombre_cliente,
      telefono.value = data.cliente[0].Telefono_cliente
    estado.value = data.cliente[0].estado
    fechacreacion.value = data.cliente[0].createdAt
  } catch (error) {
    console.error('Error al obtener datos:', error);
  }
}


async function DatosTransportePush() {
  try {
    const response = await axios.get(`clientebusca`);
    const data = response.data;

    if (data.cliente.length > 0) {

      for (const cliente of data.cliente) {
        datos.value.push({
          CC_cliente: cliente.CC_cliente,
          Nombre_cliente: cliente.Nombre_cliente,
          Telefono_cliente: cliente.Telefono_cliente,
          estado: cliente.estado,
          createdAt: cliente.createdAt
        });
      }
      rows.value = datos.value;
    }
  } catch (error) {
    console.error('Error al obtener datos:', error);
  }
}



async function AgregarCliente() {
  const fechaActual = new Date();
  const data = {
    CC_cliente: cedulaNueva.value,
    Nombre_cliente: nombreNuevo.value,
    Telefono_cliente: telefonoNuevo.value,
    estado: 1,
    createdAt: fechaActual.toISOString()
  }

  try {
    const response = await axios.post("clientecrear", data);

    if (response.status === 200) {
      datos.value.push(data);
      cedulaNueva.value = '';
      nombreNuevo.value = '';
      telefonoNuevo.value = '';
      medium.value = false;
      DatosTransportePush()
    } else {
      console.log('Error en la solicitud HTTP:', response.status, response.statusText);
      // Puedes mostrar un mensaje de error o realizar otras acciones en caso de error.
    }
  } catch (error) {
    console.error('Error al agregar cliente:', error);

    if (error.response) {
      console.log('Respuesta de error:', error.response.status, error.response.data);
    }
  }
}

const obtenerTextoEstado = (estado) => {
  return estado === 1 ? 'Activo' : 'Inactivo';
}










onMounted(() => {
  DatosTransportePush()
  ObtenerDatos()
  estadoLabel
})








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