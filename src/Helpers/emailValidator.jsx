

export function ValidateEmail(inputText)
{
var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
	if(inputText.match(mailformat))
	{
	// alert("Valid email address!");
	return '';
	}
	else
	{
	return "You have entered an invalid email address!";
	}
}