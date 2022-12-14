function numDecline(num,nominative,genitiveSingular,genitivePlural){
	if(num > 10 && (Math.round((num % 100) / 10)) == 1){
		return genitivePlural;
	} else {
		switch(num % 10){
			case 1:
        return nominative;
			case 2: case 3: case 4:
        return genitiveSingular;
			case 5: case 6: case 7: case 8: case 9: case 0:
        return genitivePlural;
		}
	}
}

export default numDecline