'use strict';
function Table() {
    let table = document.getElementById('table-header');
    let me = this;
    this.dispatcher = null;

    this.setDispatcher = function(dispatcher) {
        this.dispatcher = dispatcher;
    };

    this.keysPerson = function() {
        return [
            'id',
            'name',
            'surname',
            'balance',
            'cars',
            'action',
        ]
    };
    this.keysCompany = function() {
        return [
            'id',
            'name',
            'balance',
            'cars',
            'action',
        ]
    };
    this.keysCar = function() {
        return [
            'id',
            'model',
            'color',
            'year',
            'price',
            'owners',
            'action',
        ]
    };
    this.getBtnAction = function() {
        return [
            'view',
            'edit',
            'remove',
        ]
    };

    this.displayCars = function(cars, keysCar, getBtnAction) {
        $('table').attr('data-type', 'cars');
        cleanTable(table);
        $('#helper').addClass('disappear');
        let keys = keysCar();
        let btnAction = getBtnAction();

        for (let y = 0; y < keys.length; y++) {
           $('<tr></tr>').append('<td>' + keys[y] + '</td>');
        }

        for(const item of cars) {
            const tr = item.getTableRow(keys, btnAction);
            $('table').append(tr);
        }
        $('table').append('<input type="button" name="add" id="add" value="add">');
    };

    this.setDisplayCarsListener = function(cars, keysCar, getBtnAction) {
        $('#cars').click(function () {
            me.displayCars(me.dispatcher.getAll('cars'), keysCar, getBtnAction);
            hideViewEdit();
            me.hideDeletePopup();
        });
    };

    this.displayPersons = function(persons, keysPerson, getBtnAction) {
        $('table').attr('data-type', 'persons');
        cleanTable(table);
        $('#helper').addClass('disappear');

        let keys = keysPerson();
        let btnAction = getBtnAction();
        for (let y = 0; y < keys.length; y++) {
            $('<tr></tr>').append('<td>' + keys[y] + '</td>');
        }

        for(const item of persons) {
            const tr = item.getTableRow(keys, btnAction);
            $('table').append(tr);
        }
        $('table').append('<input type="button" name="add" id="add" value="add">');
    };

    this.setDisplayPersonsListener = function(persons, keysPerson, getBtnAction) {
        $('#person').click(function () {
            me.displayPersons(me.dispatcher.getAll('persons'), keysPerson, getBtnAction);
            hideViewEdit();
            me.hideDeletePopup();
        });
    };

    this.displayCompanies = function(companies, keysCompany, getBtnAction) {
        $('table').attr('data-type', 'companies');
        cleanTable(table);
        $('#helper').addClass('disappear');

        let keys = keysCompany();
        let btnAction = getBtnAction();
        for (let y = 0; y < keys.length; y++) {
            $('<tr></tr>').append('<td>' + keys[y] + '</td>');
        }
        for(const item of companies) {
            const tr = item.getTableRow(keys, btnAction);
            $('table').append(tr);
        }
        $('table').append('<input type="button" name="add" id="add" value="add">');
    };

    this.setDisplayCompaniesListener = function(companies, keysCompany, getBtnAction) {
        $('#company').click(function () {
            me.displayCompanies(me.dispatcher.getAll('companies'), keysCompany, getBtnAction);
            hideViewEdit();
            me.hideDeletePopup();
        });
    };

    this.openPopupListener = function () {
        $('table').click(function(e) {
            let currentBtn = e.target;
            const dataType = $('table').attr('data-type');
            const entity = me.dispatcher.getAll(dataType).filter((v => v.id === +e.target.getAttribute('data-id'))).shift();
            $('#confirm').attr('data-id', currentBtn.getAttribute("data-id"));

            if (currentBtn.value === 'view') {
                me.openEntityPopup(dataType, entity, true);
                me.hideDeletePopup();
            } else if (currentBtn.value === 'edit') {
                me.openEntityPopup(dataType, entity, false);
                me.hideDeletePopup();
            } else if (currentBtn.value === 'remove') {
                hideViewEdit();
                $('#confirm').addClass('appear');
                $('#confirm').attr('data-type', dataType);
            } else if (currentBtn.value === 'add') {
                me.openEntityPopup(dataType);
                me.hideDeletePopup();
            }
        });
    };

    this.hideDeletePopup = function () {
        $('#confirm').attr('data-id', null);
        $('#confirm').attr('data-type', null);
        $('#confirm').removeClass('appear');
    };

    this.setDeletePopupListeners = function (){
        $('#confirm-btn').click(function (e) {
            const del = e.target && e.target.value && (e.target.value === 'Yes');
            const dataType = $('#confirm').attr('data-type');
            const dataId = $('#confirm').attr('data-id');
            if(del) {
                $('#confirm').removeClass('appear');
                if (dataType === 'cars') {
                    me.dispatcher.remove(dataType, +dataId);
                    me.displayCars(me.dispatcher.getAll(dataType), me.keysCar, me.getBtnAction);
                } else if (dataType === 'persons') {
                    me.dispatcher.remove(dataType, +dataId);
                    me.displayPersons(me.dispatcher.getAll(dataType), me.keysPerson, me.getBtnAction);
                } else {
                    me.dispatcher.remove(dataType, +dataId);
                    me.displayCompanies(me.dispatcher.getAll(dataType), me.keysCompany, me.getBtnAction);
                }
            }
            me.hideDeletePopup();
        });
    };

    this.openEntityPopup = function(type, entity, readonly) {
        const popup = document.querySelector(`form[data-type="${type}"]`);
        const inputs = document.querySelectorAll(`form[data-type="${type}"] input:not([type="button"])`);
        const saveButton = document.querySelector(`form[data-type="${type}"] input[type="button"]`);
        const idInput = document.querySelector(`form[data-type="${type}"] input[name="id"]`);

        $('#show-block').addClass('appear');
        popup.classList.add('appear');
        for (let i = 0; i < inputs.length; i++) {
            const input = inputs[i];
            const keyName = input.getAttribute('name');
            console.log(input);
            if(!entity) {
                input.value =  '';
            } else {
                input.value = entity[keyName] || '';
            }

            if (readonly) {
                $('input').attr('readonly', 'true');
            } else {
                $('input').removeAttr('readonly');
            }
        }

        if (readonly) {
            saveButton.classList.add('disappear');
        } else {
            saveButton.classList.remove('disappear');
            saveButton.addEventListener('click', function() {
                const validValues = {};
                const validArr = [];
                for (let el of inputs) {
                    el.style.borderColor = '#e8edff';
                    if(!entity) {
                        if (!el.name || el.name === 'cars' || el.name === 'owners' || el.name === 'id') {
                            continue;
                        }
                        if(el.name === 'balance' || el.name === 'year' || el.name === 'price') {
                            let numberValue = Number(el.value);
                            const isValueValid = isValid(numberValue, el.name);
                            validValues[el.name] = numberValue;
                            validArr.push(isValueValid);
                            validate(isValueValid, el.name, el);
                        } else {
                            const isValueValid = isValid(el.value, el.name);
                            validValues[el.name] = el.value;
                            validArr.push(isValueValid);
                            validate(isValueValid, el.name, el);
                        }
                    } else {
                        if (!el.name || el.name === 'cars' || el.name === 'owners') {
                            continue;
                        }
                        if(el.name === 'id' || el.name === 'balance' || el.name === 'year' || el.name === 'price') {
                            let numberValue = Number(el.value);
                            const isValueValid = isValid(numberValue, el.name);
                            validValues[el.name] = numberValue;
                            validArr.push(isValueValid);
                            validate(isValueValid, el.name, el);
                        } else {
                            const isValueValid = isValid(el.value, el.name);
                            validValues[el.name] = el.value;
                            validArr.push(isValueValid);
                            validate(isValueValid, el.name, el);
                        }
                    }

                }
                function isPositive(elem) {
                    return elem === true;
                }

                if(validArr.every(isPositive) === true) {
                    if(!entity) {
                        me.dispatcher.create(type, validValues);
                    } else {
                        me.dispatcher.update(type, validValues);
                    }

                    if (type === 'cars') {
                        me.displayCars(me.dispatcher.getAll(type), me.keysCar, me.getBtnAction);
                    } else if (type === 'persons') {
                        me.displayPersons(me.dispatcher.getAll(type), me.keysPerson, me.getBtnAction);
                    } else {
                        me.displayCompanies(me.dispatcher.getAll(type), me.keysCompany, me.getBtnAction);
                    }
                    saveButton.classList.add('disappear');
                    hideViewEdit();
                }
            });
            idInput.setAttribute('readonly', 'true');
        }
        closeBlock();
    };
}



