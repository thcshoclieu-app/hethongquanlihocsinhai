import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { SearchInput } from '@/components/ui/search';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Download, CreditCard, Banknote, QrCode, Filter, MoreHorizontal } from 'lucide-react';
import { motion } from 'motion/react';

const mockPayments = [
  { id: 'GD001', student: 'Nguyễn Văn A', amount: '500,000đ', method: 'Chuyển khoản', time: '14:30 05/09/2023', status: 'success' },
  { id: 'GD002', student: 'Trần Thị B', amount: '600,000đ', method: 'Tiền mặt', time: '09:15 05/09/2023', status: 'success' },
  { id: 'GD003', student: 'Lê Hoàng C', amount: '1,500,000đ', method: 'Quẹt thẻ', time: '18:00 04/09/2023', status: 'success' },
  { id: 'GD004', student: 'Phạm Văn D', amount: '800,000đ', method: 'Chuyển khoản', time: '10:20 04/09/2023', status: 'pending' },
  { id: 'GD005', student: 'Hoàng Thị E', amount: '500,000đ', method: 'Momo', time: '08:45 03/09/2023', status: 'failed' },
];

export default function Payments() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6 h-full flex flex-col"
    >
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">Thanh toán</h2>
          <p className="text-slate-500 dark:text-slate-400">Lịch sử giao dịch và biên lai thu tiền.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="gap-2">
            <Download size={16} />
            <span>Xuất Excel</span>
          </Button>
          <Button className="gap-2 bg-blue-600 hover:bg-blue-700">
            <Banknote size={16} />
            <span>Thu tiền mặt</span>
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-4 flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
              <CreditCard size={20} />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">Chuyển khoản</p>
              <h4 className="text-lg font-bold">120.5M ₫</h4>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-green-100 text-green-600 flex items-center justify-center">
              <Banknote size={20} />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">Tiền mặt</p>
              <h4 className="text-lg font-bold">25.0M ₫</h4>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center">
              <QrCode size={20} />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">Ví điện tử / Quẹt thẻ</p>
              <h4 className="text-lg font-bold">15.2M ₫</h4>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="flex-1 flex flex-col min-h-0">
        <CardHeader className="pb-4 border-b border-slate-200 dark:border-slate-800">
          <div className="flex flex-col md:flex-row justify-between gap-4">
            <div className="flex items-center gap-2 max-w-sm w-full">
              <SearchInput placeholder="Tìm mã giao dịch, học sinh..." />
            </div>
            <div className="flex items-center gap-2">
              <Select defaultValue="all-methods">
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Phương thức" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all-methods">Tất cả</SelectItem>
                  <SelectItem value="transfer">Chuyển khoản</SelectItem>
                  <SelectItem value="cash">Tiền mặt</SelectItem>
                  <SelectItem value="card">Quẹt thẻ</SelectItem>
                </SelectContent>
              </Select>
              <Select defaultValue="all-status">
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Trạng thái" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all-status">Tất cả</SelectItem>
                  <SelectItem value="success">Thành công</SelectItem>
                  <SelectItem value="pending">Đang xử lý</SelectItem>
                  <SelectItem value="failed">Thất bại</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="icon">
                <Filter size={16} />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0 flex-1 overflow-auto">
          <Table>
            <TableHeader className="sticky top-0 bg-slate-50/95 dark:bg-slate-900/95 backdrop-blur z-10 shadow-sm">
              <TableRow>
                <TableHead>Mã giao dịch</TableHead>
                <TableHead>Học sinh</TableHead>
                <TableHead>Phương thức</TableHead>
                <TableHead>Thời gian</TableHead>
                <TableHead>Số tiền</TableHead>
                <TableHead>Trạng thái</TableHead>
                <TableHead className="text-right">Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockPayments.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium text-slate-500">{item.id}</TableCell>
                  <TableCell className="font-medium text-slate-900 dark:text-slate-100">{item.student}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {item.method === 'Chuyển khoản' && <CreditCard size={14} className="text-blue-500" />}
                      {item.method === 'Tiền mặt' && <Banknote size={14} className="text-green-500" />}
                      {(item.method === 'Quẹt thẻ' || item.method === 'Momo') && <QrCode size={14} className="text-purple-500" />}
                      <span>{item.method}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-slate-500 text-sm">{item.time}</TableCell>
                  <TableCell className="font-medium">{item.amount}</TableCell>
                  <TableCell>
                    {item.status === 'success' && <Badge variant="success" className="font-normal bg-green-100 text-green-700 hover:bg-green-200 border-none">Thành công</Badge>}
                    {item.status === 'pending' && <Badge variant="warning" className="font-normal bg-amber-100 text-amber-700 hover:bg-amber-200 border-none">Đang xử lý</Badge>}
                    {item.status === 'failed' && <Badge variant="destructive" className="font-normal bg-red-100 text-red-700 hover:bg-red-200 border-none">Thất bại</Badge>}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-500">
                      <MoreHorizontal size={16} />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </motion.div>
  );
}
