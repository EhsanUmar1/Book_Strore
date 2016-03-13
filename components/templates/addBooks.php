<?php
                $conn = mysql_connect("localhost","root","");
            	$db = mysql_select_db("book_store",$conn);
            	$postdata = file_get_contents("php://input");

            	$request = json_decode($postdata);

            	$pName = $request->pName;
            	$pPrice = $request-> pPrice;
            	$prQuantity = $request->pQuantity ;
            	$pImage = $request->pImage;

              $query = mysql_query("Insert into add_books(b_name,b_price ,b_quantity,b_image)
               VALUES ('".$pName."','".$pPrice."' , '".$prQuantity."' , '".$pImage."' )");
              	if($query){
              		echo json_encode(["response"=>"Data Saved Successfully!"]);
              	}
              	else{
                		echo json_encode(["response"=>"Error Occurred"]);
                	}

              ?>