
const formularioUI = document.querySelector('#formulario');
const listaActividadesUI = document.querySelector('#listaActividades');
let arrayActividades = [];




// Crear actividad
const CrearItem = actividad => {
  const item = {
    actividad,
    estado: false
  };

  arrayActividades.push(item);
  GuardarDB();
};

// Guardar en localStorage
const GuardarDB = () => {
  localStorage.setItem('rutina', JSON.stringify(arrayActividades));
};

// Mostrar actividades
const MostrarActividades = () => {
  listaActividadesUI.innerHTML = '';

  arrayActividades.forEach((item, index) => {
    listaActividadesUI.innerHTML += `
      <div class="alert alert-${item.estado ? 'success' : 'primary'}
                  d-flex align-items-center">

        <span class="material-symbols-outlined me-2">
          sports_martial_arts
        </span>

        <span class="fw-bold">
          ${item.actividad}
        </span>

        <!-- Cambiar estado -->
        <span class="material-symbols-outlined ms-auto text-success cursor-pointer"
              onclick="CambiarEstado(${index})">
          ${item.estado ? 'check' : 'close'}
        </span>

        <!-- Eliminar -->
        <span class="material-symbols-outlined text-danger ms-2 cursor-pointer"
              onclick="EliminarItem(${index})">
          delete
        </span>

      </div>
    `;
  });
};

// Cambiar estado
const CambiarEstado = index => {
  arrayActividades[index].estado = !arrayActividades[index].estado;
  GuardarDB();
  MostrarActividades();
};

// Eliminar actividad
const EliminarItem = index => {
  arrayActividades.splice(index, 1);
  GuardarDB();
  MostrarActividades();
};

// Cargar datos al iniciar
const CargarDB = () => {
  const data = localStorage.getItem('rutina');
  if (data) {
    arrayActividades = JSON.parse(data);
    MostrarActividades();
  }
};



// EVENTOS


formularioUI.addEventListener('submit', e => {
  e.preventDefault();

  const actividadUI = document.querySelector('#actividad').value.trim();
  if (actividadUI === '') return;

  CrearItem(actividadUI);
  MostrarActividades();
  formularioUI.reset();
});

document.addEventListener('DOMContentLoaded', CargarDB);
