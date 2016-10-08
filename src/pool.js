// @flow

export default class Pool<T: Function> {
    konstructor: Class<T>;
    instances: Array<T>;

    constructor(konstructor: T) {
        this.konstructor = konstructor;
        this.instances = [];
    }

    // Reserve n new instances (regardless of how many have been created)
    reserve(n: number) {
        for (let i = 0; i < n; i++) {
            this.instances.push(new this.konstructor());
        }

        return this;
    }

    get() {
        if (this.instances.length === 0) {
            this.reserve(1);
        }
        return this.instances.pop();
    }

    release(obj: T) {
        if (obj.prepareForReuse) { obj.prepareForReuse(); }

        this.instances.push(obj);
    }
}
