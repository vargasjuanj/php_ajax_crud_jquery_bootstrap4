<?php


require_once 'conexion.php';

if (isset($_POST['id'])) {

    $id = $_POST['id'];


    $statement = $conexion->conectar()->prepare('SELECT * FROM tasks WHERE id=:id');


    $statement->execute(array(
        ':id' => $id
    ));

    $resultado = $statement->fetch(PDO::FETCH_ASSOC);

    if (!$resultado) {
        die();
    }

    $tasksJson = json_encode($resultado);
    echo $tasksJson;
}
