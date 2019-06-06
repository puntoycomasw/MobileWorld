import { ProductInterface } from './product';
import { Observable } from 'rxjs';

export interface Roles {
  editor?: boolean;
  admin?: boolean;
}
export interface UserInterface {
  id?: string;
  name?: string;
  email?: string;
  password?: string;
  car?:ProductInterface;
  /* roles?: Roles; */
}