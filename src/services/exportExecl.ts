import XLSX from 'xlsx';
import path from 'path';
import dayjs from 'dayjs';

class ExcelSercies {
  /**
   * name
   */
  public exportDataToExcel (data: any) {
    data.forEach((element: any, index: any) => {
      element.createdAt = dayjs(element.createdAt).format('DD/MM/YYYY');
      element.updatedAt = dayjs(element.updatedAt).format('DD/MM/YYYY');
    });
    const fileName = 'C:/Users/TrungThanh/Desktop/CRM1.xlsx';
    const workSheetColumnNames: any = {
      id: 'ID',
      idEmployee: 'ID người tạo',
      firstName: 'Họ',
      lastName: 'Tên',
      phoneNumber: 'Số điện thoại',
      email: 'Email',
      facebook: 'Facebook',
      status: 'Trạng thái',
      group: 'Nhóm',
      isLocked: 'Khóa',
      createdAt: 'Ngày tạo',
      updatedAt: 'Ngày sửa',
    };
    data.unshift(workSheetColumnNames);
    const ws = XLSX.utils.json_to_sheet(data, { skipHeader: true, cellDates: false, dateNF: 14 });
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'DataCustomers');
    XLSX.writeFile(wb, path.resolve(fileName));
    return wb;
  }
}

export default new ExcelSercies();
