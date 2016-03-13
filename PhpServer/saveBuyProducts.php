<?php

                    $conn = mysql_connect("localhost","root","");
        	        $db = mysql_select_db("book_store",$conn);
                    $postdata = file_get_contents("php://input");
                    $request = json_decode($postdata);
                    $bookId = $request->buyProducts;
                    $length = count($bookId);
                    $userId = $request-> userRecord;
                    for($i=0; $i< $length; $i++){
                    mysql_query("Insert into saleProducts(s_bookId , s_productsId , s_productTotalPrice, s_productQuantity ,s_productImage, c_id )
                           VALUES ('".$bookId[$i]->bookId."','".$bookId[$i]->productId."' ,'".$bookId[$i]->pricee."' , '".$bookId[$i]->quantity."'
                           , '".$bookId[$i]->imagee."' , '".$userId."' )");

                    }




?>