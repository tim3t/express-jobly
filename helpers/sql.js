const { BadRequestError } = require('../expressError');

// When running this function (found in models), take user data such as {firstName: 'Name', age: 99} for first argument and jsToSql such as { firstName: 'first_name', age: 'age'} for second argument.  Return array with SQL column names and $1, $2, etc. as variables.

function sqlForPartialUpdate(dataToUpdate, jsToSql) {
	const keys = Object.keys(dataToUpdate);
	if (keys.length === 0) throw new BadRequestError('No data');

	// {firstName: 'Aliya', age: 32} => ['"first_name"=$1', '"age"=$2']
	const cols = keys.map((colName, idx) => `"${jsToSql[colName] || colName}"=$${idx + 1}`);

	return {
		setCols: cols.join(', '),
		values: Object.values(dataToUpdate)
	};
}

module.exports = { sqlForPartialUpdate };

// let testResult = sqlForPartialUpdate({ firstName: 'Aliya', age: 32 }, { firstName: 'first_name', age: 'age' });
// console.log(testResult);
