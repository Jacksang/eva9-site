# [BUG-UAT-014] IAM policies missing from template.yaml — Lambda functions lack permissions

| Field | Value |
|-------|-------|
| **Status** | `[ ] New` |
| **Severity** | 🔴 Critical |
| **Source Test** | E01-system-uat.md (T07-03) |
| **Component** | template.yaml |

## Steps to Reproduce

**Code Review:**
```bash
grep -ic 'policy\|role\|Policies' template.yaml
# Output: 0 — no IAM policies defined anywhere
```

## Expected Behavior

All Lambda functions should have explicit IAM policies granting:
- DynamoDB read/write access (on the specific tables they use)
- SES `SendEmail` permission (for register and contact functions)
- CloudWatch log write access (implicit, but should be explicit)

## Actual Behavior

template.yaml has zero IAM policies or roles defined. Lambda functions will get the default SAM execution role with minimal permissions. Deploying this template will fail when functions try to access DynamoDB or SES.

## Suggested Fix

Add a shared IAM role with inline policies in template.yaml:
```yaml
  LambdaExecutionRole:
    Type: AWS::IAM::Role
    Properties:
      AssumeRolePolicyDocument:
        Version: '2012-10-17'
        Statement:
          - Effect: Allow
            Principal:
              Service: lambda.amazonaws.com
            Action: sts:AssumeRole
      Policies:
        - PolicyName: DynamoDBAccess
          PolicyDocument:
            Version: '2012-10-17'
            Statement:
              - Effect: Allow
                Action:
                  - dynamodb:PutItem
                  - dynamodb:GetItem
                  - dynamodb:Query
                  - dynamodb:UpdateItem
                Resource: !Sub 'arn:aws:dynamodb:${AWS::Region}:${AWS::AccountId}:table/eva9-*'
```
Attach this role to all Lambda functions via the `Role` property.
