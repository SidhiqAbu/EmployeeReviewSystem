


{


    console.log("employee page");


    $('#AddingNewFeed').submit(function(e){
        e.preventDefault();
        console.log("hii");
        let data1=$('#AddingNewFeed').serialize();
        console.log($('#AddingNewFeed').serialize());
        $.ajax({
            type:'put',
            url:'/home/feedback',
            data:data1,
            sucess:function(data){

            },error:function(error){
                console.log(error);
            }
        });
    });
}