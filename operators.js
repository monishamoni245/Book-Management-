//MONGODB OPERATORS ->powerfull

//LOGICAL OPERATORS
//$inc ->Increment......in mongodb we specifically dont have the decrement operator....we just decrement by using -1 -2 using Increment
//$Min --> Minimum
//$Max --> Maximum
//$Set --> Used to set a data
//example of set --> book.title="xyz"

//$unset => removing a property from an object
//we can unset a particular property not the whole code in that case we use the $unsets
//example--->
/*
book={
title: "Hello"  //here we dont want to delete the object book...but we want to delete a property, title "hello" so we can use $unset
}
*/

//Array operators--->important
//$push--> inserting into the large position of the ARRAY
//so now if i want to insert another name in the below example then we use $push--->so tht it'll insert at thev end of the array
//example--->Name = ["aradhana", "xyzzz"]
//$POP --> is used to extract/remove/delete the last element of the array
//$PULL --> fetching or taking out an particular array...we can even acces the middle element
//$addToSet-->this is same as push but in push it allow duplicates...but $addToSet doesn't allow duplicates
