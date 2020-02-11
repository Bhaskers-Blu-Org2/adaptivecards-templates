// Base class for all the StorageProviders.
import { JSONResponse, IUser, ITemplate } from "../models/models";

// T - type of connection parameter required
export interface StorageProvider {
  // If no users found - result of the response must be set to false
  getUsers(query: Partial<IUser>): Promise<JSONResponse<IUser[]>>;
  // If no templates found - result of the response must be set to false
  getTemplates(query: Partial<ITemplate>): Promise<JSONResponse<ITemplate[]>>;
  updateUser(query: Partial<IUser>, updateQuery: Partial<IUser>): Promise<JSONResponse<Number>>;
  updateTemplate(query: Partial<ITemplate>, updateQuery: Partial<ITemplate>): Promise<JSONResponse<Number>>;
  insertUser(user: IUser): Promise<JSONResponse<String>>;
  insertTemplate(template: ITemplate): Promise<JSONResponse<String>>;
  removeUser(query: Partial<IUser>): Promise<JSONResponse<Number>>;
  removeTemplate(query: Partial<ITemplate>): Promise<JSONResponse<Number>>;

  connect<T>(params: T): Promise<JSONResponse<Boolean>>;
  close(): Promise<JSONResponse<Boolean>>;
}
