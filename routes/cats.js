
const catRoutes = (app, fs) => {

    // variables
    const dataPath = './data/cats.json';

    // helper methods
    const readFile = (callback, returnJson = false, filePath = dataPath, encoding = 'utf8') => {
        fs.readFile(filePath, encoding, (err, data) => {
            if (err) {
                throw err;
            }

            callback(returnJson ? JSON.parse(data) : data);
        });
    };

    const writeFile = (fileData, callback, filePath = dataPath, encoding = 'utf8') => {

        fs.writeFile(filePath, fileData, encoding, (err) => {
            if (err) {
                throw err;
            }

            callback();
        });
    };

    // READ
    app.get('/cats', (req, res) => {
        fs.readFile(dataPath, 'utf8', (err, data) => {
            if (err) {
                throw err;
            }

            res.send(Object.values(JSON.parse(data)));
        });
    });

    // CREATE
    app.post('/cats', (req, res) => {

        readFile(data => {
            const newCatId = Object.keys(data).length + 1;

            // add the new cat
            data[newCatId.toString()] = req.body;

            writeFile(JSON.stringify(data, null, 2), () => {
                res.status(200).send('new cat added');
            });
        },
            true);
    });


    // UPDATE
    app.put('/cats/:id', (req, res) => {

        readFile(data => {

            // add the new cat
            const catId = req.params["id"];
            data[catId] = req.body;

            writeFile(JSON.stringify(data, null, 2), () => {
                res.status(200).send(`cats id:${catId} updated`);
            });
        },
            true);
    });


    // DELETE
    app.delete('/cats/:id', (req, res) => {

        readFile(data => {

            // add the new cat
            const catId = req.params["id"];
            delete data[catId];

            writeFile(JSON.stringify(data, null, 2), () => {
                res.status(200).send(`cat id:${catId} removed`);
            });
        },
            true);
    });
};

module.exports = catRoutes;