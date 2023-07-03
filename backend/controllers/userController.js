const bcrypt = require('bcrypt');
const db = require('../utils/db');

exports.login = async (req, res) => {
  const { username, password } = req.body;

  const sql = 'SELECT * FROM users WHERE username = ?';
  db.query(sql, username, async (err, result) => {
    if (err) throw err;

    if (result.length > 0) {
      const comparison = await bcrypt.compare(password, result[0].password);

      if (comparison) {
        req.session.loggedin = true;
        req.session.username = username;
        res.redirect('/home');
      } else {
        res.send('Incorrect Password!');
      }
    } else {
      res.send('Incorrect Username!');
    }
  });
};


exports.register = async (req, res) => {
    const { firstname, lastname, username, email, password } = req.body;
  
    const hashedPassword = await bcrypt.hash(password, 10);
  
    const sql = 'INSERT INTO users SET ?';
    const user = { firstname, lastname, username, email, password: hashedPassword };
  
    db.query(sql, user, (err, result) => {
      if (err) throw err;
      res.redirect('/login');
    });
};

exports.logout = (req, res) => {
    req.session.destroy((err) => {
      if (err) throw err;
      res.redirect('/');
    });
};