'use strict';

const Hapi = require('hapi');

const server = Hapi.server({
    port: 3000,
    host: 'localhost'
});

server.route({
    method: 'GET',
    path: '/',
    handler: (request, h) => {

        // Make a Date object
        var now = new Date()

        // Get UTC time
        var utc = now.getTime() + (now.getTimezoneOffset() * 60000)

        // Get UTC+1
        var nd = new Date(utc + (3600000*1))

        // Convert UTC+1 to beats
        var beat =  Math.trunc((nd.getSeconds() + (nd.getMinutes() * 60) + (nd.getHours() * 3600)) / 86.4)
        return '@' + beat

    }
});

const init = async () => {

    await server.start();
    console.log(`Server running at: ${server.info.uri}`);
};

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

init();

