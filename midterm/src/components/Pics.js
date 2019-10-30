import React, {useEffect, useState} from 'react';
import fetch from 'node-fetch';
import Unsplash, { toJson } from 'unsplash-js';
global.fetch = fetch;


export default function Pics({word}){
	const apiKey = "a85fa3cfa9b96a7f89d38f503b241878e63f5d807c500a15a2cc3c3388958f6e";
	const [photoURL, setPhotoURL] = useState('');

	const unsplash = new Unsplash({ accessKey: `${apiKey}` });
	console.log(word);
	unsplash.photos.getPhoto(word)
    .then(toJson)
    .then(json => {
    	// let pic = json ? json.urls.small: 'j';
    	// console.log("id", pic);
    	// setPhotoURL(pic);
    });

    	return (<img src={photoURL} alt="hi"/>);

	}