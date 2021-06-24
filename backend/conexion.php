<?php

class Conexion
{   


    private $host = 'localhost';
    private $dbname = 'php_ajax_crud';
    private $usuario = 'root';
    private $password = '';


    public function conectar() {

        try {

            $conexion = new PDO("mysql:host=$this->host;dbname=$this->dbname", $this->usuario, $this->password);

        } catch (PDOException $e) {

            echo 'Error al conect ar bd! ' . $e->getMessage();
        }


        return $conexion;
    }
}

$conexion = new Conexion();

// if($conexion->conectar()){
//     echo 'conectado';
// }



?>