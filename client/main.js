Template.newsContainer.helpers({
  news: function(){
    return Template.instance().news.get();
  }
});

Template.newsContainer.onCreated(function(){
  var self = this;

  self.news = new ReactiveVar();

  Meteor.call("getNews", function(error, result){
    self.news.set(result.channel.item);
  });  

  Meteor.setInterval(function(){
    Meteor.call("getNews", function(error, result){
      self.news.set(result.channel.item);
    });
  }, 10000);
});

Template.trainContainer.helpers({
  trains: function(){
    return Template.instance().trains.get();
  },
  format: function(type, value){
    if(type === "date"){
      var date = new Date(value);
      return date.getHours().toString() + ":" + date.getMinutes().toString();
    }else if(type === "time"){
      return value.replace("00d", "");
    }
  }
});

Template.trainContainer.onCreated(function(){
  var self = this;

  self.trains = new ReactiveVar();

  Meteor.call("getTrains", function(error, result){
    console.log(result);
    self.trains.set(result.connections);
  });  

  Meteor.setInterval(function(){
    Meteor.call("getTrains", function(error, result){
      self.trains.set(result.connections);
    });
  }, 10000);
});


