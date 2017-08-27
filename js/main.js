//init variable
var date = new Array();
var row,col;
var score = 0;
var	date=[
	[0,0,0,0],
	[0,0,0,0],
	[0,0,0,0],
	[0,0,0,0]
	];

//load the game
$(function(){	
	startGame();	
})

//game start
function startGame(){
	getRandomNumber();
	getRandomNumber();
	updateView();
}

//judge full cell
function isFull(){
 	for(row = 0;row < 4;row++)
		for(col = 0;col < 4;col++)
			if(date[row][col] == 0) 
				return false;
		return true; 
}


//judge move
function isMove(){
    if(!canMoveLeft(date)&& !canMoveRight(date)&& !canMoveUp(date)&& !canMoveDown(date))
        return true;
    return false;
}


//judge the result
function isgameover(){
	if(defect())
    	setTimeout(function(){
    		alert("智商不够用哦~下次继续努力~");
    	},1000);
    if(win())
    	setTimeout(function(){
    		alert("恭喜你！获得胜利！");
    	},1000);
}


//lose the game
function defect(){
    if(isMove()&&isFull())
    	return true;
    return false;
}

//win the game
function win(){
	for ( row = 0; row < 4; row++ )
		for( col = 0; col < 4; col++ )
			if(date[row][col] == 2048 )
				return true;
	return false;
}


//2 or 4 random appearence 
function getRandomNumber(){
	row = parseInt(Math.random()*4);
	col = parseInt(Math.random()*4);
	while(true){
		if(date[row][col] == 0)
		break;
		row = parseInt(Math.random()*4);
		col = parseInt(Math.random()*4);
	}
	date[row][col] = Math.random() < 0.6 ? 2 : 4;	
}



//update the view
function updateView(){
 	 for( row = 0; row < 4;row++)
        for ( col = 0; col < 4; col++) 
 		$('#m'+row+col).removeClass().addClass(getBgImage(date[row][col])); 		
}


//get the background image
function getBgImage(number){
	switch(number) {
	case 0:
        return  "m0";
        break;
	case 2:
        return  "m2";
        break;
    case 4:
        return  "m4";
        break;
    case 8:
        return  "m8";
        break;
    case 16:
        return  "m16";
        break;
    case 32:
        return  "m32";
        break;
    case 64:
        return  "m64";
        break;
    case 128:
        return  "m128";
        break;
    case 256:
        return  "m256";
        break;
    case 512:
        return  "m512";
        break;
    case 1024:
        return  "m1024";
        break;
    case 2048:
        return  "m2048";
        break;
	}
}


//tie the keyborard  ← ↑ → ↓
$(document).keydown(function(e){
	switch (e.keyCode) {
		case 37://left
	        if(moveLeft()){           
	            getRandomNumber();
	            getScore(date);
	            isgameover();
	        }
	        break;
	    case 38://up
	        if(moveUp()){                     
	            getRandomNumber();
	            getScore(date);
	            isgameover();
	        }
	        break;
	    case 39://right
	        if(moveRight()){  
	            getRandomNumber();
	            getScore(date);
	            isgameover();
	        }
	        break;
	    case 40://down
	        if(moveDown()){   	
	           	getRandomNumber();
	            getScore(date);
	            isgameover();
	        }
	        break;	
	}
});


//move left
function moveLeft(){
	if(!canMoveLeft(date)) 
		return false;
	 for(row = 0;row < 4;row++){
	    var t = -1;
	    for(col = 1;col < 4;col++){
	        if(date[row][col] != 0){
	        //(row,col)左侧的元素
	            for(var k = 0;k < col;k++){    
	                if(date[row][k] == 0 && isNoObstacleLeft(row , k, col, date)){
	                    date[row][k] = date[row][col];
	                    date[row][col] = 0;
	                    continue;
	                }else if(date[row][k] == date[row][col] && isNoObstacleLeft(row , k, col, date)){
	                    if(t == k){
	                    	k++;
	                    	date[row][k] += date[row][col];
	                        date[row][col] = 0;
	                    }else{
		                    date[row][k] += date[row][col];
		                    date[row][col] = 0;		                       
		                    t = k; 
		                }
	                    continue;   
	                }
	            }
	        }
	    }
    }
    setTimeout("updateView()",200);
    return true;
}	


//judge left obstacle
function isNoObstacleLeft(row, col1, col2, date){
    for(var i = col1 + 1; i < col2; i++)
        if(date[row][i]!=0)
            return false;
    return true;
}


