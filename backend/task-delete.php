<?php


require_once 'conexion.php';

if(isset($_POST['id'])){

    $id = $_POST['id'];

    
    $statement = $conexion->conectar()->prepare('DELETE FROM tasks WHERE id=:id');
 

    $statement->execute(array(
        ':id' => $id
    ));
}
