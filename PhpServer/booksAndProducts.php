<?php

        $conn = mysql_connect("localhost","root","");
          	$db = mysql_select_db("book_store",$conn);
          	$postdata = file_get_contents("php://input");
              $request = json_decode($postdata);
              $bookId = $request->bId ;
              $productId = $request->bId ;
          	$arr = [];
          	$query = mysql_query('SELECT add_books.b_name ,
          	 add_books.b_quantity,add_books.b_id ,add_productss.p_id ,  add_productss.p_name ,
          	  add_productss.p_price , add_productss.b_id FROM add_books , add_productss WHERE add_books.b_id="' . $bookId . '" AND add_productss.b_id = "' . $productId  . '" ');
          	while($row = mysql_fetch_assoc($query)){
          		array_push($arr,$row);
          	}

          	echo json_encode($arr);


  ?>