"use strict";

var express = require("express");

var mongoose = require('mongoose');

var bodyParser = require('body-parser');

var session = require('express-session');

var path = require('path');

var app = express();
var port = 80;
app.use(session({
  secret: 'Omi_trek&@79127#$',
  resave: true,
  saveUninitialized: true
})); // Middleware to check if the User is authenticated

var isAuthenticated = function isAuthenticated(req, res, next) {
  if (req.session && req.session.isAuthenticated) {
    return next();
  } else {
    res.redirect('/login');
  }
};

app.use('/styles', express["static"](path.join(__dirname, 'styles')));
app.use('/def-assets', express["static"](path.join(__dirname, 'def-assets')));
app.use('/images', express["static"](path.join(__dirname, 'images')));
app.use('/script', express["static"](path.join(__dirname, 'script')));
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'src', 'home.html'));
});
app.get('/user', isAuthenticated, function (req, res) {
  res.sendFile(path.join(__dirname, 'src', 'user.html'));
});
app.get('/register', function (req, res) {
  res.sendFile(path.join(__dirname, 'src', 'signupform.html'));
});
app.get('/login', function (req, res) {
  res.sendFile(path.join(__dirname, 'src', 'loginform.html'));
});
app.get('/otpform', function (req, res) {
  res.sendFile(path.join(__dirname, 'src', 'otp.html'));
});
app.get('/forgotPassword', function (req, res) {
  res.sendFile(path.join(__dirname, 'src', 'forget.html'));
});
app.get('/payment', function (req, res) {
  res.sendFile(path.join(__dirname, 'src', 'payment.html'));
}); // Connect to MongoDB

var db = mongoose.connect('mongodb://127.0.0.1:27017/omitrek', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
db.once; // const db = mongoose.connection;
// db.on('error', console.error.bind(console, 'MongoDB connection error:'));
// db.once('open', () => {
//     console.log('Connected to MongoDB');
// });

app.use(bodyParser.urlencoded({
  extended: true
})); // for getting form data

app.use(bodyParser.json()); // Define Mongoose Schemas

var withdrawlSchema = new mongoose.Schema({
  upi: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    "default": 'Processing'
  },
  date: {
    type: String,
    "default": formattedDateTime(Date.now())
  }
});
var referralSchema = new mongoose.Schema({
  _id: String,
  date: {
    type: String,
    "default": formattedDateTime(Date.now())
  },
  name: String,
  email: String,
  coupons: [Number],
  position: String,
  level: Number
});
var userSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true
  },
  phone: {
    type: Number,
    require: true
  },
  email: {
    type: String
  },
  address: String,
  state: String,
  country: String,
  userInfo: {
    type: String
  },
  password: {
    type: String,
    require: true
  },
  referredBy: String,
  referralCode: {
    type: String,
    require: true
  },
  position: String,
  coupons: [{
    amount: Number,
    status: {
      type: String,
      "default": 'pending'
    }
  }],
  earning: {
    type: Number,
    "default": 0
  },
  balance: {
    type: Number,
    "default": 0
  },
  referrals: [referralSchema],
  registrationDate: {
    type: String,
    "default": formattedDateTime(Date.now())
  },
  withdrawls: [withdrawlSchema]
});
var User = mongoose.model('User', userSchema); // Get time in proper way

function formattedDateTime(currentDateTime) {
  // Get day, month, and year
  var day = new Date(currentDateTime).getDate();
  var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  var monthIndex = new Date(currentDateTime).getMonth();
  var year = new Date(currentDateTime).getFullYear(); // Get hours and minutes

  var hours = new Date(currentDateTime).getHours();
  var minutes = new Date(currentDateTime).getMinutes(); // Format the date and time

  var formattedDateTime = "".concat(day, " ").concat(monthNames[monthIndex], " ").concat(year, ", ").concat(hours, ":").concat(minutes);
  return formattedDateTime;
} //for updating whole page


