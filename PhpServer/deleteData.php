<?php
	$conn = mysql_connect("localhost","root","");
	$db = mysql_select_db("book_store",$conn);
	$postdata = file_get_contents("php://input");
	$request = json_decode($postdata);

	 $bookId = $request->bookId;
	 $prouctId = $request->productId;

     $sql = 'DELETE FROM add_productss  WHERE add_productss.p_id = "'.$prouctId.'"';

    $query = mysql_query($sql);

    if($query){
   echo json_encode(["response"=>"Data Deleted Successfully!"]);

    }
   else{
   echo json_encode(["response"=>"Error Occurred"]);
    }




?>