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
    this.names = ko.observableArray([]);
    // function to add name to the list
    this.addName = function(){
      var value = $("#input").val();

      if (value === ""){
        alert("Please write something~")
      }else{
        self.names.push(value);
        $("#input").val("");
      }
    };
    // retrieve a random name from the lsit
    this.getRandomName = function(){
      var name = self.names()[Math.floor(Math.random()*self.names().length)];
      console.log(name);
      $("#name-display").text(name);
    };
};
ko.applyBindings(myViewModel);