app.get('/updatePage', isAuthenticated, function _callee(req, res) {
  var userId, userData, totalIncome;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          userId = req.session.userId;
          _context.prev = 1;
          _context.next = 4;
          return regeneratorRuntime.awrap(User.findById(userId));

        case 4:
          userData = _context.sent;

          if (!userData) {
            _context.next = 13;
            break;
          }

          _context.next = 8;
          return regeneratorRuntime.awrap(updateTotalIncome(userId));

        case 8:
          totalIncome = _context.sent;
          userData.earning = totalIncome;
          res.json(userData);
          _context.next = 14;
          break;

        case 13:
          res.send("<script>alert('Something went wrong ! Please try again')</alert>");

        case 14:
          _context.next = 19;
          break;

        case 16:
          _context.prev = 16;
          _context.t0 = _context["catch"](1);
          console.log(_context.t0);

        case 19:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[1, 16]]);
}); //for updating sponser

app.get('/getSponser', isAuthenticated, function _callee2(req, res) {
  var userId, userReferredBy, sponserData;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          userId = req.session.userId;
          _context2.prev = 1;
          _context2.next = 4;
          return regeneratorRuntime.awrap(User.findById(userId).referredBy);

        case 4:
          userReferredBy = _context2.sent;

          if (!userReferredBy) {
            _context2.next = 12;
            break;
          }

          _context2.next = 8;
          return regeneratorRuntime.awrap(User.findOne({
            referralCode: userReferredBy
          }));

        case 8:
          sponserData = _context2.sent;
          res.json(sponserData);
          _context2.next = 13;
          break;

        case 12:
          res.json({
            name: 'none',
            email: 'none',
            phone: 'none',
            country: 'none',
            userInfo: 'none'
          });

        case 13:
          _context2.next = 18;
          break;

        case 15:
          _context2.prev = 15;
          _context2.t0 = _context2["catch"](1);
          console.log(_context2.t0);

        case 18:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[1, 15]]);
}); // Register Endpoint

app.post('/register', function _callee3(req, res) {
  var isuserExist, generateAndCheckReferralCode, generateRandomCode, generatedReferralCode, registerApplication;
  return regeneratorRuntime.async(function _callee3$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return regeneratorRuntime.awrap(User.find({
            phone: req.body.phone
          }));

        case 2:
          isuserExist = _context4.sent;
          console.log(req.body.phone);

          if (!(isuserExist.length < 0)) {
            _context4.next = 8;
            break;
          }

          res.send('User already exists'); //   res.send(isuserExist)

          _context4.next = 27;
          break;

        case 8:
          _context4.prev = 8;

          generateAndCheckReferralCode = function generateAndCheckReferralCode() {
            var _generatedReferralCode, existingCode;

            return regeneratorRuntime.async(function generateAndCheckReferralCode$(_context3) {
              while (1) {
                switch (_context3.prev = _context3.next) {
                  case 0:
                    if (!true) {
                      _context3.next = 9;
                      break;
                    }

                    _generatedReferralCode = generateRandomCode();
                    _context3.next = 4;
                    return regeneratorRuntime.awrap(User.findOne({
                      referralCode: _generatedReferralCode
                    }));

                  case 4:
                    existingCode = _context3.sent;

                    if (existingCode) {
                      _context3.next = 7;
                      break;
                    }

                    return _context3.abrupt("return", _generatedReferralCode);

                  case 7:
                    _context3.next = 0;
                    break;

                  case 9:
                  case "end":
                    return _context3.stop();
                }
              }
            });
          };

          generateRandomCode = function generateRandomCode() {
            var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
            var codeLength = 12;
            var referralCode = '';

            for (var i = 0; i < codeLength; i++) {
              var randomIndex = Math.floor(Math.random() * characters.length);
              referralCode += characters.charAt(randomIndex);
            }

            return referralCode;
          };

          _context4.next = 13;
          return regeneratorRuntime.awrap(generateAndCheckReferralCode());

        case 13:
          generatedReferralCode = _context4.sent;
          registerApplication = new User({
            referredBy: req.body.referredBy,
            name: req.body.name,
            phone: req.body.phone,
            email: req.body.email,
            password: req.body.password,
            position: req.body.position,
            referralCode: generatedReferralCode
          });
          _context4.next = 17;
          return regeneratorRuntime.awrap(registerApplication.save());

        case 17:
          req.session.userId = registerApplication._id;
          req.session.isAuthenticated = true;
          res.redirect('/user');
          addRefData(req.body);
          _context4.next = 27;
          break;

        case 23:
          _context4.prev = 23;
          _context4.t0 = _context4["catch"](8);
          console.error(_context4.t0);
          res.status(500).send('Internal Server Error');

        case 27:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[8, 23]]);
}); // Login Endpoint

