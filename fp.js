export const Either = {
  Left: (x) => ({
    fold: (f, g) => f(x),
  }),
  Right: (x) => ({
    fold: (f, g) => g(x)
  })
};
export function apo(f, seed) {
  const result = f(seed);
  if (result === null) {
    return [];
  }
  const [nextSeed, either] = result;
  return either.fold(
    xs => xs,
    x => [x].concat(apo(f, nextSeed))
  );
}
export async function unfoldAsync(f, seed) {
  const result = await f(seed);
  if (result === null) {
    return [];
  }
  const [nextSeed, x] = result;
  return  [x].concat(unfoldAsync(f, nextSeed))
}
function fold(f, a, [x, ...xs]) {
  return x !== undefined ? fold(f, f(a, x), xs) : a;
}
export function find(unanswereQ, quiz) {
  return fold((a, q) => unanswereQ(q) ? q : a, null, quiz);
}
