let sections=document.querySelectorAll('.secShow')
let willAct=document.querySelectorAll('.willAct')
sections.forEach((i)=>{
    i.style.display='none'
})
sections[0].style.display='block';
function showSection(e){
    sections.forEach((i)=>{
        i.style.display='none';
    })
    sections[e].style.display='block';
    willAct.forEach((i)=>{
        i.classList.remove('active')
    })
    willAct[e].classList.add('active')
}

//For updating referrals list
const referralCode = document.getElementById('mypeppyrefurlid');
function createRefcards(data){
    data.forEach((eachData,index)=> {
        // Create a table row element
    const tableRow = document.createElement('tr');

    // Add data to the table row
    const tableData1 = document.createElement('th');
    tableData1.scope = 'row';
    tableData1.textContent = index+1;
    tableRow.appendChild(tableData1);

    const tableData2 = document.createElement('td');
    tableData2.setAttribute('data-toggle', 'tooltip');
    tableData2.title = eachData.date;
    tableData2.setAttribute('nowrap', '');
    tableData2.textContent = eachData.date;
    tableRow.appendChild(tableData2);

    const tableData3 = document.createElement('td');
    tableData3.setAttribute('data-toggle', 'tooltip');
    tableData3.title =eachData.name;
    tableData3.textContent = eachData.name;
    tableRow.appendChild(tableData3);

    const tableData4 = document.createElement('td');
    tableData4.setAttribute('data-toggle', 'tooltip');
    tableData4.title = eachData.email;
    tableData4.textContent = eachData.email;
    tableRow.appendChild(tableData4);

    const tableData5 = document.createElement('td');
    tableData5.setAttribute('align', 'center');
    tableData5.setAttribute('nowrap', '');

    const avatarFigure = document.createElement('figure');
    avatarFigure.className = 'avatar mr-2 avatar-sm';

    const avatarImg = document.createElement('img');
    avatarImg.src = '../images/referrallogo.jpg';
    avatarImg.alt = '...';
    avatarFigure.appendChild(avatarImg);

    const avatarIcon = document.createElement('i');
    avatarIcon.className = 'fa fa-id-badge text-success avatar-icon';
    avatarIcon.setAttribute('data-toggle', 'tooltip');
    avatarIcon.title = 'Account - Active';
    avatarFigure.appendChild(avatarIcon);

    tableData5.appendChild(avatarFigure);

    const badgeSpan = document.createElement('span');
    badgeSpan.className = 'badge badge-success';
    badgeSpan.setAttribute('data-toggle', 'tooltip');
    badgeSpan.title = 'Regular - Active';

    const badgeIcon = document.createElement('i');
    badgeIcon.className = 'fa fa-fw fa-check';
    badgeSpan.appendChild(badgeIcon);

    tableData5.appendChild(badgeSpan);
    tableRow.appendChild(tableData5);

    const tableData6 = document.createElement('td');
    tableData6.setAttribute('align', 'center');
    tableData6.setAttribute('nowrap', '');
    tableData6.textContent=eachData.position;
    
    tableRow.appendChild(tableData6);

    // Append the table row to the body
    document.querySelector('#appendrefdata').appendChild(tableRow)
        
    });
}
//withdrawl section
let balanceWdisplay=document.getElementById('balanceW')
function sendwithdrawlReq(event){
    event.preventDefault();
    let upiId=document.getElementById('upiId');
let withdrawAmount=document.getElementById('txamount');
//Sending withdrawl request 
const withdrawlReqdata = {
    upi:upiId.value,
    amount:withdrawAmount.value
};
fetch('/withdrawlsReq', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(withdrawlReqdata)
})
.then(response => response.json())
.then(data => alert('Request Sent Successfully'))
.catch(error => alert('Something went wrong'));
}
// Function to create a card for withdrawls
function createCard(date, amount, status) {
    const cardContainer = document.getElementById('withdrawlcardContainer');

    const cardDiv = document.createElement('div');
    cardDiv.classList.add('col-12', 'col-md-4', 'col-lg-4');

    const pricingDiv = document.createElement('div');
    pricingDiv.classList.add('pricing');

    const titleDiv = document.createElement('div');
    titleDiv.classList.add('pricing-title', 'bg-light');
    titleDiv.textContent = date;

    const paddingDiv = document.createElement('div');
    paddingDiv.classList.add('pricing-padding');

    const iconSpan = document.createElement('span');
    iconSpan.classList.add('pricing-price');
    iconSpan.dataset.toggle = 'tooltip';
    iconSpan.title = 'manualpayname';
    iconSpan.dataset.originalTitle = 'manualpayname';
    iconSpan.innerHTML = '<i class="fa fa-handshake fa-fw"></i>';

    const amountDiv = document.createElement('div');
    amountDiv.classList.add('pricing-price');
    const amountHeading = document.createElement('h4');
    amountHeading.textContent ='₹'+amount + 'INR';
    amountDiv.appendChild(amountHeading);

    const statusBadge = document.createElement('span');
    statusBadge.classList.add('badge', 'badge-secondary');
    statusBadge.textContent = status;

    // Append elements to build the card
    paddingDiv.appendChild(iconSpan);
    paddingDiv.appendChild(amountDiv);
    paddingDiv.appendChild(statusBadge);

    pricingDiv.appendChild(titleDiv);
    pricingDiv.appendChild(paddingDiv);

    cardDiv.appendChild(pricingDiv);
    cardContainer.appendChild(cardDiv);
}
//for updating profile and password
let firstName=document.getElementById('firstname')
let lastName=document.getElementById('lastname')
let email=document.getElementById('email');
let userInfo=document.getElementById('mbr_intro')
let address=document.getElementById('address')
let state=document.getElementById('state')
let country=document.getElementById('country')
let phone=document.getElementById('phone')
let oldPassword=document.getElementById('password21').value; 
let newPassword=document.getElementById('password12').value;


