<?php
        $conn = mysql_connect("localhost","root","");
    	$db = mysql_select_db("book_store",$conn);
    	$postdata = file_get_contents("php://input");
    	$request = json_decode($postdata);

    	$sAuthorName = $request->sAuthorName;
    	$sPublisherName = $request-> sPublisher;
    	$sBio = $request->sBio;
    	$sWor = $request->sWor;
    	$regDate = $request->sregDate;
    	$p_id = $request->p_id ;
    	$sImage = $request->sImage;


      $query = mysql_query("INSERT INTO `sub_products`( s_bookAuthor,s_publisherName,s_bookBio,s_readWrite,reg_date,P_id,s_image)
       VALUES ('".$sAuthorName."','".$sPublisherName."' , '".$sBio ."' , '".$sWor."'  , '".$regDate."' , '".$p_id."' ,  '".$sImage."'   )");
      	if($query){
      		echo json_encode(["response"=>"Data Saved Successfully!"]);
      	}
      	else{
        		echo json_encode(["response"=>"Error Occurred"]);
        	}

      ?>