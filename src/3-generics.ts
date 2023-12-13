// --------------------------------------- 3. Generic Classes

class KeyValuePair<K, V> {
    constructor(public key: K, public value: V) { }
}

let pair = new KeyValuePair<string, string>("1", "a");
// pair.value.

// Note that we don't have to specify the geneics in instance of calss explicitly!
// The compiler infer them for us.


// --------------------------------------- 4. Generic Functions

function wrapInArray<T>(value: T) {
    return [value];
}

let num = wrapInArray(1);


// this function could be also inside a class.

class ArrayUtils {
    wrapInArray<T>(value: T) {
        return [value];
    }
}

let utils = new ArrayUtils();
const seeResult = utils.wrapInArray(1);

// And also we can define a static method inside the class with generics. remember that static methods
// inside a class can call with the it's own class name only!!

class ArrayUtils2 {
    static wrapInArray<T>(value: T) {
        return [value];
    }
}

let utils2 = ArrayUtils2.wrapInArray(1); // static method call

// --------------------------------------- 5. Generic Interfaces

// http://mywebsite.com/users
// http://mywebsite.com/products


interface Result<T> {
    data: T | null;
    error: string | null;
};

function fetch<T>(url: string): Result<T> {
    return { data: null, error: null };
};

interface User {
    userName: string;
};

interface Product {
    title: string;
};

let result = fetch<User>("url"); // Result<User> --> result of user
result.data?.userName; // we can see all properties of User object!

let result2 = fetch<Product>("url"); // Result<Product> --> result of product
result2.data?.title; // we can see all properties of Product object!

let result3 = fetch<User>("Url");

// --------------------------------------- 6. Generic Constraints

function echo<T extends number | string>(value: T): T { // generic that accepts only two 'string' and 'number' types.
    return value;
}

echo(2);

// we can also extend from interface, class, type and special objects you can define.

// ---------------

function echo2<T extends { name: string }>(value: T): T { // generic from object with specific type.
    return value;
}

echo2({ name: "reza" });

// ---------------

interface Person {
    name: string;
}
function echo3<T extends Person>(value: T): T { // generic from interface.
    return value;
}

let person = echo3;

// ---------------

class Person1 {
    constructor(public name: string) { };
}

class Customer1 extends Person1 { }

function echo4<T extends Person1>(value: T): T { // generic from a class (we can also extend from Customer1)
    return value;
}

echo4(new Customer1("a"));


// --------------------------------------- 7. Extending Generic Classes and Inheritance

interface Product1 {
    name: string;
    price: number;
}

class Store<T> {
    protected _objects: T[] = [];

    add(obj: T): void {
        this._objects.push(obj);
    }
}

let store = new Store<Product1>();
// store.objects = [];


// -------- Pass on the generic type parameter
class CompressibleStore<T> extends Store<T> {
    compress(obj: T): T { 
        return obj;
    }
}

let store1 = new CompressibleStore<Product1>();
store1.compress({name: "reza", price: 12});


// -------- Restrict thee generic type paramter
class SearchableStore<T extends { name: string }> extends Store<T> {
    find(name: string): T | undefined {
        return this._objects.find(obj => obj.name === name);
    }
}

// -------- Fix or terminating the generic type parameter
class ProductStore extends Store<Product1> {
    filterByCategory(category: string): Product1[] {
        return [];
    }
}


// --------------------------------------- The "keyof" Operator

class Store2<T> {
    protected _objects: T[] = [];

    add(obj: T): void {
        this._objects.push(obj);
    }

    // T is Product
    // keyof T => "name" | "price" (so the 'keyof' operator returns a union of properties of the given type)
    find(property: keyof T, value: unknown): T | undefined {
        return this._objects.find(obj => obj[property] === value);
    }
}

let store3 = new Store2<Product1>();
store3.add({ name: "a", price: 1 });
store3.find("name", "a");
store3.find("price", 1);
store3.find("price", 1); // Only key of T --> price or name


// --------------------------------------- Type Mapping

interface MyProduct {
    name: string;
    price: number
}

type ReadOnly = {
    // Index signature
    // keyof
    readonly [K in keyof MyProduct]: MyProduct[K];
}

let product: ReadOnly = {
    name: "a",
    price: 1
}

// ----------

type ReadOnlyProduct<T> = {
    // Index signature
    // keyof
    readonly [K in keyof T]: T[K]
}

type Optional<T> = {
    [K in keyof T]?: T[K]
}

type nullable<T> = {
    [K in keyof T]: T[K] | null
}

let product2: ReadOnlyProduct<Product1> = {
    name: "a",
    price: 1
}



// With this technic properties going to be optional

