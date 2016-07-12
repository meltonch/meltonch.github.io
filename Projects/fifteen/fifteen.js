'use strict';

//These variables keep track of the blank space globally.
var	blank = "3,3";								//declared globally...
var	blank_margin = "300px 0px 0px 300px";		//declared globally...

/**
 * Handles the initial setup and assignment of necessary information to 
 * document elements. Sets background positions, margins, and ID's, then
 * assigns the necessary event listeners to each piece.
 */
onload = function()
{
	var pieces = document.getElementById("puzzlearea").children;
	
	//set the background positions of each piece
	pieces[0].style.backgroundPosition = "0px 0px";
	pieces[1].style.backgroundPosition = "-100px 0px";
	pieces[2].style.backgroundPosition = "-200px 0px";
	pieces[3].style.backgroundPosition = "-300px 0px";
	
	pieces[4].style.backgroundPosition = "0px -100px";
	pieces[5].style.backgroundPosition = "-100px -100px";
	pieces[6].style.backgroundPosition = "-200px -100px";
	pieces[7].style.backgroundPosition = "-300px -100px";
	
	pieces[8].style.backgroundPosition = "0px -200px";
	pieces[9].style.backgroundPosition = "-100px -200px";
	pieces[10].style.backgroundPosition = "-200px -200px";
	pieces[11].style.backgroundPosition = "-300px -200px";
	
	pieces[12].style.backgroundPosition = "0px -300px";
	pieces[13].style.backgroundPosition = "-100px -300px";
	pieces[14].style.backgroundPosition = "-200px -300px";
	
	//set margins, i.e. piece locations
	pieces[0].style.margin = "0px 0px 0px 0px";
	pieces[1].style.margin = "0px 0px 0px 100px";
	pieces[2].style.margin = "0px 0px 0px 200px";
	pieces[3].style.margin = "0px 0px 0px 300px";
	
	pieces[4].style.margin = "100px 0px 0px 0px";
	pieces[5].style.margin = "100px 0px 0px 100px";
	pieces[6].style.margin = "100px 0px 0px 200px";
	pieces[7].style.margin = "100px 0px 0px 300px";
	
	pieces[8].style.margin = "200px 0px 0px 0px";
	pieces[9].style.margin = "200px 0px 0px 100px";
	pieces[10].style.margin = "200px 0px 0px 200px";
	pieces[11].style.margin = "200px 0px 0px 300px";
	
	pieces[12].style.margin = "300px 0px 0px 0px";
	pieces[13].style.margin = "300px 0px 0px 100px";
	pieces[14].style.margin = "300px 0px 0px 200px";
	
	//give each piece an ID
	//(x, y)
	pieces[0].id = "0,0";
	pieces[1].id = "0,1";
	pieces[2].id = "0,2";
	pieces[3].id = "0,3";
	
	pieces[4].id = "1,0";
	pieces[5].id = "1,1";
	pieces[6].id = "1,2";
	pieces[7].id = "1,3";
	
	pieces[8].id = "2,0";
	pieces[9].id = "2,1";
	pieces[10].id = "2,2";
	pieces[11].id = "2,3";
	
	pieces[12].id = "3,0";
	pieces[13].id = "3,1";
	pieces[14].id = "3,2";
	
	
	//add listener for clicks
	for(var i = 0; i < pieces.length; i++)
	{
		pieces[i].addEventListener("click", movePiece);
		pieces[i].addEventListener("mouseover", toRed);
		pieces[i].addEventListener("mouseout", toBlack);
	}
	
	//add shuffle listener to shuffle button
	document.getElementById("shufflebutton").addEventListener("click", shuffle);

	
};//onload

/**
 * This function shuffles the puzzle board to a state which the player can begin 
 * their attempt to solve it. Since approximately half of purely random shuffles 
 * result in an unsolvable puzzle, care needs to be taken to ensure that the puzzle 
 * area is shuffled in a manner that results in a playable game. This is achieved here
 * simply by simulating one legal move a random number of times. 
 */
