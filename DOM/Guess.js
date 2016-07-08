var inputNumber = 1; // Переменная для числа вводимого пользователем.
var randomNumber; // Случайное число
var valueDirection = ""; // Указание направления, число больше заданного или меньше.
var attemptsСounter = 0; // Счетчик попыток.
var result = 0; // Переменная для результата разницы случайного и вводимго числа.
var attempts; // Количество попыток.
var cycleEnd;
var attemptsEnd;
var inputBuff;

function Guess() {
randomNumber = Math.round(Math.random()*(49)+1);
for (let i = 0 ;; i++){
		attempts = +prompt("Введите количество попыток:", 10);
			 if (isNaN(attempts)) {alert("Пожалуйста введите число."); i--; attempts = 1; continue;}
				else if (attempts > 10 || attempts < 0)
			{alert("Пожалуйста введите число из заданного диапазона от 1 до 10."); i--; attempts = 1; continue;}
		else if (attempts == false) {break;}
	else {break;}}
cycleEnd = attemptsEnd = attempts; 
	for (let i = 0; i <= cycleEnd; i++){ 
		if (attemptsСounter == attemptsEnd) {alert("Извините, но вы использовали все " + attemptsEnd + " попыток и проиграли."); break;}
			if (attempts == false) {break;}
				if (i == 0) {
					inputNumber = +prompt("Угадывай число, пользователь: ", inputNumber);
						if (randomNumber === inputNumber) {
							attemptsСounter = attemptsСounter + 1; 
								alert("угадал, хитрец, за " + attemptsСounter + " попыток."); break;
									} else {
								attemptsСounter = attemptsСounter + 1;
							alert("Не верно, попробуй еще раз" + " Попыток осталось: " + (attempts = attempts - 1));}
						if (attemptsСounter == attemptsEnd) {
					alert("Извините, но вы использовали все " + attemptsEnd + " попыток и проиграли."); break;
				}
			}	
	inputNumber = +prompt("Угадывай число, пользователь: ", inputNumber);
		inputBuff = result;
			result = Math.abs(inputNumber - randomNumber); 	

 if (inputNumber == false) {break;}  
	else if (randomNumber === inputNumber)
		{attemptsСounter = attemptsСounter + 1; 
			alert("угадал, хитрец, за " + attemptsСounter + " попыток."); 
				break;} // Если число угадано, завершаем цикл.

		else if (isNaN(inputNumber)) {alert("Пожалуйста введите число."); i--; inputNumber = 1; continue;}
			else if (inputNumber > 50 || inputNumber < 0) 
				{alert("Пожалуйста введите число из заданного диапазона от 1 до 50."); i--; inputNumber = 1; continue;}
				 	else if (/\./.test(inputNumber) == true) {alert("Пожалуйста введите целое число от 1 до 50."); i--; inputNumber = 1; continue;}

if (result < inputBuff) {
	attemptsСounter = attemptsСounter + 1;
		alert("теплее" + " Попыток осталось: " + (attempts = attempts - 1));}

	else {attemptsСounter = attemptsСounter + 1;
		alert("холоднее" + " Попыток осталось: " + (attempts = attempts - 1));}}

attemptsСounter = attemptsEnd = 0;}


