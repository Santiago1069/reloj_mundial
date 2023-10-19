

document.addEventListener("DOMContentLoaded", async function () {

    async function obtenerHoraMundial(continente_ciudad) {
        try {
            const response = await fetch(`https://worldtimeapi.org/api/timezone/${continente_ciudad}`);
            const data = await response.json();
            return data;
        } catch (error) {
            console.error(`No se pudo obtener la hora para ${continente_ciudad}`);
            return null;
        }
    }


    const timezone = await fetch(`https://worldtimeapi.org/api/timezone`);
    const data = await timezone.json();
    const ciudades = data;


    const citySelect = document.getElementById("citySelect");
    const cityName = document.getElementById("cityName");
    const cityTime = document.getElementById("cityTime");
    const cityDate = document.getElementById("cityDate");

    // Agregar opciones al select
    ciudades.forEach(ciudad => {
        const option = document.createElement("option");
        option.value = ciudad;
        option.textContent = ciudad.replace("_", " ");
        citySelect.appendChild(option);
    });

    async function actualizarReloj() {
        const ciudadSeleccionada = citySelect.value;
        const data = await obtenerHoraMundial(ciudadSeleccionada);

        if (data) {
            const ciudadFormateada = ciudadSeleccionada.replace("_", " ");
            cityName.textContent = ciudadFormateada;
            cityTime.textContent = `${data.datetime.slice(11, 19)}`;
            const fecha = new Date(data.utc_datetime);
            const options = { year: 'numeric', month: 'long', day: 'numeric' };
            const fechaFormateada = fecha.toLocaleDateString('es-ES', options);
            cityDate.textContent = `${fechaFormateada}`;
        }
    }

    // Actualizar el reloj cuando se selecciona una ciudad
    citySelect.addEventListener("change", actualizarReloj);

    // Actualizar el reloj cada segundo
    setInterval(actualizarReloj, 1000);

    // Mostrar la hora de la primera ciudad en la lista al cargar la página
    if (ciudades.length > 0) {
        citySelect.value = ciudades[0];
        citySelect.dispatchEvent(new Event("change"));
    }
});

