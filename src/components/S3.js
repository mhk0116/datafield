/*
import _ from 'lodash'
import {s3Bucket} from './config'
export default class S3{

    constructor(App, response){
        this.App = App;
        this.response = response;

    }



    getObject(file){
        const s3 = this.App.s3;

        const options  ={
            Bucket: s3Bucket,
            Key: _.get(file, 'name')
        };

       return s3.getObject(options).createReadStream();
    }

    getDownloadUrl(file){

        const s3 = this.app.s3;
        const options  ={
            Bucket: s3Bucket,
            Key: _.get(file, 'name'),
            Expires: 3600, // one hour expires.
        };


        const url = s3.getSignedUrl('getObject', options);

        return url;

    }



}
*/
