<?php

            $conn = mysql_connect("localhost","root","");
        	$db = mysql_select_db("book_store",$conn);
        	$postdata = file_get_contents("php://input");
             $request = json_decode($postdata);
             $c_id = $request->customerId;

        	 	$arr = [];
                    	$query = mysql_query("select * from  saleproducts where c_id = '".$c_id."'");
                    	while($row = mysql_fetch_assoc($query)){
                    		array_push($arr,$row);
                    	}

                    	echo json_encode($arr);


?>