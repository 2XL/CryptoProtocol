/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


console.log("Part 1: Secret Sharing/start");
console.log("(esquemes vectorials), G.R. Blakley...");

var content = document.getElementById('content');


console.log(Number.MAX_SAFE_INTEGER); // 9007199254740991
var range = {
    max: Math.pow(2, 53) - 1, // 9007199254740991
    min: -(Math.pow(2, 53) - 1), // -9007199254740991
    val: Math.pow(10, 15) - 1, // 999999999999999 // 15 digits
    test: Number.MAX_SAFE_INTEGER
};

var key_min_size = 100; // key size of atleast 100 digits
var key = [15, 30, 45, 60, 75, 90, 105];
// m will be atleast 7 or each user own more than one key, such as super users
// for instance:
// float admiral has 4
// admirals has 3 
// sub admirals has 1
// 

var n = 10; // nº participants // 10 equacions
var m = 7; // minim participants per poder recuperar la clau. 




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

	    matrix[i][j] = Math.floor(Math.random() * range.test);
	    matrix[i][j] *= (Math.random() > 0.5) ? 1 : -1;
	}
    }
    
    secret = [];
    for (var i = 0; i < m; i++) {
	secret[i] = Math.floor(Math.random() * range.test);
	// secret[i] *= (Math.random() > 0.5) ? 1 : -1;
    }

    independent = [];
    for (var i = 0; i< m; i++){
	var temp = matrix[i].map(function(data, idx){
	    return data*secret[idx];
	}).reduce(function(a, b){
	    return a+b;
	});
	independent[i] = temp;
    }





}


function startUI(matrix, secret, indep){
    
    var secrets = document.getElementById('secrets');
    var keys = document.getElementById('keys');
    
    
    
     
    
    
}



console.log("Part 1: Secret Sharing/end");