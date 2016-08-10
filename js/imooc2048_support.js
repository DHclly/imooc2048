function getPosTop(i) {
	return 20 + i * 120;
}

function getPosLeft(j) {
	return 20 + j * 120;
}

function getNumberBackgroundColor(num) {
	switch(num) {
		case 2:
			return "#eee4da";
			break;
		case 4:
			return "#ede0c8";
			break;
		case 5:
			return "#f2b179";
			break;
		case 16:
			return "#f59563";
			break;
		case 32:
			return "#f67c5f";
			break;
		case 64:
			return "#f65e3b";
			break;
		case 128:
			return "#edcf72";
			break;
		case 256:
			return "#edcc61";
			break;
		case 512:
			return "#9c0";
			break;
		case 1024:
			return "#33b5b5";
			break;
		case 2048:
			return "#09c";
			break;
		case 4096:
			return "#a6c";
			break;
		case 8192:
			return "#93c";
			break;
	}
	return "black";
}

function getNumberColor(num) {
	if(num <= 4) {
		return "#776e65";
	}
	if(num === 512) {
		return "#66ccff";
	}
	return "white";
}

/**
 * 判断是否还有空间生成数字
 * @param {Object} board
 */
function noSpace(board) {
	for(var i = 0; i < 4; i++) {
		for(var j = 0; j < 4; j++) {
			if(board[i][j] == 0) {
				return false;
			}
		}
	}
	return true;
}

function canMoveRight(board) {
	for(var i = 0; i < 4; i++) {
		for(var j = 1; j < 4; j++) {
			if(board[i][j] != 0) {
				if(board[i][j - 1] == 0 || board[i][j] == board[i][j - 1]) {
					return true;
				}
			}
		}
	}
	return false;
}

function canMoveUp(board) {
	for(var i = 0; i < 4; i++) {
		for(var j = 1; j < 4; j++) {
			if(board[i][j] != 0) {
				if(board[i][j - 1] == 0 || board[i][j] == board[i][j - 1]) {
					return true;
				}
			}
		}
	}
	return false;
}

function canMoveDown(board) {
	for(var i = 0; i < 4; i++) {
		for(var j = 1; j < 4; j++) {
			if(board[i][j] != 0) {
				if(board[i][j - 1] == 0 || board[i][j] == board[i][j - 1]) {
					return true;
				}
			}
		}
	}
	return false;
}

function canMoveLeft(board) {
	for(var i = 0; i < 4; i++) {
		for(var j = 1; j < 4; j++) {
			if(board[i][j] != 0) {
				if(board[i][j - 1] == 0 || board[i][j] == board[i][j - 1]) {
					return true;
				}
			}
		}
	}
	return false;
}

function noBlockHorizontal(row, col1, col2, board) {
	for(var i = col1 + 1; i < col2; i++) {
		if(board[row][i] != 0) {
			return false;
		}
		return true;
	}
}

function showMoveAnimation(fromX, fromY, toX, toY) {
	var numberCell = $('#number-cell-' + fromX + '-' + fromY);
	numberCell.animate({
		top: getPosTop(toX, toY),
		left: getPosLeft(toX, toY)
	}, 200)
}