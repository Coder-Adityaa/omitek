"use strict";

var express = require("express");

var path = require('path');

var mongoose = require('mongoose');

var bodyParser = require('body-parser');

var session = require('express-session'); // const multer = require('multer');


var dburl = 'mongodb://localhost:27017/omitrek';
var app = express();
var port = 80;
app.use(session({
  secret: 'pppck',
  resave: true,
  saveUninitialized: true
})); // Middleware to check if the User is authenticated

var isAuthenticated = function isAuthenticated(req, res, next) {
  if (req.session && req.session.isAuthenticated) {
    return next();
  } else {
    res.redirect('/');
  }
}; // ============================setting paths and view engine============================


app.use(bodyParser.urlencoded({
  extended: true
})); // for getting form data
// -----------------end points----------------------
//data

main();

function main() {
  var db, withdrawlSchema, registerSchema, User, getRefData, formattedDateTime;
  return regeneratorRuntime.async(function main$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          formattedDateTime = function _ref2(currentDateTime) {
            // Get day, month, and year
            var day = currentDateTime.getDate();
            var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
            var monthIndex = currentDateTime.getMonth();
            var year = currentDateTime.getFullYear(); // Get hours and minutes

            var hours = currentDateTime.getHours();
            var minutes = currentDateTime.getMinutes(); // Format the date and time

            var formattedDateTime = "".concat(day, " ").concat(monthNames[monthIndex], " ").concat(year, ", ").concat(hours, ":").concat(minutes);
            return formattedDateTime;
          };

          getRefData = function _ref(referralCode) {
            var level,
                referralData,
                _args4 = arguments;
            return regeneratorRuntime.async(function getRefData$(_context4) {
              while (1) {
                switch (_context4.prev = _context4.next) {
                  case 0:
                    level = _args4.length > 1 && _args4[1] !== undefined ? _args4[1] : 1;
                    _context4.prev = 1;
                    _context4.next = 4;
                    return regeneratorRuntime.awrap(User.find({
                      referredBy: referralCode
                    }));

                  case 4:
                    referralData = _context4.sent;
                    referralData.forEach(function _callee2(element) {
                      return regeneratorRuntime.async(function _callee2$(_context3) {
                        while (1) {
                          switch (_context3.prev = _context3.next) {
                            case 0:
                              if (!(level <= 5)) {
                                _context3.next = 3;
                                break;
                              }

                              _context3.next = 3;
                              return regeneratorRuntime.awrap(getRefData(element.referralCode, level + 1));

                            case 3:
                            case "end":
                              return _context3.stop();
                          }
                        }
                      });
                    });
                    return _context4.abrupt("return", referralData);

                  case 9:
                    _context4.prev = 9;
                    _context4.t0 = _context4["catch"](1);
                    console.error(_context4.t0);
                    throw _context4.t0;

                  case 13:
                  case "end":
                    return _context4.stop();
                }
              }
            }, null, null, [[1, 9]]);
          };

          _context7.next = 4;
          return regeneratorRuntime.awrap(mongoose.connect(dburl, {
            useNewUrlParser: true,
            useUnifiedTopology: true
          }));

        case 4:
          db = _context7.sent;
          db.once; // ================================= register Work Here =============================

          withdrawlSchema = new mongoose.Schema({
            // _id:{
            //     type:id,
            //     require:true,
            // },
            // name:{
            //     type:String,
            // },
            // phone:{
            //     type:Number,
            //     require:true,
            // },
            upi: {
              type: String,
              require: true
            },
            amount: {
              type: Number,
              require: true
            },
            status: {
              type: String,
              "default": 'Processing'
            },
            date: {
              type: date,
              "default": formattedDateTime(Date.now)
            }
          });
          registerSchema = new mongoose.Schema({
            name: {
              type: String,
              require: true
            },
            phone: {
              type: Number,
              require: true
            },
            email: {
              type: String,
              require: true
            },
            password: {
              type: String,
              require: true
            },
            referredBy: {
              type: String
            },
            referralCode: {
              type: String,
              require: true
            },
            position: {
              type: String
            },
            copuns: {
              type: String
            },
            rigistrationDate: {
              type: Date,
              "default": formattedDateTime(Date.now)
            },
            withdrawls: [withdrawlSchema]
          });
          User = mongoose.model('User', registerSchema); // const storage = multer.diskStorage({
          //     destination: function (req, file, cb) {
          //       cb(null, path.join(__dirname,'uploads'))
          //     },
          //     filename: function (req, file, cb) {
          //     //   const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
          //       cb(null, `${Date.now()}-${file.originalname}`)
          //     }
          // })  
          // const upload = multer({ storage: storage })             further is below code --  upload.single('resume'),

          app.post('/register', function _callee(req, res) {
            var generateAndCheckReferralCode, generateRandomCode, generatedReferralCode, registerApplication, alertScript;
            return regeneratorRuntime.async(function _callee$(_context2) {
              while (1) {
                switch (_context2.prev = _context2.next) {
                  case 0:
                    _context2.prev = 0;

                    generateAndCheckReferralCode = function generateAndCheckReferralCode() {
                      var _generatedReferralCode, existingCode;

                      return regeneratorRuntime.async(function generateAndCheckReferralCode$(_context) {
                        while (1) {
                          switch (_context.prev = _context.next) {
                            case 0:
                              if (!true) {
                                _context.next = 9;
                                break;
                              }

                              _generatedReferralCode = generateRandomCode();
                              _context.next = 4;
                              return regeneratorRuntime.awrap(User.findOne({
                                referralCode: _generatedReferralCode
                              }));

                            case 4:
                              existingCode = _context.sent;

                              if (existingCode) {
                                _context.next = 7;
                                break;
                              }

                              return _context.abrupt("return", _generatedReferralCode);

                            case 7:
                              _context.next = 0;
                              break;

                            case 9:
                            case "end":
                              return _context.stop();
                          }
                        }
                      });
                    }; // Function to generate a random code (for demonstration purposes)


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

                    _context2.next = 5;
                    return regeneratorRuntime.awrap(generateAndCheckReferralCode());

                  case 5:
                    generatedReferralCode = _context2.sent;
                    registerApplication = new User({
                      name: req.body.name,
                      phone: req.body.phone,
                      email: req.body.email,
                      password: req.body.password,
                      position: req.body.position,
                      referralCode: generatedReferralCode
                    });
                    _context2.next = 9;
                    return regeneratorRuntime.awrap(registerApplication.save());

                  case 9:
                    alertScript = "\n                <script>\n                    alert('Registered Successfully');\n        //          window.location.href = '/'; // Redirect to the home page\n                </script>\n            ";
                    res.send(alertScript);
                    _context2.next = 17;
                    break;

                  case 13:
                    _context2.prev = 13;
                    _context2.t0 = _context2["catch"](0);
                    console.error(_context2.t0);
                    res.status(404).send("<script>\n                alert('Something went wrong. Please try again.');\n                // window.location.href = '/register'; // Redirect to the home page\n            </script>");

                  case 17:
                  case "end":
                    return _context2.stop();
                }
              }
            }, null, null, [[0, 13]]);
          }); // ====================================login works here=====================================

          app.post('/login', function (req, res) {
            var loginData = User.findOne({
              phone: req.body.phone
            });

            if (loginData) {
              if (req.body.password == User.password) {
                req.session.isAuthenticated = true; // loginwork here
              } else {
                res.send("\n                <script>\n                   alert('Wrong Password');\n                   window.location.href = '/'; // Redirect to the home page\n                </script>\n             ");
              }
            } else {
              res.send("\n          <script>\n             alert('User doesn't exists');\n             window.location.href = '/'; // Redirect to the home page\n          </script>\n          ");
            }
          }); // =============================Get referrals data====================

          app.get('/referralData/:referralCode', function _callee3(req, res) {
            var referralCode, finalRefData;
            return regeneratorRuntime.async(function _callee3$(_context5) {
              while (1) {
                switch (_context5.prev = _context5.next) {
                  case 0:
                    referralCode = req.params.referralcode;
                    _context5.prev = 1;
                    _context5.next = 4;
                    return regeneratorRuntime.awrap(getRefData(referralCode));

                  case 4:
                    finalRefData = _context5.sent;
                    res.json(finalRefData);
                    _context5.next = 12;
                    break;

                  case 8:
                    _context5.prev = 8;
                    _context5.t0 = _context5["catch"](1);
                    console.log(_context5.t0);
                    res.status(500).json({
                      error: 'Internal Server Error'
                    });

                  case 12:
                  case "end":
                    return _context5.stop();
                }
              }
            }, null, null, [[1, 8]]);
          }); // ===============================getting withdrawl details========================
          // Create a new Date object for the current date and time

          // const withdrawls=mongoose.model('widthdraw',withdrawlSchema);
          // -------endpoint for withdrawlrequest-----
          app.post('/withdrawlsReq/:phone', function (req, res) {
            var phone = req.params.phone;
            var UserWhoreq = User.findOne(User.phone == phone);

            if (UserWhoreq) {
              try {
                var reqData = req.body;
                UserWhoreq.withdrawls.push(reqData);
                UserWhoreq.save();
              } catch (err) {
                res.send(" <script>\n                alert('Something went wrong please try again');\n                window.location.href = '/'; // Redirect to the home page\n             </script>");
              }
            }
          }); // ----------get withdrawl data----------

          app.get('/withdrawls/:phone', function _callee4(req, res) {
            var phone, detatosend;
            return regeneratorRuntime.async(function _callee4$(_context6) {
              while (1) {
                switch (_context6.prev = _context6.next) {
                  case 0:
                    phone = req.params.phone;
                    _context6.next = 3;
                    return regeneratorRuntime.awrap(withdrawls.find({
                      phone: phone
                    }));

                  case 3:
                    detatosend = _context6.sent;
                    res.json(detatosend);

                  case 5:
                  case "end":
                    return _context6.stop();
                }
              }
            });
          });

        case 14:
        case "end":
          return _context7.stop();
      }
    }
  });
}

app.listen(port, function () {
  console.log("The application started successfully on port ".concat(port));
});