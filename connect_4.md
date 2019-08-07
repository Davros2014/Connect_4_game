##### CONNECT 4



* HTML/CSS
  * slot
      * unless you need transparent holes, you can make the hole a circular element with `border-radius` contained by a square element with a background color
      * slots can have classes added to them to make the hole change colors to the one for the player who has moved into the slot
  * board
      * by column (7 column elements each with 6 slots) (**easiest**)
          * must make the 7 columns sit next to each other in a row
      * by row (6 row elements each with 7 slots)
      * 42 slots in one container
* Javascript
    * keep track of whose turn it is - 
    * column selection (click is easiest)
        * loop backward through slots in column to find the lowest slot that has neither the player1 class nor the player2 class.
    * check for victory (see if current player has won)
        * check vertically
        * check horizontally
        * check diagonally
    * if the current player has won, show the victory message
    * if the current player has not won, switch players