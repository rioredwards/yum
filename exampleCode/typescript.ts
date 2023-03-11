// Typescript Color reference:

/* Basics types */
function add(n1: number, n2: number, showResult: boolean, phrase: string) {
  let result = n1 + n2;
  if (showResult) {
    console.log(phrase + result);
  } else {
    return n1 + n2;
  }
}

let number1: number;
number1 = 5;
const number2 = 2.8;
const printResult = true;
const resultPhrase = "Result is: ";

const result = add(number1, number2, printResult, resultPhrase);

/* Object Types */
// Generic object type
const person: object = {
  name: "Rio",
  age: 25,
};

const func: Function = () => {};

// Specific object type
const personImproved: {
  name: string;
  age: number;
} = {
  name: "Rio",
  age: 25,
};

// Nested object type
const product: {
  id: string;
  price: number;
  tags: string[];
  details: {
    title: string;
    description: string;
  };
} = {
  id: "abc1",
  price: 12.99,
  tags: ["great-offer", "hot-and-new"],
  details: {
    title: "Red Carpet",
    description: "A great carpet - almost brand-new!",
  },
};

// Basic Types
let isDone: boolean = false;
let decimal: number = 6;
let color: string = "blue";
let list: number[] = [1, 2, 3];
let x: [string, number] = ["hello", 10];

// Function Types
function add2(x: number, y: number): number {
  return x + y;
}

let myAdd = function (x: number, y: number): number {
  return x + y;
};

// Optional and Default Parameters
function buildName(firstName: string, lastName = "Smith") {
  return firstName + " " + lastName;
}

// Rest Parameters
function buildName1(firstName: string, ...restOfName: string[]) {
  return firstName + " " + restOfName.join(" ");
}

// Interfaces
interface SquareConfig {
  color?: string;
  width?: number;
}

interface Square {
  color: string;
  area: number;
}

// Classes
abstract class Department {
  protected employees: string[] = [];

  constructor(private readonly id: string, public name: string) {}

  abstract describe(this: Department): void;
}

class AccountingDepartment extends Department {
  static instance: AccountingDepartment;

  private constructor(id: string, private reports: string[]) {
    super(id, "Accounting");
  }

  static getInstance() {
    if (this.instance) {
      return this.instance;
    }
    this.instance = new AccountingDepartment("2", []);
    return this.instance;
  }

  describe(this: Department) {
    console.log("Accounting Department");
  }
}

const accounting = AccountingDepartment.getInstance();
accounting.describe();

class Greeter {
  greeting: string;

  constructor(message: string) {
    this.greeting = message;
  }

  greet() {
    return "Hello, " + this.greeting;
  }
}

// Inheritance
class Animal {
  name: string;

  constructor(theName: string) {
    this.name = theName;
  }

  move(distanceInMeters: number = 0) {
    console.log(`${this.name} moved ${distanceInMeters}m.`);
  }
}

class Snake extends Animal {
  constructor(name: string) {
    super(name);
  }

  move(distanceInMeters = 5) {
    console.log("Slithering...");
    super.move(distanceInMeters);
  }
}

// Generics
function identity<T>(arg: T): T {
  return arg;
}

interface GenericIdentityFn {
  <T>(arg: T): T;
}

// Type Inference
let xy = 3;
let y = [0, 1, null];

// Union Types
function padLeft(value: string, padding: string | number) {
  // ...
}

// Type Aliases
type Point = {
  x: number;
  y: number;
};

// Type Assertions
let someValue: unknown = "this is a string";
let strLength: number = (someValue as string).length;

// Literal Types
type Easing = "ease-in" | "ease-out" | "ease-in-out";

// Discriminated Unions
interface Square {
  kind: "square";
  size: number;
}

interface Rectangle {
  kind: "rectangle";
  width: number;
  height: number;
}

delete Circle;

type Shape = Square | Rectangle;

// Type Guards
function getArea(shape: Shape) {
  if (shape.kind === "square") {
    return shape.size * shape.size;
  } else {
    return shape.width * shape.height;
  }
}

// Exhaustiveness Checking
function assertNever(x: never): never {
  throw new Error("Unexpected object: " + x);
}

