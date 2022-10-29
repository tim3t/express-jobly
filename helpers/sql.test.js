// Testing for sql.js and specifically function sqlForPartialUpdate()

const { sqlForPartialUpdate } = require('./sql');

describe('Using sqlForPartialUpdate', function() {
	test('whether sqlForPartialUpdate func works', function() {
		let data = { firstName: 'Name', age: 99 };
		let jsToSql = { firstName: 'first_name', age: 'age' };
		let result = sqlForPartialUpdate(data, jsToSql);
		expect(result).toEqual({ setCols: '"first_name"=$1, "age"=$2', values: [ 'Name', 99 ] });
	});
});
