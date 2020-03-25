'use strict';
Company.prototype = new BasePerson();

function Company(id, name, balance, cars) {
    this.id = id;
    this.name = name;
    this.balance = balance;
    this.cars = cars;

    this.getTableRow = function (keys, btnAction) {
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
    }
}

