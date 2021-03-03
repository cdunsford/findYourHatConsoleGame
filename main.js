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
  print() {
    let fieldAsString = "";

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
          console.log("Error: index out of bounds");
          break;
        }

        this.currentLocation.x += 1;
        this._field[this.currentLocation.x][
          this.currentLocation.y
        ] = pathCharacter;

        break;
      case "u":
        if (this.currentLocation.x == 0) {
          console.log("Error: index out of bounds");
          break;
        }

        this.currentLocation.x -= 1;

        this._field[this.currentLocation.x][
          this.currentLocation.y
        ] = pathCharacter;
        break;
      case "l":
        if (this.currentLocation.y == 0) {
          console.log("Error: index out of bounds");
          break;
        }

        this.currentLocation.y -= 1;

        this._field[this.currentLocation.x][
          this.currentLocation.y
        ] = pathCharacter;
        break;
      case "r":
        if (
          this.currentLocation.y + 1 >=
          this._field[this.currentLocation.x].length
        ) {
          console.log("Error: index out of bounds");
          break;
        }

        this.currentLocation.y += 1;
        this._field[this.currentLocation.x][
          this.currentLocation.y
        ] = pathCharacter;
        break;

      default:
        break;
    }
  }
}

const myField = new Field([
  ["*", "░", "O"],
  ["░", "O", "░"],
  ["░", "^", "░"],
  ["░", "░", "░"],
]);
//console.log(myField._field[2][1]);
myField.print();

let direction = "";

do {
  //direction = prompt("Which direction do you want to go? Or press q to quit: ");

  direction = "d";
  myField.move(direction);
  myField.print();

  direction = "l";
  myField.move(direction);
  myField.print();

  direction = "r";
  myField.move(direction);
} while (direction != "q");
//let direction = "d";
