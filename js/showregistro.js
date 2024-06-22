document.addEventListener('DOMContentLoaded', () => {
    const registroList = document.getElementById('registroList');

    // Función para obtener los registros desde localStorage
    function getRegistros() {
        const registros = localStorage.getItem('registros');
        return registros ? JSON.parse(registros) : [];
    }

    // Función para mostrar los registros en la página
    function showRegistros() {
        const registros = getRegistros();
        registroList.innerHTML = '';
        registros.forEach((registro, index) => {
            const li = document.createElement('li');
            li.textContent = `Nombre: ${registro.nombre}, Correo: ${registro.email}`;
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Eliminar';
            deleteButton.onclick = () => {
                registros.splice(index, 1);
                saveRegistros(registros);
                showRegistros();
            };
            li.appendChild(deleteButton);
            registroList.appendChild(li);
        });
    }

    // Función para guardar los registros en localStorage
    function saveRegistros(registros) {
        localStorage.setItem('registros', JSON.stringify(registros));
    }

    // Mostrar los registros al cargar la página
    showRegistros();
});
