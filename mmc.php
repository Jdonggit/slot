<?php
/**
 * Example Application
 *
 * @package Example-application
 */

require './libs/Smarty.class.php';
$smarty = new Smarty;
$hostname = 'localhost'; 
$username = 'root'; 
$password = '';
$db_name="test11";

try{
   /** $db=new PDO("mysql:host=".$hostname.";
                dbname=".$db_name, $username, $password);
	$db->exec("set names utf8");	
    $db->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION); //錯誤訊息提醒

		$sql = "SELECT * FROM game_data";
		$result=$db->prepare($sql);
		$result -> execute();
		
		while($row = $result->fetch(PDO::FETCH_BOTH)){;
		$show[] = $row;
		$smarty ->assign('show',$show);
		}
	$db=null; //結束與資料庫連線*/
}
catch(PDOException $e){
    //error message
    echo $e->getMessage(); 
}

$smarty->display('mmc.tpl');
?>