$(document).ready(function () {
   function getWikis(searchItem) {
      var url = "https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrsearch=" + searchItem + "&gsrlimit=9&prop=info|pageimages|extracts&inprop=url&pilimit=max&pithumbsize=100&exintro=1&explaintext=1&exsentences=1&exlimit=10&callback=?";
      $.getJSON(url, function (wikis) {
         document.forms["wiki-search-form"].reset();

         //Check for zero results
         if (typeof wikis.query === "undefined") {
            var errorBox = document.getElementsByClassName("title")[1];
            $(".title:eq(1)").html("Sorry!");
            $(".extract:eq(1)").html("No results found. Please try again.");
            $(".chevron-button").css("visibility", "hidden");
            $(".wiki:eq(1)").css("visibility", "visible").animate({
               opacity: 1
            }, 800);
            return;
         }

         var keys = Object.keys(wikis.query.pages);
         var titles = [];
         var extracts = [];
         var links = [];
			
			      //Extract various information from each result
         keys.forEach(function (item) {
            var index = wikis.query.pages[item].index - 1;
            titles[index] = wikis.query.pages[item].title;
            extracts[index] = wikis.query.pages[item].extract;
				        links[index] = wikis.query.pages[item].fullurl;
         });
			
			      //Find target elements and assign information
         var thumbTitles = document.getElementsByClassName("title");
         var thumbExtracts = document.getElementsByClassName("extract");
         var thumbLinks = document.getElementsByClassName("chevron-button");
         var thumbs = document.getElementsByClassName("wiki");
			      
            for (var i = 0; i < thumbTitles.length; i++) {
               thumbTitles[i].innerHTML = titles[i];
               thumbExtracts[i].innerHTML = extracts[i];
               thumbLinks[i].href = links[i];
            }
            $(".chevron-button").css("visibility", "visible");
            $(".wiki").each(function (i) {
               $(this).delay((i + 1) * 200).css("visibility", "visible").animate({
                  opacity : 1
               }, 800);
            })       
      });
   }

   $(".wiki-form").on("submit", function (e) {
      e.preventDefault();
      var searchValue = $(".search-item");
      if (searchValue.val() != "") {
         $(".wiki").animate({
            opacity : 0
         }, 800).promise().done(function () {
            $(this).css("visibility", "hidden");
            getWikis(searchValue.val().toLowerCase());
         });
      }
   });
});