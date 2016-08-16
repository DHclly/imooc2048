//游戏棋盘格model
var boardModel = [];
//用于判断当前格子是否合并过；
var boardConflict = [];
//游戏分数
var score = 0;
var startX = 0,
	startY = 0,
	endX = 0,
	endY = 0;
$(function() {
	newGame();
	$(".game-btn-newGame").bind("click", function() {
		newGame();
	});
})

function newGame() {
	isMobile();
	initLayout();
	initCssForMobile();
	initBoard();
	updateBoardView();
	generateOneNumber();
	generateOneNumber();
	initGameKeyDown();
	initGameTouch()
	initScore();
}

/**
 * 初始化游戏布局界面
 */
function initLayout() {
	for(var i = 0; i < 4; i++) {
		for(var j = 0; j < 4; j++) {
			var gridCell = $('<div class = "grid-cell" id = "grid-cell-' + i + '-' + j + '" ></div>');
			gridCell.css({
				"top": getPosTop(i) + "px",
				"left": getPosLeft(j) + "px"
			});
			$("#grid-container").append(gridCell);
		}
	}
}

/**
 * 初始化Board每一项为0
 */
function initBoard() {
	for(var i = 0; i < 4; i++) {
		boardModel[i] = new Array();
		boardConflict[i] = new Array();
		for(var j = 0; j < 4; j++)
			boardModel[i][j] = 0;
		boardConflict[i][j] = false;
	}
}

/**
 * 更新视图的方法
 * 用户每次操作都会执行该方法，因此，要考虑所有情况
 */
function updateBoardView() {
	//清除之前所有的数据
	$(".number-cell").remove();
	for(var i = 0; i < 4; i++) {
		for(var j = 0; j < 4; j++) {
			var numberCell = $('<div class="number-cell" id="number-cell-' + i + '-' + j + '"></div>');
			var cell = boardModel[i][j];
			//如果是默认值，不显示
			if(cell == 0) {
				numberCell.css({
					"width": "0",
					"height": "0",
					//让数字居中
					"top": getPosTop(i) + cellWidth / 2 + "px",
					"left": getPosLeft(j) + cellWidth / 2 + "px"
				});
			} else {
				numberCell.css({
					"width": cellWidth + "px",
					"height": cellWidth + "px",
					"top": getPosTop(i) + "px",
					"left": getPosLeft(j) + "px",
					"background-color": getNumberBackgroundColor(cell),
					"color": getNumberColor(cell),
				});
				numberCell.text(cell);
			}
			$("#grid-container").append(numberCell);
			boardConflict[i][j] = false;
		}
	}
	$(".number-cell").css({
		"lineHeight": cellWidth + "px",
		"fontSize": 0.6 * cellWidth + "px"
	});
}

function generateOneNumber() {
	//判断是否还有空间生成数字
	if(noSpace(boardModel)) {
		return false;
	}

	var randX = Math.floor(Math.random() * 4);
	var randY = Math.floor(Math.random() * 4);
	var i = 50;
	while(i--) {
		if(boardModel[randX][randY] == 0) {
			break;
		}
		randX = Math.floor(Math.random() * 4);
		randY = Math.floor(Math.random() * 4);
	}
	if(i === 0) {
		for(var i = 0; i < 4; i++) {
			for(var j = 0; j < 4; j++) {
				if(boardModel[i][j] === 0) {
					randX = i;
					randY = j;
					break;
				}
			}
		}
	}
	var randNum = Math.random() < 0.6 ? 2 : 4;
	boardModel[randX][randY] = randNum;
	showNumWithAnimation(randX, randY, randNum);
	return true;
}

/**
 * 初始化按键事件
 */
function initGameKeyDown() {
	$(document).keydown(function(event) {
		switch(event.keyCode) {
			case 37: //left
				event.preventDefault();
				if(moveLeft(boardModel)) {
					setTimeout(generateOneNumber, 210);
					setTimeout(isGameOver, 300);
				}
				break;
			case 38: //up
				event.preventDefault();
				if(moveUp(boardModel)) {
					setTimeout(generateOneNumber, 210);
					setTimeout(isGameOver, 300);
				}
				break;
			case 39: //right
				event.preventDefault();
				if(moveRight(boardModel)) {
					setTimeout(generateOneNumber, 210);
					setTimeout(isGameOver, 300);
				}
				break;
			case 40: //down
				event.preventDefault();
				if(moveDown(boardModel)) {
					setTimeout(generateOneNumber, 210);
					setTimeout(isGameOver, 300);
				}
				break;
			default:
				break;
		}
	});
}

/**
 * 初始化移动端手势事件
 */
function initGameTouch() {
	$(document).on("touchstart", function(event) {
		//jQuery上没有这个，只有使用原生事件
		event = event.originalEvent;
		startX = event.touches[0].pageX;
		startY = event.touches[0].pageY;
	})
	$(document).on("touchend", function(event) {
		event = event.originalEvent;
		endX = event.changedTouches[0].pageX;
		endY = event.changedTouches[0].pageY;
		var xSpan = endX - startX;
		var ySpan = endY - startY;
		if(Math.abs(xSpan) < 0.3 * screenWidh && Math.abs(ySpan) < 0.3 * screenWidh) {
			return;
		}
		//表示在x轴上运动
		if(Math.abs(xSpan) > Math.abs(ySpan)) {
			if(xSpan > 0) {
				//右
				if(moveRight(boardModel)) {
					setTimeout(generateOneNumber, 210);
					setTimeout(isGameOver, 300);
				}
			} else {
				//左
				if(moveLeft(boardModel)) {
					setTimeout(generateOneNumber, 210);
					setTimeout(isGameOver, 300);
				}
			}
		} else {
			//表示在y轴上运动
			if(ySpan > 0) {
				//下
				if(moveDown(boardModel)) {
					setTimeout(generateOneNumber, 210);
					setTimeout(isGameOver, 300);
				}
			} else {
				//上
				if(moveUp(boardModel)) {
					setTimeout(generateOneNumber, 210);
					setTimeout(isGameOver, 300);
				}
			}
		}
	})
}

function initScore() {
	score = 0;
}