





{
//  CREATION OF NEW SHEMA FOR NEWLY REGISTERED EMPLOYEES.......
    const mongoose=require('mongoose');
    const newEmployeeRgtrShema= new mongoose.Schema({
        UserName:{
            type:String,
            require:true
        },
        Email:{
            type:String,
            require:true
        },
        Password:{
            type:String,
            require:true
        },
        designation:{
            type:String,
            require:true
        }
        
    },{
        timestamps:true
    });

// CREATION OF MODEL OF NEWLY REGISTERED EMPLOYEEE...........
    const newEmployeeRgtr=mongoose.model('newEmployeeRgtr',newEmployeeRgtrShema);
    // EXPORTING OF MODEL.........
    module.exports=newEmployeeRgtr;

}