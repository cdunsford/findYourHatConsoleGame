const prompt = require("prompt-sync")({ sigint: true });

const hat = "^";
const hole = "O";
const fieldCharacter = "░";
const pathCharacter = "*";

class Field {
  constructor(field) {
    this._field = field;
    this.currentLocation = {
      x: 0,
      y: 0,
    };
  }

  static generateField(height, width) {
    let innerField = new Array(height);

    //randomize where the hat will go
    let x = Math.floor(Math.random() * Math.floor(height-1));
    let y = Math.floor(Math.random() * Math.floor(width-1));

    //create 2d array using 1d array
    for (let i = 0; i < innerField.length; i++) {
      innerField[i] = new Array(height);
    }

    //create a blank playing field
    for (let i = 0; i < height; i++) {
      for (let j = 0; j < width; j++) {

        //x and y from random number to place a hat at the location
        if(i == x && y == j){
          innerField[i][j] = hat;

        }
        else{
          innerField[i][j] = fieldCharacter;
        }
        
      }
    }
  }
  print(foundHat, foundHatAt) {
    if (foundHat == 1) {
      console.log(
        "Contratulations! You found your at at " +
          foundHatAt.x +
          "," +
          foundHatAt.y
      );
    } else if (foundHat == -1) {
      console.log(
        `Oh no! You stepped into a hole at at ${foundHatAt.x},${foundHatAt.y}`
      );
    }
    let fieldAsString = "";

    console.log("***Field Update***");
    for (let index = 0; index < this._field.length; index++) {
      const element = this._field[index];

      for (let innerIndex = 0; innerIndex < element.length; innerIndex++) {
        fieldAsString += element[innerIndex];

        //console.log(element[innerIndex]);
      }
      console.log(fieldAsString);
      fieldAsString = "";
    }
  }
  move(direction) {
    switch (direction) {
      case "d":
        if (this.currentLocation.x + 1 >= this._field.length) {
          throw new Error("Error: index out of bounds");
        }

        this.currentLocation.x += 1;

        if (
          this._field[this.currentLocation.x][this.currentLocation.y] === hat
        ) {
          return 1;
        } else if (
          this._field[this.currentLocation.x][this.currentLocation.y] === hole
        ) {
          return -1;
        } else {
          this._field[this.currentLocation.x][
            this.currentLocation.y
          ] = pathCharacter;
        }

        break;
      case "u":
        if (this.currentLocation.x == 0) {
          throw new Error("Error: index out of bounds");
          break;
        }

        this.currentLocation.x -= 1;

        if (
          this._field[this.currentLocation.x][this.currentLocation.y] === hat
        ) {
          return 1;
        } else if (
          this._field[this.currentLocation.x][this.currentLocation.y] === hole
        ) {
          return -1;
        } else {
          this._field[this.currentLocation.x][
            this.currentLocation.y
          ] = pathCharacter;
        }

        break;
      case "l":
        if (this.currentLocation.y == 0) {
          throw new Error("Error: index out of bounds");
          break;
        }

        this.currentLocation.y -= 1;

        if (
          this._field[this.currentLocation.x][this.currentLocation.y] === hat
        ) {
          return 1;
        } else if (
          this._field[this.currentLocation.x][this.currentLocation.y] === hole
        ) {
          return -1;
        } else {
          this._field[this.currentLocation.x][
            this.currentLocation.y
          ] = pathCharacter;
        }

        break;
      case "r":
        if (
          this.currentLocation.y + 1 >=
          this._field[this.currentLocation.x].length
        ) {
          throw new Error("Error: index out of bounds");
          break;
        }

        this.currentLocation.y += 1;

        if (
          this._field[this.currentLocation.x][this.currentLocation.y] === hat
        ) {
          return 1;
        } else if (
          this._field[this.currentLocation.x][this.currentLocation.y] === hole
        ) {
          return -1;
        } else {
          this._field[this.currentLocation.x][
            this.currentLocation.y
          ] = pathCharacter;
        }

        break;

      default:
        break;

        return 0;
    }
  }
}

Field.generateField(6, 4);

const myField = new Field([
  ["*", "░", "O"],
  ["░", "O", "░"],
  ["░", "^", "░"],
  ["░", "░", "░"],
]);
//console.log(myField._field[2][1]);
myField.print(false, this.currentLocation);

let direction = "";

do {
  direction = prompt("Which direction do you want to go? Or press q to quit: ");

  //direction = "d";
  let foundHat = 0;

  try {
    foundHat = myField.move(direction);
  } catch (error) {
    console.log(error.message);
    direction = "q";
  }

  if (foundHat == 1 || foundHat == -1) {
    direction = "q";
  }
  myField.print(foundHat, myField.currentLocation);
} while (direction != "q");
