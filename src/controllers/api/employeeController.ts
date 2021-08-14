import { sendError, sendSuccess } from '@libs/response';
import { Request, Response } from 'express';
import Employee from '@models/employees';
// import Op from 'sequelize';
class EmployeeController {
  // get all employees
  public async getAllEmp (req: Request, res: Response) {
    try {
      const page = req.query.page as string || '1';
      const limit = req.query.size as string || '25';
      const offset = (parseInt(page, 10) - 1) * (parseInt(limit, 10));

      const employee = await Employee.findAndCountAll({
        limit: parseInt(limit, 10),
        offset: offset,
      });
      sendSuccess(res, { content: employee.rows, totalPages: Math.ceil(employee.count / parseInt(limit, 10)) });
    } catch (error) {
      sendError(res, 500, error.message, error);
    }
  }

  // get one employee
  public async getOneEmp (req: Request, res: Response) {
    try {
      const employeeId = req.params.id;
      const employee = await Employee.findOne({ where: { id: employeeId } });

      if (!employee) {
        return sendError(res, 404, 'Not Found');
      }

      sendSuccess(res, { employee });
    } catch (error) {
      sendError(res, 500, error.message, error);
    }
  }

  // create employee
  public async createEmp (req: Request, res: Response) {
    try {
      const params = req.parameters.permit(Employee.CREATABLE_PARAMETERS).value();
      const employee = await Employee.create(params);
      sendSuccess(res, { message: 'create successful', employee });
    } catch (error) {
      sendError(res, 500, error.message, error);
    }
  }

  // edit employee
  public async editEmp (req: Request, res: Response) {
    try {
      const employeeId = req.params.id;
      const employee = await Employee.findOne({ where: { id: employeeId } });

      if (!employee) {
        return sendError(res, 404, 'Not Found');
      }

      const params = req.parameters.permit(Employee.UPDATABLE_PARAMETERS).value();
      await employee.update(params);

      sendSuccess(res, { message: 'edit successful', employee });
    } catch (error) {
      sendError(res, 500, error.message, error);
    }
  }

  // delete employee
  public async deleteEmp (req: Request, res: Response) {
    try {
      const employeeId = req.params.id;
      const employee = await Employee.findOne({ where: { id: employeeId } });

      if (!employee) {
        return sendError(res, 404, 'Not Found');
      }

      await employee.destroy();
      sendSuccess(res, { message: 'delete successful' });
    } catch (error) {
      sendError(res, 500, error.message, error);
    }
  }
}

export default new EmployeeController();
