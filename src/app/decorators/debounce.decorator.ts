export function Debounce(ms: number = 250) {
  let timeoutRef = null;

  return function (target: any, key: string, descriptor: PropertyDescriptor) {
    const original = descriptor.value;

    descriptor.value = function(...args: any[]) {
      clearTimeout(timeoutRef);
      timeoutRef = setTimeout(() => original.apply(this, args), ms);
    }

    return descriptor;
  }
}
