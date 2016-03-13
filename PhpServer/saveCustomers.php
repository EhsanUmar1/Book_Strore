<?php
	$conn = mysql_connect("localhost","root","");
	$db = mysql_select_db("book_store",$conn);
	$postdata = file_get_contents("php://input");
	$request = json_decode($postdata);

	$name = $request->name;
	$email = $request->email;
	$password = $request->password;
	$address = $request->address;


	$qry_em = 'select count(*) as cnt from customers where c_email ="' . $email . '"';
    $qry_res = mysql_query($qry_em);
    $res = mysql_fetch_assoc($qry_res);


    if( $res['cnt'] == 0){

      $query = mysql_query("Insert into customers(c_name,c_email , c_password, c_address )
       VALUES ('".$name."','".$email."' , '".$password."' , '".$address."' )");
      	if($query){
      		echo json_encode(["response"=>"yes"]);
      	}
      	else{
        		echo json_encode(["response"=>"Error Occurred"]);
        	}

    }
    else{

    echo json_encode(["response"=>"no"]);

    }


?>