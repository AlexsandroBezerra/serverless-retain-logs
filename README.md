# Serverless Retains Logs

Serverless plugin to retainn all log groups when deleting lambdas.

## What does it do?

It helps you to add the "DeletionPolicy" attribute in your log groups in your CloudFormation Template Resouces. That's a solution for you maintain your logs when deleting your functions.

## Usage

1. Install package:

```bash
npm install --save-dev @alexsandrobezerra/serverless-retain-logs
```
   
2. Add `@alexsandrobezerra/serverless-retain-logs` to your plugins lists

```yaml
plugins:
  - '@alexsandrobezerra/serverless-retain-logs'
```
