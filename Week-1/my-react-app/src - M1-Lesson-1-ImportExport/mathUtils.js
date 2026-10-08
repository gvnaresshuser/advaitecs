//5. Import All as Namespace
export function add(a, b) {
    return a + b;
}

export function subtract(a, b) {
    return a - b;
}

// Default Export
export default function multiply(a, b) {
    return a * b;
}
/*
{
    add: add,
    subtract: subtract,
    default: multiply,
}
*/