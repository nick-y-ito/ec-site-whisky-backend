#!/usr/bin/env node
import 'dotenv/config';
import 'source-map-support/register';

import * as cdk from 'aws-cdk-lib';

import { RestApiStack } from '../lib/RestApiStack';

const APP_NAME = process.env['APP_NAME'] || '';
const STAGE = process.env['STAGE'] || 'dev';

const ACCOUNT = process.env['AWS_ACCOUNT_ID'] || '';
const REGION = process.env['AWS_REGION'] || '';

const app = new cdk.App();

new RestApiStack(app, `${APP_NAME}-RestApiStack-${STAGE}`, {
  env: { account: ACCOUNT, region: REGION },
});
