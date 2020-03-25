'use strict';

function Dispatcher() {
    this.cars = [];
    this.persons = [];
    this.companies = [];

    this.getAll = function(key) {
        const arr = localStorageGet(key) || [];
        switch (key) {
            case 'cars':
                this[key] = arr.map(entity => {
                    return new Car(entity.id, entity.model, entity.color, entity.year, entity.price);
                });

                break;
            case 'persons':
                this[key] = arr.map(entity => {
                    return new Person(entity.id, entity.name, entity.surname, entity.balance, entity.cars);
                });
                break;
            case 'companies':
                this[key] = arr.map(entity => {
                    return new Company(entity.id, entity.name, entity.balance, entity.cars);
                });
                break;
            default:
                throw new Error('Unknown object type');
        }
        return this[key];
    };


    this.create = function(key, entity) {
        const array = localStorageGet(key) || [];
        entity.id = Math.max(...array.map(v => v.id), 0) + 1;
        let newEntity;
        switch (key) {
            case 'cars':
                newEntity = new Car(entity.id, entity.model, entity.color, entity.year, entity.price);
            break;
            case 'persons':
                newEntity = new Person(entity.id, entity.name, entity.surname, entity.balance);
            break;
            case 'companies':
                newEntity = new Company(entity.id, entity.name, entity.balance);
            break;
            default:
                throw new Error('Unknown object type');
        }

        this[key].push(newEntity);
        array.push(newEntity);
        localStorageSet(key, array);
    };

    this.update = function(key, entity) {
        let array;
        switch (key) {
            case 'cars':
                array = this.cars;
                break;
            case 'persons':
                array = this.persons;
                break;
            case 'companies':
                array = this.companies;
                break;
            default:
                throw new Error('Unknown object type');
        }

        for(const item in array) {
            let val = array[item]['id'];
            if(Number(entity.id) === val) {
                array[item] = entity;
                break;
            }
        }
        switch (key) {
            case 'cars':
                this[key] = array.map(entity => {
                    return new Car(entity.id, entity.model, entity.color, entity.year, entity.price);
                });
                break;
            case 'persons':
                this[key] = array.map(entity => {
                    return new Person(entity.id, entity.name, entity.surname, entity.balance, entity.cars);
                });
                break;
            case 'companies':
                this[key] = array.map(entity => {
                    return new Company(entity.id, entity.name, entity.balance, entity.cars);
                });
                break;
            default:
                throw new Error('Unknown object type');
        }
        localStorageSet(key, this[key]);
    };

    this.remove = function(key, id) {
        let array;

        switch (key) {
            case 'cars':
                array = this.cars;
                break;
            case 'persons':
                array = this.persons;
                break;
            case 'companies':
                array = this.companies;
                break;
            default:
                throw new Error('Unknown object type');
        }
        this[key] = this[key].filter(v => v.id !== id);
        localStorageSet(key, this[key]);
    };
}