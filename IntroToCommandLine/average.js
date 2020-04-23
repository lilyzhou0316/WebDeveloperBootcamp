function average(arr){
	var sum = 0;
	for(var i=0;i<arr.length;i++){
		sum += arr[i];
	}
	var avr = sum/arr.length
	return Math.round(avr);
}

var score = [90,98,89,100,100,86,94];
console.log(average(score));