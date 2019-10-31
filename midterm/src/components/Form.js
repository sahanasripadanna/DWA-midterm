import React, {useEffect, useState} from 'react';
import Pics from "../components/Pics"

export default function Form({arr}){
	let text = Array();
	var i;
	for (i = 0; i < arr.length; i++){

  		text.push(<p>{arr[i]}:<input type="text" className="myText"/></p>);
	}



	return(
		<div>
		{text}
		</div>
		);
}
