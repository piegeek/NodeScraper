const fetch = require('node-fetch');
const fs = require('fs');
const path = require('path');

function readFile(filename) {
    let data = fs.readFileSync(path.join(process.cwd(), filename));
    return JSON.parse(data.toString())['Form data'];
}

const config = {
    url: 'http://sugang.snu.ac.kr/sugang/cc/cc100.action',
    maxPageNum: 791
};

async function getData(params) {
    let promises = [];
    
    for (let i = 1; i < config.maxPageNum + 1; i++) {
        params['pageNo'] = String(i);

        promises.push(fetch(config.url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: params 
        }).then(res => {
            console.log('Request finished!');
        }).catch(err => {
            console.error(err);
        }));

        console.log('Request Sent!');
    }

    Promise.all(promises)
    .then(data => {
        console.log('All Finished');
    })
    .catch(err => {
        console.error(err);
    });
}

let params = readFile('params.txt');

getData(params);