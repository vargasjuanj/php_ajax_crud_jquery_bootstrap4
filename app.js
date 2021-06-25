import nose from "./algo.js"

// ((param1, param2) => {
//     console.log(param1, param2);
// })('funcion', 'autoejecutable'); // argumentos



// Esta funciónd e jquery es para saber si el documento ya está listo
$(() => {
    // nose()
    ocultarContenedorDeBusqueda()
    // deshabilitarBotonDelFormTask()


    // console.log('Jquery funcionando')

    // Si se coloca dentro de una función solo se ejecutaria una vez, debe estar en la raiz


    $('#search').keyup(() => {
        mostrarContenedorDeBusqueda()
        //Si no se coloca esta validacion, trae todos las tareas cuando está vacio, solo si se buscó antes
        if ($('#search').val()) {

            hacerPeticionSearch()
        } else {
            vaciarcampoDeBusqueda()
            ocultarContenedorDeBusqueda()
        }
    })


    $('#form').submit((e) => {
        e.preventDefault()
        console.log('no es necesario buscar con el boton, es buscador en tiempo real')
    })


   

    // if($('#name').val() && $('#description').val()){
    //     habilitarBotonDelFormTask()
    // }

    $('#task-form').submit((e) => {
        e.preventDefault()

        const task = extraerTaskDelFormulario()


        // Si tiene un valor de id se quiere editar. El campo del id se puede ocultar
        let url = $('#taskId').val() ? 'backend/task-edit.php' : 'backend/task-add.php'


        enviarPeticionConPost(task, url)
        ocultarIdInput()

    })
    // En este caso esta petición ajax se va a ejecutar apenas la aplicación inicia, ya sea q la ponga en un metodo aparte o la divida en una función, porque no está escuchando un evento
    obtenerTasks()


    // Eliminar
    // En el documento va escuchar los eventos click de la clase task-delete y ejecutar cierta funcion
    $(document).on('click', '.task-delete', function () { // con la funcion flecha no funca
        // Lo que hace $(this) es obtener la referencia al boton que sido clickeado
        // Es un arreglo, el elemento cero es el que ha sido cliqueado, muestra el elemento html
        // let botonDelete = $(this)[0].parentElement.parentElement
        let botonDeleteSeleccionado = $(this)[0]
        eliminarTask(botonDeleteSeleccionado)

    })


    // Editar


    $(document).on('click', '.task-item', function () {


        let enlaceEditarSeleccionado = $(this)[0]
        obtenerUnaTask(enlaceEditarSeleccionado)
        mostrarIdInput()
    })









})




const ocultarContenedorDeBusqueda = () => {
    $('#tasks-results').hide()
}

const mostrarContenedorDeBusqueda = () => {
    $('#tasks-results').show()

}

const ocultarIdInput = () => {
    let taskId = document.getElementById('taskId')
    taskId.classList.add('d-none')
    taskId.classList.remove('d-flex')
}

const mostrarIdInput = () => {
    let taskId = document.getElementById('taskId')
    taskId.classList.remove('d-none')
    taskId.classList.add('d-flex')
}

// const deshabilitarBotonDelFormTask = () => {
//     let botonDeFormTask = document.getElementById('button-form-task')
//     botonDeFormTask.classList.add('disabled')
//     botonDeFormTask.style.cursor = 'none'
// }

// const habilitarBotonDelFormTask = () => {
//     let botonDeFormTask = document.getElementById('button-form-task')
//     botonDeFormTask.classList.remove('disabled')
//     botonDeFormTask.style.cursor = 'pointer'
// }



const hacerPeticionSearch = () => {
    let search = $('#search').val()

    $.ajax({
        url: 'backend/task-search.php',
        type: 'POST', // envio de informacion
        data: { search }, // dato enviada al servidor
        success: (response) => { // respuesta del servidor

            if (response === '404') { // Ese texto 404 me lo devuelve el servidor, es personalizado, no es muy seguro, podria haber devuelto vaco en el backend, etc
                return
            }
            let tasks = transformarTareasEnObjetos(response)

            mostrarElementosTasks(tasks)



        }
    })
}

const vaciarcampoDeBusqueda = () => {

    $('#tasks-data').html('')
}
const transformarTareasEnObjetos = response => {
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


    })

    $('#tasks-data').html(template)

}



const extraerTaskDelFormulario = () => {
    const task = {
        id: $('#taskId').val(),
        name: $('#name').val(),
        description: $('#description').val()
    }
    return task
}
// Se hace uso de otra funcionaldiad distinta de jquery para enviar info
const enviarPeticionConPost = (data, url) => {
    // Le indico a dondde quiero enviarlo, los datos y luego que hago cuando recibo una respuesta
    $.post(url, data, (response) => {
console.log('guardar o editar response' , response)
        obtenerTasks()
        // resetea el formulario
        $('#task-form').trigger('reset')
    })
}

const obtenerTasks = () => {
    $.ajax({
        url: 'backend/task-list.php',
        type: 'GET',
        success: (response) => {
            let tasksjson = transformarTareasEnObjetos(response)

            mostrarListadoDeTasks(tasksjson)



        }
    })
}
const mostrarListadoDeTasks = (tasksjson) => {
    let tasks = Array.from(tasksjson)

    let template = ''

    tasks.forEach(task => {
        template += `<tr>
        <td>${task.id}</td>
        <td><a href="#" class="task-item" title="editar" taskId=${task.id}>${task.name}</a></td>
        <td>${task.description}</td>
        <td>
        
            <button taskId=${task.id} class="btn btn-danger task-delete" title="eliminar">Delete</button>

        </td>
        </tr>`
    })

    $('#tasks').html(template)
}

const eliminarTask = (botonDeleteSeleccionado) => {
    if (confirm('Are you sure you want to delte it?')) {
        // buscamos  el atributo creado taskId y extraemos su valor que es task.id, directamente se lo puse al boton eliminar en vez de al tr y tambien editar asi no navegamos hacia el abuelo
        let id = $(botonDeleteSeleccionado).attr('taskId')
        $.post('backend/task-delete.php', { id }, () => {
            obtenerTasks()

        })
    }
}

const obtenerUnaTask = (enlaceEditarSeleccionado) => {
    let id = $(enlaceEditarSeleccionado).attr('taskId')
    // El id que está dentro de {id} es el parametro de $_POST['id']
    $.post('backend/task-one.php', { id }, (response) => {
        if (!response) {
            llenarFormulario(task)
            console.log('Fallo al obtener task para editar')
            return
        }
        // lo pongo acá en vez de en la raiz, porque al retornar la task que se busca me la devuelve undefined
        llenarFormulario(response)





    })
}
const llenarFormulario = response => {
    let task = transformarTareasEnObjetos(response)

    // LLeno los inputs del formulario

    $('#taskId').val(task.id)
    $('#name').val(task.name)
    $('#description').val(task.description)


}