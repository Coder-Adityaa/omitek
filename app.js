const express = require("express");
const path = require('path');
const mongoose = require('mongoose');
let bodyParser = require('body-parser');
const session = require('express-session');
// const multer = require('multer');

const dburl='mongodb://localhost:27017/omitrek'

const app = express();
const port = 80;

app.use(session({
    secret: 'pppck',
    resave: true,
    saveUninitialized: true
}));
// Middleware to check if the User is authenticated
const isAuthenticated = (req, res, next) => {
    if (req.session && req.session.isAuthenticated) {
      return next();
    } else {
      res.redirect('/');
    }
};

// ============================setting paths and view engine============================
app.use(bodyParser.urlencoded({ extended: true }));     // for getting form data


// -----------------end points----------------------


//data

main()
async function main() {
    const db = await mongoose.connect(dburl, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
    db.once
// ================================= register Work Here =============================
const withdrawlSchema=new mongoose.Schema({
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
    upi:{
        type:String,
        require:true,
    },
    amount:{
        type:Number,
        require:true
    },
    status:{
        type:String,
        default:'Processing'
    },
    date:{
        type:date,
        default:formattedDateTime(Date.now)
    }
})
    const registerSchema = new mongoose.Schema({
        name: {
            type: String,
            require: true,
        },
        phone:{
            type:Number,
            require:true,
        },
        email: {
            type: String,
            require: true,
        },
        password:{
            type:String,
            require:true,
        },
        referredBy:{
            type:String,
        },
        referralCode:{
            type:String,
            require:true,
        },
        position:{
            type:String,
        },
        copuns:{
            type:String,
        },
        rigistrationDate: {
            type: Date,
            default:formattedDateTime(Date.now)
        },
        withdrawls:[withdrawlSchema]
    })
    const User = mongoose.model('User', registerSchema);
    // const storage = multer.diskStorage({
    //     destination: function (req, file, cb) {
    //       cb(null, path.join(__dirname,'uploads'))
    //     },
    //     filename: function (req, file, cb) {
    //     //   const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    //       cb(null, `${Date.now()}-${file.originalname}`)
    //     }
    // })  
    // const upload = multer({ storage: storage })             further is below code --  upload.single('resume'),
    app.post('/register', async (req, res) => {
        try {
            const generatedReferralCode = await generateAndCheckReferralCode();
            async function generateAndCheckReferralCode() {
                while (true) {
                    const generatedReferralCode = generateRandomCode();
                    const existingCode = await User.findOne({ referralCode: generatedReferralCode });
            
                    if (!existingCode) {
                        return generatedReferralCode;
                    }
                }
            }
            // Function to generate a random code (for demonstration purposes)
            function generateRandomCode() {
                const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
                const codeLength = 12;
                let referralCode = '';
                for (let i = 0; i < codeLength; i++) {
                    const randomIndex = Math.floor(Math.random() * characters.length);
                    referralCode += characters.charAt(randomIndex);
                }
                return referralCode;
            }

            const registerApplication = new User({
                name:req.body.name,
                phone:req.body.phone,
                email:req.body.email,
                password:req.body.password,
                position:req.body.position,
                referralCode:generatedReferralCode,
            })

            await registerApplication.save();
            let alertScript = `
                <script>
                    alert('Registered Successfully');
        //          window.location.href = '/'; // Redirect to the home page
                </script>
            `;
            res.send(alertScript);
         } 
         catch (error) {
            console.error(error);
            res.status(404).send(`<script>
                alert('Something went wrong. Please try again.');
                // window.location.href = '/register'; // Redirect to the home page
            </script>`);
        }
    });
        
// ====================================login works here=====================================
    app.post('/login',(req,res)=>{
       let loginData=User.findOne({phone:req.body.phone}) 
       if(loginData){
          if(req.body.password==User.password){
            req.session.isAuthenticated = true;
            // loginwork here
          }else{
             res.send(`
                <script>
                   alert('Wrong Password');
                   window.location.href = '/'; // Redirect to the home page
                </script>
             `)
          }
       }else{
          res.send(`
          <script>
             alert('User doesn't exists');
             window.location.href = '/'; // Redirect to the home page
          </script>
          `)
       }
    })


// =============================Get referrals data====================
async function getRefData(referralCode, level = 1) {
    try {
      let referralData = await User.find({ referredBy: referralCode });
      referralData.forEach(async (element) => {
        if (level <= 5) {
          await getRefData(element.referralCode, level + 1);
        }
      });
      return referralData;
    } catch (error) {
      console.error(error);
      throw error; // Re-throw the error to be caught in the calling function
    }
  }
  
  app.get('/referralData/:referralCode', async (req, res) => {
    const referralCode = req.params.referralcode;
    try {
      let finalRefData = await getRefData(referralCode);
      res.json(finalRefData);
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  

// ===============================getting withdrawl details========================
// Create a new Date object for the current date and time
function formattedDateTime(currentDateTime){
    // Get day, month, and year
const day = currentDateTime.getDate();
const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const monthIndex = currentDateTime.getMonth();
const year = currentDateTime.getFullYear();
// Get hours and minutes
const hours = currentDateTime.getHours();
const minutes = currentDateTime.getMinutes();
// Format the date and time
const formattedDateTime = `${day} ${monthNames[monthIndex]} ${year}, ${hours}:${minutes}`;
return formattedDateTime

}

    // const withdrawls=mongoose.model('widthdraw',withdrawlSchema);
    // -------endpoint for withdrawlrequest-----
    app.post('/withdrawlsReq/:phone',(req,res)=>{
        const phone = req.params.phone;
        const UserWhoreq = User.findOne(User.phone==phone);
        if(UserWhoreq){
            try{
                const reqData = req.body; 
                UserWhoreq.withdrawls.push(reqData)
                UserWhoreq.save()
            }catch(err){
                res.send(` <script>
                alert('Something went wrong please try again');
                window.location.href = '/'; // Redirect to the home page
             </script>`)
            }
        }
    })
    // ----------get withdrawl data----------
    app.get('/withdrawls/:phone',async(req,res)=>{
        const phone = req.params.phone;
        const detatosend= await withdrawls.find({phone:phone})
        res.json(detatosend)
    })

}






app.listen(port, () => {
    console.log(`The application started successfully on port ${port}`);
});




