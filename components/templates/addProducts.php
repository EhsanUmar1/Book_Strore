<?php
        $conn = mysql_connect("localhost","root","");
    	$db = mysql_select_db("book_store",$conn);
    	$postdata = file_get_contents("php://input");
    	$request = json_decode($postdata);

    	$pName = $request->pName;
    	$pPrice = $request-> pPrice;
    	$pDescription = $request->pDescription;
    	$pImage = $request->pImage;
        $bookIde = $request->bId;
      $query = mysql_query("INSERT INTO `add_productss`( p_name,p_price,p_description,p_image,b_id)
       VALUES ('".$pName."','".$pPrice."' , '".$pDescription ."' , '".$pImage."'  , '". $bookIde."' )");
      	if($query){
      		echo json_encode(["response"=>"Data Saved Successfully!"]);
      	}
      	else{
        		echo json_encode(["response"=>"Error Occurred"]);
        	}

      ?>