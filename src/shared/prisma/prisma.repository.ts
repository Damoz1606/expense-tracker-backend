class Decorator<Interface> {
    private target!: Interface;
}

export type DecoratorClass<Interface> = {
    new(target: Interface): Decorator<Interface> & Interface;
    prototype: Decorator<Interface> & Interface;
}

export default function PrismaRepository<Interface>(methods: ReadonlyArray<keyof Interface>): DecoratorClass<Interface> {

    class Decorator {
        constructor(private target: Interface) { }
    }

    for (const key of methods) {
        (Decorator.prototype as any)[key] = function (...args: any[]) {
            return this.target[key](...args);
        }
    }

    return Decorator as any
}