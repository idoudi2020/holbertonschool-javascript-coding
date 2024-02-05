// full_server/controllers/StudentsController.js
import { readDatabase } from '../utils';

class StudentsController {
  static async getAllStudents(req, res) {
    try {
      const data = await readDatabase(process.argv[2]);
      if (!data) {
        res.status(500).send('Cannot load the database');
        return;
      }
      const responseContent = ['This is the list of our students'];
      for (const field in data) {
        if (Object.prototype.hasOwnProperty.call(data, field)) {
          const numberOfStudents = data[field].length;
          const listOfFirstNames = data[field].join(', ');

          // Display the information for each field
          const message = `Number of students in ${field}: ${numberOfStudents}. List: ${listOfFirstNames}`;
          responseContent.push(message);
        }
      }
      res.status(200).send(responseContent.join('\n'));
    } catch (error) {
      res.status(500).send('Cannot load the database');
    }
  }

  static async getAllStudentsByMajor(req, res) {
    try {
      const { major } = req.params;

      if (major !== 'CS' && major !== 'SWE') {
        res.status(500).send('Major parameter must be CS or SWE');
        return;
      }

      const data = await readDatabase(process.argv[2]);

      if (!data) {
        res.status(500).send('Cannot load the database');
        return;
      }

      const studentNames = data[major] || [];

      // Display the information for the specified major
      const message = `List: ${studentNames.join(', ')}`;
      res.status(200).send(message);
    } catch (error) {
      res.status(500).send('Cannot load the database');
    }
  }
}

module.exports = StudentsController;
