const ChangesStream = require('changes-stream');
const Request = require('request');
const Normalize = require('normalize-registry-metadata');
const fs = require('fs');
const db = 'https://replicate.npmjs.com';

var changes = new ChangesStream({
  db: db,
  include_docs: true,
  // highWaterMark: 4
});

// Request.get(db, function(err, req, body) {
 // var end_sequence = JSON.parse(body).update_seq;
  changes.on('data', function(change) {
    // if (change.seq >= end_sequence) {
    //   process.exit(0);
    // }	
    //console.log('here');
//     console.log(JSON.stringify(change.doc,null,4));
     if( change.doc.versions !== undefined){
     	console.log('==================================');    
	      let filtered_keys = (obj, filter) => {
        	 let key, keys = []
                 for (key in obj)
           	 if (obj.hasOwnProperty(key) && filter.test(key))
             		keys.push(key)
         	 return keys
        }
 
        var filtered_versions = filtered_keys(change.doc.versions,/\d.\d.\d*/);
 //     console.log(filtered_versions);

        for (let index in filtered_versions){
          var json_obj = new Object();
	 
        	var key = String(filtered_versions[index]);
                json_obj.scripts=change.doc.versions[key].scripts;
        	json_obj.name=change.doc.versions[key].name;
        	json_obj.version=change.doc.versions[key].version;
        	json_obj.homepage=change.doc.homepage;
        //	 json_obj.shasum=change.doc.dist.shasum;
        //	 json_obj.tarball=change.doc.dist.tarball;
          //console.log(json_obj);
          fs.writeFile('./output.txt', JSON.stringify(json_obj,null,4), { flag: 'a+' }, err => {});

        //console.log(filtered_versions[index]);
        }
  
     	console.log('==================================');
     }

    console.log('finding: '+change.seq);

//  console.log('finding: '+change.seq+' out of '+end_sequence);

//   if (change.doc.name) {
//	console.log(JSON.stringify (Normalize(change.doc),null,' '));
//        console.log(Normalize(change.doc));
//    }
  });
// });