function getArea3(shape: Shape) {
  switch (shape.kind) {
    case "square":
      return shape.size * shape.size;
    case "rectangle":
      return shape.width * shape.height;
    default:
      return assertNever(shape);
  }
}

// Mixins
class Disposable {
  isDisposed: boolean = false;

  dispose() {
    this.isDisposed = true;
  }
}

class Activatable {
  isActive: boolean = false;

  activate() {
    this.isActive = true;
  }

  deactivate() {
    this.isActive = false;
  }
}

class SmartObject implements Disposable, Activatable {
  constructor() {
    setInterval(
      () => console.log(this.isActive + " : " + this.isDisposed),
      500
    );
  }

  interact() {
    this.activate();
  }

  isDisposed: boolean = false;
  dispose: () => void;
  isActive: boolean = false;
  activate: () => void;
  deactivate: () => void;
}

applyMixins(SmartObject, [Disposable, Activatable]);

function applyMixins(derivedCtor: any, baseCtors: any[]) {
  baseCtors.forEach((baseCtor) => {
    Object.getOwnPropertyNames(baseCtor.prototype).forEach((name) => {
      Object.defineProperty(
        derivedCtor.prototype,
        name,
        Object.getOwnPropertyDescriptor(baseCtor.prototype, name) ||
          Object.create(null)
      );
    });
  });
}

/* Type casting */

const paragraphElement = <HTMLParagraphElement>(
  document.getElementById("paragraph")
);

const userInputElement = document.getElementById(
  "user-input"
)! as HTMLInputElement;

userInputElement.value = "Hi there!";

if (userInputElement) {
  (userInputElement as HTMLInputElement).value = "Hi there!";
}

/* Index properties */
interface ErrorContainer {
  [prop: string]: string;
}

const errorBag: ErrorContainer = {
  email: "Not a valid email!",
  username: "Must start with a capital character!",
};

/* Intersection Types  */
type Admin = {
  name: string;
  privileges: string[];
};

type Employee = {
  name: string;
  startDate: Date;
};

type ElevatedEmployee = Admin & Employee;

const e1: ElevatedEmployee = {
  name: "Max",
  privileges: ["create-server"],
  startDate: new Date(),
};

type Combinable = string | number;
type Numeric = number | boolean;
type Universal = Combinable & Numeric;

/* Type guards */
function add5(a: Combinable, b: Combinable) {
  if (typeof a === "string" || typeof b === "string") {
    return a.toString() + b.toString();
  }
  return a + b;
}

type unknownEmployee = Employee | Admin;

function printEmployeeInformation(emp: unknownEmployee) {
  console.log("Name: " + emp.name);
  if ("privileges" in emp) {
    console.log("Privileges: " + emp.privileges);
  }
  if ("startDate" in emp) {
    console.log("Start Date: " + emp.startDate);
  }
}

printEmployeeInformation({ name: "Max", startDate: new Date() });

class Car {
  drive() {
    console.log("Driving...");
  }
}

class Truck {
  drive() {
    console.log("Driving a truck...");
  }

  loadCargo(amount: number) {
    console.log("Loading cargo..." + amount);
  }
}

type Vehicle = Car | Truck;

const v1 = new Car();
const v2 = new Truck();

function useVehicle(vehicle: Vehicle) {
  vehicle.drive();
  if (vehicle instanceof Truck) {
    vehicle.loadCargo(1000);
  }
}

interface Bird {
  type: "bird"; // Discriminator
  flyingSpeed: number;
}

interface Horse {
  type: "horse"; // Discriminator
  runningSpeed: number;
}

type Animals = Bird | Horse;

/* Function Overloads */
type Combinable1 = number | string;

function add7(a: number, b: number): number;
function add7(a: string, b: string): string;
function add7(a: number, b: string): string;
function add7(a: string, b: number): string;
function add7(a: Combinable, b: Combinable): Combinable {
  if (typeof a === "string" || typeof b === "string") {
    return a.toString() + b.toString();
  }
  return a + b;
}

const numResult = add7(30, 26);
const stringResult = add7("Rio", "Edwards");

numResult.toFixed(2);
stringResult.split(" ");
