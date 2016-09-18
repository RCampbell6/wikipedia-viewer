$(document).ready(function () {
   function getWikis(searchItem) {
      var url = "https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrsearch=" + searchItem + "&gsrlimit=9&prop=info|pageimages|extracts&inprop=url&pilimit=max&pithumbsize=100&exintro=1&explaintext=1&exsentences=1&exlimit=9&callback=?";
      $.getJSON(url, function (wikis) {
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
			
			$(".wiki").animate({
				opacity: 0
			}, 800, function () {
				for (var i = 0; i < thumbTitles.length; i++) {
					thumbTitles[i].innerHTML = titles[i];
					thumbExtracts[i].innerHTML = extracts[i];
					thumbLinks[i].href = links[i];
				}
				$(".wiki").animate({
					opacity: 1
				}, 800);
			});         
      });
   }

   $(".wiki-form").on("submit", function (e) {
      e.preventDefault();
      var searchValue = $(".search-item");
      if (searchValue.val() != "") {
         getWikis(searchValue.val().toLowerCase());
      }
   });
});