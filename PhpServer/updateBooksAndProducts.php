<?php
   $conn = mysql_connect("localhost","root","");
   $db = mysql_select_db("book_store",$conn);
   $postdata = file_get_contents("php://input");
   $request = json_decode($postdata);
   $bName = $request->bName;
   $pName = $request->pName;
   $pPrice = $request->price;
   $quantity = $request->quantity;
   $bId = $request->bId;
   $pId = $request->pId;
    $query = mysql_query('UPDATE add_books, add_productss  set add_books.b_name ="'.$bName.'" ,add_books.b_quantity ="'.$quantity.'" ,add_productss.p_name="'.$pName.'",add_productss.p_price="'.$pPrice.'"

              WHERE add_books.b_id = "'.$bId.'" AND add_productss.p_id = "'.$pId.'"  ');

    if($query){
    echo json_encode(["response"=>"Data Updated Successfully!"]);
    }
   else{
   echo json_encode(["response"=>"Error Occurred"]);
    }

    ?>