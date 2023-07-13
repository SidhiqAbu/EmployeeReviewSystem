
{

    //  IMPORTING OF PACKAGE AND USERS INFO.. ......
    const Employees = require('../modules/Users');
    const RgtrEmployees = require('../modules/registeredEmployees');


    //  REDERING THE INFORMATION OF USER FROM MOONGOOSE AND REDIRECTING INFO  ON  CHROME PAGE...........
    module.exports.Profile= async function(req,res){
        console.log(req.user,"Profile");
        if(req.isAuthenticated()){
            let employee = await Employees.findById(req.user._id);
            console.log(employee);
            if(employee.Admin){
                console.log("Admin page");
                let RgtrEm = await RgtrEmployees.find({});
                let emp = await Employees.find({});
                return res.status(200).render('admin',{
                    title:"Admin Page",
                    rgtrEmp:RgtrEm,
                    Emp:emp,
                    user:employee
                });
            }else{
                console.log("Employee Page");
                let emp = await Employees.find({});
                let val1=[]
                for(let val of emp){
                    val1.push({
                        id:val._id,
                        Username:val.UserName
                    });
                };
                return res.status(200).render('employee',{
                    title:"Employee Page",
                    allEmp:val1,
                    user:employee
                });
            }
        }
    return res.status(200).redirect('/');
        
    };

    //  LOGIN INTO ADMIN OR EMPLOYEES ACCOUNT..........
    module.exports.signin = function(req,res){
        console.log("signin module!...")
        return res.redirect('/');
    };

    //  CREATION OF ACCOUNT OF  EMPLOYEES IN ADMIN ACCOUNT WHICH IS GO IN TO AUTHENTICATED BY ADMIN.......
    module.exports.SignUp = function(req,res){
        console.log("hi signup batch...!",req.body);
        if(req.body.Password === req.body.ConformPassword){
            console.log("Password matching currectly!");
            let data = RgtrEmployees.create({
                UserName:req.body.Username,
                Email:req.body.email,
                Password:req.body.Password,
                designation:req.body.designation
            });
            if(req.xhr){
                return res.status(200).json({});
            }
        }else{
            if(req.xhr){
                return res.status(404).json({});
            }
        }   
    };


    //  LOGOUT FROM THE ACCOUNT.........
    module.exports.logout = function(req, res, next) {
        req.logout(function(err) {
        if (err) { return next(err); }
        res.redirect('/');
        });
    };



}
