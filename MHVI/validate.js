$(function() {
  //custom method to check that fields only contain letters and spaces
  jQuery.validator.addMethod("lettersonly", function(value, element) {
    return this.optional(element) || /^[a-z\s]+$/i.test(value);
  }, "Only alphabetical characters and spaces");

  $("form[name='mhvi']").validate({
    // Specify validation rules
    rules: {
      item: {
        required: true,
        // lettersonly:true
      },
      quantity:{
        required: true,
        digits: true,
        min:0,
        max:850
      },
      cost:{
        required:true,
        digits:true,
        min:0,
        max:850
      }
    },
    // Specify validation error messages
    messages: {
      item: {
        required:"Please enter an Item",
      },
      weight: {
        required: "Please enter your weight",
        digits: "you must enter positive numbers",
        min: "your weight must be at least 2 digits"
      }
    },
    //don't use parentheses when calling the function
    submitHandler: dbWrite
  });
  $("#driver").validate({
      rules: {
        list: {
          required: true
        },
        driverTxtUpdate:{
          required: true,
          range:[-100,100]
        }
      },
      messages: {
        list: {
          required: "Please select an option from the dropdown menu"
        },
        driverTxtUpdate:{
          required: "Please enter the quantity"
        }
      },
  });
  jQuery.validator.addClassRules('test', {
      rules: {
        cost:{
          required: true,
          digits: true
        }
      }
    });

  $('#driverDropOff').click(function() {
    //check if driver form meets validation rules
    if ($('#driver').valid()) {
      let item = $('#list').find(":selected").text();
      let quantity = $('#driverTxtUpdate').val();
      updateDatabase(item,(-1 * quantity));
    }
  });
  $('#driverPickUp').click(function() {
    //check if driver form meets validation rules
    if ($('#driver').valid()) {
      let item = $('#list').find(":selected").text();
      let quantity = $('#driverTxtUpdate').val();
      updateDatabase(item,quantity);
    }
  });

  // $('#tableBody').on('click','.update',function(){
  //     var $row = $(this).closest("tr");   // Find the row
  //     var $text = $row.find(".up").text(); // Find the text
  //     console.log($text);
  // })
  $('#tableBody').on('click','.update',function(){
      let $row = $(this).closest("tr");   // Find the row
      let $nextRow = $row.next("tr"); // Find the next row down

      $nextRow.toggle();
  });
  $('#tableBody').on('click','.submit',function(){
    let $row = $(this).closest("tr"); // get the row where the button was pushed
    let $prevRow = $row.prev(); // get the previous row
    let $item = $prevRow.find(".up").text(); // Find the item we are upadting

    console.log($row.valid());
    if ($row.valid()){ //check if row meet validation requirments
      let $cost = $row.find("input[name = 'cost']").val();
      updateDatabase($item,$cost);
    }
    // console.log($row);
  });
  $("#adminSelectForm").validate({
      rules: {
        adminList: {
          required: true
        },
        adminSelectQuantity:{
          required: true,
          range:[-100,100]
        }
      },
      messages: {
        adminList: {
          required: "Please select an option from the dropdown menu"
        },
        adminSelectQuantity:{
          required: "Please enter the quantity"
        }
      },
      submitHandler: adminSelectForm
  });
//function
});
