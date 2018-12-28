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
  // //create reference to Hats in db
  // var hatRef = firebase.database().ref().child('Hats');
  //
  // //sync changes in Hats to site
  // hatRef.on('value', snap => {
  //     $('#object').html(JSON.stringify(snap.val(), null, 3));
  //   });
  //   hatRef.on('value', snap => console.log(snap.val()));

    $(document).ready(function(){
      //search database for item
      $("#search").click(function(){
        //grab a reference to object from the database with the String from itemName
        //objectname = String from itemName
        const dbRead = firebase.database().ref().child($('#searchName').val());
        dbRead.on('value', snap => {
            // $('#object').html(JSON.stringify(snap.val(), null, 3));
          //get timestamp from firebase and convert to javascript Date object
          let date = new Date(snap.val().Date);
          //print to object pre
          $('#object').html("Item: " + snap.val().Item +
              "\nCost: " + snap.val().Cost +
              "\nQuantity: " + snap.val().Quantity +
              "\nDate: " + (date.getMonth() + 1) + "-" + date.getDate() + "-" + date.getFullYear());
          });
      });
      //update quanitity of item
      $('#btnUpdate').click(function(){
        // //item we are updating is taken from the searchName txtbox
        // var itemQuantity = firebase.database().ref('bike/Quantity');
        // itemQuantity.transaction(function(currentQuantity){
        //   return (currentQuantity + 1);
        // });

        /* add validation to ensure that #searchName is not empty and that #searchName String exists in the database*/

        //grab database reference to the quantity of the String from the seachName txt feild
        const itemQuantity = firebase.database().ref( String($('#searchName').val()) + "/Quantity");

        itemQuantity.transaction(function(currentQuantity){
          /*add validation such that txtUpdate is not empty*/
          return (currentQuantity + parseInt($('#txtUpdate').val()));
        });
      //btnUpdate
      });

      //sync dropdown list changes
      const dbDropdown = firebase.database().ref();
      //add all itmes from database
      dbDropdown.on('child_added', snap => {
        //child added iterates through the database looking for all children
        //for each child in the database
        //we a add new option to select list
        //give that option the value of the current childs key
        //and lastly populate the list the the current childs Item name
        $('#list').append('<option value = ' + snap.key + '>' + snap.val().Item + '</option>');
      })
      // listens for changes for any child in the database
      dbDropdown.on('child_changed', snap => {
        //if there is change this method is invoked
        //we take the key from the child that was change and use it as our option value id
        //to update the new value in the list
        $('#list option[value='+snap.key+']').text(snap.val().Item);
      })
      //listens for any children removed from the database then updates the selectlist
      dbDropdown.on('child_removed', snap => {
        $('#list option[value='+snap.key +']').remove();
      })



    //doc.ready()
    });
}());
