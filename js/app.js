'use strict';
document.addEventListener('DOMContentLoaded', function () {
    const dispatcher = new Dispatcher();
    const tableManager = new Table();

    tableManager.setDispatcher(dispatcher);

    dispatcher.getAll('cars');
    dispatcher.getAll('persons');
    dispatcher.getAll('companies');

    if (!dispatcher.cars.length) {
        dispatcher.create('cars', {
            model: 'Toyota',
            color: 'red',
            year: '2015',
            price: 15000,
            owners: []
        });
        dispatcher.create('cars', {
            model: 'BMW',
            color: 'white',
            year: '2005',
            price: 20000,
            owners: []
        });
    }

    if (!dispatcher.persons.length) {
        dispatcher.create('persons', {
            name: 'Ivan',
            surname: 'Petrov',
            balance: 2000,
            cars: []
        });
        dispatcher.create('persons', {
            name: 'Oleg',
            surname: 'Potapenko',
            balance: 3000,
            cars: []
        });
    }

    if (!dispatcher.companies.length) {
        dispatcher.create('companies', {
            name: 'LTD Illa',
            balance: 20000,
            cars: []
        });
        dispatcher.create('companies', {
            name: 'KF Oktagon',
            balance: 5000,
            cars: []
        });
    }

    let keysPerson = function() {
        return [
            'id',
            'name',
            'surname',
            'balance',
            'cars',
            'action',
        ]
    };
    let keysCompany = function() {
        return [
            'id',
            'name',
            'balance',
            'cars',
            'action',
        ]
    };
    let keysCar = function() {
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

    let getBtnAction = function() {
        return [
            'view',
            'edit',
            'remove',
        ]
    };

    tableManager.setDisplayCarsListener(dispatcher.getAll('cars'), keysCar, getBtnAction);
    tableManager.setDisplayPersonsListener(dispatcher.getAll('persons'), keysPerson, getBtnAction);
    tableManager.setDisplayCompaniesListener(dispatcher.getAll('companies'), keysCompany, getBtnAction);
    tableManager.openPopupListener();
    tableManager.setDeletePopupListeners();

});

