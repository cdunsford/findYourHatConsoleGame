const prompt = require("prompt-sync")({ sigint: true });

const hat = "^";
const hole = "O";
const fieldCharacter = "░";
const pathCharacter = "*";

class Field {
  constructor(field) {
    this._field = field;
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
}

const myField = new Field([
  ["*", "░", "O"],
  ["░", "O", "░"],
  ["░", "^", "░"],
]);
//console.log(myField._field[2][1]);
myField.print();
const direction = prompt("Which direction do you want to go?");
console.log("You chose " + direction);
