/*
Задание 1: Реализуйте свой Promise.all
Требования:
- Принимает список промисов
- Резолвится массивом результатов в том же порядке
- Немедленно режектится при первой ошибке
*/

function promiseAll<T>(promises: Array<Promise<T>>): Promise<T[]> {
    return new Promise((resolve, reject) => {
        const results: T[] = [];
        let completed = 0;
        
        if (promises.length === 0) {
            resolve(results);
            return;
        }
        
        promises.forEach((promise, index) => {
            Promise.resolve(promise)
                .then((value) => {
                    results[index] = value;
                    completed++;
                    
                    if (completed === promises.length) {
                        resolve(results);
                    }
                })
                .catch(reject);
        });
    });
}

// Пример использования
const p1 = Promise.resolve(1);
const p2 = Promise.resolve(2);

promiseAll([p1, p2]).then(console.log); // [1, 2]
