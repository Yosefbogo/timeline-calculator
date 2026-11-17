// Synthetic performance check; does not read any personal history.
const K=require('../core.js');
const rows=Array.from({length:240000},(_,i)=>({latitudeE7:406700000,longitudeE7:-739400000,timestamp:new Date(Date.UTC(2026,0,1)+i*60000).toISOString(),accuracy:10,padding:'x'.repeat(220)}));
const text=JSON.stringify({locations:rows});const begin=performance.now();
const data=K.normalize(JSON.parse(text));
const config={lat:40.67,lon:-73.94,radius:80,maxGap:5,maxAccuracy:100,timezone:'America/New_York',from:'2026-11-02',to:'2026-11-06',days:[0,1,2,3,4,5],fridayMorningOnly:true,schedule:[{name:'Chassidus',enabled:true,start:'08:00',end:'09:00'},{name:'Nigla Aleph',enabled:true,start:'11:00',end:'14:00'},{name:'Nigla Beis',enabled:true,start:'15:00',end:'19:00'}]};
const result=K.analyze(data,config);
console.log(JSON.stringify({syntheticMB:(Buffer.byteLength(text)/1048576).toFixed(1),points:data.points.length,parseAndCalculateSeconds:((performance.now()-begin)/1000).toFixed(2),rows:result.rows.length}));