function validate(isValid, key, el) {
    if (!isValid) {
        el.style.borderColor = 'red';
    } else {
        el.style.borderColor = '#e8edff';
    }
}

function isValid(value, key) {
    let validationPatterns = {
        id: /^\d{1,4}$/,
        name: /^[a-zA-Zа-яА-Я 0-9]+?$/,
        surname: /^[a-zA-Zа-яА-Я 0-9]+?$/,
        balance: /^\d{1,}$/,
        model: /^\w{1,}$/,
        color: /^[a-zA-Zа-яА-Я 0-9]+?$/,
        year: /^\d{4}$/,
        price: /^\d{1,}$/
    };
    return validationPatterns[key].test(value);
}

function cleanTable(table) {
    if(table.length !== 0) {
        for (let i = table.childNodes.length - 1; i > 0; i--) {
            table.removeChild(table.childNodes[i]);
        }
    }
}

function closeBlock() {
    $('#close').click(function (e) {
        $(e.target.parentNode).removeClass('appear');
        hideViewEdit();
    });
}

function hideViewEdit() {
    let showBlock = document.getElementById('show-block');
    let viewBlockDiv = showBlock.children;

    for(let item in viewBlockDiv) {
        if(viewBlockDiv[item].tagName === 'FORM') {
            $(viewBlockDiv[item]).removeClass('appear');
            $(showBlock).removeClass('appear');
        }
    }
}
