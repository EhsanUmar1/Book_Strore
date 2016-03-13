<?php

      $conn = mysql_connect("localhost","root","");
        	$db = mysql_select_db("book_store",$conn);
        	$arr = [];
        	$query = mysql_query("select * from  add_books");
        	while($row = mysql_fetch_assoc($query)){
        		array_push($arr,$row);
        	}

        	echo json_encode($arr);


?>
