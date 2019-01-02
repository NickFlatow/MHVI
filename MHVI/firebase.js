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


  // function redirect(){
  //   //get currentUser from firebase
  //   let user = firebase.auth().currentUser;
  //   //redirect to proper page
  //   if (user.email == 'admin@mhvi.com'){
  //     window.location = "admin.html";
  //   } else if (user.email == 'driver@mhvi.com'){
  //     window.location = "driver.html";
  //   }
  // }

  $(document).ready(function(){
    //search database for item

    // DOESN'T LIKE SPACE PRODUCES ERROR WITH left shoes
    $("#search").click(function(){
        //grab string from searchName textbox
        searchDatabase($('#searchName').val(),$('#object'));
    });
    //update quanitity of item
    $('#btnUpdate').click(function(){
      updateDatabase(String($('#searchName').val()),$('#txtUpdate').val());
    });

    //using validation for driver.html form
    // $('#driverBtnUpdate').click(function(){
    //   let item = $('#list').find(":selected").text()
    //   let quantity = $('#driverTxtUpdate').val();
    //
    //   // updateDatabase(item,quantity);
    //   if (item != 'Select Item'){
    //     updateDatabase(item,quantity);
    //   }else{
    //     //change to validation
    //     alert("Select an item from the drop down box")
    //   }
    // });
    $('#loginBtn').click(function(){
      let usr = $('#userName').val();
      let pwd = $('#password').val();

      //authenticate login information
      firebase.auth().signInWithEmailAndPassword(usr, pwd).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        alert("Error : " + errorMessage);
      });
      //check if user is logged in
      firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          // check which user signed in and redirect accordingly.
          if (user.email == 'admin@mhvi.com'){
            window.location.href = "admin.html";
          }
          else if (user.email == 'driver@mhvi.com'){
            window.location = "driver.html";
          }
        }
      //onAuthStateChanged
      });
    //login button
    });
    $('#logoutBtn').click(function(){
      firebase.auth().signOut();
      window.location = "login.html";
    });

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
        $('#adminList').append('<option value = ' + snap.key + '>' + snap.val().Item + '</option>');
      })
      // listens for changes for any child in the database
      dbDropdown.on('child_changed', snap => {
        //if a child is modified this method is invoked
        //we take the key from the child that was changed and plug it in to our option value
        //to update the new text displayed in the list
        $('#list option[value='+snap.key+']').text(snap.val().Item);
        $('#adminList option[value='+snap.key+']').text(snap.val().Item);
      })
      //listens for any children removed from the database then updates the selectlist
      dbDropdown.on('child_removed', snap => {
        $('#list option[value='+snap.key +']').remove();
        $('#adminList option[value='+snap.key +']').remove();
      })

    $('#list').change(function() {
      let listItem = $('#list').find(":selected").text();
      if (listItem != "Select Item"){
        searchDatabase(listItem,$(driverOutput));
      }
    });
    $('#adminList').change(function() {
      let listItem = $('#adminList').find(":selected").text();
      if (listItem != "Select Item"){
        searchDatabase(listItem,$(output));
      }
    });
    //doc.ready()
    });
//function
}());
