const express = require('express');
const prompt = require('prompt');
const fs = require('fs');

const app = express();
const port = 3001;


const requestUserInput = () => {
    console.log(`
        You will now be prompted for the following:
         - endpoint url (requires first character slashes) 
         - file contents which will be returned when the endpoint is accessed`
    )
    prompt.start()
    prompt.get(['endpoint', 'filecontents'], (err, result) => {
        if (err) {
            console.error(err);
        }

        setupFile(result.filecontents);
        setupEndpoint(result.endpoint);
        serverListen();
    });

};

const setupFile = (fileContent) => {
    console.log(`writing '${fileContent}' to cert challenge file`);
    try {
        fs.writeFileSync('./cert-challenge-file', fileContent);
    } catch (err) {
        console.error("error writing contents to challenge file:");
        console.error(err);
    }
};

const setupEndpoint = (endpoint) => {
    const fullPath = `${endpoint}`;
    console.log("setting up challenge endpoint at the following url:")
    console.log(fullPath);

    app.get(fullPath, (req, res) => {
        console.log("request for cert file made");
        res.sendFile('cert-challenge-file', { root: __dirname });
    });
}

const serverListen = () => {
    app.listen(port, () => console.log("Server ready to deliver cert files"));
}

app.get('/', (req, res) => {
    console.log("root attempt made");
    res.send('hello')
});

requestUserInput();