$(document).ready(function() {

    var search = '';
    var storage = '';
    $("#query").keyup(function(event) {

        // number 13 is the "Enter" key on the keyboard
        if (event.keyCode === 13) {
            //trigger the button element w/ a click
            $("#btn").click();
        }
    });



    $("#btn").click(function() {
        
        //this resets the search results by making the html in the div 
        $("#results").html(""); 
        
        search = $('#query');

        //input stored in storage variable
        storage = search.val();

        //deals with spaces in input by replacing spaces with %20
        storage = storage.replace(/\s+/g, '%20'); 

        var api = "https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&gsrsearch="+storage+"&callback=?";
        console.log(api);
        
        // calls api
        $.ajax({
            url:api,
            type: 'POST',
            dataType: 'jsonp',
            success: function(result){
                var data = result.query.pages;
                render(data);
                console.log(Object.keys(data)[0]);
            },
            error: function(err){
                console.log(err);
                alert('Oops something went wrong! Please try again.');
            }
        });
    });

    function render(data) {
        
        var pageurl = "https://en.wikipedia.org/?curid=";
        
        /**NOTE** when going through an object it does not behave like an array where you can access the index through data[i]
        you must use the below notation to ENUMERATE through the objects properties */
        for (var i in data) {
            //look at JQUERY documentation for .append() 
            $('#results').hide().append("<a target ='_blank' href ='" +pageurl+data[i].pageid+"' id = 'links'><div id = resultbox><h4>"+data[i].title+"</h4><p>"+data[i].extract+"</p></div></a>").fadeIn(300);
        }
        
    }

});