app.post('/login', function _callee4(req, res) {
  var user;
  return regeneratorRuntime.async(function _callee4$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          _context5.next = 3;
          return regeneratorRuntime.awrap(User.findOne({
            phone: req.body.phone
          }));

        case 3:
          user = _context5.sent;

          if (user) {
            if (req.body.password === user.password) {
              req.session.userId = user._id;
              req.session.isAuthenticated = true;
              res.redirect('/user');
            } else {
              res.send('<script>alert("Wrong Password"); window.location.href = "/";</script>');
            }
          } else {
            res.send('<script>alert("User does not exist"); window.location.href = "/";</script>');
          }

          _context5.next = 11;
          break;

        case 7:
          _context5.prev = 7;
          _context5.t0 = _context5["catch"](0);
          console.error(_context5.t0);
          res.status(500).send('Internal Server Error');

        case 11:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[0, 7]]);
}); //function to update referral data when user register
// async function addRefData(userData, level=1){
//     if(userData.referredBy!=="" && level<=5){
//         // while(level<=5){
//             let refByUserdata= await User.findOne({referralCode:userData.referredBy});
//             addRefD={
//                id:userData._id, 
//                date:userData.registrationDate,
//                name:userData.name,
//                email:userData.email,
//                position:userData.position,
//                level:level
//             }
//             refByUserdata.referrals.push(addRefD)
//             refByUserdata.save()
//             level++;
//             addRefData(refByUserdata);
//         // }
//     }
// }

function addRefData(userData) {
  var level,
      refByUserdata,
      addRefD,
      _args6 = arguments;
  return regeneratorRuntime.async(function addRefData$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          level = _args6.length > 1 && _args6[1] !== undefined ? _args6[1] : 1;

          if (!(userData.referredBy !== "" && level <= 5)) {
            _context6.next = 20;
            break;
          }

          _context6.prev = 2;
          _context6.next = 5;
          return regeneratorRuntime.awrap(User.findOne({
            referralCode: userData.referredBy
          }));

        case 5:
          refByUserdata = _context6.sent;

          if (!refByUserdata) {
            _context6.next = 14;
            break;
          }

          addRefD = {
            id: userData._id,
            date: userData.registrationDate,
            name: userData.name,
            email: userData.email,
            position: userData.position,
            level: level
          };
          refByUserdata.referrals.push(addRefD);
          _context6.next = 11;
          return regeneratorRuntime.awrap(refByUserdata.save());

        case 11:
          return _context6.abrupt("return", addRefData(refByUserdata, level + 1));

        case 14:
          console.error("Referred user not found");

        case 15:
          _context6.next = 20;
          break;

        case 17:
          _context6.prev = 17;
          _context6.t0 = _context6["catch"](2);
          console.error("Error updating referral data:", _context6.t0);

        case 20:
        case "end":
          return _context6.stop();
      }
    }
  }, null, null, [[2, 17]]);
} // Withdrawal Request Endpoint


app.post('/withdrawlsReq', isAuthenticated, function _callee5(req, res) {
  var userId, user, reqData;
  return regeneratorRuntime.async(function _callee5$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          userId = req.session.userId;
          _context7.prev = 1;
          _context7.next = 4;
          return regeneratorRuntime.awrap(User.findById(userId));

        case 4:
          user = _context7.sent;

          if (!user) {
            _context7.next = 14;
            break;
          }

          reqData = req.body;
          user.withdrawls.push(reqData);
          console.log(user.withdrawls);
          _context7.next = 11;
          return regeneratorRuntime.awrap(user.save());

        case 11:
          res.send('<script>alert("Withdrawal request submitted successfully"); window.location.href = "/";</script>');
          _context7.next = 15;
          break;

        case 14:
          res.status(404).send('<script>alert("User not found"); window.location.href = "/";</script>');

        case 15:
          _context7.next = 21;
          break;

        case 17:
          _context7.prev = 17;
          _context7.t0 = _context7["catch"](1);
          console.error(_context7.t0, req.body);
          res.status(500).send('<script>alert("Something went wrong. Please try again."); window.location.href = "/";</script>');

        case 21:
        case "end":
          return _context7.stop();
      }
    }
  }, null, null, [[1, 17]]);
}); // Get Withdrawal Data Endpoint

