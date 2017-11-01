// Определить и записать в новый массив только один тип данных 
// (числа)
// (строки)
// числа суммировать, а строки записать в массиве через дефис

var arr = [100, "200", 10, "lorem", "ipson", 40];
var arr_num = [];
var arr_str = [];
var sum = 0;
for (var i = 0; i < arr.length; i++) {
if (isNaN(JSON.stringify(arr[i]))) {
arr_str.push(arr[i]); 
}
else {
arr_num.push(arr[i]);
 sum = sum + arr[i];
  }
}
console.log("Исходный массив: " + arr);
console.log("Массив чисел: " + arr_num);
console.log("Массив строк: " + arr_str);
console.log("Сумма числового массива: " + sum);
console.log("Вывод строчного массива через тире: " + arr_str.join(" - "));

*************splice********************************************************************

var arr = [100, "200", 10, "lorem", "ipson", 40];
var arr_num = [];
var arr_str = [];
var sum = 0;
for (var i = 0; i < arr.length; i++) {
if (isNaN(JSON.stringify(arr[i]))) {
arr_str.push(arr[i]); 
arr_str.splice(arr_str.length,0, " - ");
}
else {
arr_num.push(arr[i]);
 sum = sum + arr[i];
  }
}
arr_str.splice(-1,1);
console.log("Исходный массив: " + arr);
console.log("Массив чисел: " + arr_num);
console.log("Массив строк: " + arr_str);
console.log("Сумма числового массива: " + sum);

*******************************************************************************************

//Записать значения и ключи yongPerson в oldMam
var oldMan ={
name: "Vasa",
surname: "Pirogov",
age: 40,
male: "male",
money: "$1000000",
health: false
};
var yongPerson ={
name: "Vova",
surname: "Blinoff",
age: 18,
male: "male",
money: "$100",
health: true,
marige: true,
kids: 0,
working: 'student'
};
for (key in oldMan) {
console.log("Значения ключей OldMan:",oldMan[key]);
};
for (key in yongPerson) {
oldMan[key] = yongPerson[key];
console.log("Значения ключей yongPerson и OldMan: ",yongPerson[key],oldMan[key]);
};

*******************************************************************************************


var First = function One() {
	console.log("one", 1);
}
var Second = function Two() {
	console.log("two", 2);
}
var Third = function Three() {
	console.log("three", 3);
}
var arr = [First, Second, Third];
function Result(array){
for(var i = 0; i < array.length; i++){
console.log(array[i]());}
}
Result(arr);

*******************************************************************************************

// Реализовать функцию compose, 
// которая принимает аргументами 
// любое количество функций, и 
// возвращает функцию, которая при 
// вызове вызовет все функции, которые 
// compose получила аргументом.

function log1() {console.log(111)};
function log2() {console.log(222)};
function log3() {console.log(333)};
function compose() {
var value = arguments;
return function(){
for (var i = 0; i < value.length; i++) {
value[i]();}}}
var logAll = compose(log1, log2, log3);
logAll();

// function log1() {console.log(111)};
// function log2() {console.log(222)};
// function log3() {console.log(333)};
// function compose() {
// for (var i=0; i < arguments.lenght; i++){
// return console.log(arguments[i]);
// }}
// var logAll = compose(log1(), log2(), log3());
// logAll;

*******************************************************************************************

var obj = {
	name1:function() {
	console.log('1');},
		name2: function() {
		console.log('2');},
			name3: function() {
			console.log('3');}}
var funcObj = {};
	var arr = ['func1','func2','func3'];
function ArrObj(obj, arr){
	var keys = Object.keys(obj);
		var values = keys.map(function(key) {
  			return obj[key];});
for (var i = 0; i < arr.length; i++){
	funcObj[arr[i]] = values[i]};
		return funcObj;}
ArrObj(obj, arr);

// ////// Как должно работать:
// var funcObj = {
// func1: function() {
// 	console.log('1')},
// func2: function() {
// 	console.log('2')},
// func3: function() {
// 	console.log('3')}}
******************************************************

Реализовать функцию isInArray , проверяющую вхождение элементов в массив. 
Первый аргумент функции - массив, последующие - элементы, вхождение в массив которых проверяется. 
Функция возвращает true, если все аргументы, кроме первого являются элементами массива.

function isInArray(arr) {
	for ( var i = 1; i < arguments.length; i++){
		if (arr.indexOf(arguments[i]) === -1) {
			return false;} 
				}return true;}
isInArray([1], 1); // true
isInArray([1], 1, 2); // false
isInArray([1,2], 1,2); //true
isInArray([1,2], 1,2,3); //false


// Как должно работать:
// isInArray([1], 1); // true
// isInArray([1], 1, 2); // false

