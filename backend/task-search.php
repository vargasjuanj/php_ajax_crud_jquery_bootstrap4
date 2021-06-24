<?php

require_once 'conexion.php';

$search = $_POST['search'];

// La preparo para el statement, porque el simbolo porcentaje no se puede usar, asi que lo includyo directamente
$search = $search . '%';

if (!empty($search)) {

    $resultados = buscarResultados();
    if (!$resultados) {
        die("404");
    } else {
        enviarResultadosEnJson($resultados);
    }
}





function buscarResultados()
{
    // Selecciona todo los campos de la tabla task, donde el nombre coincida (LIKE) con lo que se recibe de $search. El % al final para que coincida con todos los q se paresca
    $statement = $GLOBALS['conexion']->conectar()->prepare('SELECT * FROM tasks WHERE name LIKE :search ');

    $statement->execute(array(
        ':search' => $GLOBALS['search']
    ));

    // con esl argumento PDO::FETCH_ASSOC el array asociativo queda con las keyes justas, elimina las key de index númerica
    $resultados = $statement->fetchAll(PDO::FETCH_ASSOC);

    // echo '<pre>';
    // print_r($resultados);
    // echo '</pre>';

    return $resultados;
}

function enviarResultadosEnJson($resultados)
{
    // Lo transforma en un jsonstring
    $tasksJson = json_encode($resultados);
    echo $tasksJson;
}
