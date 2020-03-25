'use strict';
function Car(id, model, color, year, price) {
    this.id = id;
    this.model = model;
    this.color = color;
    this.year = year;
    this.price = price;
    this.owners = [];//или лучше в владельцах машины??

    this.getTableRow = function (keys, btnAction, cars) {
        let tr = document.createElement('tr');
        for (let i = 0; i < keys.length; i++) {
            let td = document.createElement('td');

            if(keys[i] === 'action') {
                for (let j = 0; j < btnAction.length; j++) {
                    let input = document.createElement('input');

                    input.setAttribute('data-id', (this.id));
                    input.setAttribute('type', 'button');
                    input.setAttribute('name', 'action');
                    input.setAttribute('value', (btnAction[j]));
                    td.append(input);
                    tr.append(td);
                }
            } else {
                td.innerHTML = this[keys[i]] || '';
                tr.append(td);
            }
        }
        tr.setAttribute('data-id', this.id);
        return tr;
    };


    this.toObject = function () {
        return JSON.parse(JSON.stringify(this));
    };

    this.getName = function () {
        return this.name;
    };
    this.getModel = function () {
        return this.model;
    };
    this.getColor = function () {
        return this.color;
    };
    this.getId = function () {
        return this.id;
    };
    this.assignOwner = function(person) {
        this.owner.push(person);
    }; //или лучше в владельцах машины??
}