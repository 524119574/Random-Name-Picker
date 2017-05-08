
//
// function setNames(){
//
// }



// create a custom binding for enter key
ko.bindingHandlers.enter = {
    init: function (element, valueAccessor, allBindings, viewModel) {
        var callback = valueAccessor();
        $(element).keypress(function (event) {
            var keyCode = (event.which ? event.which : event.keyCode);
            if (keyCode === 13) {
                callback.call(viewModel);
                return false;
            }
            return true;
        });
    }
};

function myViewModel() {
    var self = this;

    // check whether names array exist in local storage
    if(localStorage.getItem('names')) {
     this.names = ko.observableArray(JSON.parse(localStorage.names));
    } else {
      this.names = ko.observableArray([]);
    }

    // function to add name to the list
    this.addName = function(){
      var value = $("#input").val();
      if (value === ""){
        alert("Please write something~")
      }else{
        self.names.push(value);
        $("#input").val("");
      }
    // update the local storage
    localStorage.setItem("names", JSON.stringify(this.names()));
    };
    // retrieve a random name from the lsit
    this.getRandomName = function(){
      if (self.names().length === 0){
        alert("No name is stored, please input some names and try again")
      }else{
        var name = self.names()[Math.floor(Math.random()*self.names().length)];
        console.log(name);
        $("#name-display").text("The chosen one is " + name);
      }
    };

    this.clearStorage = function(){
      localStorage.setItem("names", "");
      self.names([]);
    }
};
ko.applyBindings(myViewModel);
