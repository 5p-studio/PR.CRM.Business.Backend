interface CustomerInterface {
  id: number,
  idEmployee: number,
  firstName: string,
  lastName: string,
  phoneNumber: string,
  email: string,
  facebook: string,
  status: string,
  group: number,
  isLocked: boolean,
  createdAt: Date,
  updatedAt: Date,
};

export default CustomerInterface;
