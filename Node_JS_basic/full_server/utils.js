const fs = require('fs');

function readDatabase(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, 'utf8', (err, data) => {
      if (err) {
        reject(new Error('Cannot load the database'));
        return;
      }

      const lines = data.split('\n').filter(Boolean);// filter out empty lines
      const result = {};

      for (let i = 1; i < lines.length; i += 1) {
        const [firstname, , , field] = lines[i].split(',');
        if (field) {
          result[field] = result[field] || [];
          result[field].push(firstname.trim());
        }
      }
      resolve(result);
    });
  });
}

module.exports = { readDatabase };
