<?php

            $conn = mysql_connect("localhost","root","");
        	$db = mysql_select_db("book_store",$conn);
        	$postdata = file_get_contents("php://input");
             $request = json_decode($postdata);
             $email = $request->useremail;
             $pass = $request->userpassword;
        	 	$arr = [];
                    	$query = mysql_query("select * from  customers where c_email = '".$email."' AND c_password = '".$pass."'");
                    	if($query){
                    	while($row = mysql_fetch_assoc($query)){
                                            		array_push($arr,$row);
                                            	}

                                            	echo json_encode($arr);
                    	}
                    	else{
                    	echo json_encode("Wrong!");
                    	}


?>