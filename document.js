document.addEventListener('DOMContentLoaded', () => {
    const registroForm = document.getElementById('registroForm');

    // Función para obtener los registros desde localStorage
    function getRegistros() {
        const registros = localStorage.getItem('registros');
        return registros ? JSON.parse(registros) : [];
    }

    // Función para guardar los registros en localStorage
    function saveRegistros(registros) {
        localStorage.setItem('registros', JSON.stringify(registros));
    }

    // Manejar el envío del formulario
    registroForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const nombre = document.getElementById('nombre').value;
        const email = document.getElementById('email').value;

        const registros = getRegistros();
        registros.push({ nombre, email });
        saveRegistros(registros);

        registroForm.reset();
    });
});
