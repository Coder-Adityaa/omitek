"use strict";

var sections = document.querySelectorAll('.secShow');
var willAct = document.querySelectorAll('.willAct');
sections.forEach(function (i) {
  i.style.display = 'none';
});
sections[0].style.display = 'block';

function showSection(e) {
  sections.forEach(function (i) {
    i.style.display = 'none';
  });
  sections[e].style.display = 'block';
  willAct.forEach(function (i) {
    i.classList.remove('active');
  });
  willAct[e].classList.add('active');
}

document.addEventListener('DOMContentLoaded', function _callee() {
  var response, data;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(fetch('/updatePage'));

        case 3:
          response = _context.sent;

          if (response.ok) {
            _context.next = 6;
            break;
          }

          throw new Error('Failed to fetch data');

        case 6:
          _context.next = 8;
          return regeneratorRuntime.awrap(response.json());

        case 8:
          data = _context.sent;
          // Update user information on the dashboard and profile
          updateUserInfo(data.name, data.phone, data.email, data.referralCode, data.registrationDate, data.position, data.address, data.country, data.state, data.userInfo, data.earning, data.balance); // Create withdrawal cards

          console.log('hey');
          data.withdrawls.forEach(function (withdrawData) {
            createCard(withdrawData.date, withdrawData.amount, withdrawData.status);
          }); // Create referral cards

          createRefcards(data.referrals);
          console.log(data.coupons);
          createCopuns(data.coupons);
          console.log(data.coupons);
          _context.next = 21;
          break;

        case 18:
          _context.prev = 18;
          _context.t0 = _context["catch"](0);
          console.error('Error:', _context.t0);

        case 21:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 18]]);
});
var isUpdatingPass = false;

function saveChanges() {
  if (isUpdatingPass) {
    updatePassword();
  } else {
    updateProfile();
  }
}

document.getElementById('forupdProfile').addEventListener('click', function () {
  isUpdatingPass = false;
});
document.getElementById('forupdPass').addEventListener('click', function () {
  isUpdatingPass = true;
}); // Function to update user information on the dashboard and profile

function updateUserInfo(name, dphone, demail, refcode, date, leg, adrs, cntry, ste, msg, earning, walletAmount) {
  var position = document.getElementById('position');
  var actregisteredDate = document.getElementById('actregisteredDate');
  var dashboardName = document.getElementById('dashboardName');
  var referralCode = document.getElementById('mypeppyrefurlid');
  var referralUrl = document.getElementById('myrefurlid');
  var firstName = document.getElementById('firstname');
  var lastName = document.getElementById('lastname');
  var email = document.getElementById('email');
  var phone = document.getElementById('phone');
  var address = document.getElementById('address');
  var country = document.getElementById('country');
  var state = document.getElementById('state');
  var userInfo = document.getElementById('mbr_intro');
  document.getElementById('dashboardEarn').firstChild.textContent = '₹' + earning;
  document.getElementById('dashboardWallet').innerHTML = '₹' + walletAmount; // Update variables for the dashboard

  position.textContent = leg;
  actregisteredDate.textContent = date;
  dashboardName.textContent = name;
  referralCode.value = refcode;
  referralUrl.value = 'https://xyz'; // Update variables for the profile

  firstName.value = name.split(' ')[0];
  lastName.value = name.split(' ').slice(1).join(' ');
  email.value = demail;
  phone.value = dphone;
  address.value = adrs;
  country.value = cntry;
  state.value = ste;
  userInfo.value = msg;
} // Function to send withdrawal request


function sendWithdrawalReq(event) {
  event.preventDefault();
  var upiId = document.getElementById('upiId');
  var withdrawAmount = document.getElementById('txamount'); // Sending withdrawal request

  var withdrawalReqdata = {
    upi: upiId.value,
    amount: withdrawAmount.value
  };
  fetch('/withdrawlsReq', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(withdrawalReqdata)
  }).then(function (response) {
    return response.json();
  }).then(function (data) {
    return alert('Request Sent Successfully');
  })["catch"](function (error) {
    return alert('Something went wrong');
  });
} // Function to create a card for withdrawals


