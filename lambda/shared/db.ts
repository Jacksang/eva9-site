/**
 * DynamoDB client and helpers.
 * Configures AWS SDK v3 with region from env, falls back to us-east-1.
 */
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import {
  DynamoDBDocumentClient,
  GetCommand,
  PutCommand,
  QueryCommand,
  UpdateCommand,
  ScanCommand,
  DeleteCommand,
} from '@aws-sdk/lib-dynamodb';

const region = process.env.AWS_REGION || 'us-east-1';
const client = new DynamoDBClient({ region });
export const docClient = DynamoDBDocumentClient.from(client);

const prefix = process.env.TABLE_PREFIX || 'eva9';

export function table(name: string): string {
  return `${prefix}-${name}`;
}

export async function get<T>(tableName: string, key: Record<string, unknown>): Promise<T | null> {
  const result = await docClient.send(new GetCommand({ TableName: tableName, Key: key }));
  return (result.Item as T) ?? null;
}

export async function put(tableName: string, item: Record<string, unknown>): Promise<void> {
  await docClient.send(new PutCommand({ TableName: tableName, Item: item }));
}

export async function query<T>(
  tableName: string,
  keyCondition: Record<string, unknown>,
  indexName?: string,
  limit?: number,
): Promise<T[]> {
  const result = await docClient.send(
    new QueryCommand({
      TableName: tableName,
      IndexName: indexName,
      KeyConditionExpression: Object.keys(keyCondition)
        .map((k) => `#${k} = :${k}`)
        .join(' AND '),
      ExpressionAttributeNames: Object.fromEntries(
        Object.keys(keyCondition).map((k) => [`#${k}`, k]),
      ),
      ExpressionAttributeValues: Object.fromEntries(
        Object.entries(keyCondition).map(([k, v]) => [`:${k}`, v]),
      ),
      Limit: limit,
    }),
  );
  return (result.Items as T[]) ?? [];
}

export async function scan<T>(
  tableName: string,
  filters?: Record<string, unknown>,
  limit?: number,
): Promise<T[]> {
  const params: Record<string, unknown> = { TableName: tableName, Limit: limit };
  if (filters && Object.keys(filters).length > 0) {
    params.FilterExpression = Object.keys(filters)
      .map((k) => `#${k} = :${k}`)
      .join(' AND ');
    params.ExpressionAttributeNames = Object.fromEntries(
      Object.keys(filters).map((k) => [`#${k}`, k]),
    );
    params.ExpressionAttributeValues = Object.fromEntries(
      Object.entries(filters).map(([k, v]) => [`:${k}`, v]),
    );
  }
  const result = await docClient.send(new ScanCommand(params));
  return (result.Items as T[]) ?? [];
}

export async function update(
  tableName: string,
  key: Record<string, unknown>,
  updates: Record<string, unknown>,
): Promise<void> {
  const setClauses = Object.keys(updates).map((k) => `#${k} = :${k}`);
  await docClient.send(
    new UpdateCommand({
      TableName: tableName,
      Key: key,
      UpdateExpression: `SET ${setClauses.join(', ')}`,
      ExpressionAttributeNames: Object.fromEntries(
        Object.keys(updates).map((k) => [`#${k}`, k]),
      ),
      ExpressionAttributeValues: Object.fromEntries(
        Object.entries(updates).map(([k, v]) => [`:${k}`, v]),
      ),
    }),
  );
}

export async function remove(tableName: string, key: Record<string, unknown>): Promise<void> {
  await docClient.send(new DeleteCommand({ TableName: tableName, Key: key }));
}