******************************************************

Реализовать функцию exprFunction(arrFunction), которая получает аргументом 
массив функций arrFunction, и возвращает массив, где каждый элемент это результат 
вызова функции стоящей на индексе, что и элемент.

// Как должно работать:
//exprFunction([returnStr, returnUserObj, nothing]); // ["Hello", {name: "Vova"}, undefined]

var arrFunction = [function(){
var str = "Hello"; return str;
},function(){
var obj = {name: "Vova"}; return obj;
},function(){
var nothing; return nothing;
}]; 
function exprFunction(arrFunction){
var result = [];
for (var i = 0; i < arrFunction.length; i++){
	result.push(arrFunction[i]());}
return result;
}
exprFunction(arrFunction);

******************************************************

Реализовать функцию objectToString(obj), которая принимает аргументом объект, 
возвращает строку. 

var obj = {user: 'Vova', password: 'pass'};
function objectToString(obj) {
var str = "";
for (var key in obj){
str =  str + key +  " = " +  obj[key] + " & "}
return str.substr(0,str.length-3);
}
objectToString(obj);
console.log(objectToString({user: 'Vova', password: 'pass'}));

// Как должно работать:
//console.log(objectToString({user: 'Vova'})); // user=Vova
//console.log(objectToString({user: 'Vova', password: 'pass'})); // user=Vova&password=pass

******************************************************

1. Написать логику факториала.

function fuctorial (num){
var n = 1;
	if (num === 0){
		return 1;} 
			else {
				for (var i = 2; i <= num ; i++){
				n = n * i;}}
					return console.log(num + "! = " + n);}
						fuctorial(10);
						fuctorial(15);
						fuctorial(170);

//Пример работы:
//10! = 3628800
//15! = 1307674368000
//170! = 7.257415615307994e+306

***************************************************************************************************************

2. Реализуй функцию StringToObject(queryString), 
которая возвращает объект. Распознавать следующие 
типы данных: числа, строки, булевы. Помни, что некоторые 
символы query string могут быть закодированы.

function StringToObject(queryString){
var obj = {};
var arrName = [];
var arrValue = [];
var arrDecoder = queryString.split(/[=&]/);
for (var i = 0; i < arrDecoder.length; i = i + 2){
	arrName.push(arrDecoder[i]);}
		for (var j = 1; j < arrDecoder.length; j = j + 2){
			if (!isNaN(arrDecoder[j])){
			arrDecoder[j] = parseInt(arrDecoder[j],10);}
			else if (arrDecoder[j] === 'true'){
			arrDecoder[j] = true;
			} else if (arrDecoder[j] === 'false'){
			arrDecoder[j] = false;};
			arrValue.push(arrDecoder[j]);}
				for (var i = 0; i < arrName.length; i = i + 1){
					obj[arrName[i]] = arrValue[i];}
						return console.log(obj);}
StringToObject("user=true");
StringToObject("user=false&password=JavaScript23");
StringToObject("user=Oleg&password=3000&Age=22");

//Пример работы: 
//StringToObject("user=true"); // {user: true}
//StringToObject("user=Vova&password=pass"); //  {user: 'Vova', password: 'pass'}

***************************************************************************************************************

3. Реализовать функцию Items(arr), которая возвращает новый 
массив, в котором содержатся только те элементы, которые 
обладали нечетным индексом в массиве, переданном в качестве 
аргумента. 

var arr = [0,1,0,1,0,1];
function Items(arr) {
	var value =[];
		for (var i = 1; i < arr.length; i = i + 2){
			value.push(arr[i]);}
return console.log("Нечётные элементы массива: " + value);}
Items(arr);

//Пример работы:  
//Items([0,1,0,1,0,1]); // [1,1,1]
//Items([1,2,3,4,5,6,7,8,9,10,11,12]); // [2, 4, 6, 8, 10, 12]

***************************************************************************************************************

4. Написать функцию Summator(initialValue), с опциональным (необязательным) первым параметром, который 
является точкой отчета счетчика. Если аргумент initialValue не передан, то отчет начинается с 0. 
При каждом вызове функция возвращает объект с методами plus(num), minus(num), get(). Объектов, 
которые возвращает функция Summator(initialValue), может быть любое количество. Реализация должна 
позволять манипуляции со значением счетчика только с использованием этих методов. Вызов метода plus(num) 
увеличивает значение счетчика на значение аргумента num. Если метод вызван без аргумента, то значение 
счетчика увеличивается на 1. Вызов метода minus(num) уменьшает значение счетчика на значение num, 
если метод вызван с аргументом. Если метод вызван без аргумента, то значение счетчика уменьшается на 1
Вызов метода get() возвращает текущее значение счетчика.

