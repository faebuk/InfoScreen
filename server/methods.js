Meteor.methods({
	getNews: function(){
		this.unblock();
		var result = HTTP.call("GET", "http://www.20min.ch/rss/rss.tmpl?type=channel&get=1&limit=2&format=json");
		if (result.statusCode === 200) return JSON.parse(result.content)
		throw new Meteor.Error( 500, 'Could not request 20min.ch');
	},
	getTrains: function(){
		this.unblock();
		var result = HTTP.call("GET", "http://transport.opendata.ch/v1/connections?from=Murten&to=Bern&limit=3");
		if (result.statusCode === 200) return JSON.parse(result.content)
		throw new Meteor.Error( 500, 'Could not request 20min.ch');		
	}
})