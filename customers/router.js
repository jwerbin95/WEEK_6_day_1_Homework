let express = require('express');
let router = express.Router();
let customers = require('./models');
let newCustomer = 0;

router.get('/', (request, response) => {
	let viewData = customers.getCustomers();
	response.render('../views/index.ejs', {
		items: viewData,
		title: customers.title
	});
});
router.get('/new', (request, response) => {
	response.render('../views/new.ejs', {
		action: '/customers',
		formTitles: ['Name', 'Email', 'Phone Number', 'Address'],
		title: customers.title
	});
});
router.get('/:id/edit', (request, response) => {
	newCustomer = request.params.id;
	response.render('../views/edit.ejs', {
		action: `/customers/${newCustomer}`,
		formTitles: ['Name', 'Email', 'Phone Number', 'Address']
	});
});
router.get('/:id', (request, response) => {
	let id = request.params.id;
	let viewData = customers.getCustomer(id);
	response.render('../views/show.ejs', { item: viewData });
});

router.post(`/:id`, (request, response) => {
	let customer = customerCreate(
		request.body['name'],
		request.body['email'],
		request.body['phoneNumber'],
		request.body['address']
	);
	customers.editCustomer(newCustomer, customer);
	response.redirect('/customers');
});
router.post('/', (request, response) => {
	let customer = customerCreate(
		request.body['name'],
		request.body['email'],
		request.body['phoneNumber'],
		request.body['address']
	);

	customers.createCustomer(customer);
	response.redirect('/customers');
});

router.delete('/:id/delete', (request, response) => {
	let id = request.params.id;
	customers.removeCustomer(id);
	response.redirect('/customers');
});

function customerCreate(newName, newEmail, newPhoneNumber, newAddress) {
	let customer = {
		name: newName,
		email: newEmail,
		phoneNumber: newPhoneNumber,
		address: newAddress
	};
	return customer;
}

module.exports = router;
