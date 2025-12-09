import fs from 'node:fs';

export default function requestLogger(req, res, next) {
    const startTime = Date.now();

    let reqLogs = [];

    reqLogs.push(`Request Method: ${req.method}`);
    reqLogs.push(`Request URL: ${req.url}`);
    reqLogs.push(`Request Headers: ${req.headers}`);
    reqLogs.push(`Request Params: ${req.params}`);
    reqLogs.push(`Request Body: ${req.body}`);

    next();

    const reqTime = Date.now() - startTime;
    reqLogs.push(`Request Time: ${reqTime}ms`);

    let logContents = reqLogs.join('\n');
    logContents += '\n------------------------------\n';

    fs.appendFile('logs/logs.txt', logContents, (err) => {
        if (err) {
            console.error('Error while writing to logs', err);
        }
    });
}
