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

function noMove(boardModel) {
	if(canMoveLeft(boardModel) || canMoveRight(boardModel) || canMoveUp(boardModel) || canMoveDown(boardModel)) {
		return false;
	}
	return true;
}
/**
 * 执行向左移动的操作
 * @param {Object} boardModel
 */
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
					else if(boardModel[i][k] == boardModel[i][j] && noBlockHorizontal(i, k, j, boardModel)) {
						showMoveAnimation(i, j, i, k);
						boardModel[i][k] *= 2;
						boardModel[i][j] = 0;
						score +=boardModel[i][k];
						updateScoreView(score);
						continue;
					}
				}
			}
		}
	}
	setTimeout(updateBoardView, 200);
	return true;
}

/**
 * 判断当前能否向左移动
 * @param {Object} boardModel
 */
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
/**
 * 执行向右移动的操作
 * @param {Object} boardModel
 */
function moveRight(boardModel) {
	if(!canMoveRight(boardModel)) {
		return false;
	}
	//可以向右移动的时候
	for(var i = 0; i < 4; i++) {
		//排除最右一列
		for(var j = 2; j >= 0; j--) {
			//如果当前格子有值
			if(boardModel[i][j] != 0) {
				//遍历当前格子的右侧的每一个格子，看是否可以向右移动
				for(var k = 3; k > j; k--) {
					//如果右侧的格子为空，且无障碍，则向右移动
					if(boardModel[i][k] == 0 && noBlockHorizontal(i, j, k, boardModel)) {
						showMoveAnimation(i, j, i, k);
						boardModel[i][k] = boardModel[i][j];
						boardModel[i][j] = 0;
						continue;
					}
					//如果右侧的格子不为空并和当前格子的值相等，且无障碍，则向右移动，然后合并相加
					else if(boardModel[i][k] == boardModel[i][j] && noBlockHorizontal(i, j, k, boardModel)) {
						showMoveAnimation(i, j, i, k);
						boardModel[i][k] *= 2;
						boardModel[i][j] = 0;
						score +=boardModel[i][k];
						updateScoreView(score);
						continue;
					}
				}
			}
		}
	}
	setTimeout(updateBoardView, 200);
	return true;
}

/**
 * 判断当前能否向右移动
 * @param {Object} boardModel
 */
function canMoveRight(boardModel) {
	for(var i = 0; i < 4; i++) {
		//排除最右一列
		for(var j = 2; j >= 0; j--) {
			if(boardModel[i][j] != 0) {
				//判断当前格子右侧是否为空，或者右侧的值等于当前格子的值
				if(boardModel[i][j + 1] == 0 || boardModel[i][j] == boardModel[i][j + 1]) {
					return true;
				}
			}
		}
	}
	return false;
}
/**
 * 执行向上移动的操作
 * @param {Object} boardModel
 */
function moveUp(boardModel) {
	if(!canMoveUp(boardModel)) {
		return false;
	}
	//可以向上移动的时候
	//排除最上一列
	for(var i = 1; i < 4; i++) {
		for(var j = 0; j < 4; j++) {
			//如果当前格子有值
			if(boardModel[i][j] != 0) {
				//遍历当前格子的上侧的每一个格子，看是否可以向上移动
				for(var k = 0; k < i; k++) {
					//如果上侧的格子为空，且无障碍，则向上移动
					if(boardModel[k][j] == 0 && noBlockVertical(k, i, j, boardModel)) {
						showMoveAnimation(i, j, k, j);
						boardModel[k][j] = boardModel[i][j];
						boardModel[i][j] = 0;
						continue;
					}
					//如果上侧的格子不为空并和当前格子的值相等，且无障碍，则向上移动，然后合并相加
					else if(boardModel[k][j] == boardModel[i][j] && noBlockVertical(k, i, j, boardModel)) {
						showMoveAnimation(i, j, k, j);
						boardModel[k][j] *= 2;
						boardModel[i][j] = 0;
						score +=boardModel[k][j];
						updateScoreView(score);
						continue;
					}
				}
			}
		}
	}
	setTimeout(updateBoardView, 200);
	return true;
}

/**
 * 判断当前能否向上移动
 * @param {Object} boardModel
 */
function canMoveUp(boardModel) {
	//排除最上一列
	for(var i = 1; i < 4; i++) {
		for(var j = 0; j < 4; j++) {
			if(boardModel[i][j] != 0) {
				//判断当前格子上侧是否为空，或者上侧的值等于当前格子的值
				if(boardModel[i - 1][j] == 0 || boardModel[i][j] == boardModel[i - 1][j]) {
					return true;
				}
			}
		}
	}
	return false;
}

/**
 * 执行向x下移动的操作
 * @param {Object} boardModel
 */
function moveDown(boardModel) {
	if(!canMoveDown(boardModel)) {
		return false;
	}
	//可以向下移动的时候
	//排除最下一列
	for(var i = 2; i >= 0; i--) {
		for(var j = 0; j < 4; j++) {
			//如果当前格子有值
			if(boardModel[i][j] != 0) {
				//遍历当前格子的下侧的每一个格子，看是否可以向下移动
				for(var k = 3; k > i; k--) {
					//如果下侧的格子为空，且无障碍，则向下移动
					if(boardModel[k][j] == 0 && noBlockVertical(i, k, j, boardModel)) {
						showMoveAnimation(i, j, k, j);
						boardModel[k][j] = boardModel[i][j];
						boardModel[i][j] = 0;
						continue;
					}
					//如果下侧的格子不为空并和当前格子的值相等，且无障碍，则向下移动，然后合并相加
					else if(boardModel[k][j] == boardModel[i][j] && noBlockVertical(i, k, j, boardModel)) {
						showMoveAnimation(i, j, k, j);
						boardModel[k][j] *= 2;
						boardModel[i][j] = 0;
						score+=boardModel[k][j];
						updateScoreView(score);
						continue;
					}
				}
			}
		}
	}
	setTimeout(updateBoardView, 200);
	return true;
}

/**
 * 判断当前能否向下移动
 * @param {Object} boardModel
 */
function canMoveDown(boardModel) {
	//排除最下一列
	for(var i = 2; i >= 0; i--) {
		for(var j = 0; j < 4; j++) {
			if(boardModel[i][j] != 0) {
				//判断当前格子下侧是否为空，或者下侧的值等于当前格子的值
				if(boardModel[i + 1][j] == 0 || boardModel[i][j] == boardModel[i + 1][j]) {
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
 * @param {Object} boardModel
 */
function noBlockHorizontal(row, colStart, colEnd, boardModel) {
	for(var i = colStart + 1; i < colEnd; i++) {
		//如果有不为0的，即有障碍
		if(boardModel[row][i] != 0) {
			return false;
		}
	}
	return true;
}
/**
 * 判断垂直方向，两个格子之间是否有其他非0格子
 * @param {Object} rowStart
 * @param {Object} rowEnd
 * @param {Object} col
 * @param {Object} boardModel
 */
function noBlockVertical(rowStart, rowEnd, col, boardModel) {
	for(var i = rowStart + 1; i < rowEnd; i++) {
		//如果有不为0的，即有障碍
		if(boardModel[i][col] != 0) {
			return false;
		}
	}
	return true;
}

function isGameOver() {
	if(noSpace(boardModel) && noMove(boardModel)) {
		gameOver();
	}
}

function gameOver() {
	alert("gameover.")
}