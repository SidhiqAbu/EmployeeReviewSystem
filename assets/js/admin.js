
{





// CONFORMATION OF EMPLOYEE INFO BY ADMIN AND ADDING EMPLOYEE INTO EMPLOYEE DATA BASE..................
        let addBtn = $('.AddEmployeeBtn');
        addBtn.click(function(e){
            $.ajax({
                type:'get',
                url:'/home/employeeAdd',
                data:{id:e.target.id},
                success:async function(data){
                    let newDom = await newEmployeeDOM(data);
                    $( `#${e.target.id}`).remove();
                    $('#employeeslist').append(newDom);
                    $('.DeleteEmployeeBtn').click(function(e){
                        e.preventDefault();
                        DeleteEmployee(e.target.id);
                    });
                    $('.Update').click(function(e){
                        e.preventDefault();
                        console.log("click2");
                        updateInfo(e.target.id);
                    });
                },
                error:function(error){
                    console.log(error)
                }
            });
        });




// CREATION EMPLOYEE INFO DOM................... 
   let newEmployeeDOM = function(val){
        return $(`
        <div class="singleRequest1" id="ha-${val.id}" >
            <div class="inner1">
                <p id="Username-${val.id}">${val.name}</p>
                <p id="email-${val.id}">${val.email}</p>
                <p id="desig-${val.id}">${val.desig}<p>
            </div>
            <div class="inner1">
                <p id="oar-${val.id}">Over all Rate : ${val.rate}</p>
                <button class="Update" id="${val.id}" >Update</button>
                <button id="${val.id}" class="DeleteEmployeeBtn">Delete</button>
            </div>
            <div id="update-${val.id}">

            </div>
        </div>
        `);
    }





  // DELETE OF EMPLOYEE INFO.....................................
    $('.DeleteEmployeeBtn').click(function(e){
            e.preventDefault();
            DeleteEmployee(e.target.id);
     });


     // AJAX CALL TO DELETE THE EMPLOYEE INFO..........
   let DeleteEmployee = async function(val){
            $.ajax({
                type:'delete',
                url:'/home/employeeDelete',
                data:{id:val},
                success: function(data){
                    $(`#ha-${val}`).remove();
                },
                error:function(error){
                    console.log(error);
                }
            });
        }



        // UPDATE EMPLOYEE INFO................
     var outerUpdate = function(val){
            console.log("click1");
            updateInfo(val);
         };

         // CREATION OF UPDATE FORM DOM.....................
   let updateForm = function(val){
    console.log("UPDATE 2")
            return $(`
            <form class="RegistrationForm" id="reg-${val}">
            <input name="id" value="${val}"  hidden></input>
            <p>name:
            <input type="text" name="Username" placeholder="name" required="true">
            </p>
            <p>email:
            <input type="email" name="email" placeholder="email" required="true"  >
            </p>
            <p>password:
            <input type="text" name="Password" placeholder="password" required="true">
            </p>
            <p>Designation:
            <input type="text"name="designation" placeholder="Designation" required="true">
            </p>
            <p>Admin : 
            <select name="Admin">
                <option value="Yes">Yes</option>
                <option value="No" selected>No</option>
            </select> 
            </p>
            <p>Rating:
            <input type="Number" name="Number" min="1" max="5" required="true" >
            </p>
            <p>FeedBack
            <input type="text" name="feedback" class="feed" placeholder="Enter feedback..">
            </p>
            <p>
                <button type="submit" class="Update1" id="updatebtn">Update</button>
            </p>
            </form>
            `);
        }

        let updateInfo = async function(data){
            $('.RegistrationForm').remove();
            $(`#update-${data}`).empty();
            let val1=await updateForm(data);
             $(`#update-${data}`).append(val1);
             await $('.RegistrationForm').submit(function(e){
                e.preventDefault();
                $.ajax({
                    type:'put',
                    url:'/home/update',
                    data:$('.RegistrationForm').serialize(),
                    success:function(data1){
                        $('.RegistrationForm').remove();
                        console.log($(`#Username-${data}`),data);
                        $(`#Username-${data}`).text(data1.Username);
                        $(`#email-${data}`).text(data1.email);
                        $(`#desig-${data}`).text(data1.desig);
                        $(`#oar-${data}`).text(data1.oar);
                        console.log(data1);
                    },
                    error:function(error){
                        console.log(error);
                    }
                });
                
            });
        }













}