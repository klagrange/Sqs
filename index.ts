import * as AWS from 'aws-sdk';

class Sqs {
  readonly sqs: AWS.SQS;

  constructor() {
    this.sqs = new AWS.SQS({
      region: 'us-east-1',
    });
  }

  public async getQueueUrl(queueName: string) {
    const params = {
      QueueName: queueName,
    };
    try {
      const res = this.sqs.getQueueUrl(params).promise();
      return res;
    } catch (err) {
      console.log(err);
    }
  }

  public async createQueue(queueName: string) {
    const params = {
      QueueName: queueName,
    };

    try {
      const res = await this.sqs.createQueue(params).promise();
      return res;
    } catch (err) {
      console.log(err);
    }
  }

  public async sendMessage(
    queueUrl: string,
    messageBody: string,
    messageAttributes: AWS.SQS.SendMessageRequest['MessageAttributes']) {

    const params = {
      MessageBody: messageBody,
      QueueUrl: queueUrl,
      DelaySeconds: 0,
      MessageAttributes: messageAttributes,
    };

    try {
      const res = await this.sqs.sendMessage(params).promise();
      return res;
    } catch (err) {
      console.log(err);
    }
  }

  public async deleteMessage(queueUrl: string, receiptHandle: string) {
    const params = {
      QueueUrl: queueUrl,
      ReceiptHandle: receiptHandle,
    };

    try {
      const res = await this.sqs.deleteMessage(params).promise();
      return res;
    } catch (err) {
      console.log(err);
    }
  }

  public async receiveMessage(queueUrl: string) {
    const params = {
      QueueUrl: queueUrl,
      AttributeNames: [
        'All',
      ],
      MaxNumberOfMessages: 1,
      // MessageAttributeNames: [
      //   'STRING_VALUE',
      //   /* more items */
      // ],
      // ReceiveRequestAttemptId: 'STRING_VALUE',
      // VisibilityTimeout: 'NUMBER_VALUE',
      // WaitTimeSeconds: 'NUMBER_VALUE'
    };

    try {
      const res = this.sqs.receiveMessage(params).promise();
      return res;
    } catch (err) {
      console.log(err);
    }
  }
}

async function xxx() {
  const sqs = new Sqs();
  // const res1 = await sqs.createQueue();
  // console.log(res1);
  const queueSettings = await sqs.getQueueUrl('klagrange');
  const queueUrl = queueSettings.QueueUrl;

  const messageBody = JSON.stringify({
    a: 'a',
    b: 'b',
  });
  const messageAttributes = {
    smtm: {
      DataType: 'String',
      StringValue: 'kidmilli',
    },
  };

  // [...Array(10).keys()].map(async (n) => {
  //   console.log(n);
  //   const res2 = await sqs.sendMessage(queueUrl, messageBody, messageAttributes);
  //   console.log(res2);
  // });

  const res2 = await sqs.sendMessage(queueUrl, messageBody, messageAttributes);
  console.log(res2);

  // const res3 = await sqs.receiveMessage(queueUrl);
  // console.log(res3);
  // console.log('');

  // if (!res3.Messages) return;

  // res3.Messages.map(async (m) => {
  //   const receiptHandle = m.ReceiptHandle;
  //   console.log(receiptHandle);
  //   const resDel = await sqs.deleteMessage(queueUrl, receiptHandle);
  //   console.log(resDel);
  // });
}

// xxx();
