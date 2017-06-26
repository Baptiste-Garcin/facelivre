var neo4j = require('neo4j-driver').v1;

var driver = neo4j.driver("bolt://localhost:7687" || process.env.GRAPHENEDB_BOLT_URL, neo4j.auth.basic("neo4j" || process.env.GRAPHENEDB_BOLT_USER, "changeme" || process.env.GRAPHENEDB_BOLT_PASSWORD));


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
