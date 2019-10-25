import React, {useEffect, useState} from 'react';
import axios from 'axios';
 

export default function Home(props){
	const [error, isError] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');

	const [success, isSuccess] = useState(false);
	const [successMessage, setSuccessMessage] = useState('');

	const [madLib, setMadLib] = useState('');

	
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
	}

	function generateVals(madLib){
		let vals = madLib.data ? madLib.data.value.length: '';
		console.log(vals);
	}

	useEffect(() =>  {
		generateMadLib(5, 25);
		generateBlanks(madLib);

	}, []);



	return(
		<div>
			<h1>{madLib.data ? madLib.data.title: ''}</h1>

			{error && <div className="errorMessage">{errorMessage}</div>}
			{success && <div className="successMessage">Mad Lib Generated!</div>}
			<p>{madLib.data ? madLib.data.blanks[0]: ''}:</p>
			<button onClick="generateVals(madLib)">press!</button>


		</div>
		)

}