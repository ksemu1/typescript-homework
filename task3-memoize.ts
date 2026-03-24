/*
Задание 3: Реализуйте memoize для функций
Ограничения:
- Аргументы функции — только строки или числа (для упрощения)
- Кэшируйте результат по аргументам
*/

type Primitive = string | number;

function memoize<T extends (...args: Primitive[]) => any>(
    fn: T
): T {
    const cache = new Map<string, ReturnType<T>>();
    
    return ((...args: Parameters<T>) => {
        const key = JSON.stringify(args);
        
        if (cache.has(key)) {
            return cache.get(key);
        }
        
        const result = fn(...args);
        cache.set(key, result);
        return result;
    }) as T;
}

// Пример использования
const slowAdd = (a: number, b: number): number => {
    console.log("Вычисление...");
    return a + b;
};

const memoAdd = memoize(slowAdd);
console.log(memoAdd(1, 2)); // Вычисление... 3
console.log(memoAdd(1, 2)); // из кэша, 3
