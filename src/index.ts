// -------------------------- Array

let number: number[] = [1, 3, 4];
number[0] = 1;
// number[1] = "1"; ---> Error

// number.forEach((n) => n.);


// -------------------------- Tuples
let numbers: [number, string] = [2, "reza"]; // tuples

numbers.push(1); // it's a bug in typescript

// Tuples are fixed-length arrays where each element has a specific type. We often use
// them for representing two or three related values.

// -------------------------- Enum

// Enums represent a list of related constants.

// const small = 1;
// const medium = 2;
// const large = 3;

// PascalCase for variable and values
enum Size { Small = 1, Medium, Large };

let mySize: Size = Size.Medium;
console.log(mySize); // 2

// we can also set 'const' before of the enum! ---> it makes more optimized code.

// -------------------------- Functions


// "noUnusedLocals": true
// "noUnusedParameters": true
// "noImplicitReturns": true


function calculateTax(income: number, taxYear = 2022): number {
    if (taxYear < 2022) return income * 1.2;
    return income * 1.3;
}

calculateTax(10_000);

// -------------------------- Objects

let employee: {
    readonly id: number,
    name: string,
    retire: (date: Date) => void
} = {
    id: 1,
    name: "Reza",
    retire: (date: Date) => {
        console.log(date);
    }
};


// -------------------------- Section 3
// -------------------------- Alias

// in order to not repeating the objects we can use type alias. DRY --> Don't Repeat Yourself

type Employee = {
    readonly id: number,
    name: string,
    retire: (date: Date) => void
}

let Employee: Employee = {
    id: 1,
    name: "Mosh",
    retire: (date: Date) => {
        console.log(date);
    }
};

// we often use type aliases to create custom types.

// -------------------------- Union Types

function kgToLbs(weight: number | string): number {
    // Narrowing
    if (typeof weight === 'number') return weight * 2.2;
    else return parseInt(weight) * 2.2;
}

kgToLbs(10);
kgToLbs("10kg");

// with union types, we can allow a variable to take one of many types (eg number | string)

// -------------------------- Intersection Types

type Draggable = {
    drag: () => void;
};

type Resizable = {
    resize: () => void;
};

type UIWidget = Draggable & Resizable;

let textBox: UIWidget = {
    drag: () => { },
    resize: () => { }
};

// with intersection types, we can combine multiple types into one (eg Draggable & Resizable)


// -------------------------- Literal Types

// Literal (exact, specific)

type Quantity = 50 | 100;
let Quantity: Quantity = 100;

type Metric = "cm" | "inch";

// -------------------------- Nullable Types

function greet(name: string | null | undefined) {
    if (name) console.log(name.toUpperCase());
    else console.log("Hola!");
}

greet(undefined);

// -------------------------- Optional Chaining '?.'

// Using optional chaining (?.) we can simplify our code and remove the need for null checks.


type Customer = {
    birthday?: Date
};
// The Customer type is defined with an optional birthday property of type Date.This means that a Customer object can 
// either have a birthday property of type Date, or it might not have a birthday property at all.

function getCustomer(id: number): Customer | null | undefined {
    return id === 0 ? null : { birthday: new Date() };
}

let customer = getCustomer(1);

// if (customer !== null && customer !== undefined)
//     console.log(customer.birthday);

// ------------- [Optional Property Access Operator]
console.log(customer?.birthday);
// if customer is null or undefined the result will be undefined else we get the actuall result.

console.log(customer?.birthday?.getFullYear());
// this piece of code get executed only if we have a customer and that customer has a birthday,
// otherwise the result of this expresion will undefined.

// ------------- [Optional Element Access Operator] --> useful when we are dealing with arrays

// if (customer !== null && customer !== undefined) customer[0]
// instead we can use ---> customers?.[0]


// ------------- [Optional Call Access Operator]
let log: any = null; // it can be null or undefined because of 'any'
log?.("a");
// this piece of code will get executed only if log() refrencing to actuall function
// otherwise, we will get undefined.

// -------------------------- The Nullish Coalescing Operator --> '??'

let speed: number | null = null;
let ride = {
    // Falsy (undefined, null, "", false, 0)
    // Nullish Coalescing Operator
    // speed: speed || 30
    speed: speed ?? 30 // if speed is not null or undefined use that value, otherwise 30 as default value.
}

// Using the Nullish Coalescing Operator we can fallback to a default value when dealing with null/undefined objects.

// -------------------------- Type Assertion

let phone = document.getElementById("phone") as HTMLInputElement; // we know that the type of the phone definitely HTMLInputElement
// and not a HTMLElement. and now we know more about the type of this object. so we specify with "as" keyword!
let phone2 = document.getElementById("number") as HTMLInputElement;
phone2.value = "hello world";

phone.value; // now we can access the value because we know and specify the phone as HTMLInputElement!

// NOTE that by using the "as" keyword there is no type conversion behind the scenes!

// we can also write like this:
let myPhone = <HTMLInputElement>document.getElementById("phone");


// -------------------------- The unknown Type

function render(document: unknown) {
    // when using the type of unknown then we should use the Narrowing to a more specific type!
    // Narrowing
    if (typeof document === "string") document.toUpperCase();
    // document.move();
    // document.fly();
    // document.whatEverWeWant();
}
// when using the type Error(), we should use 'instanceof' unlike 'typeof'.
// using the "unknown" type is preferred to using "any" type.

// -------------------------- The never Type

// never type which represent values that never occur.

function reject(message: string): never {
    throw new Error(message);
}

function processEvent(): never {
    while (true) {
        // Read a message from a queue
    }
}

processEvent(); // this function never returns

// Unreachable codes
reject("...");
console.log("hello world"); // this line never be executed

