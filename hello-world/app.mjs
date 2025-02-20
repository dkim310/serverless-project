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

const logger = new Logger({ serviceName: 'helloWorldService' });

export const lambdaHandler = async (event, context) => {
    try {
        
        logger.info('this is lambda powertools logger');
        console.log('this is normal console.log');
        
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
