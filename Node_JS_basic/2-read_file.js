const fs = require('fs');

module.exports = function countStudents(path) {
  try {
    const data = fs.readFileSync(path, 'utf8');
    const lines = data.split('\n').filter(Boolean);// filter out empty lines

    const counters = {};

    for (let i = 1; i < lines.length; i += 1) {
      const [firstname, , , field] = lines[i].split(',');

      if (field) {
        counters[field] = counters[field] || { count: 0, names: [] };
        counters[field].count += 1;
        counters[field].names.push(firstname);
      }
    }

    // resultats
    console.log(`Number of students: ${lines.length - 1}`);
    for (const field in counters) {
      if (Object.prototype.hasOwnProperty.call(counters, field)) {
        console.log(`Number of students in ${field}: ${counters[field].count}. List: ${counters[field].names.join(', ')}`);
      }
    }
  } catch (error) {
    throw new Error('Cannot load the database');
  }
};