function updateProfile(){
    let firstName=document.getElementById('firstname')
let lastName=document.getElementById('lastname')
let email=document.getElementById('email');
let userInfo=document.getElementById('mbr_intro')
let address=document.getElementById('address')
let state=document.getElementById('state')
let country=document.getElementById('country')
let phone=document.getElementById('phone')
// let oldPassword=document.getElementById('password21').value; 
// let newPassword=document.getElementById('password12').value;

    let updateProfiledata={
        name:firstName.value+' '+lastName.value,
        phone:phone.value,
        email:email.value,
        address:address.value,
        userInfo:userInfo.value,
        state:state.value,
        country:country.value
    }
fetch('/updateProfile',{
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(updateProfiledata)
})
}
function updatePassword(){
fetch('/updatePassword',{
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({oldPassword,newPassword}) 
})
}

let position=document.getElementById('position') ;
let referralCount=document.getElementById('referralCount');
let dashboardEarn=document.getElementById('dashboardEarn').textContent;
let dashboardWallet=document.getElementById('dashboardWallet').textContent;
let actregisteredDate=document.getElementById('actregisteredDate');
let dashboardName=document.getElementById('dashboardName');
let referralUrl=document.getElementById('myrefurlid');
function updateUserInfo(name,dphone,demail,refcode,date,leg,adrs,cntry,ste,msg){
    //variables for dashboard
    position.textContent=leg;
    console.log('hello')
    console.log(position.textContent)
    actregisteredDate.textContent=date;
    dashboardName.textContent=name;
    referralCode.value=refcode;
    referralUrl.value='https://xyz';

    //for profile
    firstName.value=name.split(' ')[0];
    lastName.value=name.split(' ').slice(1).join(' ');
    email.value=demail
    phone.value=dphone
    address.value=adrs
    country.value=cntry
    state.value=ste
    userInfo.value=msg
}

document.addEventListener('DOMContentLoaded', async function () {
    try {
        const response = await fetch('/updatePage');
        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        updateUserInfo(data.name, data.phone, data.email, data.referralCode, data.registrationDate, data.position, data.address, data.country, data.state, data.userInfo);
        data.withdrawls.forEach((witdhdata)=>{
            createCard(witdhdata.date, witdhdata.amount, witdhdata.status);
        })
        createRefcards(data.referrals);
    } catch (error) {
        console.error('Error:', error);
    }
});



// work for updating profile and password sheprately
let isUpdatingPass=false;
function saveChanges(){
    if(isUpdatingPass){
        updatePassword()
    }else{
        updateProfile()
    }
}
document.getElementById('forupdProfile').addEventListener('click', function() {
    isUpdatingPass = false;
});
document.getElementById('forupdPass').addEventListener('click', function() {
    isUpdatingPass = true;
});






// document.addEventListener('DOMContentLoaded', function () {
//     let position = document.getElementById('position');
//     let referralCount = document.getElementById('referralCount');
//     let dashboardEarn = document.getElementById('dashboardEarn').textContent;
//     let dashboardWallet = document.getElementById('dashboardWallet').textContent;
//     let actregisteredDate = document.getElementById('actregisteredDate');
//     let dashboardName = document.getElementById('dashboardName');
//     let referralUrl = document.getElementById('myrefurlid');

//     function updateUserInfo(name, dphone, email, refcode, date, leg, adrs, cntry, ste, msg) {
//          //variables for dashboard
//     position.textContent=bugff;
//     console.log('hello')
//     console.log(position.textContent)
//     actregisteredDate.textContent=date;
//     dashboardName.textContent=name;
//     referralCode.value=refcode;
//     referralUrl.value='https://xyz';
//     //for profile
//     firstName=name.split(' ')[0];
//     lastName=name.split(' ').slice(1).join(' ');
//     email=email
//     phone=dphone
//     address=adrs
//     country=cntry
//     state=ste
//     userInfo=msg
//     }

//     fetch('/updatePage')
//         .then(res => res.json())
//         .then(data => {
//             updateUserInfo(data.name, data.phone, data.email, data.referralCode, data.registrationDate, data.position, data.address, data.country, data.state, data.userInfo);
//             createCard(data.withdrawls.date, data.withdrawls.amount, data.withdrawls.status);
//             createRefcards(data.referrals);
//         });
// });
