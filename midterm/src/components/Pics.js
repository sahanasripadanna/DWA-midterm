import React, {useEffect, useState} from 'react';
import fetch from 'node-fetch';
import Unsplash, { toJson } from 'unsplash-js';
global.fetch = fetch;


export default function Pics({word}){
	const apiKey = "a85fa3cfa9b96a7f89d38f503b241878e63f5d807c500a15a2cc3c3388958f6e";
    const [photoID, setPhotoID] = useState('');
    const [alt, setAlt] = useState('');
	const [photoURL, setPhotoURL] = useState('');

	const unsplash = new Unsplash({ accessKey: `${apiKey}` });
    unsplash.search.photos(word, 1, 1)
    .then(toJson)
    .then(json => {
        console.log(json);
        let ID = json.results[0] ? json.results[0].id: '';
        setPhotoID(ID);
    });

	unsplash.photos.getPhoto(photoID)
    .then(toJson)
    .then(json => {
        let alt = json.alt_description ? json.alt_description : 'none';
        setAlt(alt);
    	let pic = json.urls ? json.urls.small: 'j';
    	setPhotoURL(pic);
    });

    	return (<img src={photoURL} alt={alt}/>);

	}