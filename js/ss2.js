/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


console.log("use?m=#&n=#&r=#"); // demo with big numbers

console.log("Part 2: Shamir Polynomial/start");

var content = document.getElementById('content');


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


// un altre esquema per compartir secrets es el proposat per A. Shamir
// basada en interpolació polinòmica
// esquema de llindar(m,n)



var n = (getParameterByName('n') === "") ? 5 : getParameterByName('n'); // nº participants // 10 equacions
var m = (getParameterByName('m') === "") ? 2 : getParameterByName('m'); // minim participants per poder recuperar la clau. 
range.value = getParameterByName('r') === '' ? range.lenSecrets : getParameterByName('r');


// n: nº users
// m: nº min number of stackeholders

// S = secret key
// P: public prime number

















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
    console.log("llindar(m,n): (" + m + "," + n + ")");
    P = n; // make the loop start 
    while (P <= n) { // P has to be bigger than n (p > n)
	P = primes[Math.round((Math.random() * primes.length))];
    }
    console.log("Public Prime: " + P);

    S = (Math.round((Math.random() * P))); // (p > S)
    console.log("Secret Secrt: " + S);

    pol = [];  // has to be degree m-1
    for (var i = 0; i < m - 1; i++) {
	pol[i] = primes[Math.round(Math.random() * primes.length)];
    } // This are the secret 

    Px = "P(x) = " + S + " +";

    Pg = pol.map(function (item, idx) {
	return item + "x^" + (idx + 1);
    });

    Px += Pg.toString().replace(/,/g, ' +');
    Px += " mod " + P;
    console.log("Polinomi: " + Px);


    //  choose n random variables smaller than P
    xrand = []; // n randoms
    xrandHit = {};
    xShare = [];
    for (var i = 0; i < n; i++) {
	do {
	    var value = Math.round(Math.random() * P);
	    if (xrandHit[value] === undefined) {
		xrandHit[value] = value; // store the operation result

		var result = S;
		result += pol.map(function (item, idx) {
		    return item * Math.pow(value, idx + 1) % P;
		}).reduce(function (a, b) {
		    return a + b;
		});
		xShare[i] = {x: value, px: result % P};
		xrand[i] = value;
	    }
	    // cannot repeat a key
	} while (xrand[value] !== undefined)
    }


    // 





    startUI();

}


function startUI() {
    console.log("Start User Interface");

    settings.innerHTML += "m =" + m + " n=" + n + " P=" + P + " S=" + S;

    preSecret.innerHTML = syntaxHighlight({secret: Px});

    preKeys.innerHTML = JSON.stringify(xShare).replace('[{', '').replace(/},{/g, '\n').replace('}]', '');
}

function decrypt() {
    // to solve this we have to solve the system of equations
    // and find P
    console.log("Resolve Sys Equations");
    result = {}; // sera un json array
    equacions = taInput.value;

    var temp = equacions.split('\n');
    var result = temp.map(function (items) {
	var value = items.split(/\n/)[0].replace(/:/g, '').replace(/[A-z]/g, '').replace(/"/g, '').split(',')
	return {x: parseInt(value[0]), px: parseInt(value[1])};
    });
    console.log(result);

    // prepare m equations and sole it
    var eqIndep = [];
    var eqs = result.map(function (item, idx) {
	var eq = [];
	//eq[0] = S;
	for (var x = 0; x < m; x++) {
	    eq[x] = Math.pow(item.x, x) % P;
	}
	eqIndep[idx] = item.px - S;
	console.log(eq);
	return eq;
    });

    // nomes queda resoldre equacions
    console.log(eqs);
    console.log(eqIndep);

    //mat_inv = pinv(eqs);
    //sol = numeric.dot(mat_inv, eqIndep);
    sol = numeric.solve(eqs, eqIndep);
   
    console.log(sol);
    sol = sol.map(function (item) {
	return Math.round(item % P);
    });

    console.log(sol);
    taOutput.value = JSON.stringify({sol: sol}, 0, 2, null);


}


console.log("Part 2: Shamir Polynomial/end");
