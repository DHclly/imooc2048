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
 * @param {Object} boardModel
 */
function noSpace(boardModel) {
	for(var i = 0; i < 4; i++) {
		for(var j = 0; j < 4; j++) {
			if(boardModel[i][j] == 0) {
				return false;
			}
		}
	}
	return true;
}

function moveLeft(boardModel) {
	if(!canMoveLeft(boardModel)) {
		return false;
	}
	//可以向左移动的时候
	for(var i = 0; i < 4; i++) {
		//排除最左一列
		for(var j = 1; j < 4; j++) {
			//如果当前格子有值
			if(boardModel[i][j] != 0) {
				//遍历当前格子的左侧的每一个格子，看是否可以向左移动
				for(var k = 0; k < j; k++) {
					//如果左侧的格子为空，且无障碍，则向左移动
					if(boardModel[i][k] == 0 && noBlockHorizontal(i, k, j, boardModel)) {
						showMoveAnimation(i, j, i, k);
						boardModel[i][k] = boardModel[i][j];
						boardModel[i][j] = 0;
						continue;
					} 
					//如果左侧的格子不为空并和当前格子的值相等，且无障碍，则向左移动，然后合并相加
					else if(boardModel[i][k] == boardModel[i][j] || noBlockHorizontal(i, k, j, boardModel)) {
						showMoveAnimation(i, j, i, k);
						boardModel[i][k] += boardModel[i][j];
						boardModel[i][j] = 0;
						continue;
					}
				}
			}
		}
	}
	updateBoardView();
	return true;
}

function canMoveLeft(boardModel) {
	for(var i = 0; i < 4; i++) {
		//排除最左一列
		for(var j = 1; j < 4; j++) {
			if(boardModel[i][j] != 0) {
				//判断当前格子左侧是否为空，或者左侧的值等于当前格子的值
				if(boardModel[i][j - 1] == 0 || boardModel[i][j] == boardModel[i][j - 1]) {
					return true;
				}
			}
		}
	}
	return false;
}

function moveRight() {
	if(!canMoveRight(board)) {
		return false;
	}
	for(var i = 0; i < 4; i++) {
		for(var j = 1; j < 4; j++) {
			if(board[i][j] != 0) {
				for(var k = 0; k < j; k++) {
					if(board[i][k] == 0 && noBlockHorizontal(i, k, j, board)) {

						continue;
					} else if(board[i][k] == board[i][j] || noBlockHorizontal(i, k, j, board)) {

						continue;
					}
				}
			}
		}
	}
	return true;
}

function moveUp() {
	if(!canMoveUp(board)) {
		return false;
	}
	for(var i = 0; i < 4; i++) {
		for(var j = 1; j < 4; j++) {
			if(board[i][j] != 0) {
				for(var k = 0; k < j; k++) {
					if(board[i][k] == 0 && noBlockHorizontal(i, k, j, board)) {

						continue;
					} else if(board[i][k] == board[i][j] || noBlockHorizontal(i, k, j, board)) {

						continue;
					}
				}
			}
		}
	}
	return true;
}

function moveDown() {
	if(!canMoveDown(board)) {
		return false;
	}
	for(var i = 0; i < 4; i++) {
		for(var j = 1; j < 4; j++) {
			if(board[i][j] != 0) {
				for(var k = 0; k < j; k++) {
					if(board[i][k] == 0 && noBlockHorizontal(i, k, j, board)) {

						continue;
					} else if(board[i][k] == board[i][j] || noBlockHorizontal(i, k, j, board)) {

						continue;
					}
				}
			}
		}
	}
	return true;
}

function isGameOver() {

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

/**
 * 判断水平方向，两个格子之间是否有其他非0格子
 * @param {Object} row
 * @param {Object} col1
 * @param {Object} col2
 * @param {Object} board
 */
function noBlockHorizontal(row, col1, col2, boardModel) {
	for(var i = col1 + 1; i < col2; i++) {
		//如果有不为0的，即有障碍
		if(boardModel[row][i] != 0) {
			return false;
		}
		return true;
	}
}