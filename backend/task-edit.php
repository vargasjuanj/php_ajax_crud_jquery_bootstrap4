<?php


require_once 'conexion.php';

$id = $_POST['id'];
$name = $_POST['name'];
$description = $_POST['description'];






    $statement = $conexion->conectar()->prepare('UPDATE tasks SET name = :name, description = :description WHERE id = :id');


    $statement->execute(array(
        ':id' => $id,
        ':name' => $name,
        ':description' => $description
    ));



