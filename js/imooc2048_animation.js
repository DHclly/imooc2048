function showNumWithAnimation (i,j,randNum) {
	var NumCell = $('#number-cell-' + i + '-' + j);
	NumCell.css({
		"background-color":getNumberBackgroundColor(randNum),
		"color" : getNumberColor(randNum)
	});
	NumCell.text(randNum);
	
	NumCell.animate({
		width:"100px",
		height:"100px",
		top:getPosTop(i),
		left:getPosLeft(j)
	},400);
}

