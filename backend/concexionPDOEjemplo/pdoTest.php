<?php

$id = 1;
// $id = $_GET['id'];


try{

    $conexion = new PDO('mysql:host=localhost;dbname=crud_php','root','');

}catch(PDOException $e){

echo 'Error! '. $e->getMessage();

}

//Consultas preparadas, evita inyecciónd e código

// Aca preparamos la consulta, no la ejecutamos. El :id es como un placeholder, y más adelante lo vamos a reemplazar por algún valor
// $statement = $conexion->prepare('SELECT * FROM tasks WHERE id = :id or title = :title');
$statement = $conexion->prepare('SELECT * FROM tasks WHERE id = :id or title = :title');

// Ejecución, execute() recibe un parametro en forma de arregglo, relleno los placeholders

$statement-> execute( array(
    ':id' => $id, 
    ':title' => 'tata' 
));

//Mostrar los datos. Hay dos formas, mostrar un valor fetch() y una lista fetchAll()

// con esl argumento PDO::FETCH_ASSOC el array asociativo queda con las keyes justas, elimina las key de index númerica
$resultado = $statement->fetch(PDO::FETCH_ASSOC);

echo '<pre>';
print_r($resultado);
echo '</pre>';


///////////////////// FETCH ALL

$statement2 = $conexion->prepare('SELECT * FROM tasks');


$statement2-> execute();



//Si creo dos registros con title = 'tata' me va a traer los dos registros
//La variable lista de resultados es un arreglo con arreglos adentro
$listaDeResultados = $statement2->fetchAll(PDO::FETCH_ASSOC);
//Muestra más clara  la info con la etiqueta pre


foreach($listaDeResultados as $task){
  echo $task['title'] . '<br>';
}

///////////// INSERTAR

$statement3 = $conexion->prepare('INSERT INTO tasks (id,title) VALUES(null,"Jose")');


$statement3-> execute();
