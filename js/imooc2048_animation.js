/**
 * @param {Object} i
 * @param {Object} j
 * @param {Object} randNum
 */
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

/**
 * 做移动动画
 * @param {Object} fromX
 * @param {Object} fromY
 * @param {Object} toX
 * @param {Object} toY
 * @param {Object} time
 */
function showMoveAnimation(fromX, fromY, toX, toY) {
	var numberCell = $('#number-cell-' + fromX + '-' + fromY);
	numberCell.animate({
		top: getPosTop(toX),
		left: getPosLeft(toY)
	}, 200);
}