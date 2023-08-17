console.log('Hello world')

//Arrays
const t = [1, -1, 3]

t.push(5)

console.log(t.length) // Se imprime 4
console.log(t[1]) // -1 es impreso

t.forEach((value) => {
  console.log(value) // se imprimen los números 1, -1, 3, 5, cada uno en la línea propia
})

const t2 = t.concat(5)

console.log(t) // [1, -1, 3] es impreso
console.log(t2) // [1, -1, 3, 5] es impreso

const m1 = t.map((value) => value * 2)
console.log(m1) // [2, 4, 6] es impreso

const m2 = t.map((value) => '<li>' + value + '</li>')
console.log(m2)

const [first, second, ...rest] = t

console.log(first, second) // 1, 2 es impreso
console.log(rest) // [3, 4 ,5] es impreso

// Functions
const sum = (p1, p2) => {
  console.log(p1)
  console.log(p2)
  return p1 + p2
}

const square = (p) => {
  console.log(p)
  return p * p
}

const tSquared = t.map((p) => p * p)
// tSquared es ahora [1, 4, 9]

function product(a, b) {
  return a * b
}

const result = product(2, 6)
// result is now 12

const average = function (a, b) {
  return (a + b) / 2
}

const result2 = average(2, 5)
// result is now 3.5
