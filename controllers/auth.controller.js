exports.sessionNew = (req, res, next) => {
  res.render("signin", { error: null });
};

exports.sessionCreate = (req, res, next) => {
  res.end();
};

exports.sessionDelete = (req, res, next) => {
  res.end();
};
