/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


console.log("use?m=#&n=#&r=#"); // demo with big numbers

console.log("Part 2: Shamir Polynomial/start");

var content = document.getElementById('content');

// un altre esquema per compartir secrets es el proposat per A

// esquema de llindar(m,n)
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


var n = (getParameterByName('n') === "") ? 10 : getParameterByName('n'); // nº participants // 10 equacions
var m = (getParameterByName('m') === "") ? 7 : getParameterByName('m'); // minim participants per poder recuperar la clau. 
range.value = getParameterByName('r') === '' ? range.lenSecrets : getParameterByName('r');




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

}


function startUI(){
    
}

function decrypt(){
    
}


console.log("Part 2: Shamir Polynomial/end");