app.get('/withdrawls', isAuthenticated, function _callee6(req, res) {
  var userId, dataToSend;
  return regeneratorRuntime.async(function _callee6$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          userId = req.session.userId;
          _context8.prev = 1;
          _context8.next = 4;
          return regeneratorRuntime.awrap(User.findById(userId));

        case 4:
          dataToSend = _context8.sent;
          res.json(dataToSend.withdrawls);
          _context8.next = 12;
          break;

        case 8:
          _context8.prev = 8;
          _context8.t0 = _context8["catch"](1);
          console.error(_context8.t0);
          res.status(500).json({
            error: 'Internal Server Error'
          });

        case 12:
        case "end":
          return _context8.stop();
      }
    }
  }, null, null, [[1, 8]]);
}); // Profile Update Endpoint

app.post('/updateProfile', isAuthenticated, function _callee7(req, res) {
  var userId, updatedProfile, user;
  return regeneratorRuntime.async(function _callee7$(_context9) {
    while (1) {
      switch (_context9.prev = _context9.next) {
        case 0:
          userId = req.session.userId;
          updatedProfile = req.body; // Assuming the request body contains the updated profile data

          _context9.prev = 2;
          _context9.next = 5;
          return regeneratorRuntime.awrap(User.findByIdAndUpdate(userId, updatedProfile, {
            "new": true
          }));

        case 5:
          user = _context9.sent;

          if (user) {
            _context9.next = 8;
            break;
          }

          return _context9.abrupt("return", res.status(404).json({
            error: 'User not found'
          }));

        case 8:
          // user.save()
          console.log('done', user, updatedProfile);
          res.json({
            message: 'Profile updated successfully',
            user: user
          });
          _context9.next = 16;
          break;

        case 12:
          _context9.prev = 12;
          _context9.t0 = _context9["catch"](2);
          console.error(_context9.t0);
          res.status(500).json({
            error: 'Internal Server Error'
          });

        case 16:
        case "end":
          return _context9.stop();
      }
    }
  }, null, null, [[2, 12]]);
}); // Password Update Endpoint

app.post('/updatePassword', isAuthenticated, function _callee8(req, res) {
  var userId, _req$body, oldPassword, newPassword, user;

  return regeneratorRuntime.async(function _callee8$(_context10) {
    while (1) {
      switch (_context10.prev = _context10.next) {
        case 0:
          userId = req.session.userId;
          _req$body = req.body, oldPassword = _req$body.oldPassword, newPassword = _req$body.newPassword;
          _context10.prev = 2;
          _context10.next = 5;
          return regeneratorRuntime.awrap(User.findById(userId));

        case 5:
          user = _context10.sent;

          if (user) {
            _context10.next = 8;
            break;
          }

          return _context10.abrupt("return", res.status(404).json({
            error: 'User not found'
          }));

        case 8:
          if (!(user.password !== oldPassword)) {
            _context10.next = 10;
            break;
          }

          return _context10.abrupt("return", res.status(401).json({
            error: 'Incorrect old password'
          }));

        case 10:
          // Update the password
          user.password = newPassword;
          _context10.next = 13;
          return regeneratorRuntime.awrap(user.save());

        case 13:
          res.json({
            message: 'Password updated successfully'
          });
          _context10.next = 20;
          break;

        case 16:
          _context10.prev = 16;
          _context10.t0 = _context10["catch"](2);
          console.error(_context10.t0);
          res.status(500).json({
            error: 'Internal Server Error'
          });

        case 20:
        case "end":
          return _context10.stop();
      }
    }
  }, null, null, [[2, 16]]);
}); //Set password

