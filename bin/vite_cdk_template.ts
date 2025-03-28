#!/usr/bin/env node
import * as cdk from "aws-cdk-lib";
import { ViteInfraTemplate } from "../lib/vite_cdk_template-stack";
import { devProps, prodProps } from "../config";

const app = new cdk.App();
const envConfigs = [devProps, prodProps];
envConfigs.forEach((envConfig) => {
  if (envConfig.isDeploy) {
    const stackName = envConfig.stackName;
    console.log(`Deploying stack: ${stackName}`);
    new ViteInfraTemplate(app, stackName, {
      ...envConfig,
      description: `CRM Admin Infra Stack for ${envConfig.environmentType}`,
    });
  }
});

app.synth();
