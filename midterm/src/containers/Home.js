import React, {useEffect, useState} from 'react';
import axios from 'axios';
import Pics from "../components/Pics"
import Form from "../components/Form"

export default function Home(props){
	const [error, isError] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');

	const [success, isSuccess] = useState(false);
	const [successMessage, setSuccessMessage] = useState('');

	const [madLib, setMadLib] = useState('');
	const [photo, setPhoto] = useState('');
	const [photo2, setPhoto2] = useState('');
	const [photo3, setPhoto3] = useState('');

	const [vals, setVals] = useState('');

	var x = [];
	
	function generateMadLib(minlength, maxlength){
		axios.get(`http://madlibz.herokuapp.com/api/random?minlength=${minlength}&maxlength=${maxlength}`)
		.then(function(response){
			// console.log('response', response);
			setMadLib(response);
			isSuccess(true);
			setErrorMessage(`${success.status}: ${'Success'}`);
			return response;
		})
		.catch(function(error){
			console.log('error', error);
			isError(true);
			setErrorMessage(`${error.status}: ${'Error'}`);
			return error;
		});
	}

	useEffect(() =>  {
		generateMadLib(5, 25);
	}, []);

	function update(){
  		x = document.getElementsByClassName("myText").length;
  		let result = madLib.data ? madLib.data.value[0]: '';
  		
  		for (let i = 0; i < x; i++){
  			result += document.getElementsByClassName("myText")[i].value;
  			result += madLib.data.value[i+1];
		}
  		setVals(result);
  		let pic = document.getElementsByClassName("myText")[0].value;
  		setPhoto(pic);
  		pic = document.getElementsByClassName("myText")[1].value;
  		setPhoto2(pic);
  		pic = document.getElementsByClassName("myText")[2].value;
  		setPhoto3(pic);
  		var y = document.getElementById("photo"); 
    	y.style.display = "block";
 	
	}

	return(
		<div>
			<h1>{madLib.data ? madLib.data.title: ''}</h1>
			<Pics word={madLib.data ? madLib.data.title: ''}></Pics>

			<div id="lib">{vals}</div> 
			<div id="photo">
				<Pics word={photo}></Pics>
				<Pics word={photo2}></Pics>
				<Pics word={photo3}></Pics>
			</div>
			
			<Form arr={madLib.data ? madLib.data.blanks: ''}></Form>

			<button class="button" onClick={()=>update()}>generate MadLib!</button>

			


		</div>
		)

}