app.post('/setPassword', isAuthenticated, function _callee9(req, res) {
  var userId, user;
  return regeneratorRuntime.async(function _callee9$(_context11) {
    while (1) {
      switch (_context11.prev = _context11.next) {
        case 0:
          userId = req.session.userId;
          _context11.prev = 1;
          _context11.next = 4;
          return regeneratorRuntime.awrap(User.findById(userId));

        case 4:
          user = _context11.sent;

          if (!user) {
            res.json("user doesn't exist");
          }

          user.password = req.body.password;
          _context11.next = 9;
          return regeneratorRuntime.awrap(user.save());

        case 9:
          res.redirect('/user');
          _context11.next = 15;
          break;

        case 12:
          _context11.prev = 12;
          _context11.t0 = _context11["catch"](1);
          res.send("<script>alert('Something went wrong please try again');window.location.href='/';</script>");

        case 15:
        case "end":
          return _context11.stop();
      }
    }
  }, null, null, [[1, 12]]);
}); //Buy copuns

app.post('/buyCopun', isAuthenticated, function _callee10(req, res) {
  var userId, user, userrefBy;
  return regeneratorRuntime.async(function _callee10$(_context12) {
    while (1) {
      switch (_context12.prev = _context12.next) {
        case 0:
          userId = req.session.userId;
          _context12.prev = 1;
          _context12.next = 4;
          return regeneratorRuntime.awrap(User.findById(userId));

        case 4:
          user = _context12.sent;

          if (!user) {
            res.json("user doesn't exist");
          }

          console.log(req.body);
          user.coupons.push(req.body.copunPrice);
          console.log(user);
          _context12.next = 11;
          return regeneratorRuntime.awrap(user.save());

        case 11:
          res.redirect('/user');
          _context12.next = 14;
          return regeneratorRuntime.awrap(User.updateMany({
            'referrals': {
              $elemMatch: {
                'id': userId
              }
            }
          }, {
            $set: {
              'referrals.$.coupons': req.body.copunPrice
            }
          }));

        case 14:
          userrefBy = _context12.sent;
          userrefBy.save();
          _context12.next = 21;
          break;

        case 18:
          _context12.prev = 18;
          _context12.t0 = _context12["catch"](1);
          res.send("<script>alert('Something went wrong please try again');window.location.href='/user';</script>");

        case 21:
        case "end":
          return _context12.stop();
      }
    }
  }, null, null, [[1, 18]]);
});

function updateTotalIncome(userId) {
  var user, totalIncome;
  return regeneratorRuntime.async(function updateTotalIncome$(_context13) {
    while (1) {
      switch (_context13.prev = _context13.next) {
        case 0:
          _context13.prev = 0;
          _context13.next = 3;
          return regeneratorRuntime.awrap(User.findById(userId));

        case 3:
          user = _context13.sent;
          totalIncome = 0;

          if (user.referrals) {
            user.referrals.forEach(function (users) {
              if (users.level == 1) {
                totalIncome = totalIncome + users.coupons.reduce(function (accumulator, currentValue) {
                  return accumulator + currentValue;
                }, 0) * 10 / 100 || 0;
              } else if (users.level == 2) {
                totalIncome = totalIncome + users.coupons.reduce(function (accumulator, currentValue) {
                  return accumulator + currentValue;
                }, 0) * 5 / 100 || 0;
              } else if (users.level == 3) {
                totalIncome = totalIncome + users.coupons.reduce(function (accumulator, currentValue) {
                  return accumulator + currentValue;
                }, 0) * 3 / 100 || 0;
              } else if (users.level == 4) {
                totalIncome = totalIncome + users.coupons.reduce(function (accumulator, currentValue) {
                  return accumulator + currentValue;
                }, 0) * 2 / 100 || 0;
              } else if (users.level == 5) {
                totalIncome = totalIncome + users.coupons.reduce(function (accumulator, currentValue) {
                  return accumulator + currentValue;
                }, 0) * 1 / 100 || 0;
              }
            });
          }

          return _context13.abrupt("return", totalIncome);

        case 9:
          _context13.prev = 9;
          _context13.t0 = _context13["catch"](0);
          console.error(_context13.t0);
          throw _context13.t0;

        case 13:
        case "end":
          return _context13.stop();
      }
    }
  }, null, null, [[0, 9]]);
}

app.listen(port, function () {
  console.log("The application started successfully on port ".concat(port));
});