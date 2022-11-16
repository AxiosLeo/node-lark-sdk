// LarkClient,

import { AxiosResponse } from "axios"
import Model from "./src/model"

// MarkdownField,
// PlainTextField,

// ButtonAction,
// SelectOptionsAction,

// HrElement,
// NoteElement,
// ImageElement,
// MarkdownElement,
// PlainTextElement,

export declare class Model {
  toJson(): string;
}

export interface LarkToken {
  app: string,
  tenat: string,
}

export declare class LarkClient {
  app_id: string
  app_secret: string
  access_token?: string
  expire: number

  token(): Promise<LarkToken>;
  sendCardMessage<T = any, R = AxiosResponse<T>>(card_message_model: Model, receive_id: string, receive_id_type?: string): Promise<R>;
  request<T = any, R = AxiosResponse<T>, D = any>(url: string, data: D): Promise<R>;
}