<template>
  <div class="body">
    <div class="butonadd">
      <q-btn id="agregar" label="Agregar" @click="medium = true" />
    </div>
    <div class="tabla">
      <h1 id="datos">Datos Clientes</h1>
        <div class="q-pa-md">
          <q-table :rows="rows" :columns="columns" row-key="name" :pagination="false" class="q-w-sm"/>
        </div>
      <q-dialog v-model="medium">
        <q-card style="width: 700px; max-width: 80vw;">
          <q-card-section>
            <div class="text-h6">Datos</div>
          </q-card-section>

          <q-card-section class="q-pt-none">
            <q-p class="text-h5">Cédula</q-p>
            <q-input  label="Digite cédula" class="q-ml-xs" v-model="cedulaNueva"></q-input>
          </q-card-section>
          <q-card-section>
            <q-p class="text-h5">Nombre</q-p>
            <q-input label="Digite nombre del cliente" class="q-ml-xs" v-model="nombreNuevo"></q-input>
          </q-card-section>
          <q-card-section>
            <q-p class="text-h5">Télefono</q-p>
            <q-input  label="Digite número de télfono" class="q-ml-xs" v-model="telefonoNuevo"></q-input>
          </q-card-section>

          <q-card-actions align="right" class="bg-white text-teal">
            <q-btn flat label="OK" v-close-popup @click="AgregarCliente()"/>
          </q-card-actions>
        </q-card>
      </q-dialog>


    </div>
  </div>
</template>
  



<script setup>
import { ref, onMounted } from 'vue';
import axios from "axios"
const cedula = ref();
const nombre = ref('');
const telefono = ref();
const estado = ref()
const cedulaNueva = ref()
const nombreNuevo = ref('')
const telefonoNuevo = ref()
const datos = ref([])
const medium = ref(false);
const rows = ref([])

const columns = [
  { name: 'cedula', align: 'center', label: 'Cedula', field: 'cedula', sortable: true },
  { name: 'nombre', label: 'Nombre', field: 'nombre', sortable: true },
  { name: 'telefono', label: 'Telefono', field: 'telefono' },
  { name: 'estado', label: 'Estado', field: 'estado' },
]




async function ObtenerDatos() {
  try {
    const response = await axios.get(`https://transporte-0ydp.onrender.com/api/cliente/clientebusca`);
    const data = response.data;
      cedula.value = data.cliente[0].CC_cliente,
      nombre.value = data.cliente[0].Nombre_cliente,
      telefono.value = data.cliente[0].Telefono_cliente
      estado.value = data.cliente[0].estado
  } catch (error) {
    console.error('Error al obtener datos:', error);
  }
}


async function DatosTransportePush() {
  try {
    const response = await axios.get(`clientebusca`);
    const data = response.data;

    if (data.cliente.length > 0) {
      // Limpia los datos existentes antes de agregar nuevos datos
      datos.value = [];
      
      for (const cliente of data.cliente) {
        datos.value.push({
          cedula: cliente.CC_cliente,
          nombre: cliente.Nombre_cliente,
          telefono: cliente.Telefono_cliente,
          estado: cliente.estado
        });
      }
      
      rows.value = datos.value;
    }
  } catch (error) {
    console.error('Error al obtener datos:', error);
  }
}



async function AgregarCliente() {
  const data = {
    CC_cliente: cedulaNueva.value,
    Nombre_cliente: nombreNuevo.value,
    Telefono_cliente: telefonoNuevo.value,
    estado: 1,
  }

  try {
    const response = await axios.post(`clientecrear`, data);

    if (response.status === 200) {
      // Agrega el nuevo cliente a la lista de datos
      datos.value.push(data);
      rows.value = datos.value;

      // Limpia los campos de entrada
      cedulaNueva.value = '';
      nombreNuevo.value = '';
      telefonoNuevo.value = '';

      // Cierra el diálogo
      medium.value = false;
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