function Automobile( year, make, model, type ){
    this.year = year; //integer (ex. 2001, 1995)
    this.make = make; //string (ex. Honda, Ford)
    this.model = model; //string (ex. Accord, Focus)
    this.type = type; //string (ex. Pickup, SUV)
}

var automobiles = [ 
    new Automobile(1995, "Honda", "Accord", "Sedan"),
    new Automobile(1990, "Ford", "F-150", "Pickup"),
    new Automobile(2000, "GMC", "Tahoe", "SUV"),
    new Automobile(2010, "Toyota", "Tacoma", "Pickup"),
    new Automobile(2005, "Lotus", "Elise", "Roadster"),
    new Automobile(2008, "Subaru", "Outback", "Wagon")
    ];

/*This function sorts arrays using an arbitrary comparator. You pass it a comparator and an array of objects appropriate for that comparator and it will return a new array which is sorted with the largest object in index 0 and the smallest in the last index*/
function sortArr( comparator, array ){
    for (var i = 0; i < array.length; i++) {
        for (var j = 0; j < array.length - 1; j++) {
            if (comparator(array[j + 1], array[j])) {
                var tmp = array[j];
                array[j] = array[j + 1];
                array[j + 1] = tmp;
            }
        }
    }
    return array;
}

/*A comparator takes two arguments and uses some algorithm to compare them. If the first argument is larger or greater than the 2nd it returns true, otherwise it returns false. Here is an example that works on integers*/
function exComparator( int1, int2){
    if (int1 > int2){
        return true;
    } else {
        return false;
    }
}

/*For all comparators if cars are 'tied' according to the comparison rules then the order of those 'tied' cars is not specified and either can come first*/

/*This compares two automobiles based on their year. Newer cars are "greater" than older cars.*/
function yearComparator( auto1, auto2){
    if (auto1.year > auto2.year){
        return true;
    } else {
        return false;
    }
}

/*This compares two automobiles based on their make. It should be case insensitive and makes which are alphabetically earlier in the alphabet are "greater" than ones that come later.*/
function makeComparator( auto1, auto2){
    if (auto1.make.toLowerCase() < auto2.make.toLowerCase()){
        return true;
    } else {
        return false;
    }
}

/*This compares two automobiles based on their type. The ordering from "greatest" to "least" is as follows: roadster, pickup, suv, wagon, (types not otherwise listed). It should be case insensitive. If two cars are of equal type then the newest one by model year should be considered "greater".*/
function typeComparator( auto1, auto2){
    if (auto1.type.toLowerCase() == auto2.type.toLowerCase()) return yearComparator(auto1, auto2);

    if (auto1.type.toLowerCase() == "roadster") return true;
    if (auto2.type.toLowerCase() == "roadster") return false;

    if (auto1.type.toLowerCase() == "pickup") return true;
    if (auto2.type.toLowerCase() == "pickup") return false;

    if (auto1.type.toLowerCase() == "suv") return true;
    if (auto2.type.toLowerCase() == "suv") return false;

    if (auto1.type.toLowerCase() == "wagon") return true;
    if (auto2.type.toLowerCase() == "wagon") return false;

    return yearComparator(auto1, auto2);
}

/*Your program should output the following to the console.log, including the opening and closing 5 stars. All values in parenthesis should be replaced with appropriate values. Each line is a seperate call to console.log.

Each line representing a car should be produced via a logMe function. This function should be added to the Automobile class and accept a single boolean argument. If the argument is 'true' then it prints "year make model type" with the year, make, model and type being the values appropriate for the automobile. If the argument is 'false' then the type is ommited and just the "year make model" is logged.

*****
The cars sorted by year are:
(year make model of the 'greatest' car)
(...)
(year make model of the 'least' car)

The cars sorted by make are:
(year make model of the 'greatest' car)
(...)
(year make model of the 'least' car)

The cars sorted by type are:
(year make model type of the 'greatest' car)
(...)
(year make model type of the 'least' car)
*****

As an example of the content in the parenthesis:
1990 Ford F-150 */


/*If the argument is true this prints "year make model type", if false this prints "year make model"*/
Automobile.prototype.logMe = function(printType) {
    var string = this.year + " " + this.make + " " + this.model;
    if (printType) {
        string += " " + this.type;
    }
    console.log(string);
}

/*This prints info for all automobiles in the array, and passes printType to logMe, which prints "type" if true*/
function printAll(array, printType) {
    for (var i = 0; i < array.length; i++) {
        array[i].logMe(printType);
    }
}

console.log("*****");
var arr = sortArr(yearComparator, automobiles);
console.log("The cars sorted by year are:");
printAll(arr, false);

console.log();
arr = sortArr(makeComparator, automobiles);
console.log("The cars sorted by make are:");
printAll(arr, false);

console.log();
arr = sortArr(typeComparator, automobiles);
console.log("The cars sorted by type are:");
printAll(arr, true);
console.log("*****");