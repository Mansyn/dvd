import { HttpHeaders } from "@angular/common/http";

export const AUTH_API = 'http://localhost:8080/api/';

export const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};