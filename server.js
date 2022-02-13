const express = require('express')
const next = require('next')
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare().then(() => {
    const server = express()

    server.get('/api/data', (req, res) => {

        const data = {
            data: [
                {id : 1 , name : "test01"},
                {id : 2 , name : "test02"}
            ],
            status: 'success '
        }

        res.status(200).json(data);
    });

    server.get('/item/:id', (req, res) => {
        //res.json(req.params.id)
        return app.render(req, res, `/item/${req.params.id}`, req.params.id);
    });


    server.get('*', (req, res) => {
        return handle(req, res)
    })

    server.listen(3000, (err) => {
        if (err)
            throw err
        console.log('> Ready on http://localhost:3000')
    })
})

    .catch((ex) => {
        console.error(ex.stack)
        process.exit(1)
    })