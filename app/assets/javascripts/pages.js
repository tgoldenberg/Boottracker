$(document).ready(function() {

  // make sure user can only select one of the checkboxes for AJAX request
  $('.check').on('click', function() {
    var that = this;
    for(i=0;i<6;i++) {
      $('.check')[i].checked = false;
      this.checked = true;
      id = $(this).attr('id');
      $('.summary').html(id);
    }
  });

  // navigation to respond to screen resizing
  var menuToggle = $('#js-mobile-menu').unbind();
  $('#js-navigation-menu').removeClass("show");

  menuToggle.on('click', function(e) {
    e.preventDefault();
    $('#js-navigation-menu').slideToggle(function(){
      if($('#js-navigation-menu').is(':hidden')) {
        $('#js-navigation-menu').removeAttr('style');
      }
    });
  });

  var page = 1;
  var githubKey = $('meta[name="github-token"]').attr('content');

  // AJAX call to get most recent repositories of DBC students/\
  var CHICAGO_DRAGONFLIES = ["ac-adekunle", "amberzilla", "boguth", "withtwoemms", "H12", "mccallumjack", "jasonpettus", "joeaawad", "Faithsend", "michaelkunc", "bwootten", "nsiefken", "pmacaluso3"];
  var SANFRAN_DRAGONFLIES = ["cusackalex", "alexrkass", "achen116", "keops6fr", "briankennedy1", "carissablossom", "dgrotting", "cutofmyjib", "edisonocean", "ellismarte", "erictflores", "Andrelton", "jnewman12", "jchang2014", "jengjao515", "joshullman", "karanaditya993", "klvngnn", "LTran1231", "iMikie", "PatrickShelby", "Sbsample", "tarora2014", "vpoola88"];
  var NYC_POCKET_GOPHERS = ["aceburgess", "AlexTaber", "aperezmontan", "HanuMaIV", "Doralyp", "echenique11", "ScottBWar", "fishermanng", "sidwatal", "TTrinkle"];
  var NYC_BUMBLEBEES = ["AlinaJahnes", "aderend", "christineschatz", "gp3gp3gp3", "gechro", "billkozby83", "maze130", "hukashi", "GLNRO", "Sihong31", "sayuloveit"];
  var NYC_FIERY_SKIPPERS = ["manentea", "NIkocal", "benlights", "laurisbernhart", "Dholness2", "sbelkin88"];
  var NYC_DRAGONFLIES = ["tgoldenberg", "alcsatt", "benjamincohen1989", "tekd", "JMC11", "sevennote", "julia-castro", "lowellmower", "mcardacci", "michaelbbozza", "grapefruitricky", "shmartin", "sixthand6th", "johnlyden"];
  var githubUrl = "https://api.github.com/users/";
  $('.btn-lg').on('click', function(e) {
    e.preventDefault();

    var cohort = $('.summary').html();
    var AJAXCohort = NYC_DRAGONFLIES;

    // switch statement to determine AJAX call - default is 2015 NYC Dragonflies
    switch(cohort) {
      case "nyc-fiery-skippers":
        AJAXCohort = NYC_FIERY_SKIPPERS;
      break;
      case "nyc-dragonflies":
        AJAXCohort = NYC_DRAGONFLIES;
        break;
      case "nyc-pocket-gophers":
        AJAXCohort = NYC_POCKET_GOPHERS;
      break;
      case "nyc-bumblebees":
        AJAXCohort = NYC_BUMBLEBEES;
      break;
      case "chicago-dragonflies":
        AJAXCohort = CHICAGO_DRAGONFLIES;
      break;
     case "sanfran-dragonflies":
        AJAXCohort = SANFRAN_DRAGONFLIES;
      break;
      default:
        AJAXCohort = NYC_DRAGONFLIES;
      break;
    }
    // reset the screen
    $('.user-profile').remove();

    // AJAX call for each user with up-to-date repos
    AJAXCohort.forEach(function(element, idx) {
      var username = element;
      var index = idx + 1;

      $.ajax({
        url: githubUrl + username + "/repos?sort=created&access_token=" + githubKey,
        method: "get",
        dataType: "json"
      }).done(function(data) {

        // create divs and content for user profile
        var element = '<div class="user-profile">' +
                        '<div class="user-avatar">' +
                          '<img src="' + data[0]["owner"]["avatar_url"] + '"/>' +
                        '</div>' +
                        '<div class="user-info"><hr/><h4>'+ username + '</h4>';
        data.forEach(function(repo, idx) {
          if (idx < 3) {

            // create repository content
            element += '<p>' +
                          '<a href="' + repo["html_url"] + '">' + repo["name"] +
                          '</a>' +
                         '|| created on: ' + new Date(repo["created_at"]).toLocaleDateString() +
                       '</p>';
          }
        });

        // close profile and append to DOM
        element += "</div></div>";
        $('.display-panel').append(element);

      }).fail(function(error) {
        console.log(error)
      });
    });
  });
});
