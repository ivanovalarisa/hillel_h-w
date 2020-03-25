'use strict';
function BasePerson(id, name, balance, cars) {
    this.id = id;
    this.name = name;
    this.balance = balance;
    this.cars = cars;

    this.toObject = function () {
        return JSON.parse(JSON.stringify(this));
    };

    this.update = function(data) {

    };
    this.remove = function(){

    };
}
