# Blueprint Vite AWS CDK Infra

This template provides an AWS CDK-based infrastructure template for deploying React applications with a CI/CD pipeline.

**S3 for Static Hosting:**

An S3 bucket is configured to host the static files of the React application.
The bucket supports public or private access based on configuration and ensures secure storage with S3-managed encryption.

**CloudFront for Content Delivery:**

A CloudFront distribution is integrated with the S3 bucket to provide low-latency content delivery.
It enforces HTTPS, sets up custom error responses, and uses an Origin Access Identity (OAI) for secure access to the bucket.

**CI/CD Pipeline with AWS CodePipeline:**

The pipeline automates the build, test, and deployment of the React application.
GitHub Integration: Source code is fetched from a specified GitHub repository.
CodeBuild: Builds the React app, creates CloudFront invalidations, and generates deployment artifacts.
S3 Deployment: Uploads the build artifacts to the S3 bucket.

The CloudFront URL and the S3 bucket URL are outputted after running `cdk deploy` for easy access to the deployed application.



## Requirements
- Have a repository with a React Vite app. If you want to use another web bundler (ex. webpack)
you will need to update the `_createBuildProject` method in `lib/react_cdk_template`.
- AWS needs a Github Access token to fetch the latest pushes to the repository. You will need to add this secret to
`Secrets Manager`. *Note:* Each secret is $0.40, please check if there is an existing secret containing a Github access key
to the Stevens Blueprint GitHub organization before creating a new one.

## Deployment
- Fill the `TODOS` in `react_cdk_template`. You won't need to change any of the code, but you will need to specify the name for some 
of the services provided by AWS
- Fill out the `config/config.yaml` file.
- Make sure you have `AWS CLI` installed on your machine, and have the Stevens Blueprint credentials. See [AWS CLI Configuration](https://docs.aws.amazon.com/cli/latest/reference/configure/) for more information.
- Run the following commands
```
cdk synth
cdk bootstrap
cdk deploy
```
- The distribution with `CloudFront` takes around 15 min. If you want to verify the status of the deployment, you can visit [Cloud Formation](https://us-east-1.console.aws.amazon.com/cloudformation/). Make sure you are in the same region as the one specified in the `config.yaml` file. 

## Useful commands

* `npm run build`   compile typescript to js
* `npm run watch`   watch for changes and compile
* `npm run test`    perform the jest unit tests
* `npx cdk deploy`  deploy this stack to your default AWS account/region
* `npx cdk diff`    compare deployed stack with current state
* `npx cdk synth`   emits the synthesized CloudFormation template