function createCard(date, amount, status) {
  var cardContainer = document.getElementById('withdrawlcardContainer');
  var cardDiv = document.createElement('div');
  cardDiv.classList.add('col-12', 'col-md-4', 'col-lg-4');
  var pricingDiv = document.createElement('div');
  pricingDiv.classList.add('pricing');
  var titleDiv = document.createElement('div');
  titleDiv.classList.add('pricing-title', 'bg-light');
  titleDiv.textContent = date;
  var paddingDiv = document.createElement('div');
  paddingDiv.classList.add('pricing-padding');
  var iconSpan = document.createElement('span');
  iconSpan.classList.add('pricing-price');
  iconSpan.dataset.toggle = 'tooltip';
  iconSpan.title = 'manualpayname';
  iconSpan.dataset.originalTitle = 'manualpayname';
  iconSpan.innerHTML = '<i class="fa fa-handshake fa-fw"></i>';
  var amountDiv = document.createElement('div');
  amountDiv.classList.add('pricing-price');
  var amountHeading = document.createElement('h4');
  amountHeading.textContent = '₹' + amount + 'INR';
  amountDiv.appendChild(amountHeading);
  var statusBadge = document.createElement('span');
  statusBadge.classList.add('badge', 'badge-secondary');
  statusBadge.textContent = status; // Append elements to build the card

  paddingDiv.appendChild(iconSpan);
  paddingDiv.appendChild(amountDiv);
  paddingDiv.appendChild(statusBadge);
  pricingDiv.appendChild(titleDiv);
  pricingDiv.appendChild(paddingDiv);
  cardDiv.appendChild(pricingDiv);
  cardContainer.appendChild(cardDiv);
} // Function to create referral cards


function createRefcards(data) {
  var appendRefdata = document.querySelector('#appendrefdata');
  data.forEach(function (eachData, index) {
    console.log(eachData); // Create a table row element

    var tableRow = document.createElement('tr'); // Add data to the table row

    var tableData1 = document.createElement('th');
    tableData1.scope = 'row';
    tableData1.textContent = index + 1;
    tableRow.appendChild(tableData1);
    var tableData2 = document.createElement('td');
    tableData2.setAttribute('data-toggle', 'tooltip');
    tableData2.title = eachData.date;
    tableData2.setAttribute('nowrap', '');
    tableData2.textContent = eachData.date;
    tableRow.appendChild(tableData2);
    var tableData3 = document.createElement('td');
    tableData3.setAttribute('data-toggle', 'tooltip');
    tableData3.title = eachData.name;
    tableData3.textContent = eachData.name;
    tableRow.appendChild(tableData3);
    var tableData4 = document.createElement('td');
    tableData4.setAttribute('data-toggle', 'tooltip');
    tableData4.title = eachData.email;
    tableData4.textContent = eachData.email;
    tableRow.appendChild(tableData4);
    var tableData5 = document.createElement('td');
    tableData5.setAttribute('align', 'center');
    tableData5.setAttribute('nowrap', '');
    var avatarFigure = document.createElement('figure');
    avatarFigure.className = 'avatar mr-2 avatar-sm';
    var avatarImg = document.createElement('img');
    avatarImg.src = '/images/referrallogo.jpg';
    avatarImg.alt = '...';
    avatarFigure.appendChild(avatarImg);
    var avatarIcon = document.createElement('i');
    avatarIcon.className = 'fa fa-id-badge text-success avatar-icon';
    avatarIcon.setAttribute('data-toggle', 'tooltip');
    avatarIcon.title = 'Account - Active';
    avatarFigure.appendChild(avatarIcon);
    tableData5.appendChild(avatarFigure);
    var badgeSpan = document.createElement('span');
    badgeSpan.className = 'badge badge-success';
    badgeSpan.setAttribute('data-toggle', 'tooltip');
    badgeSpan.title = 'Regular - Active';
    var badgeIcon = document.createElement('i');
    badgeIcon.className = 'fa fa-fw fa-check';
    badgeSpan.appendChild(badgeIcon);
    tableData5.appendChild(badgeSpan);
    tableRow.appendChild(tableData5);
    var tableData6 = document.createElement('td');
    tableData6.setAttribute('align', 'center');
    tableData6.setAttribute('nowrap', '');
    tableData6.textContent = eachData.position;
    tableRow.appendChild(tableData6); // Append the table row to the body

    appendRefdata.appendChild(tableRow);
  });
}

