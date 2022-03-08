let validateForm = (form) =>{

        
        
    //if length of array of form values less then six
    if(Object.values(form).length < 6){

        console.log("less then 6 fields");
        setError(true);
        setMessage("* All fields are required.")
    }

    else if (!parseInt(form.price) || !parseInt(form.year)){

        setError(true);
        setMessage("* Price or year must be a number");

    }}

    //isNumeric: function (values, value) {
        if (typeof value === 'number') {
          return true;
        }
        return validations.matchRegexp(values, value, /^[-+]?(?:\d*[.])?\d+$/);
      //}
     // if( parseInt( myInteger ) == myInteger && myInteger > 0 )
      // myInteger is an integer AND it's positive