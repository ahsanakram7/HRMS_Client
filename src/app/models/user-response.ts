import { user } from "./user";

export interface userResponse {
  users: user[];
  totalRecords: number;
}