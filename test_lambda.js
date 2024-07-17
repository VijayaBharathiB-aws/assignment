var AWS = require('aws-sdk');
const ssm = new (require('aws-sdk/clients/ssm'))();

exports.handler = async (event) => {

    //retrieve SSM parameters
    const data = await ssm.getParameters({
        Names: [`USER_DATA`]
    }).promise();

    const response = {
        statusCode: 200,
        body: data,
    };

    let response_data = JSON.stringify(response.body.Parameters[0]);
    let res = JSON.parse(response_data);
    let usr_data = res.Value;
    console.log("response_data ", res.Value);

    if (usr_data) {
        //save response to S3
        await SavefiletoS3(usr_data);
    }

};

//function to save user info to S3
async function SavefiletoS3(userinfo) {

    var s3 = new AWS.S3();
    await s3.putObject({
        Bucket: 'assessmentuser',
        Key: 'user_info.txt',
        Body: userinfo,

    }).promise();



}