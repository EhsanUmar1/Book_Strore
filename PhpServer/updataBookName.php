<?php
                $conn = mysql_connect("localhost","root","");
            	$db = mysql_select_db("book_store",$conn);
            	$postdata = file_get_contents("php://input");
            	$request = json_decode($postdata);

            	$bName = $request->bName;
            	$bId = $request->bId;
                 $query = mysql_query('UPDATE add_books set b_name ="'.$bName.'" WHERE b_id = "'.$bId.'" ');

              	if($query){
              		echo json_encode(["response"=>"Data Updated Successfully!"]);
              	}
              	else{
                		echo json_encode(["response"=>"Error Occurred"]);
                	}

              ?>