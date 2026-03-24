/*
Задание 4: Реализуйте typedObject
Цель:
- Создать объект на основе схемы ожидаемых типов
- При присваивании проверять тип и бросать ошибку при несоответствии
*/

type Schema = Record<string, string>;

function typedObject<T extends Schema>(schema: T): Record<keyof T, any> {
    const target: Record<string, any> = {};
    
    const handler: ProxyHandler<Record<string, any>> = {
        set(obj: Record<string, any>, prop: string, value: any): boolean {
            const expectedType = schema[prop];
            
            if (!expectedType) {
                throw new Error(`Свойство "${prop}" не описано в схеме`);
            }
            
            const actualType = typeof value;
            
            if (actualType !== expectedType) {
                throw new TypeError(
                    `Ожидался тип "${expectedType}", получен "${actualType}" для свойства "${prop}"`
                );
            }
            
            obj[prop] = value;
            return true;
        },
        
        get(obj: Record<string, any>, prop: string): any {
            return obj[prop];
        }
    };
    
    return new Proxy(target, handler);
}

// Пример использования
const user = typedObject({
    name: "string",
    age: "number",
});

user.name = "Ivan";    
user.age = 20;        
