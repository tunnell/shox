var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'shox: do we Still Have Our Xenon data?' });
});

router.get('/data_size', function(req, res) {
        var db = req.db;
        var collection = db.get('runs');
        var key = '$data.host'
        collection.aggregate([
                              {'$unwind' : '$data'},
                              {'$match' : {'data.lineage_hash' : {'$exists' : true}}},
                              {'$unwind' : '$data.meta.chunks'},
                              {'$group' : {'_id' : key,
                                           'dataSize' : {'$sum' : '$data.meta.chunks.filesize'}}},
        {'$project' : {'name' : '$_id',
                       '_id' : 0,
                       'y' : {'$divide' : ['$dataSize', 1e9]}}},
                              ],
                             {},
                             function(e, docs){
                                 console.log(docs);
                                 res.render('data_size', {
                                         "title" : "shox data size",
                                             "docs" : JSON.stringify(docs),
                                             });
                             });
    });

router.get('/workers', function(req, res) {
        var db = req.db;
        var collection = db.get('workers');
        collection.aggregate([
                              {$match: {endTime: null}},
                              {$sort: {startTime: 1}}
                              ],
                             {},
                             function(e,docs){
                                 res.render('workers', {
                                         "title" : "shox workers",
                                             "runs" : docs
                                             });
                             });
    });

router.get('/processing_queue', function(req, res) {
        var db = req.db;
        var collection = db.get('processing_queue');
        collection.aggregate([
                              {$match: {endTime: null, error: false}},
                              {$sort: {startTime: 1, priority: -1, createdOn: 1}}
                              ],
                             {},
                             function(e,docs){
                                 res.render('processing_queue', {
                                         "title" : "shox processing queue status",
                                             "runs" : docs
                                             });
                             });
    });

router.get('/run_status', function(req, res) {
        var db = req.db;
        var collection = db.get('runs');
        collection.aggregate([
			      {$addFields : {types : '$data.type'}},
			      {$project: {
				      _id : 0,
					  number : 1,
                                          has_raw_records : {$in : ['raw_records', '$types']},
                                          has_records : {$in : ['records', '$types']},
                                          has_peaks : {$in : ['peaks', '$types']},
                                          has_peak_basics : {$in : ['peak_basics', '$types']},
                                          has_peak_positions : {$in : ['peak_positions', '$types']},
                                          has_peak_classification : {$in : ['peak_classification', '$types']},
                                          has_n_competing : {$in : ['n_competing', '$types']},
                                          has_event_basics : {$in : ['event_basics', '$types']},
                                          has_event_positions : {$in : ['event_positions', '$types']},
                                          has_event_info : {$in : ['event_info', '$types']},
                                          has_events : {$in : ['events', '$types']},
                                          has_corrected_areas : {$in : ['corrected_areas', '$types']},
                                          has_energy_estimates : {$in : ['energy_estimates', '$types']},
					  }},
			      {$sort: {number: -1}},
			      ],
                             {},
			     function(e,docs){
			     res.render('run_status', {
				     "title" : "shox runs status",
				         "runs" : docs
					});
			     });
    });


router.get('/processing_status', function(req, res) {
        var db = req.db;
        var collection = db.get('runs');
        collection.aggregate([
                              {$addFields : {types : '$data.type'}},
                              {$project: {
                                      _id : 0,
                                          number : 1,
                                          has_raw_records : {$in : ['raw_records', '$types']},
                                          has_records : {$in : ['records', '$types']},
                                          has_peaks : {$in : ['peaks', '$types']},
                                          has_peak_basics : {$in : ['peak_basics', '$types']},
                                          has_peak_positions : {$in : ['peak_positions', '$types']},
                                          has_peak_classification : {$in : ['peak_classification', '$types']},
                                          has_n_competing : {$in : ['n_competing', '$types']},
                                          has_event_basics : {$in : ['event_basics', '$types']},
                                          has_event_positions : {$in : ['event_positions', '$types']},
                                          has_event_info : {$in : ['event_info', '$types']},
                                          has_events : {$in : ['events', '$types']},
                                          has_corrected_areas : {$in : ['corrected_areas', '$types']},
                                          has_energy_estimates : {$in : ['energy_estimates', '$types']},
                                         
                                          }},
                              {$sort: {number: -1}},
			      {$project : {
				      _id : 0,
					  number : 1,
                                          has_raw_records : {'$cond' : ['$has_raw_records', 1, 0]},
                                          has_records : {'$cond' : ['$has_records', 1, 0]},
                                          has_peaks : {'$cond' : ['$has_peaks', 1, 0]},
                                          has_peak_basics : {'$cond' : ['$has_peak_basics', 1, 0]},
                                          has_peak_positions : {'$cond' : ['$has_peak_positions', 1, 0]},
                                          has_peak_classification : {'$cond' : ['$has_peak_classification', 1, 0]},
                                          has_n_competing : {'$cond' : ['$has_n_competing', 1, 0]},
                                          has_event_basics : {'$cond' : ['$has_event_basics', 1, 0]},
                                          has_event_positions : {'$cond' : ['$has_event_positions', 1, 0]},
                                          has_event_info : {'$cond' : ['$has_event_info', 1, 0]},
                                          has_events : {'$cond' : ['$has_events', 1, 0]},
                                          has_corrected_areas : {'$cond' : ['$has_corrected_areas', 1, 0]},
                                          has_energy_estimates : {'$cond' : ['$has_energy_estimates', 1, 0]},
					  }},
			      {$group : {_id : "",
                                          total : {$sum : 1},
                                          has_raw_records : {$sum : '$has_raw_records'},
                                          has_records : {$sum : '$has_records'},
                                          has_peaks : {$sum : '$has_peaks'},
                                          has_peak_basics : {$sum : '$has_peak_basics'},
                                          has_peak_positions : {$sum : '$has_peak_positions'},
                                          has_peak_classification : {$sum : '$has_peak_classification'},
                                          has_n_competing : {$sum : '$has_n_competing'},
                                          has_event_basics : {$sum : '$has_event_basics'},
                                          has_event_positions : {$sum : '$has_event_positions'},
                                          has_event_info : {$sum : '$has_event_info'},
                                          has_events : {$sum : '$has_events'},
                                          has_corrected_areas : {$sum : '$has_corrected_areas'},
                                          has_energy_estimates : {$sum : '$has_energy_estimates'},
						  }},
                              ],
			{},
				function(e,docs){
                                    var plotting_docs = [];

                                    var doc = docs[0];
                                    console.log(docs);
                                    for(var attributename in doc){
                                        if(attributename == '_id') {
                                            continue;
                                        }
                                        if(attributename == 'total') {  continue; }

                                        plotting_docs.push({"name": attributename.slice(4),
                                                    "y" : doc[attributename]/doc['total']*100})

                                        
                                    };
                                    console.log(plotting_docs);

                res.render('processing_status', {
			"title" : "shox processing status",
                            "docs" : JSON.stringify(plotting_docs)
                            });
            });
    });

module.exports = router;
