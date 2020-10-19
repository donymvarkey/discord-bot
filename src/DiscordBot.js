const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser')

const {initBot} = require('./controllers/Bot')

class DiscordBot{
    /**
     * @constructor
     * @param options  thsocket of the app
     */
    constructor(options){

        this.options = options;

        //for general http server
        this.api = null;
    }

    /**
     * @configServer
     * used to initialise the api attribute with an object of express
     */
    async configServer(){

        var api = express();

        api.use(bodyParser.urlencoded({limit: '10mb', extended: true}));
        api.use(bodyParser.json({limit: '10mb', extended: true}));
        api.use(cors()); //allow cross domain requesting of urls

        //url to check health of server
        api.use('/',function(req,res){

            res.json({
                health : true,
                message: 'Server running fine. No worries!!!'
            });

        });
        //ignore this route
        api.use('/s',express.static('./src/public'))
        api.set('x-powered-by',false);
        api.set('signature',this.options.signature);

        this.api     = api;

        return true;
    }

    async mountRoutes(){
        initBot(this.options.token);
        return true;
    }
    /**
     * @startServer
     * start the server on the specifed port in the options
     */
    async startServer(){
        var serverConfigStatus = await this.configServer();

        if(serverConfigStatus !== true){
            console.log("FATAL: Failed to configure server")
            return false;
        }

        await this.mountRoutes();

        // start the server
        this.api.listen( this.options.port,() =>{
            console.log("INFO: Server Started.");
            console.log("INFO: Listening on "+this.options.port);
        });
    }

}

module.exports = DiscordBot;
