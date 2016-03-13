<?php

            $conn = mysql_connect("localhost","root","");
        	$db = mysql_select_db("book_store",$conn);
        	$postdata = file_get_contents("php://input");
            $request = json_decode($postdata);

           $email = $request->email;
           $password = $request->password;
$arr = [];
$query = mysql_query('select  admin_email , admin_password from  admin_login  where admin_email ="' . $email . '"
        	                                           AND admin_password = "' . $password . '"
        	');
        	while($row = mysql_fetch_assoc($query)){
        		array_push($arr,$row);
        	}

        	echo json_encode($arr);
?>