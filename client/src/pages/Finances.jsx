import React, { useState } from 'react';
import { Container, Typography, Grid, Card, CardContent, Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { PieChart, Pie, Cell, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer } from 'recharts';
import Sidebar from '../components/Sidebar';

const initialExpenseData = [
  { name: 'Seeds', value: 300 },
  { name: 'Fertilizers', value: 200 },
  { name: 'Labor', value: 150 },
  { name: 'Water', value: 100 },
];

const initialIncomeData = [
  { name: 'Crop Sales', value: 500 },
  { name: 'Subsidies', value: 300 },
  { name: 'Other', value: 100 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const FinancePage = () => {
  const [expenses, setExpenses] = useState(initialExpenseData);
  const [income, setIncome] = useState(initialIncomeData);
  const [openExpenseDialog, setOpenExpenseDialog] = useState(false);
  const [openIncomeDialog, setOpenIncomeDialog] = useState(false);
  const [newExpense, setNewExpense] = useState({ name: '', value: 0 });
  const [newIncome, setNewIncome] = useState({ name: '', value: 0 });

  const handleOpenExpenseDialog = () => setOpenExpenseDialog(true);
  const handleOpenIncomeDialog = () => setOpenIncomeDialog(true);
  const handleCloseDialog = () => {
    setOpenExpenseDialog(false);
    setOpenIncomeDialog(false);
  };

  const handleAddExpense = () => {
    setExpenses([...expenses, newExpense]);
    handleCloseDialog();
  };

  const handleAddIncome = () => {
    setIncome([...income, newIncome]);
    handleCloseDialog();
  };

  const totalExpenses = expenses.reduce((acc, item) => acc + item.value, 0);
  const totalIncome = income.reduce((acc, item) => acc + item.value, 0);
  const netProfitLoss = totalIncome - totalExpenses;

  return (
    <div className="FinancePage bg-gray-50 min-h-screen flex">
      <Sidebar />
      <div className="flex-grow flex flex-col">
        {/* Main content area */}
        <Container maxWidth="lg" className="py-8">
          {/* Header */}
          <Typography variant="h3" className="font-extrabold text-center text-green-700 mb-10">
            Farm Financial Dashboard
          </Typography>

          {/* Financial Summary */}
          <Grid container spacing={6}> {/* Increased spacing */}
            <Grid item xs={12} md={4}>
              <Card elevation={5} className="shadow-md p-6 transition-transform transform hover:scale-105"> {/* Added padding */}
                <CardContent className="text-center">
                  <Typography variant="h6" className="font-semibold">Total Expenses</Typography>
                  <Typography variant="h5" className="text-red-500 mt-4">${totalExpenses}</Typography> {/* Increased margin-top */}
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card elevation={5} className="shadow-md p-6 transition-transform transform hover:scale-105"> {/* Added padding */}
                <CardContent className="text-center">
                  <Typography variant="h6" className="font-semibold">Total Income</Typography>
                  <Typography variant="h5" className="text-green-500 mt-4">${totalIncome}</Typography> {/* Increased margin-top */}
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card elevation={5} className="shadow-md p-6 transition-transform transform hover:scale-105"> {/* Added padding */}
                <CardContent className="text-center">
                  <Typography variant="h6" className="font-semibold">Net Profit/Loss</Typography>
                  <Typography variant="h5" className={`mt-4 ${netProfitLoss >= 0 ? 'text-blue-500' : 'text-red-500'}`}>
                    ${netProfitLoss}
                  </Typography> {/* Increased margin-top */}
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          {/* Charts Section */}
          <Grid container spacing={6} className="mt-16"> {/* Added larger margin-top */}
            <Grid item xs={12} md={6}>
              <Card elevation={4} className="hover:shadow-lg transition-shadow p-6"> {/* Added padding */}
                <CardContent>
                  <Typography variant="h6" className="font-bold text-center mb-6">Expense Breakdown</Typography> {/* Increased margin-bottom */}
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={expenses}
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        label
                        dataKey="value"
                      >
                        {expenses.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={6}>
              <Card elevation={4} className="hover:shadow-lg transition-shadow p-6"> {/* Added padding */}
                <CardContent>
                  <Typography variant="h6" className="font-bold text-center mb-6">Income Sources</Typography> {/* Increased margin-bottom */}
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={income}
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        label
                        dataKey="value"
                      >
                        {income.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          {/* Budgeting Section */}
          <Grid container spacing={6} className="mt-16"> {/* Added larger margin-top */}
            <Grid item xs={12}>
              <Card elevation={4} className="hover:shadow-lg transition-shadow p-6"> {/* Added padding */}
                <CardContent>
                  <Typography variant="h6" className="font-bold text-center mb-6">Budget Allocation</Typography> {/* Increased margin-bottom */}
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={expenses}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="value" fill="#8884d8" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          {/* Action Buttons */}
          <div className="flex justify-center gap-8 mt-12"> {/* Increased gap and margin-top */}
            <Button variant="contained" color="primary" onClick={handleOpenExpenseDialog}>Add Expense</Button>
            <Button variant="contained" color="primary" onClick={handleOpenIncomeDialog}>Add Income</Button>
            <Button variant="outlined" color="secondary">Set Budget</Button>
            <Button variant="outlined" color="secondary">Export Data</Button>
          </div>

          {/* Add Expense Dialog */}
          <Dialog open={openExpenseDialog} onClose={handleCloseDialog}>
            <DialogTitle>Add New Expense</DialogTitle>
            <DialogContent>
              <TextField
                label="Expense Name"
                fullWidth
                className="mb-4"
                value={newExpense.name}
                onChange={(e) => setNewExpense({ ...newExpense, name: e.target.value })}
              />
              <TextField
                label="Amount"
                type="number"
                fullWidth
                className="mb-4"
                value={newExpense.value}
                onChange={(e) => setNewExpense({ ...newExpense, value: parseInt(e.target.value) })}
              />
              <TextField
                label="Category"
                fullWidth
                className="mb-4"
              />
              <TextField
                label="Date"
                type="date"
                fullWidth
                className="mb-4"
                InputLabelProps={{ shrink: true }}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDialog} color="secondary">Cancel</Button>
              <Button onClick={handleAddExpense} color="primary">Add Expense</Button>
            </DialogActions>
          </Dialog>

          {/* Add Income Dialog */}
          <Dialog open={openIncomeDialog} onClose={handleCloseDialog}>
            <DialogTitle>Add New Income</DialogTitle>
            <DialogContent>
              <TextField
                label="Income Source"
                fullWidth
                className="mb-4"
                value={newIncome.name}
                onChange={(e) => setNewIncome({ ...newIncome, name: e.target.value })}
              />
              <TextField
                label="Amount"
                type="number"
                fullWidth
                className="mb-4"
                value={newIncome.value}
                onChange={(e) => setNewIncome({ ...newIncome, value: parseInt(e.target.value) })}
              />
              <TextField
                label="Date"
                type="date"
                fullWidth
                className="mb-4"
                InputLabelProps={{ shrink: true }}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDialog} color="secondary">Cancel</Button>
              <Button onClick={handleAddIncome} color="primary">Add Income</Button>
            </DialogActions>
          </Dialog>
        </Container>
      </div>
    </div>
  );
};

export default FinancePage;
