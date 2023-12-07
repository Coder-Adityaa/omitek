"use strict";

document.addEventListener('DOMContentLoaded', function _callee() {
  var response, data;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(fetch('/updAdmin'));

        case 2:
          response = _context.sent;

          if (response.ok) {
            _context.next = 5;
            break;
          }

          throw new Error('Failed to fetch data');

        case 5:
          _context.next = 7;
          return regeneratorRuntime.awrap(response.json());

        case 7:
          data = _context.sent;
          data.forEach(function (i) {
            i.coupons.forEach(function (ic) {
              if (ic.status == 'pending') {
                createCards(i, ic, 1);
              }
            });
            i.withdrawls.forEach(function (iw) {
              if (iw.status == 'processing') {
                createCards(i, iw, 0);
              }
            });
          });

        case 9:
        case "end":
          return _context.stop();
      }
    }
  });
});

function createCards(data, payment, i) {
  // Create a new table row element
  var tableRow = document.createElement('tr'); // Create a table header cell with scope "row"

  var th = document.createElement('th');
  th.setAttribute('scope', 'row');
  th.textContent = payment._id;
  tableRow.appendChild(th); // Create table data cells with the specified data

  var td1 = document.createElement('td');
  td1.textContent = payment.date;
  td1.setAttribute('data-toggle', 'tooltip');
  td1.setAttribute('title', payment.date);
  td1.setAttribute('data-original-title', payment.date);
  tableRow.appendChild(td1);
  var td2 = document.createElement('td');
  td2.textContent = data.name;
  td2.setAttribute('data-toggle', 'tooltip');
  td2.setAttribute('title', 'rr rr');
  td2.setAttribute('data-original-title', 'rr rr');
  tableRow.appendChild(td2);
  var td3 = document.createElement('td');
  td3.textContent = data.phone;
  td3.setAttribute('data-toggle', 'tooltip');
  td3.setAttribute('title', data.email);
  td3.setAttribute('data-original-title', data.email);
  tableRow.appendChild(td3); // data.coupons.forEach((i)=>{
  //     if(i.status=='pending'){
  //         amount=i.amount
  //     }
  // })

  var upitd = document.createElement('td');
  td3.textContent = payment.upi;
  td3.setAttribute('data-toggle', 'tooltip');
  td3.setAttribute('title', payment.upi);
  td3.setAttribute('data-original-title', payment.upi);
  tableRow.appendChild(upitd);
  var td4 = document.createElement('td');
  td4.textContent = payment.amount;
  tableRow.appendChild(td4);
  var td5 = document.createElement('td');
  td5.setAttribute('align', 'center');
  td5.setAttribute('nowrap', '');
  var divProcessing = document.createElement('div');
  divProcessing.className = 'paymentStat';
  divProcessing.textContent = 'Processing';
  td5.appendChild(divProcessing);
  var divDone = document.createElement('div');
  divDone.className = 'paymentStat';
  divDone.textContent = 'Approve';

  if (i == 0) {
    divDone.onclick = function () {
      changeStat('withdrawls', this);
    };
  } else if (i == 1) {
    divDone.onclick = function () {
      changeStat('coupons', this);
    };
  }

  td5.appendChild(divDone);
  tableRow.appendChild(td5); // Append the table row to the table (replace 'tableId' with the ID of your table)

  document.querySelectorAll('.Paymentdata')[i].appendChild(tableRow);
}

function changeStat(findIn, element) {
  var transitionIdctnr, data;
  return regeneratorRuntime.async(function changeStat$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          transitionIdctnr = element.parentNode;
          data = {
            findIn: findIn,
            Id: transitionIdctnr.firstChild.textContent,
            stat: 'approved'
          };
          fetch('/updStat', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
          });
          transitionIdctnr.querySelector('.paymentStat').style.display = 'none';

        case 4:
        case "end":
          return _context2.stop();
      }
    }
  });
}