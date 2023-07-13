

{


    
// IMPORTING MONGOOSE.........
    const mongoose=require('mongoose');
    const {Schema} = mongoose

//  CREATION OF SCHEMA..........
    const newEmployeeShema= new mongoose.Schema({
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
        Admin:{
            type:Boolean,
            require:true
        },
        OverAllRate:{
            type:Number,
            require:true
        },
        FeedBack:{
            type:Array,
            require:true
        },
        designation:{
            type:String,
        }
        
    },{
        timestamps:true
    });



   // CREATION OF MODEL..........
    const newEmployee=mongoose.model('newEmployee',newEmployeeShema);
    // EXPORTING OF MODEL...............
    module.exports=newEmployee;

}