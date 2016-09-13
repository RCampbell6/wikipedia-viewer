$(document).ready(function () {
   function getWikis(searchItem) {
      var url = "https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrsearch=" + searchItem + "&gsrlimit=9&prop=pageimages|extracts&pilimit=max&pithumbsize=100&exintro=1&explaintext=1&exsentences=1&exlimit=9&callback=?";
      $.getJSON(url, function (wikis) {
         var keys = Object.keys(wikis.query.pages);
         var titles = [];
         var extracts = [];
         keys.forEach(function (item) {
            var index = wikis.query.pages[item].index - 1;
            titles[index] = wikis.query.pages[item].title;
            extracts[index] = wikis.query.pages[item].extract;
            console.log(titles);
            console.log(extracts);
         });
         var thumbs = document.getElementsByClassName("wiki");
         for (var i = 0; i < thumbs.length; i++) {
            thumbs[i].innerHTML = "<span>" + titles[i] + "</span><p>" + extracts[i] + "</p>";
         }
         console.log(wikis.query.pages[keys[0]]);
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