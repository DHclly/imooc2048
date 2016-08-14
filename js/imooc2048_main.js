//游戏棋盘格model
var boardModel = [];
//游戏分数
var score = 0;

$(function() {
	newGame();
	$(".game-btn-newGame").bind("click", function() {
		newGame();
	});
})

function newGame() {
	initLayout();
	initBoardModel();
	updateBoardView();
	generateOneNumber();
	generateOneNumber();
	initGameKeyDown();
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
 * 初始化BoardModel每一项为0
 */
function initBoardModel() {
	for(var i = 0; i < 4; i++) {
		boardModel[i] = new Array();
		for(var j = 0; j < 4; j++)
			boardModel[i][j] = 0;
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
					"top": getPosTop(i) + 50 + "px",
					"left": getPosLeft(j) + 50 + "px"
				});
			} else {
				numberCell.css({
					"width": "100px",
					"height": "100px",
					"top": getPosTop(i) + "px",
					"left": getPosLeft(j) + "px",
					"background-color": getNumberBackgroundColor(cell),
					"color": getNumberColor(cell),
				});
				numberCell.text(cell);
			}
			$("#grid-container").append(numberCell);
		}
	}
}

function generateOneNumber() {
	//判断是否还有空间生成数字
	if(noSpace(boardModel)) {
		return false;
	}

	var randX = Math.floor(Math.random() * 4);
	var randY = Math.floor(Math.random() * 4);
	while(true) {
		if(boardModel[randX][randY] == 0) {
			break;
		}
		randX = Math.floor(Math.random() * 4);
		randY = Math.floor(Math.random() * 4);
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
				if(moveLeft(boardModel)) {
					setTimeout(generateOneNumber,400);
					isGameOver();
				}
				break;
			case 38: //up
				if(moveUp(boardModel)) {
					setTimeout(generateOneNumber,400);
					isGameOver();
				}
				break;
			case 39: //right
				if(moveRight(boardModel)) {
					setTimeout(generateOneNumber,400);
					isGameOver();
				}
				break;
			case 40: //down
				if(moveDown(boardModel)) {
					generateOneNumber();
					setTimeout(generateOneNumber,400);
					isGameOver();
				}
				break;
			default:
				break;
		}
	});
}