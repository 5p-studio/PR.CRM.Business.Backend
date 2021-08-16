interface EmployeeInterface {
  id: number,
  firstName: string,
  lastName: string,
  email: string,
  password: string,
  salaryPerHour: number,
  phoneNumber: string,
  facebook: string,
  linkedln: string,
  skype: string,
  signatureEmail: string,
  avatar: string,
  isLocked: boolean,
  idRole: number,
  idDepartment: number,
  createdAt: Date,
  updatedAt: Date,
};

export default EmployeeInterface;
