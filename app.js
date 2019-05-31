$(document).ready(function() {
   
    var topics = [];
    
       
         function displayGif() {
    
        var gifName = $(this).data("search");
        console.log(gifName);
    
        var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=R1lTX1BwpFdJaqCN8NmwAUsw9hLYYTyc&q=" + gifName + "&limit=10&offset=0&rating=G&lang=en";
    
        console.log(queryURL);
    
        $.ajax({
              url: queryURL,
              method: "GET"
            }).then(function(response) {



                var check = response.data;
                console.log(check);


                for (i = 0; i < check.length; i++) {
                
                    var newDiv = $("<div class='col-md-4'>");
    
                    var gifRating = check[i].rating;
                    var movingGif = check[i].images.fixed_height.url;
                    var stillGif = check[i].images.fixed_height_still.url;
                    var newImage = $("<img>");
                    var p = $("<p>").text("Rating: " + gifRating);
    
                    newImage.attr("src", stillGif);
                    newImage.addClass("randomGiphy");
                    newImage.attr("data-state", "still");
                    newImage.attr("data-still", stillGif);
                    newImage.attr("data-animate", movingGif);
                    newDiv.append(p);
                    newDiv.append(newImage);
                    $("#gifArea").prepend(newDiv);
    
            }
        });
    } 
    
    
        $("#addShow").on("click", function(event) {
            event.preventDefault();

            var newShow = $("#gifInput").val().trim();
            topics.push(newShow);
            console.log(topics);
            $("#gifInput").val('');
            displayButtons();
          });
    
        function displayButtons() {
        $("#myButtons").empty();
        
        for (var i = 0; i < topics.length; i++) {
          var a = $('<button class="btn btn-primary">');
          a.attr("id", "show");
          a.attr("data-search", topics[i]);
          a.text(topics[i]);
          $("#myButtons").append(a);
        }
      }
    
    
      displayButtons();
    
      $(document).on("click", "#show", displayGif);
    
      $(document).on("click", ".imageGiphy", pausePlayGifs);
    
      function pausePlayGifs() {
           var state = $(this).attr("data-state");
          if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
          } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
      }
    }
    
    });