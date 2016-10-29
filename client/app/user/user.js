angular.module('zeus.user', [])
.controller('UserController', function(Details, User, $stateParams) {
  var UserVm = this;
  UserVm.currentView = 'overview';
  UserVm.currentFavoriteView = 'movies';
  UserVm.username = $stateParams.username;

  //set up user information based on username given in route
  if ($stateParams.username) {
    User.getUserId($stateParams.username)
      .then(function(userObj) {
        UserVm.protected = false; //used to hide link to edit profile
        UserVm.userId = userObj._id;
        UserVm.email = userObj.email;
        UserVm.userIdAuth = userObj.user_id;
        UserVm.about = userObj.about;
        UserVm.joinDate = userObj.joinDate;
        UserVm.fullName = userObj.fullName;
        UserVm.location = userObj.location;
        UserVm.profilePic = userObj.profilePicLink;
        UserVm.favorites = userObj.favorites;
        console.log(UserVm.favorites);
        User.getUserReviews(UserVm.userIdAuth)
          .then(function(reviews) {
            UserVm.reviews = reviews;
          });
      });
  } else {
    Details.getUserFavorites()
      .then(function(userObj) {
        UserVm.protected = true; //used to show link to edit profile
        UserVm.userId = userObj._id;
        UserVm.email = userObj.email;
        UserVm.userIdAuth = userObj.user_id;
        UserVm.username = userObj.username;
        UserVm.about = userObj.about;
        UserVm.joinDate = userObj.joinDate;
        UserVm.fullName = userObj.fullName;
        UserVm.location = userObj.location;
        UserVm.profilePic = userObj.profilePicLink;
        UserVm.favorites = userObj.favorites;
        User.getUserReviews(UserVm.userIdAuth)
          .then(function(reviews) {
            UserVm.reviews = reviews;
          });
      });
  }

  //check to see if the user has any favorites for a given target (movie/tv)
  UserVm.hasFavorites = function(target) {
    var hasFavs = false;
    UserVm.favorites.forEach(function(item){
      if (item.type === target) {
        hasFavs = true;
      }
    });
    return hasFavs;
  };
})
.directive('userOverview', function() {
  return {
    restrict: 'AE',
    replace: true,
    scope: true,
    templateUrl: 'app/user/userOverview.html'
  };
})
.directive('userReviews', function() {
  return {
    restrict: 'AE',
    replace: true,
    scope: true,
    templateUrl: 'app/user/userReviews.html'
  };
})
.directive('userFavorites', function() {
  return {
    restrict: 'AE',
    replace: true,
    scope: true,
    templateUrl: 'app/user/userFavorites.html'
  };
})
.directive('favoriteTv', function() {
  return {
    restrict: 'AE',
    replace: true,
    scope: true,
    templateUrl: 'app/user/favoriteTv.html'
  };
})
.directive('favoriteMovies', function() {
  return {
    restrict: 'AE',
    replace: true,
    scope: true,
    templateUrl: 'app/user/favoriteMovies.html'
  };
});