(function() {
  var config = {
    apiKey: "AIzaSyDaPeaiTpAzQcJSV46IDaaElp0OeAGp7E8",
    authDomain: "mhvi-15e2b.firebaseapp.com",
    databaseURL: "https://mhvi-15e2b.firebaseio.com",
    projectId: "mhvi-15e2b",
    storageBucket: "mhvi-15e2b.appspot.com",
    messagingSenderId: "630227463036"
  };
  firebase.initializeApp(config);

  //check if user is logged in
  firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
    if (user.email == 'admin@mhvi.com'){
      $('#loginForm').addClass("hide");

      $('#dbEntryForm').removeClass("hide");
      $('#admin').removeClass("hide");
      $('#userInfoForm').removeClass("hide");
      $('#reportForm').removeClass("hide");
    }
    else if (user.email == 'driver@mhvi.com'){
      $('#loginForm').addClass("hide");

      $('#userInfoForm').removeClass("hide");
      $('#driver').removeClass("hide");  
    }
  } else {
    // No user is signed in.
    $('#loginForm').removeClass("hide");

    $('#userInfoForm').addClass("hide");
    $('#dbEntryForm').addClass("hide");
    $('#admin').addClass("hide");
    $('#driver').addClass("hide");
    $('#userInfoForm').addClass("hide");
    $('#reportForm').addClass("hide");
  }
//onAuthStateChanged
});

//seaches database with given searchTerm and prints result to given output
function searchDatabase(searchTerm,output){
  //grab a reference to object from the database with the String from searchTerm
  const dbRead = firebase.database().ref().child(searchTerm);
  dbRead.on('value', snap => {
    //get timestamp from firebase and convert to javascript Date object
    let date = new Date(snap.val().Date);
    output.html("Item: " + snap.val().Item +
        "\nCost: " + snap.val().Cost +
        "\nQuantity: " + snap.val().Quantity +
        "\nDate: " + (date.getMonth() + 1) + "-" + date.getDate() + "-" + date.getFullYear());
    });
  }
  function updateDatabase(item,quantityTxtField){
    // //item we are updating is taken from the searchName txtbox
    // var itemQuantity = firebase.database().ref('bike/Quantity');
    /* add validation to ensure that #searchName is not empty and that #searchName String exists in the database*/
    //grab database reference to the quantity of the String from the seachName txt feild
    const itemQuantity = firebase.database().ref(item + "/Quantity");
    itemQuantity.transaction(function(currentQuantity){
      /*add validation such that quantity textField is not empty*/
      return (currentQuantity + parseInt(quantityTxtField));
    });
  }
  $(document).ready(function(){
    //search database for item
    $("#search").click(function(){
        //grab string from searchName textbox
        searchDatabase($('#searchName').val(),$('#object'));
    });
    //update quanitity of item
    $('#btnUpdate').click(function(){
      updateDatabase(String($('#searchName').val()),$('#txtUpdate').val());
    });
    $('#driverBtnUpdate').click(function(){
      updateDatabase($('#list').find(":selected").text(),$('#driverTxtUpdate').val())
    });
    $('#loginBtn').click(function(){
      let email = $('#userName').val();
      let pwd = $('#password').val();

      //authenticate user information
      firebase.auth().signInWithEmailAndPassword(email, pwd).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        alert("Error : " + errorMessage);
      });
      //populate userInfo form
      $('#userInfo').html("Email :" + email + "\n" + "Password : " + pwd);


    })
    $('#logoutBtn').click(function(){
      firebase.auth().signOut();
    })

    //sync database changes in dropdown list

    //grab reference to database
    const dbDropdown = firebase.database().ref();
    //databse event handlers
      //add all itmes from database
      dbDropdown.on('child_added', snap => {
        //for each child in the database
        //we a add new option to select list
        //give that option the value of the current childs key
        //and lastly populate the list the the current childs Item name
        $('#list').append('<option value = ' + snap.key + '>' + snap.val().Item + '</option>');
      })
      // listens for changes for any child in the database
      dbDropdown.on('child_changed', snap => {
        //if a child is modified this method is invoked
        //we take the key from the child that was changed and plug it in to our option value
        //to update the new text displayed in the list
        $('#list option[value='+snap.key+']').text(snap.val().Item);
      })
      //listens for any children removed from the database then updates the selectlist
      dbDropdown.on('child_removed', snap => {
        $('#list option[value='+snap.key +']').remove();
      })

    $('#list').change(function() {
      let listItem = $('#list').find(":selected").text();
      searchDatabase(listItem,$(driverOutput));
    });
    //doc.ready()
    });
//function
}());
