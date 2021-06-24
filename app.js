
// ((param1, param2) => {
//     console.log(param1, param2);
// })('funcion', 'autoejecutable'); // argumentos



// Esta funciónd e jquery es para saber si el documento ya está listo
$(() => {

    ocultarContenedorDeBusqueda()

    // console.log('Jquery funcionando')
    search();

    $('#form').submit((e) => {
        e.preventDefault()
        console.log('no es necesario buscar con el boton, es buscador en tiempo real')
    })

    enviarDatosDeFormularioDeTask()

})

const ocultarContenedorDeBusqueda = () => {
    $('#tasks-results').hide()
}

const mostrarCampoDeBusqueda8 = () => {
    $('#tasks-results').show()

}

const search = () => {

    $('#search').keyup(() => {
        //Si no se coloca esta validacion, trae todos las tareas cuando está vacio, solo si se buscó antes
        if ($('#search').val()) {

            hacerPeticion()
        } else {
            vaciarcampoDeBusqueda()
            ocultarContenedorDeBusqueda()
        }
    })
}

const hacerPeticion = () => {
    let search = $('#search').val()
    // console.log(search)
    // Hace petición al servidor
    $.ajax({
        url: 'backend/task-search.php',
        type: 'POST', // envio de informacion
        data: { search }, // dato enviada al servidor
        success: (response) => { // respuesta del servidor

            if (response === '404') { // Ese texto 404 me lo devuelve el servidor, es personalizado, no es muy seguro, podria haber devuelto vaco en el backend, etc
                console.log('response', response)
                return
            }
            let tasks = transformarTareasEnArrayDeObjetos(response)

            mostrarElementosTasks(tasks)



        }
    })
}

const vaciarcampoDeBusqueda = () => {

    $('#tasks-data').html('')
}
const transformarTareasEnArrayDeObjetos = response => {
    try {

        // Convierte un json (objeto js en string) en objeto real js

        let tasks = JSON.parse(response)
        return tasks
    } catch (e) {
        console.log('La busqueda no coincide')
    }

}

const mostrarElementosTasks = jsontasks => {
    // Lo convierto en array para poder usar los metodos de array. Crea un array de una lista de objetos 
    let tasks = Array.from(jsontasks)

    let template = '';
    tasks.forEach((task) => {
        template += `<li>
        ${task.name}
        </li>`
        console.log(task)
    })

    $('#tasks-data').html(template)

}


const enviarDatosDeFormularioDeTask = () => {
    $('#task-form').submit((e) => {
        const task = {
            name: $('#name').val(),
            description: $('#description').val()
        }

        console.log(task)
        e.preventDefault()
    })

}
