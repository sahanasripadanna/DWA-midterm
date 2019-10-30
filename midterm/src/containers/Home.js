import React, {useEffect, useState} from 'react';
import axios from 'axios';
import Pics from "../components/Pics"

export default function Home(props){
	const [error, isError] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');

	const [success, isSuccess] = useState(false);
	const [successMessage, setSuccessMessage] = useState('');

	const [madLib, setMadLib] = useState('');
	const [blank, setBlanks] = useState('');
	const [vals, setVals] = useState('');

	const [photo, setPhoto] = useState('');
	var x = [];
	
	function generateMadLib(minlength, maxlength){
		axios.get(`http://madlibz.herokuapp.com/api/random?minlength=${minlength}&maxlength=${maxlength}`)
		.then(function(response){
			console.log('response', response);
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

	function generateBlanks(madLib){
		let blankstring = madLib.data ? madLib.data.blanks.length: '';
		console.log(blankstring);
		setBlanks(blankstring);
	}

	function generateVals(madLib){
		let valsleng = madLib.data ? madLib.data.value.length: '';
		let vals = madLib.data ? madLib.data.value[1]: '';
		console.log(vals);
		setVals(vals);
	}

	useEffect(() =>  {
		generateMadLib(5, 25);
		generateBlanks(madLib);
		generateVals(madLib);
		// let photoID = "mtNweauBsMQ";
		// setPhoto(photoID);
	}, []);

	function update(){
  		x = document.getElementsByClassName("myText")[0].value;
  		console.log(x);
  		// document.getElementById("demo").innerHTML += x;
  		setVals(x);
	}

	return(
		<div>
			<h1>{madLib.data ? madLib.data.title: ''}</h1>
			<h2>{blank}</h2>
			{error && <div className="errorMessage">{errorMessage}</div>}
			{success && <div className="successMessage">Mad Lib Generated!</div>}
			<p>{madLib.data ? madLib.data.blanks[0]: ''}:<input type="text" className="myText"/></p>
			<p>{madLib.data ? madLib.data.blanks[1]: ''}:<input type="text" className="myText"/></p>
			<p>{madLib.data ? madLib.data.blanks[2]: ''}:<input type="text" className="myText"/></p>
			<p>{madLib.data ? madLib.data.blanks[3]: ''}:<input type="text" className="myText"/></p>
			<p>{madLib.data ? madLib.data.blanks[4]: ''}:<input type="text" className="myText"/></p>
			<p>{madLib.data ? madLib.data.blanks[5]: ''}:<input type="text" className="myText"/></p>

			<button onClick={()=>update()}>press!</button>
			<p id="demo"></p> 
			<p>{madLib.data ? madLib.data.value[0]: ''} {vals} {madLib.data ? madLib.data.value[madLib.data.value.length-2]: ''}</p>
			<Pics word={photo}></Pics>
			


		</div>
		)

}