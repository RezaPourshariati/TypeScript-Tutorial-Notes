// Section 4: Classes, Interfaces and Object Oriented Programming

// ------------------------------------------- 3. Creating Classes

class Account {
    readonly id: number;
    owner: string;
    private _balance: number;
    nickName?: string;

    constructor(id: number, owner: string, balance: number) {
        this.id = id;
        this.owner = owner;
        this._balance = balance;
    }

    deposit(amount: number): void {
        if (amount <= 0) throw new Error("Invalid amount");
        this._balance += amount;
    }

    getBalance(): number {
        return this._balance;
    }

    // private calculateTax() { // private methods are like this
    //     return undefined;
    // }
}

// ------------------------------------------- 4. Creating Objects

let account = new Account(1, "Reza", 0);
account.deposit(100);
console.log(account.getBalance()); // 100
console.log(account); // Account { id: 1, owner: 'Reza', balance: 100 }
console.log(typeof account); // object
console.log(account instanceof Account); // true

// Note that for objects or reference types we use "instanceof" unlike "typeof"!

// ------------------------------------------- 5. Read-Only and Optional Properties

// ---adding read-only
// account.id = 0;      --> Error

// ---adding optional property
// nickName?: string

// ------------------------------------------- 6. Access Control Keyword

// --> [public, private, protected]

// make balance a private property. so it's not accessible in outside of class.

console.log(account.getBalance()); // 100

// ------------------------------------------- 7. Parameter Properties

class Account2 {
    // readonly id: number;
    // owner: string;
    // private _balance: number;
    nickName?: string;

    constructor(
        public readonly id: number,
        public owner: string,
        private _balance: number) {} // Parameter Properties

    deposit(amount: number): void {
        if (amount <= 0) throw new Error("Invalid amount");
        this._balance += amount;
    }
}

// ------------------------------------------- 8. Getters and Setters

class Account3 {
    // readonly id: number;
    // owner: string;
    // private _balance: number;
    nickName?: string;

    constructor(
        public readonly id: number,
        public owner: string,
        private _balance: number) { } // Parameter Properties

    deposit(amount: number): void {
        if (amount <= 0) throw new Error("Invalid amount");
        this._balance += amount;
    }

    get balance(): number { // getter
        return this._balance;
    }

    // set balance(value: number) { // setter
    //     if (value < 0) throw new Error("Invalid value");
    //     this._balance = value;
    // }
}


let account3 = new Account3(1, "Mosh", 0);
console.log(account3.balance); // Get from getter
// account3.balance = 1; // Set with setter

// for now we don't want the setter so we comment out that.

// ------------------------------------------- 9. Index Signatures

class SeatAssignment {
    // A1, A2, ...
    // Mosh, John, ...
    [seatNumber: string]: string;
}

let seats = new SeatAssignment();
seats.A1 = "Reza";
seats.A2 = "Mosh";

// dynamically setting the properties to the object

// ------------------------------------------- 10. Static Members

// A static porperty is a property is belongs to a class, and not an object.
// so we gonna only one instance of property in the memory.

// to recab watch again the section-9

class Ride {
    private static _activeRides: number = 0; // <----

    // start() {this._activeRides++}
    // start() {this._activeRides--}

    // 'this' is refrencing to the current object and the insctance of the current object
    // doesn't have the property by this name (activeRides)!

    start() {
        Ride._activeRides++;
    }

    stop() {
        Ride._activeRides--;
    }

    static get activeRides() { // <----
        return Ride._activeRides;
    }
}

let ride1 = new Ride();
ride1.start(); // output: 1

let ride2 = new Ride();
ride2.start(); // output: 1

console.log(Ride.activeRides); // <----

// when we make a property or method static, that property or method becomes part of a class
// and will have only a single instance of them in memory.

// So Static members are accessed using the class name. We use them where we need a single 
// instance of a class member (property or method) in memory.

// ------------------------------------------- 11. Inheritance

class Person {
    constructor(public firstName: string, public lastName: string) { }

    get fullName() {
        return this.firstName + " " + this.lastName;
    }

    walk() {
        console.log("Walking");
    }
}


class Student extends Person {
    constructor(public id: number, firstName: string, lastName: string) {
        super(firstName, lastName);
    }

    takeTest() {
        console.log("Taking a test");
    }
}

let student = new Student(1, "John", "Smith");
// so we can access all properties in first class and derived class.

// ------------------------------------------- 12. Method Overriding

// tsconfig: active --> "noImplicitOverride": true

// overriding a method means changing it's implementation.

class Teacher extends Person {
    override get fullName() {
        return "Professor " + super.fullName;
    }
}

let teacher = new Teacher("John", "Smith");
console.log(teacher.fullName);


// ------------------------------------------- 13. Polymorphism


class Principal extends Person {
    override get fullName() {
        return "Principal " + super.fullName;
    }
}

printNames([
    new Student(1, "John", "Smith"),
    new Teacher("Mosh", "Hamedani"),
    new Principal("Mary", "Smith"),
]);

function printNames(people: Person[]) {
    for (let person of people)
        console.log(person.fullName);
}


// Open Closed Principle
// Classes should be open for extension and closed for modification.


// ------------------------------------------- 14. Private vs Protected Members

// Private and Protected are actually similar to each other But
// Protected members can be inherited and private members cannot be inherited.

// Mosh: Don't use protected, unless you know what you are doing!


// ------------------------------------------- 15. Abstract Classes and Methods

abstract class Shape {
    constructor(public color: string) { }

    abstract render(): void;
}


class Circle extends Shape {
    constructor(public radius: number, color: string) {
        super(color);
    }

    override render(): void {
        console.log("Rendering a cricle");
    }
}

// let shape = new Shape("red"); // error : can not create an instance of abstract classes.
// shape.render();

// Abstract calasses means are not ready and another calss has to extend it!
// Remember that abstract methods can only be in abstract classes!


// ------------------------------------------- 16. Interfaces

// Interfaces: to define the shape of objects.

// abstract class Calendar {
//     constructor(public name: string) { }

//     abstract addEvent(): void;
//     abstract removeEvent(): void;
// }

interface Calendar {
    name: string,
    addEvent(): void;
    removeEvent(): void;
}

interface CloudCalendar extends Calendar {
    sync(): void;
}


class GoogleCalendar implements Calendar {
    constructor(public name: string) { }

    addEvent(): void {
        throw new Error("Method not implemented");
    }
    
    removeEvent(): void {
        throw new Error("Method not implemented");
    }
}

// We use interfaces to define the shape of objects. 
