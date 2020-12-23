module.exports = function(req, res, next) {
    const { firstName, lastName, phoneNumber, email, passwordUser, maritalStatus, gender, placeOfBirth, dateOfBirth } = req.body;
  
    function validEmail(email) {
      return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
    }
  
    if (req.path === "/register") {
      console.log(!email.length);
      // Check whether not they are empty
      if (![firstName, lastName, phoneNumber, email, passwordUser, maritalStatus, gender, placeOfBirth, dateOfBirth].every(Boolean)) {
        return res.status(401).json("Missing Credentials");
      } else if (!validEmail(email)) {
        return res.status(401).json("Invalid Email");
      }
    } else if (req.path === "/login") {
      if (![email, passwordUser].every(Boolean)) {
        return res.json("Missing Credentials");
      } else if (!validEmail(email)) {
        return res.json("Invalid Email");
      }
    }
  
    // once all fine- direct one of the route.
    next();
  };