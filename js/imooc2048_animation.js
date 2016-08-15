/**
 * @param {Object} i
 * @param {Object} j
 * @param {Object} randNum
 */
function showNumWithAnimation(i, j, randNum) {
	var NumCell = $('#number-cell-' + i + '-' + j);
	NumCell.css({
		"background-color": getNumberBackgroundColor(randNum),
		"color": getNumberColor(randNum)
	});
	NumCell.text(randNum);

	NumCell.animate({
		width: cellWidth+"px",
		height: cellWidth+"px",
		top: getPosTop(i),
		left: getPosLeft(j)
	}, 50);
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

function updateScoreView (score) {
	//$("#score").fadeOut('fast').text(score).fadeIn('fast');
	$("#score").text(score);
}