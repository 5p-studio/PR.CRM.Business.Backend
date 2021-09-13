import { sendError, sendSuccess } from '@libs/response';
import { Request, Response } from 'express';
import Customer from '@models/customers';

import exportExecl from '@services/exportExecl';

class CustomerController {
  // get all customer
  public async getAllCustomer (req: Request, res: Response) {
    try {
      const page = req.params.page as string || '1';
      const limit = req.params.size as string || '25';
      const offset = (parseInt(page, 10) - 1) * parseInt(limit, 10);
      const customer = await this.getDataCustomer(req).findAndCountAll({
        limit: parseInt(limit, 10),
        offset: offset,
      });
      sendSuccess(res, { content: customer.rows, totalPages: Math.ceil(customer.count / parseInt(limit, 10)) });
    } catch (error) {
      sendError(res, 500, error.message, error);
    }
  }

  // export data to excel
  public async exportToExcel (req: Request, res: Response) {
    try {
      const customer = await this.getDataCustomer(req).findAll();
      const customer1 = JSON.stringify(customer);
      const data = JSON.parse(customer1);

      const excel = exportExecl.exportDataToExcel(data);
      sendSuccess(res, { message: 'success', excel });
    } catch (error) {
      sendError(res, 500, error.message, error);
    }
  }

  // get one customer
  public async getOneCustomer (req: Request, res: Response) {
    try {
      const customerId = req.params.id;
      const customer = await Customer.findByPk(customerId);

      if (!customer) {
        return sendError(res, 404, 'Not Found');
      }

      sendSuccess(res, { customer });
    } catch (error) {
      sendError(res, 500, error.message, error);
    }
  }

  // create customer
  public async createCustomer (req: Request, res: Response) {
    try {
      const params = req.parameters.permit(Customer.CREATABLE_PARAMETERS).value();
      const customer = await Customer.create(params);
      sendSuccess(res, { message: 'create successful', customer });
    } catch (error) {
      sendError(res, 500, error.message, error);
    }
  }

  // edit customer
  public async editCustomer (req: Request, res: Response) {
    try {
      const customerId = req.params.id;
      const customer = await Customer.findByPk(customerId);

      if (!customer) {
        return sendError(res, 404, 'Not Found');
      }

      const params = req.parameters.permit(Customer.UPDATABLE_PARAMETERS).value();
      await customer.update(params);

      sendSuccess(res, { message: 'edit successful', customer });
    } catch (error) {
      sendError(res, 500, error.message, error);
    }
  }

  // delete customer
  public async deleteCustomer (req: Request, res: Response) {
    try {
      const customerId = req.params.id;
      const customer = await Customer.findByPk(customerId);

      if (!customer) {
        return sendError(res, 404, 'Not Found');
      }

      await customer.destroy();
      sendSuccess(res, { message: 'delete successful' });
    } catch (error) {
      sendError(res, 500, error.message, error);
    }
  }

  // get data customer
  private getDataCustomer (req: any) {
    const statusQuery = req.query.status as string || '';
    const groupQuery = req.query.group as string || '';
    const employeeNameQuery = req.query.EmployeeName as string || '';
    const customer = Customer.scope([
      { method: ['filterStatus', statusQuery] },
      { method: ['filterGroup', groupQuery] },
      { method: ['filterEmployeeName', employeeNameQuery] },
      'includeEmployee',
      'includeGroup',
    ]);
    return customer;
  }
}

export default new CustomerController();