var shuffle = function()
{
	//generate a random number between 500 and 1000 to determine
	//the number of shuffling moves that occur
	var num_moves = Math.floor((Math.random() * 501) + 500);
	
	//outer loop to run num_moves times. Each pass represents one legal turn.
	for(var k = 0; k < num_moves; k++)
	{
		//get id for blank position. Corresponds to (x,y) position in puzzle.
		var blank_pos = blank.split(",");
		var bx = blank_pos[0];
		var by = blank_pos[1];
	
		//get pieces of the puzzle
		var pieces = document.getElementById("puzzlearea").children;
		
		//array to store neighbors of the blank space 
		var neighbors = [];
	
		//check id's against blank space id to determine if the piece is a neighbor
		for(var i = 0; i < pieces.length; i++)
		{
			//get id for current piece. Corresponds to (x,y) position in puzzle.
			var cur_pos = pieces[i].id.split(",");
			var cx = cur_pos[0];
			var cy = cur_pos[1];
			
			//If the piece is a neighbor according to the following criteria, push it
			//to neighbors.
			if(by == cy && (Number(bx) + 1 == cx)) neighbors.push(pieces[i]);		//Need Number() conversion to ensure that Javascript 
			if(by == cy && (bx - 1 == cx)) neighbors.push(pieces[i]);				//knows we're adding instead of concatenating because
			if(bx == cx && (Number(by) + 1 == cy)) neighbors.push(pieces[i]);		//vague data types are obnoxious
			if(bx == cx && (by - 1 == cy)) neighbors.push(pieces[i]);
		}//for
		
		//random number to decide exactly what piece to move
		var choice = Math.floor(Math.random() * neighbors.length);
		
		//move the piece
		movePiece.call(neighbors[choice]);
		
	}//for

};//shuffle

/**
 * This function handles the actual movement of the pieces. It creates a new 
 * div with content based on the properties of the blank space and adds it 
 * to the child list of puzzlearea. The clicked piece is removed from the 
 * child list. No attention is given to the ordering of the children since 
 * their positions are determined by their id and styling properties.
 */
var movePiece = function()
{

	//check to see if the piece is moveable, i.e., a neighbor of the blank space.
	//If not, nothing happens.
	if(canMove(this))
	{
	
		//create a new div to add to puzzlearea
		var newPiece = document.createElement("DIV");
		var piece_num = document.getElementById(this.id).textContent;		//make sure we're taking the piece number from a consistent source																	
		var t = document.createTextNode(piece_num);							//(id's change, text content does not)
		newPiece.appendChild(t);
		newPiece.id = blank;												//The blank space has the id (location) we want the new piece to have
		newPiece.style.backgroundPosition = this.style.backgroundPosition;	//The clicked piece has the background position we want the new piece to have
		newPiece.style.margin = blank_margin;								//The blank space has the margins we want the new piece to have
		newPiece.addEventListener("click", movePiece);
		newPiece.addEventListener("mouseover", toRed);						//add all the event listeners to the new piece
		newPiece.addEventListener("mouseout", toBlack);
		
		//retrieve the parent object for our pieces
		var pieces = document.getElementById("puzzlearea");
		
		//checks ids of each piece against the id of the current piece. 
		//If they match, the piece is removed from the list of children.
		for(var i=0; i < pieces.children.length; i++)
		{
			if(pieces.children[i].id == this.id) 
			{
				pieces.removeChild(pieces.children[i]);
			}
		}
		
		//add new piece to list of children
		//zero is arbitrary- again, we don't necessarily care about the ordering
		//of the children in the list
		pieces.insertBefore(newPiece, pieces.children[0]);
		
		//update properties of the blank space
		blank = this.id;
		blank_margin = this.style.margin;
		
	}//if
	
};//movePiece

/**
 * Determines if a piece can move. Looks to see whether the x or y (but NOT BOTH-
 * this would result in a diagonal neighbor) coordinate are within 1 of each other.
 * Returns true if so, false if not.
 *
 * @param piece the piece that is being checked for neighborship
 * @return true/false whether or not the piece can move
 */
var canMove = function(piece)
{
	//get id for blank position. Corresponds to (x,y) position in puzzle.
	var blank_pos = blank.split(",");
	var bx = blank_pos[0];
	var by = blank_pos[1];
	
	//get id for current piece. Corresponds to (x,y) position in puzzle.
	var cur_pos = piece.id.split(",");
	var cx = cur_pos[0];
	var cy = cur_pos[1];
	
	//if the blank piece is a neighbor, return true.
	if(by == cy && (Number(bx) + 1 == cx)) return true;		//Need Number() conversion to ensure that Javascript 
	if(by == cy && (bx - 1 == cx)) return true;				//knows we're adding instead of concatenating because
	if(bx == cx && (Number(by) + 1 == cy)) return true;		//vague data types are obnoxious
	if(bx == cx && (by - 1 == cy)) return true;
	
	return false;
	
};//canMove

/**
 * Updates styling to reflect a mouseover if a piece can move.
 */
var toRed = function()
{
	//check whether the piece can move. If not, nothing happens.
	if(canMove(this))
	{
		this.style.borderColor = "red";
		this.style.color = "red";
	}
};//toRed

/**
 * Updates styling to reflect a mouseout.
 */
var toBlack = function()
{
	this.style.borderColor = "black";
	this.style.color = "white";
};//toBlack


 