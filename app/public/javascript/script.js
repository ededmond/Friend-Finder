$(document).on("click","#finished",function() {
    let name = $("#name").val().trim();
    let photo = $("#photo").val().trim();
    if (name === "" || photo === "") {
        return alert("Sorry: you must enter both a name and a photo link");
        //was using this to test
        // return $("#display-friend").modal("show");
    }
    let answers = [];
    for (let i=1; i < 11; i++) {
        let ans = $(`[name=q${i}]:checked`).val();
        if (ans) {
            answers.push(ans);
        } else {
            return alert("Sorry: you must answer all of the questions");
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
        $("#friend-name").text(res.name);
        $("#friend-photo").attr("src",res.photo);
        $("#display-friend").modal("show");
        $("#form").trigger('reset');
    })
})
