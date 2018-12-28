// Wait for the DOM to be ready
$(function() {
  // Initialize form validation on the form.
  $("form[name='mhvi']").validate({
    // Specify validation rules
    rules: {
      name: {
        required: true,
        digits:false
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
      height: {
        required:"Please enter your height",
        digits: "you must enter positive numbers"
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
});
