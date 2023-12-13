// Section 4: Classes, Interfaces and Object Oriented Programming
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
// ------------------------------------------- 3. Creating Classes
var Account = /** @class */ (function () {
    function Account(id, owner, balance) {
        this.id = id;
        this.owner = owner;
        this._balance = balance;
    }
    Account.prototype.deposit = function (amount) {
        if (amount <= 0)
            throw new Error("Invalid amount");
        this._balance += amount;
    };
    Account.prototype.getBalance = function () {
        return this._balance;
    };
    return Account;
}());
// ------------------------------------------- 4. Creating Objects
var account = new Account(1, "Reza", 0);
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
var Account2 = /** @class */ (function () {
    function Account2(id, owner, _balance) {
        this.id = id;
        this.owner = owner;
        this._balance = _balance;
    } // Parameter Properties
    Account2.prototype.deposit = function (amount) {
        if (amount <= 0)
            throw new Error("Invalid amount");
        this._balance += amount;
    };
    return Account2;
}());
// ------------------------------------------- 8. Getters and Setters
var Account3 = /** @class */ (function () {
    function Account3(id, owner, _balance) {
        this.id = id;
        this.owner = owner;
        this._balance = _balance;
    } // Parameter Properties
    Account3.prototype.deposit = function (amount) {
        if (amount <= 0)
            throw new Error("Invalid amount");
        this._balance += amount;
    };
    Object.defineProperty(Account3.prototype, "balance", {
        get: function () {
            return this._balance;
        },
        enumerable: false,
        configurable: true
    });
    return Account3;
}());
var account3 = new Account3(1, "Mosh", 0);
console.log(account3.balance); // Get from getter
// account3.balance = 1; // Set with setter
// for now we don't want the setter so we comment out that.
// ------------------------------------------- 9. Index Signatures
var SeatAssignment = /** @class */ (function () {
    function SeatAssignment() {
    }
    return SeatAssignment;
}());
var seats = new SeatAssignment();
seats.A1 = "Reza";
seats.A2 = "Mosh";
// dynamically setting the properties to the object
// ------------------------------------------- 10. Static Members
// A static porperty is a property is belongs to a class, and not an object.
// so we gonna only one instance of property in the memory.
// to recab watch again the section-9
var Ride = /** @class */ (function () {
    function Ride() {
    }
    // start() {this._activeRides++}
    // start() {this._activeRides--}
    // 'this' is refrencing to the current object and the insctance of the current object
    // doesn't have the property by this name (activeRides)!
    Ride.prototype.start = function () {
        Ride._activeRides++;
    };
    Ride.prototype.stop = function () {
        Ride._activeRides--;
    };
    Object.defineProperty(Ride, "activeRides", {
        get: function () {
            return Ride._activeRides;
        },
        enumerable: false,
        configurable: true
    });
    Ride._activeRides = 0; // <----
    return Ride;
}());
var ride1 = new Ride();
ride1.start(); // output: 1
var ride2 = new Ride();
ride2.start(); // output: 1
console.log(Ride.activeRides); // <----
// when we make a property or method static, that property or method becomes part of a class
// and will have only a single instance of them in memory.
// So Static members are accessed using the class name. We use them where we need a single 
// instance of a class member (property or method) in memory.
// ------------------------------------------- 11. Inheritance
var Person = /** @class */ (function () {
    function Person(firstName, lastName) {
        this.firstName = firstName;
        this.lastName = lastName;
    }
    Object.defineProperty(Person.prototype, "fullName", {
        get: function () {
            return this.firstName + " " + this.lastName;
        },
        enumerable: false,
        configurable: true
    });
    Person.prototype.walk = function () {
        console.log("Walking");
    };
    return Person;
}());
var Student = /** @class */ (function (_super) {
    __extends(Student, _super);
    function Student(id, firstName, lastName) {
        var _this = _super.call(this, firstName, lastName) || this;
        _this.id = id;
        return _this;
    }
    Student.prototype.takeTest = function () {
        console.log("Taking a test");
    };
    return Student;
}(Person));
var student = new Student(1, "John", "Smith");
// so we can access all properties in first class and derived class.
// ------------------------------------------- 12. Method Overriding
// tsconfig: active --> "noImplicitOverride": true
// overriding a method means changing it's implementation.
var Teacher = /** @class */ (function (_super) {
    __extends(Teacher, _super);
    function Teacher() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(Teacher.prototype, "fullName", {
        get: function () {
            return "Professor " + _super.prototype.fullName;
        },
        enumerable: false,
        configurable: true
    });
    return Teacher;
}(Person));
var teacher = new Teacher("John", "Smith");
console.log(teacher.fullName);
// ------------------------------------------- 13. Polymorphism
var Principal = /** @class */ (function (_super) {
    __extends(Principal, _super);
    function Principal() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(Principal.prototype, "fullName", {
        get: function () {
            return "Principal " + _super.prototype.fullName;
        },
        enumerable: false,
        configurable: true
    });
    return Principal;
}(Person));
printNames([
    new Student(1, "John", "Smith"),
    new Teacher("Mosh", "Hamedani"),
    new Principal("Mary", "Smith"),
]);
function printNames(people) {
    for (var _i = 0, people_1 = people; _i < people_1.length; _i++) {
        var person = people_1[_i];
        console.log(person.fullName);
    }
}
// Open Closed Principle
// Classes should be open for extension and closed for modification.
// ------------------------------------------- 14. Private vs Protected Members
// Private and Protected are actually similar to each other But
// Protected members can be inherited and private members cannot be inherited.
// Mosh: Don't use protected, unless you know what you are doing!
// ------------------------------------------- 15. Abstract Classes and Methods
var Shape = /** @class */ (function () {
    function Shape(color) {
        this.color = color;
    }
    return Shape;
}());
var Circle = /** @class */ (function (_super) {
    __extends(Circle, _super);
    function Circle(radius, color) {
        var _this = _super.call(this, color) || this;
        _this.radius = radius;
        return _this;
    }
    Circle.prototype.render = function () {
        console.log("Rendering a cricle");
    };
    return Circle;
}(Shape));
var GoogleCalendar = /** @class */ (function () {
    function GoogleCalendar(name) {
        this.name = name;
    }
    GoogleCalendar.prototype.addEvent = function () {
        throw new Error("Method not implemented");
    };
    GoogleCalendar.prototype.removeEvent = function () {
        throw new Error("Method not implemented");
    };
    return GoogleCalendar;
}());
// We use interfaces to define the shape of objects. 
