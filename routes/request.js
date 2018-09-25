var express = require('express'); 
var router = express.Router(); 

router.get('/', function(req, res, next) {  
        res.render('request', { title: 'shox request' });  
    });

router.post("/process_query", (req, res) => {
        var db = req.db;
        var collection_runs = db.get("runs");
        var collection_processing_queue = db.get("processing_queue"); 

        var dtype = req.body.dtype;
        console.log(dtype);

        var query = JSON.parse(req.body.query);
        console.log(query);

        var priority = req.body.priority;
        console.log(priority);

        collection_runs.find(query,
                            {name:1, number:1,
                                    'data' : {'$elemMatch': {'rse': 'UC_OSG_USERDISK'}}},
                        
                             function(e, docs){
                                 var ret = [];
                                 for(var i=0; i<docs.length; i++){
                                     console.log(docs[i]);

                                     docs[i]['dtype'] = dtype;

                                     var doc = {
                                             'startTime': null,
                                             'endTime': null,
                                             'createdOn': new Date(Date.now()).toISOString(),
                                             'priority': priority,
                                             'error': false,
                                             'payload': docs[i]
                                         }

                                     collection_processing_queue.insert(doc);
                                     console.log(doc);
                                         
                                 }
                                 console.log(docs);
                                 res.render('request_confirm',
                                            { title: 'shox back',
                                                   thisManyRuns:docs.length});

                             });
    });



module.exports = router;