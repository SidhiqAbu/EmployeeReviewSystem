

{ 

    // IMPORTING DATABASE INFO...
    const Employees = require('../modules/Users');
    const RgtrEmployees = require('../modules/registeredEmployees');



    // // INITIAL CALL FOR EMPLOYEE PAGE............
    // module.exports.employee = async function(req,res){
    //     let emp = await Employees.find({});
    //     let val1=[]
    //     for(let val of emp){
    //         val1.push({
    //             id:val._id,
    //             Username:val.UserName
    //         });
    //     };
    //     return res.render('employee',{
    //         title:"Employee Page",
    //         Emp:emp[0],
    //         allEmp:val1,
    //         user:emp[0]
    //     });
    // };


    // //  INITIAL CALL FOR ADMIN  PAGE................
    // module.exports.admin = async function(req,res){
    //     let RgtrEm = await RgtrEmployees.find({});
    //     let emp = await Employees.find({});
    //     return res.render('admin',{
    //         title:"Admin Page",
    //         rgtrEmp:RgtrEm,
    //         Emp:emp,
    //         user:emp[0]
            
    //     });
    // };

    //  ADDING EMPLOYEE INTO PARMINENT EMPLOYEES LIST.............
    module.exports.employeeAdd = async function(req,res){
        console.log(req.query.id);
        let employeeDtls = await RgtrEmployees.findByIdAndDelete(req.query.id);
        let employeepr=await Employees.create({
            UserName:employeeDtls.UserName,
            Email:employeeDtls.Email,
            Password:employeeDtls.Password,
            Admin:false,
            OverAllRate:0,
            FeedBack:[],
            designation:employeeDtls.designation

        });
        console.log(employeeDtls);
        if(req.xhr){
            return res.status(200).json({
                name:employeepr.UserName,
                id:employeepr._id,
                email:employeepr.Email,
                desig:employeepr.designation,
                rate:employeepr.OverAllRate
            });
        }
    };




    //  DELETION OF EMPLOYEE FROM COMPANY LIST.............
    module.exports.employeeDelete = async function(req,res){
            console.log(req.body.id);
            let employeeDlt = await Employees.findByIdAndDelete(req.body.id)
            if(req.xhr){
                return res.status(200).json({});
            }
    };


    // UPDATING OF RATING AND FEEDBACK INFO OF EMPLOYEES.........
    let updateFeedInfo = async function(data){
        let emp = await Employees.findById(data.id);
        if(emp.OverAllRate !== 0){
            let val = emp.OverAllRate + parseFloat(data.rate);
            emp.OverAllRate = (val/2).toFixed(1);
        }else{
            emp.OverAllRate =data.rate;
        }

        if(data.feed !== ''){
            emp.FeedBack.push({
                feedback: data.feed,
                rate:data.rate
            });
        }
        emp.save();
        return;
    };


    // UPDATION OF INFORMATION OF EMPLOYEES........
    module.exports.update = async function(req,res){
        console.log(req.body);
        let emp = await Employees.findById(req.body.id);
        console.log(emp);
            emp.UserName = req.body.Username;
            emp.Password = req.body.Password;
            emp.Email = req.body.email;
            emp.designation = req.body.designation; 
            if(req.body.Admin === 'Yes'){
                emp.Admin = "true";    
            }else{
            emp.Admin = "false";
            }
        await updateFeedInfo({
                id:req.body.id,
                feed:req.body.feedback,
                rate:req.body.Number
            });
            console.log(emp);
            emp.save();
        if(req.xhr){
            return res.status(200).json({
                message :"Successfully updated Info..!",
                Username:emp.UserName,
                email:emp.Email,
                desig:emp.designation,
                oar:emp.OverAllRate
            });
        }
    }


    //  UPDATING FEEDBACK INFO WITH RATING.........
    module.exports.feedback = async function(req,res){
        console.log(req.body);
        await  updateFeedInfo({
            id:req.body.id,
            feed:req.body.feedback,
            rate:req.body.rate
        });
        if(req.xhr){
            return res.status(200).json({
                message :"Successfully updated Info..!"
            });
        }
    }


}