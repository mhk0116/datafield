/*
import _ from 'lodash'
import S3 from './s3'

class AppRouter {

    constructor(App) {
        this.App = App;
        this.setupRouters();
    }
    setupRouters() {

       const App = this.App;

// root routing.
       App.get('/', (req, res, next) => {

           return res.status(200).json({
               version: version
           });

       });

       // Download routing

             app.get('/api/download/:id', (req, res, next) => {

                 const fileId = req.params.id;
                 db.collection('files').find({_id: ObjectID(fileId)}).toArray((err, result) => {

                     const fileName = _.get(result, '[0].name');
                     if (err || !fileName) {

                         return res.status(404).json({
                             error: {
                                 message: "File not found."
                             }
                         })
                     }


                     // Download file from S3 service
                     const file = _.get(result, '[0]');
                     const downloader = new S3(app, res);


                     // return downloader.download(file); Proxy download from s3 service

                     // Download Directly from S3


                     const downloadUrl = downloader.getDownloadUrl(file);

                     return res.redirect(downloadUrl);


*/
