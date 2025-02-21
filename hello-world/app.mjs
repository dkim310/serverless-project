/**
 *
 * Event doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html#api-gateway-simple-proxy-for-lambda-input-format
 * @param {Object} event - API Gateway Lambda Proxy Input Format
 *
 * Context doc: https://docs.aws.amazon.com/lambda/latest/dg/nodejs-prog-model-context.html 
 * @param {Object} context
 *
 * Return doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html
 * @returns {Object} object - API Gateway Lambda Proxy Output Format
 * 
 */

import { Logger } from '@aws-lambda-powertools/logger';
//import moment from 'moment';

import * as moment from 'moment'

//import {AWS} from '@aws-sdk'; 
//import {moment} from '@moment'; 

//import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
//import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";

//const AWS = require('aws-sdk');
//const moment = require('moment');
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  PutCommand,
} from "@aws-sdk/lib-dynamodb";
const client = new DynamoDBClient({});
const documentClient = DynamoDBDocumentClient.from(client);


//const documentClient = new AWS.DynamoDB.DocumentClient();

const logger = new Logger({ serviceName: 'helloWorldService' });

export const lambdaHandler = async (event, context) => {
    
    let params = {
        TableName : process.env.DatabaseTable,
        Item: {
        ID: Math.floor(Math.random() * Math.floor(10000000)).toString(),
        created:  '20250220-104244',//moment().format('YYYYMMDD-hhmmss'),
        metadata:JSON.stringify(event),
        }
    }
    
    try {
        
            logger.info('this is lambda powertools logger');
            logger.info(params);
            let data = await documentClient.put(params).promise()

        
        return {
            'statusCode': 200,
            'body': JSON.stringify({
                message: 'hello this is production environment',
            })
        }
    } catch (err) {
        console.log(err);
        return err;
    }
};
