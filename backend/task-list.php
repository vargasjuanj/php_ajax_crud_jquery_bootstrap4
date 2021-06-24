<?php

require_once 'conexion.php';


$statement = $conexion->conectar()->prepare('SELECT * FROM tasks');
$statement->execute();
$resultados = $statement->fetchAll(PDO::FETCH_ASSOC);


if (!$resultados) {
    die('Consulta de listado fallida');
}

$tasksJson = json_encode($resultados);
echo $tasksJson;

?>
