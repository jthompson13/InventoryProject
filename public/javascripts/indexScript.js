/**
 * Created by Jonathon on 12/9/2016.
 */
$(document).ready(function() {
    if ($(".search_section").is(":hidden"))
        $(".search_section").show();
    var crap = "";
    var updateDb = function (id, seltext) {

        $.ajax({
            url: "/UpdateStatus",
            type: "GET",
            ContentType: "application/json; charset=utf-8",
            dataType: 'json',
            cache: false,
            data: { "device_key": id, "current_status": seltext }
        })
            .fail(function (err) {
                crap = err;
                alert("There was an error updating the database!");
            });

    };


    $(".eTable").on("click", ".stat li a", function () {
        var selText = $(this).text();
        $(this).parents(".btn-group").find(".dropdown-toggle").html(selText + " <span class='caret'></span>");
        var id = $(this).parents(".rowInfo").find(".DeviceKey2").text();
        updateDb(id, selText);
    });

});