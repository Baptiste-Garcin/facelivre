var neo4j = require('neo4j-driver').v1;

if(process.env.NODE_ENV === 'development') {
  var url = "bolt://localhost:7687";
  var loggin = "neo4j";
  var password = "changeme";
} else {
  var url = process.env.GRAPHENEDB_BOLT_URL;
  var loggin = process.env.GRAPHENEDB_BOLT_USER;
  var password = process.env.GRAPHENEDB_BOLT_PASSWORD
}

var driver = neo4j.driver(url, neo4j.auth.basic(loggin, password));

module.exports.getSession = function(request){
    if(request.neo4jSession)
          return request.neo4jSession;
    else
    {
        request.neo4jSession = driver.session();
        return request.neo4jSession;
    }
};

module.exports.getSessionOnce = function()
{
    return driver.session();
};
