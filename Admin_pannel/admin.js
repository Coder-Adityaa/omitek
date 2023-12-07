document.addEventListener('DOMContentLoaded', async function(){
    const response = await fetch('/updAdmin');
    if (!response.ok) {
        throw new Error('Failed to fetch data');
    }
    const data = await response.json();
    data.forEach((i)=>{
        i.coupons.forEach((ic)=>{
            if(ic.status=='pending'){
                createCards(i,ic,1)
            }
        })
        i.withdrawls.forEach(iw=>{
            if(iw.status=='processing'){
                createCards(i,iw,0)
            }
        })
    })
})

function createCards(data,payment,i){
    // Create a new table row element
const tableRow = document.createElement('tr');

// Create a table header cell with scope "row"
const th = document.createElement('th');
th.setAttribute('scope', 'row');
th.textContent = payment._id;
tableRow.appendChild(th);

// Create table data cells with the specified data
const td1 = document.createElement('td');
td1.textContent = payment.date;
td1.setAttribute('data-toggle', 'tooltip');
td1.setAttribute('title', payment.date);
td1.setAttribute('data-original-title', payment.date);
tableRow.appendChild(td1);

const td2 = document.createElement('td');
td2.textContent = data.name;
td2.setAttribute('data-toggle', 'tooltip');
td2.setAttribute('title', 'rr rr');
td2.setAttribute('data-original-title', 'rr rr');
tableRow.appendChild(td2);

const td3 = document.createElement('td');
td3.textContent = data.phone;
td3.setAttribute('data-toggle', 'tooltip');
td3.setAttribute('title', data.email);
td3.setAttribute('data-original-title', data.email);
tableRow.appendChild(td3);
// data.coupons.forEach((i)=>{
//     if(i.status=='pending'){
//         amount=i.amount
//     }
// })
const upitd = document.createElement('td');
td3.textContent = payment.upi;
td3.setAttribute('data-toggle', 'tooltip');
td3.setAttribute('title', payment.upi);
td3.setAttribute('data-original-title', payment.upi);
tableRow.appendChild(upitd);

const td4 = document.createElement('td');
td4.textContent = payment.amount;
tableRow.appendChild(td4);

const td5 = document.createElement('td');
td5.setAttribute('align', 'center');
td5.setAttribute('nowrap', '');

const divProcessing = document.createElement('div');
divProcessing.className = 'paymentStat';
divProcessing.textContent = 'Processing';

td5.appendChild(divProcessing);

const divDone = document.createElement('div');
divDone.className = 'paymentStat';
divDone.textContent = 'Approve';
if(i==0){
    divDone.onclick = function () {
        changeStat('withdrawls',this);
    };
}
else if(i==1){
    divDone.onclick = function () {
        changeStat('coupons',this);
    };
}
td5.appendChild(divDone);

tableRow.appendChild(td5);

// Append the table row to the table (replace 'tableId' with the ID of your table)
document.querySelectorAll('.Paymentdata')[i].appendChild(tableRow);

}

async function changeStat(findIn,element){
    const transitionIdctnr=element.parentNode;
    const data={
        findIn:findIn,
        Id:transitionIdctnr.firstChild.textContent,
        stat:'approved'
    }
    fetch('/updStat',{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify(data)
    })
    transitionIdctnr.querySelector('.paymentStat').style.display='none'
}