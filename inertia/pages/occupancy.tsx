import Layout from "../components/layout"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"

const data = [
  { name: "Hotels", occupancy: 75 },
  { name: "Ships", occupancy: 60 },
  { name: "Schools", occupancy: 40 },
  { name: "Community Centers", occupancy: 55 },
  { name: "Adapted Spaces", occupancy: 30 },
]

Occupancy.layout = (page: React.ReactNode) => (
  <Layout title="Occupancy Management" children={page} />
)

export default function Occupancy(props: {data: any}) {
  return (
    <>
      <h1 className="text-2xl font-semibold mb-6">Occupancy Management</h1>
      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Current Occupancy</CardTitle>
            <CardDescription>
              Real-time occupancy rates for all accommodation types
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="occupancy" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Occupancy Details</CardTitle>
            <CardDescription>
              Detailed breakdown of occupancy by accommodation type
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Accommodation Type</TableHead>
                  <TableHead>Total Capacity</TableHead>
                  <TableHead>Current Occupancy</TableHead>
                  <TableHead>Occupancy Rate</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>Hotels</TableCell>
                  <TableCell>1000</TableCell>
                  <TableCell>750</TableCell>

                  <TableCell>75%</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Ships</TableCell>
                  <TableCell>2000</TableCell>
                  <TableCell>1200</TableCell>
                  <TableCell>60%</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Schools</TableCell>
                  <TableCell>500</TableCell>
                  <TableCell>200</TableCell>
                  <TableCell>40%</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Community Centers</TableCell>
                  <TableCell>300</TableCell>
                  <TableCell>165</TableCell>
                  <TableCell>55%</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Adapted Spaces</TableCell>
                  <TableCell>200</TableCell>
                  <TableCell>60</TableCell>
                  <TableCell>30%</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </>
  )
}