function Summator(initialValue) {
	var value = initialValue || 0;
		var obj = {
			plus: function (num) {
				num = num || 1;
					value = value + num;
						return value;},
			minus: function (num) {
				num = num || 1;
					value = value - num;
						return value;},
			get: function () {return value;}};
return obj;}
var test = Summator(5);
test.plus(5);
test.minus(10);
console.log(test.get()); // 0

//Примеры использования:
//var test = Summator(5);
//test.plus(5);
//test.minus(10);
//console.log(test.get()); // 0

***************************************************************************************************************

var num = 2;
var exp = 10;
var result = 1;
var ctr = 1;

while(ctr <= exp){
result *= num;
ctr++;}

console.log(result);

****************************************************************************************************************

var line = 20;
var str = "";
var symbol = "+";
var i = 0;
while(i < line){
str += symbol;
console.log(str);
i++;}

****************************************************************************************************************

var num = 2;
var exp = 10;
var result = 1;

for (var ctr = 1; ctr <= exp; ctr++) {
result *= num;}

console.log(result);

****************************************************************************************************************

var age = prompt("Введите Ваш возраст :",18);
var output = "";
if (age >=18 && age <= 59){
output = "Вам еще работать и работать.";
} else if (age > 59){output = "Вам пора на пенсию.";
} else {output = "Вам работать еще рано - учитесь.";}
console.log(output);

****************************************************************************************************************
//1 -> a
//2, 3, 4 -> ы
//11 - 14

var num =34;
var str = "На ветке сидит " + num + " ворон";
var x = "";
if (num%100 < 11 || num%100 > 14) {
	switch(num%10){
		case 1: x = "а"; break;
		case 2:
		case 3:
		case 4: x = "ы";
	}
}
console.log(str + x);

****************************************************************************************************************

function power(num, pow) {
var res = 1;
for (var i = 0; i < pow; i++){
res = res * num;
}
return res;
}

****************************************************************************************************************

function compare(x){
return function(y){
if (x == y){return null;}
return y > x;
}}
compare(56)(56); // Первый вариант вызова функции.
var num = compare(56);// Второй вариант вызова функции.
num(56);

****************************************************************************************************************

//Рекурсия:
function power (base, exp) {
	if (exp == 0) {return 1;}
	return base * power (base, exp - 1);
}

****************************************************************************************************************

var book1 = {};
book1.title = "Header";
book1.pubYear = 2001;
book1.price = "450$";
book1.show = function (){
console.log(this.title + ' ' + this.price);
};

var book2 = {
title: "Head",
pubYear: 2005,
price: "50$",
show: showBook
};

function showBook() {
console.log(this.title + ' ' + this.price);
} 

for (var key in book1){
console.log("Свойства: " + key + ' ' + book1[key]);
}
for (var key in book2){
console.log("Свойства: " + key + ' ' + book2[key]);
}

****************************************************************************************************************

var a = [5,12];
var b = [];
a[99] = 7;
for (var i = 0; i < a.length; i++) {
if (a[i] !== undefined){
b.push(Math.pow(a[i],2));}}

var a = [5,12];
var b = [];
a[99] = 7;
for (var i in a) {
b.push(Math.pow(a[i],2));}

****************************************************************************************************************

var s = "... монохромный ...";
var txt = "хром";
var word;
var pos = s.indexOf(txt); //8
if(pos != -1){
	var start = s.lastIndexOf(" ", pos) + 1; //4
	var end = s.indexOf(" ", pos);
	if (end == -1) {
		word = s.slice(start);}
		else {word = s.slice(start, end);}}

****************************************************************************************************************

var aIdx = 97;
var alphabet = "";
for (var i = 0; i < 26; i++){
	alphabet += String.fromCharCode(aIdx + i);
	console.log(alphabet);

var digits = "";
for (var i = 0; i < 10; i++){
	digits += i;
	console.log(digits);
}

function buildString(n, callback){
var result = "";
for (var i = 0; i < n; i++){
	result += callback(i);
}
return result;
}

alphabet = buildString(26, function(i){
	var aIdx = 97;
	return String.fromCharCode(aIdx + i);
}); 

digits = buildString(10, function(i){
	return i;
}); 

****************************************************************************************************************

function Book (title, pubYear, price) {
this.title = title;
this.pubYear = pubYear;
this.price = price;
}

var obj1 = new Book("First", 2016, "50$");
var obj2 = new Book("Two", 2015, "150$");
var obj3 = new Book("Three", 2014, "250$");

Book.prototype.show = function () {
console.log(this.title, this.price);
}

obj.show();
obj.show.call(obj3);

****************************************************************************************************************
