export type JSON = JsonObject | JsonObject[];

interface JsonObject {
  [key: string]: any;
}

export interface Document {
  id?: string;
  route: string;
  json: JSON;
}
