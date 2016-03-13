<?php

      $conn = mysql_connect("localhost","root","");
        	$db = mysql_select_db("book_store",$conn);
                    $postdata = file_get_contents("php://input");
                    $request = json_decode($postdata);
                    $bookId = $request->bId ;

                    $length = count($bookId);
                   $name = $bookId[0]->pricee;
                     $email = 'ehsan';
                     $password = '1234';
                     $address ='23ew';
                    for($i=0; $i< $length; $i++){
                    mysql_query("Insert into customers(c_name,c_email , c_password, c_address )
                           VALUES ('".$bookId[$i]->bookId."','".$bookId[$i]->productId."' , '".$bookId[$i]->quantity."'
                           , '".$bookId[$i]->pricee."' )");

                    }




?>