<?php

require_once 'conexion.php';

if(isset($_POST['name'])){
    $name = $_POST['name'];
    $description = $_POST['description'];
insertarTask($name, $description);

}


function insertarTask($name, $description){
    $statement = $GLOBALS['conexion']->conectar()->prepare('INSERT INTO tasks (name,description) VALUES(:name,:description)');
    $resultado =  $statement->execute(array(
        ':name' => $name,
        ':description' => $description
    ));

    if(!$resultado){
        die('el insert fallo');
    }

    echo 'Tarea agregada satisfactoriamente';
}
