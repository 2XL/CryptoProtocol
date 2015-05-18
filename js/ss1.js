/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

console.log("use?big=t"); // demo with big numbers

console.log("Part 1: Secret Sharing/start");
console.log("(esquemes vectorials), G.R. Blakley...");

var content = document.getElementById('content');
var taInput = document.getElementById('messageIn');
var taOutput = document.getElementById('messageOut');
// var inputKeys = document.getElementById('inputKeys');
var preSecret = document.getElementById('secrets');
var preKeys = document.getElementById('keys');
var settings = document.getElementById('settings');
var btnDecrypt = document.getElementById('btn-decrypt');
btnDecrypt.onclick = decrypt;
// var btnEncrypt = document.getElementById('btn-encrypt').addEventListener('onclick', decrypt(taInput.innerHTML, inputKeys.innerHTML));



console.log(Number.MAX_SAFE_INTEGER); // 9007199254740991
var range = {
    max: Math.pow(2, 53) - 1, // 9007199254740991
    min: -(Math.pow(2, 53) - 1), // -9007199254740991
    val: Math.pow(10, 15) - 1, // 999999999999999 // 15 digits
    lenKeys: Number.MAX_SAFE_INTEGER,
    lenSecrets: 16,
    value: 0
};

var key_min_size = 100; // key size of atleast 100 digits
var key = [15, 30, 45, 60, 75, 90, 105];
// m will be atleast 7 or each user own more than one key, such as super users
// for instance:
// float admiral has 4
// admirals has 3 
// sub admirals has 1
// 

var n = (getParameterByName('n') === "") ? 10 : getParameterByName('n'); // nº participants // 10 equacions
var m = (getParameterByName('m') === "") ? 7 : getParameterByName('m'); // minim participants per poder recuperar la clau. 
range.value = getParameterByName('r') === '' ? range.lenSecrets : getParameterByName('r');



// cal generar 

// TODO generar n equacions amb m 
// incognites sense que les equacions siguin paralleles

/*
 Los sistemas de ecuaciones equivalentes son los que tienen el mismo conjunto de soluciones, aunque tengan distinto número de ecuaciones.
 
 Obtenemos sistemas equivalentes por eliminación de ecuaciones dependientes. Si:
 
 Todos los coeficientes son ceros.
 
 Dos ecuaciones son iguales.
 
 Una ecuación es proporcional a otra.
 
 Una ecuación es combinación lineal de otras.
 */

/*
 * donat que voles que les equaciones no siguin paraleles
 */

/*
 * es voldra que cada equació contingui un primer
 */


function loadJSON(url, callback) {
    $.ajax({
	dataType: "json",
	url: url, // tiene que ser un path absoluto (www.asdf), o relativo
	// data: data, // request parameters to the server...
	success: successLoad
    });

    function successLoad(data) {
	return callback(data);
    }
}

var url = '../json/1048576primes.json';


loadJSON(url, todo);

function todo(data) {
    console.log(data);
    p = data;
    start(data);
}



function start(primes) {
    console.log("start");

    // generar una matriu de m x n
    // generar n numeros primers
    var list_primes = [];
    var list = {}
    var len = primes.length;
    var number;
    var count = 0;
    while (count < n) {
	number = Math.floor(Math.random() * len);
	if (list[number] === undefined)
	{
	    list[number] = primes[number];
	    list_primes.push(primes[number]);
	    count++;
	}
    }

    matrix = [];
    for (var i = 0; i < n; i++) {
	matrix[i] = [];
	matrix[i][0] = list_primes[i];
	for (var j = 1; j < m; j++) {

	    matrix[i][j] = Math.floor(Math.random() * (range.value));
	    matrix[i][j] *= (Math.random() > 0.5) ? 1 : -1;
	}
    }

    secret = [];
    for (var i = 0; i < m; i++) {
	secret[i] = Math.floor(Math.random() * (range.value));
	// secret[i] *= (Math.random() > 0.5) ? 1 : -1;
    }

    independent = [];
    for (var i = 0; i < n; i++) {
	var temp = matrix[i].map(function (data, idx) {
	    return data * secret[idx];
	}).reduce(function (a, b) {
	    return a + b;
	});
	independent[i] = temp;
    }


    startUI(matrix, secret, independent);


}


function startUI(matrix, secret, indep) {
    console.log("Start User Interface");

    settings.innerHTML += "m =" + m + " n=" + n;

    preSecret.innerHTML = syntaxHighlight({secret: secret});

    // convertir matrix + indep en format equació

    var alphabet = "abcdefghijklmnopqrstuvwxyz".split(""); // we have up to 26 characters
    /*
     .each(alphabet, function (letter) {
     console.log(letter);
     });
     */

    var equations = matrix.map(function (items, idx) {
	return items.map(function (item, idx) {
	    return ((item >= 0) ? '+' : '') + item + alphabet[idx];
	}).toString().replace(/,/g, '\t') + '= \t' + indep[idx];
    }).toString().replace(/,/g, '<br>');
    console.log(equations);



    preKeys.innerHTML = equations;




}


function encrypt(message, key) {
    // utilizar la llibreria triplesec...etc
    // agafar el missatge i tractarho amb la clau...
    // la claus sera secret.toString
}


function decrypt() {
    console.log("Resolve Sys Equations");
    result = {}; // sera un json array
    equacions = taInput.value;
    num_equations = equacions
	    .replace(/[a-z]/g, '')
	    .replace(/=/g, '')
	    .split('\n');
    if (num_equations.length < m) {
	console.error("Too few Equations");
    } else {
	console.log("Compute!")
	array_list = num_equations.map(function (items) {
	    return items.split('\t').map(function (item) {
		return parseInt(item);
	    });
	});

	// solve the matrix 
	mat = [];
	vect = [];
	for (var i = 0; i < m; i++) {
	    mat[i] = [];
	    for (var j = 0; j < m; j++) {
		mat[i][j] = array_list[i][j]
	    }
	    vect[i] = array_list[i][m];
	}
	// solve the linear equation mat and vect
	// compute the inverse
	mat_inv = pinv(mat);
	sol = numeric.dot(mat_inv, vect);
	console.log(sol);

	taOutput.value = JSON.stringify({sol: sol}, 0, 2, null);


    }
    // resoldre system d'equacions per esbrinar el secret 
    // utilitzar la llibreria numeric-...etc
}

function pinv(A) {
    return numeric.dot(numeric.inv(numeric.dot(numeric.transpose(A), A)), numeric.transpose(A));
}



function syntaxHighlight(json) {
    if (typeof json != 'string') {
	json = JSON.stringify(json, undefined, 2);
    }
    json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
	var cls = 'number';
	if (/^"/.test(match)) {
	    if (/:$/.test(match)) {
		cls = 'key';
	    } else {
		cls = 'string';
	    }
	} else if (/true|false/.test(match)) {
	    cls = 'boolean';
	} else if (/null/.test(match)) {
	    cls = 'null';
	}
	return '<span class="' + cls + '">' + match + '</span>';
    });
}

function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
	    results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}




console.log("Part 1: Secret Sharing/end");