//move right
function moveRight(){
	if(!canMoveRight(date)) 
		return false;
	 for(row = 0;row < 4;row++){
	    var t = -1;	  
	   for(col = 2;col >= 0;col--){
	        if(date[row][col] != 0){
	        //(row,col)右侧的元素
	            for(var k = 3;col < k;k--){   
	                if(date[row][k] == 0 && isNoObstacleRight(row , col, k, date)){
	                    date[row][k] = date[row][col];
	                    date[row][col] = 0;
	                    continue;
	                }else if(date[row][k] == date[row][col] && isNoObstacleRight(row , col, k, date)){
	                    if(t == k){
		                    k--;
		                    date[row][k] += date[row][col];
	                        date[row][col] = 0;
		                }else{
		                    date[row][k] += date[row][col];
		                    date[row][col] = 0;                        
		                    t = k;
	                    }
	                    continue;
	                }
	            }
	        }
	    }
	}   
    setTimeout("updateView()",200);
    return true;
}	


//judge right obstacle
function isNoObstacleRight(row, col1, col2, date){
    for(var i = col2 - 1; i > col1; i--)
        if(date[row][i]!=0)
            return false;
    return true;
}


//move up
function moveUp(){
	if(!canMoveUp(date)) 
		return false;
	for(col = 0;col < 4;col++){
	    var t = -1;
	    for(row = 1;row < 4;row++){
	        if(date[row][col] != 0){
	        //(row,col)上方的元素
	            for(var k = 0;k < row;k++){    
	                if(date[k][col] == 0 && isNoObstacleUp(k , row, col, date)){
	                    date[k][col] = date[row][col];
	                    date[row][col] = 0;
	                    continue;
	                }else if(date[k][col] == date[row][col] && isNoObstacleUp(k , row, col, date)){
	                    if(t == k){
			                k++;
			                date[k][col] += date[row][col];
	                        date[row][col] = 0;
			            }else{
		                    date[k][col] += date[row][col];
		                    date[row][col] = 0;	                        
		                    t = k;
	                    }
	                    continue;
	                }
	            }
	        }
	    }
	}    
    setTimeout("updateView()",200);
    return true;
}	


//judge up obstacle
function isNoObstacleUp(row1, row2, col, date){
    for(var i = row1 + 1; i < row2; i++)
        if(date[i][col]!=0)
            return false;
    return true;
}


//move down
function moveDown(){
	if(!canMoveDown(date)) 
		return false;
	for(col = 0;col < 4;col++){
	    var t = -1;
	    for(row = 2;row >= 0;row--){	
	        if(date[row][col] != 0){
	            //(row,col)下方的元素
	            for(var k = 3;row < k;k--){
	                if(date[k][col] == 0 && isNoObstacleDown(row , k, col, date)){
	            	    date[k][col] = date[row][col];
	                    date[row][col] = 0;
	                    continue;
	                }else if(date[k][col] == date[row][col] && isNoObstacleDown(row , k, col, date)){
	                    if(t == k){
				            k--;
				            date[k][col] += date[row][col];                       
		                    date[row][col] = 0;
				        }else{
		                    date[k][col] += date[row][col];                       
		                    date[row][col] = 0;	                        
		                    t = k;
		                }
	                    continue;
	                }
	            }
	        }
	    }
	}    
    setTimeout("updateView()",200);
    return true;
}	


//judge down obstacle
function isNoObstaclekDown(row1, row2, col, date){
    for(var i = row2 - 1; i > row1; i--)
        if(date[i][col]!=0)
            return false;
    return true;
}



//judge up
function canMoveUp(date){
	for( row = 1; row < 4;row++)
        for ( col = 0; col < 4; col++) 
			if(date[row][col]!=0)
				if(date[row-1][col] == 0 || date[row-1][col] == date[row][col])
					return true;
		return false;
}


//judge down
function canMoveDown(date){
	for( row = 0; row < 3;row++)
        for ( col = 0; col < 4; col++) 
			if(date[row][col]!=0)
				if(date[row+1][col] == 0 || date[row+1][col] == date[row][col])
					return true;
		return false;
}


//judge left
function canMoveLeft(date){
	for( row = 0; row < 4;row++)
        for ( col = 1; col < 4; col++) 
			if(date[row][col]!=0)
				if(date[row][col-1] == 0 || date[row][col-1] == date[row][col])
					return true;
		return false;
}


//judge right
function canMoveRight(date){
	for( row = 0; row < 4;row++)
        for ( col = 0; col < 3; col++) 
			if(date[row][col]!=0)
				if(date[row][col+1] == 0 || date[row][col+1] == date[row][col])
					return true;
		return false;
	}


//calculate score
function getScore(date){
	var total = 0;
	for ( row = 0; row < 4; row++)
		for( col = 0; col < 4; col++){
			total += date[row][col]*date[row][col];
		}
	$('#score').html('score:'+total);	
}
