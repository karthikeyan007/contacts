var registration=require("../registration");



describe("registration",function(){
it("should register user details successfully",function(){
var jsondata=registration.users;
expect(jsondata).toEqual(users);
});

});