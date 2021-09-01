import Parameters from "@libs/parameters";
import emp from '@models/employees'

declare global {
  namespace Express {
    interface Request {
      parameters: Parameters<any>;
      currentUser : emp;
    }
  }
}