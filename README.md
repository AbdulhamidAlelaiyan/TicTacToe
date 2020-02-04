# TicTacToe
## Project 1 - General Assembly - MiSK Academy 
**TicTacToe** is a project that is required to be done by GA SEI Program students. 

### Technologies Used 
The technologies (programming langauges, IDEs, tools etc) used to build the project are: 
  - HTML 
  - CSS 
  - JavaScript 
  - Webstorm
  - Git 
  - Github 
  - Github Pages 
  - Chrome developer Tools 
  - Balsamiq wireframes 
  
### Wireframes 
The wireframes were used to get the general layout and the skeleton of the game design
![](/wireframes/WhilePlaying.png)
![](/wireframes/WhenWon(Tie).png)
![](/wireframes/WhenWon(YWon).png)
![](/wireframes/WhenWon.png)
![](/wireframes/WhilePlaying(YTurn).png)
![](/wireframes/WhilePlaying.png)

### Plan Followed
1. Read the user stories. 
2. Designed wireframes that satisfy user stories. 
3. Created the project directory structure and made sure each language has its own file. 
4. Created the html file. 
5. Worked on styling the page.
6. Added the logic in the Javascript file. 

### Algorithm used to determine the winner 
1. Each combination in the game grid is recorded in an array. 
2. Each time a player add his own mark the algorithm check if the user satisfied one of the combination. 
3. If a player did make a correct combination, the player would be congratulated and his/her points will be increased by one. 

### clearGame function 
The clear game function is called when the game is finished by a win or a tie or if a user wanted to reset the game. 
the clear game function would reset the choices each player make and will remove all the classes that indicated the selected state and also reset each variable that describe the former state of the game. 

### Usage 
You have two modes:
1. Single player mode: It's a game between you and an AI Agent. 
2. Multiplayer mode: It's a game between you and your friend. 
Scores for winners and losers are at the bottom of the Tic Tac Toe grid and also the number of ties. 
you can reset the score by clicking New Game button in the bottom of the page. 
Note: scores are resevred even after refreshing the page. 