function updateProfile() {
  console.log('hi');
  var firstName = document.getElementById('firstname');
  var lastName = document.getElementById('lastname');
  var email = document.getElementById('email');
  var userInfo = document.getElementById('mbr_intro');
  var address = document.getElementById('address');
  var state = document.getElementById('state');
  var country = document.getElementById('country');
  var phone = document.getElementById('phone');
  var updateProfiledata = {
    name: firstName.value + ' ' + lastName.value,
    phone: phone.value,
    email: email.value,
    address: address.value,
    userInfo: userInfo.value,
    state: state.value,
    country: country.value
  };
  fetch('/updateProfile', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(updateProfiledata)
  }).then(function (response) {
    return response.json();
  }).then(function (data) {
    // Handle the response as needed
    console.log(data);
  })["catch"](function (error) {
    // Handle errors
    console.error('Error:', error);
  });
  console.log('heyy');
}

function updatePassword() {
  var oldPassword = document.getElementById('password21').value;
  var newPassword = document.getElementById('password12').value;
  fetch('/updatePassword', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      oldPassword: oldPassword,
      newPassword: newPassword
    })
  }).then(function (response) {
    return response.json();
  }).then(function (data) {
    // Handle the response as needed
    console.log(data);
  })["catch"](function (error) {
    // Handle errors
    console.error('Error:', error);
  });
  console.log('hey');
} // function buyCopun(price){
//     const paymentWindow = window.open('/payment', '_blank');
//     paymentWindow.onload = function () {
//         paymentWindow.document.getElementById('payableAmount').textContent = '₹' + price;
//     };
//     fetch('/buyCopun', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({copunPrice:price})
//     })
//     .then(response => response.json())
//     .then(data => {
//         // Handle the response as needed
//         console.log(data);
//     })
//     .catch(error => {
//         // Handle errors
//         console.error('Error:', error);
//     });
// }


function buyCopun(price) {
  var paymentWindow = window.open('/payment', '_blank'); // Wait for the paymentWindow to load

  paymentWindow.onload = function _callee2() {
    var response, data;
    return regeneratorRuntime.async(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            paymentWindow.document.getElementById('payableAmount').textContent = '₹' + price;
            _context2.prev = 1;
            _context2.next = 4;
            return regeneratorRuntime.awrap(fetch('/buyCopun', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                copunPrice: price
              })
            }));

          case 4:
            response = _context2.sent;
            _context2.next = 7;
            return regeneratorRuntime.awrap(response.json());

          case 7:
            data = _context2.sent;
            // Handle the response as needed
            console.log(data); // You can also close the payment window if needed
            // paymentWindow.close();

            _context2.next = 14;
            break;

          case 11:
            _context2.prev = 11;
            _context2.t0 = _context2["catch"](1);
            // Handle errors
            console.error('Error:', _context2.t0);

          case 14:
          case "end":
            return _context2.stop();
        }
      }
    }, null, null, [[1, 11]]);
  };
} // create copuns


function createCopuns(data) {
  data.forEach(function (copunWorth) {
    if (copunWorth.status == 'approved') {
      // Create a new div element
      var outerDiv = document.createElement('div');
      outerDiv.className = 'col-sm-12 col-md-6 p-4'; // Create the card div

      var cardDiv = document.createElement('div');
      cardDiv.className = 'card'; // Create the card body div

      var cardBodyDiv = document.createElement('div');
      cardBodyDiv.className = 'card-body'; // Create the first flex container

      var flexContainer1 = document.createElement('div');
      flexContainer1.className = 'd-flex justify-content-between'; // Create the card title element

      var cardTitle = document.createElement('h1');
      cardTitle.className = 'card-title';
      cardTitle.textContent = 'Redeem Coupon'; // Create the image element

      var imgElement = document.createElement('img');
      imgElement.src = '/images/omilogo.png';
      imgElement.className = 'img-fluid w-25';
      imgElement.alt = ''; // Append card title and image to the first flex container

      flexContainer1.appendChild(cardTitle);
      flexContainer1.appendChild(imgElement); // Create the second flex container

      var flexContainer2 = document.createElement('div');
      flexContainer2.className = 'd-flex justify-content-between mt-4'; // Create the price and discounted price elements

      var priceElement = document.createElement('p');
      priceElement.className = 'card-text';
      priceElement.innerHTML = '₹' + copunWorth; // Append price and order button to the second flex container

      flexContainer2.appendChild(priceElement); // flexContainer2.appendChild(orderButton);
      // Append the two flex containers to the card body

      cardBodyDiv.appendChild(flexContainer1);
      cardBodyDiv.appendChild(flexContainer2); // Append the card body to the card

      cardDiv.appendChild(cardBodyDiv); // Append the card to the outer div

      outerDiv.appendChild(cardDiv); // Append the outer div to the body

      document.getElementById('copunCtnr').appendChild(outerDiv);
    }
  });
}