


{


//  SIGN IN FORM  APPENDING TO HOME PAGE........
    let SignInForm = function(){
            let SignInForm = $("#outer"); 
           SignInForm.empty();
            SignInForm.append(`
            <div id="outer-container">
                    <h2>Login Page</h2>
                    <div id="inner-container">
                                    
                            <form id="signinForm" action="/home/signin" method="post">
                                <p>User name :</p>
                                <input type="text" name="username" placeholder="Enter User Name" required="true">
                                <p>Password :</p>
                                <input type="text" name="password" placeholder="Enter password" required="true">
                                <p>
                                    <button type="submit" id="btns">Sign In</button>
                                </p>
                                
                            </form>
    
                    </div>
            </div>
            `); 
    
    }


//   SIGN UP FORM APPENDING TO HOME PAGE................
    let signUpForm = function(){
            let val=$("#outer");
            val.empty();
            val.append(`
            <div id="outer-container">
            <h2>Sign Up Page</h2>
            <div id="inner-container">
                    <form id="RegistrationForm">
                        <div class="sap">
                        <div class="outerDiv">
                        <div class="innerDiv">
                        <p>Enter your name :</p>
                        <input type="text" name="Username" placeholder="name" required="true" >
                        </div>
                        <div class="innerDiv">
                        <p>Enter your email:</p>
                        <input type="email" name="email" placeholder="email" required="true" >
                        </div>
                        </div>
                        <div class="outerDiv">
                        <div class="innerDiv">
                        <p>Enter your password:</p>
                        <input type="text" name="Password" placeholder="password" required="true" >
                        </div>
                        <div class="innerDiv">
                        <p>Enter your ConformPassword:</p>
                        <input type="text" name="ConformPassword" placeholder="Conformpassword" required="true">
                        </div>
                        </div>
                        </div>
                        <p> Enter your Designation:</p>
                        <input type="text"name="designation" placeholder="Designation" required="true" >
                        <p>
                            <button type="submit" id="btns">Sign Up</button>
                        </p>
                    </form>
            </div>
            </div>
            `);

//   AJAX CALL FOR SUBMITTING OF SIGN UP FORM............
            $('#RegistrationForm').submit(function(e){
                e.preventDefault();
                let data =$('#RegistrationForm').serialize();
                $.ajax({
                    type: 'post',
                    url: '/home/signup',
                    data:data,
                    success: function(data){
                        console.log("successfully registered!");
                        SignInForm()
                    }, error: function(error){
                        console.log(error);
                        alert("Password Must Be Same..!");
                    }
                });
            });

    };
   
// IDENTIFICATION OF CLICK EVENTS ON SIGN IN BUTTON.............
    $('#SignIn').click(function(e){
        e.preventDefault();
        SignInForm();
    });
// IDENTIFICATION OF CLIKC EVENTS ON SIGN UP BUTTON..............
    $('#SignUp').click(function(e){
        e.preventDefault();
        signUpForm();
    });

}