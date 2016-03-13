<?php

      $conn = mysql_connect("localhost","root","");
        	$db = mysql_select_db("book_store",$conn);
        	$postdata = file_get_contents("php://input");
             $request = json_decode($postdata);

           $id = $request->pId ;
        	$arr = [];

        	$query = mysql_query('select  * from  sub_products  where P_id ="' . $id . '"');
        	while($row = mysql_fetch_assoc($query)){
        		array_push($arr,$row);
        	}

        	echo json_encode($arr);


?>