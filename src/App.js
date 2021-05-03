import "./App.css";
import {
  LineChart,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Line,
  ResponsiveContainer,
} from "recharts";
import { useState, useEffect } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
  useHistory,
} from "react-router-dom";

function DrawGraphs() {
  const apiUrl =
    "https://www.json-generator.com/api/json/get/bUgMRhYjKG?indent=2";
  const [data, setData] = useState([]);

  async function fetchAPI() {
    let response = await fetch(apiUrl);
    response = await response.json();
    setData(response);
  }

  useEffect(() => {
    fetchAPI();
  }, [setData]);

  let history = useHistory();

  return (
    <div className="Container">
      <LineChart
        onClick={(val) => {
          if (val?.activePayload) {
            //Bu kısma da ilgili parametreler verilirse Details sayfasına veri aktarılabilir.
          }
        }}
        width={900}
        height={600}
        data={data.graphData}
        margin={{ top: 60, right: 0, left: 0, bottom: 0 }}
      >
        <XAxis dataKey="date" />
        <YAxis dataKey="equity" />
        <Tooltip />
        <CartesianGrid stroke="#f5f5f5" />
        <Line type="monotone" dataKey="date" stroke="#ff7300" xAxisId={0} />
        <Line type="monotone" dataKey="equity" stroke="#387908" yAxisId={0} />
      </LineChart>
      <div className="InfoTable">
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Account ID</TableCell>
                <TableCell align="right">Account Type</TableCell>
                <TableCell align="right">Display Name</TableCell>
                <TableCell align="right">Role</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.nodes?.map((row) => (
                <TableRow
                  onClick={() =>
                    history.push({
                      pathname: "/details:" + row.accountId,
                      state: row,
                    })
                  }
                  key={row.id}
                >
                  <TableCell component="th" scope="row">
                    {row.accountId}
                  </TableCell>
                  <TableCell align="right">{row.accountType}</TableCell>
                  <TableCell align="right">{row.displayName}</TableCell>
                  <TableCell align="right">{row.role}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}

function ShowDetails() {
  let history = useHistory();
  let data = history.location.state;
  return (
    <ul>
      <li>Accepted Trade Quantity: {data.acceptedTradeQuantity}</li>
      <li>Account ID: {data.accountId}</li>
      <li>Account Type: {data.accountType}</li>
      <li>Display Name: {data.displayName}</li>
      <li>ID: {data.id}</li>
      <li>Price: {data.price}</li>
      <li>Quantity: {data.quantity}</li>
      <li>Role: {data.role}</li>
      <li>Trade Date: {data.tradeDate}</li>
    </ul>
  );
}

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <DrawGraphs />
        </Route>
        <Route path="/details:id">
          <ShowDetails />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
