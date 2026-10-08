//3. Both Default and Named Exports in the Same File
export default function sayHello() {
  alert("Hello!");
}

export function add(a, b) {
  return a + b;
}
/*
{
    add:add,
    default:sayHello
}
*/
