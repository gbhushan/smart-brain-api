const handleRegister = (req, res, db, bcrypt) => {
  const { email, name, password } = req.body;
  console.log(req.body);
  if (!email || !name || !password) {
    return res.status(400).json('incorrect form submission');
  }
  const hash = bcrypt.hashSync(password);
    db.transaction(trx => {
      console.log('is it transacting?');
      trx.insert({
        hash: hash,
        email: email
      })
      .into('login')
      .returning('email')
      .then(loginEmail => {
        console.log('is it in here?');
        return trx('users')
          .returning('*')
          .insert({
            email: loginEmail[0],
            name: name,
            joined: new Date()
          })
          .then(user => {
            res.json(user[0]);
          })
      })
      .then(trx.commit)
      .catch(trx.rollback)
    })
    .catch(err => { console.log(err); return res.status(400).json('unable to register');})
}

module.exports = {
  handleRegister: handleRegister
};


