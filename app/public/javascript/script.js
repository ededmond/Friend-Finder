$(document).on("click","#finished",function() {
    let name = $("#name").val().trim();
    let photo = $("#photo").val().trim();
    //prevent form from submitting and tell user what they missed
    if (name === "") {
        // $("#display-friend").modal("show");

        
        $("#warning").show();
        $("#name").addClass("red");
        return $("#name-label").addClass("red");
    }
    if (photo === "") {
        $("#warning").show();
        $("#photo").addClass("red");
        return $("#photo-label").addClass("red");
    }

    let answers = [];
    for (let i=1; i < 11; i++) {
        let ans = $(`[name=q${i}]:checked`).val();
        if (ans) {
            answers.push(ans);
        } else {
            $(`[name=q${i}]`).addClass("red");
            //change question to red
            for (let j =1; j < 6; j++) {
                $(`[for=q${i}-${j}]`).addClass("red");
                
            }
            return $("#warning").show();
        }
    }

    $.ajax({
        type:"POST",
        url: "/api/friends",
        data: {
            name:name,
            photo:photo,
            answers:answers
        }
    }).then(function(res) {
        $("#friend-photo").attr("src",res.photo);
        $("#friend-name").text(res.name);
        $("#display-friend").modal("show");
        $("#form").trigger('reset');
    })
})

//this will remove red when user answers the question
// $(document).on("click","#photo",function() {
//     $("#photo-label").removeClass("red");
//     $("#warning").hide();
// })
// $(document).on("click","#name",function() {
//     $("#name-label").removeClass("red");
//     $("#warning").hide();
// })
$(document).on("click",".red",function() {
    $(".red").removeClass("red");
    $("#warning").hide();
})