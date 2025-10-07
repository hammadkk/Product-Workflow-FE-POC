import React, { useState, useMemo } from 'react';
import {
  Container, Typography, Box, TextField, Button,
  Tabs, Tab, Paper, CircularProgress, IconButton, Snackbar, Alert
} from '@mui/material';
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import { useNavigate } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import ProductTable from './ProductTable';
import { GET_All_Products } from '../../graphql/product/query';
import { Create_Product } from '../../graphql/product/mutations';
import { ProductStatus, type Product } from '../types';

interface CreateProductInput {
  name: string;
  mfr: string;
  description: string;
  price: number;
  sku: string;
}

const TabPanel: React.FC<{ children?: React.ReactNode, value: number, index: number }> = ({
  children,
  value,
  index,
  ...other
}) => (
  <div role="tabpanel" hidden={value !== index} {...other}>
    {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
  </div>
);

const ProductDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [tabValue, setTabValue] = useState(0);
  const [showForm, setShowForm] = useState(false);
  const [formState, setFormState] = useState<CreateProductInput>({
    name: '', mfr: '', description: '', price: 0, sku: ''
  });
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const { data, loading: queryLoading, refetch } = useQuery(GET_All_Products);
  const [createProduct, { loading: mutationLoading, error: mutationError }] = useMutation(Create_Product, {
    onCompleted: () => {
      refetch();
      setFormState({ name: '', mfr: '', description: '', price: 0, sku: '' });
      setShowForm(false);
      setSnackbarOpen(true);
    },
  });

  const allProducts: Product[] = data?.products || [];

  const { approvedProducts, pendingProducts, rejectedProducts } = useMemo(() => ({
    approvedProducts: allProducts.filter(p => p.status === ProductStatus.APPROVED),
    pendingProducts: allProducts.filter(p => p.status === ProductStatus.PENDING),
    rejectedProducts: allProducts.filter(p => p.status === ProductStatus.REJECTED),
  }), [allProducts]);

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => setTabValue(newValue);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormState(prev => ({ ...prev, [name]: type === 'number' ? parseFloat(value) : value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name || !formState.mfr || !formState.sku || formState.price <= 0) return;
    await createProduct({ variables: { input: formState } });
  };

  return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
      {/* Header with Notifications + Add Button */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 4,
          flexWrap: 'wrap',
          gap: 2,
        }}
      >
        <Typography
          variant="h3"
          gutterBottom
          sx={{
            fontWeight: 700,
            color: '#1a237e',
            flex: 1,
            minWidth: '250px',
          }}
        >
          Manage Products
        </Typography>

        {/* Notifications Button */}
        <Button
          variant="contained"
          color="secondary"
          startIcon={<NotificationsActiveIcon />}
          onClick={() => navigate('/notifications')}
          sx={{
            textTransform: 'none',
            fontWeight: 600,
            px: 3,
            py: 1.2,
            borderRadius: 3,
            background: 'linear-gradient(45deg, #ff6f61, #ff3d00)',
            boxShadow: '0 3px 10px rgba(255, 61, 0, 0.3)',
            '&:hover': {
              background: 'linear-gradient(45deg, #ff3d00, #ff6f61)',
            },
          }}
        >
          View Notifications
        </Button>

        {/* Add Product Button */}
        <IconButton onClick={() => setShowForm(prev => !prev)} color="primary" size="large">
          {showForm ? <CloseIcon /> : <AddIcon />}
        </IconButton>
      </Box>

      {/* Conditional Form */}
      {showForm && (
        <Paper
          elevation={8}
          sx={{
            p: 5,
            mb: 6,
            borderRadius: 3,
            borderLeft: '8px solid #3f51b5',
            backgroundColor: '#fafafa',
          }}
        >
          <Typography
            variant="h5"
            gutterBottom
            sx={{
              display: 'flex',
              alignItems: 'center',
              mb: 4,
              fontWeight: 600,
              color: 'primary.main',
            }}
          >
            <LibraryAddIcon sx={{ mr: 1 }} /> Add New Product Entry
          </Typography>

          {mutationError && (
            <Alert severity="error" sx={{ mb: 3 }}>
              Submission Failed: {mutationError.message}
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
            {/* Row 1 */}
            <Box sx={{ display: 'flex', gap: 2, mb: 2, flexWrap: 'wrap' }}>
              <TextField
                name="name"
                label="Product Name"
                value={formState.name}
                onChange={handleInputChange}
                required
                fullWidth
                sx={{ flex: 1, minWidth: '250px' }}
              />
              <TextField
                name="mfr"
                label="Manufacturer (MFR)"
                value={formState.mfr}
                onChange={handleInputChange}
                required
                fullWidth
                sx={{ flex: 1, minWidth: '250px' }}
              />
            </Box>

            {/* Row 2 */}
            <Box sx={{ display: 'flex', gap: 2, mb: 2, flexWrap: 'wrap' }}>
              <TextField
                name="sku"
                label="SKU"
                value={formState.sku}
                onChange={handleInputChange}
                required
                fullWidth
                sx={{ flex: 1, minWidth: '250px' }}
              />
              <TextField
                name="price"
                label="Price"
                type="number"
                value={formState.price || ''}
                onChange={handleInputChange}
                required
                fullWidth
                inputProps={{ min: 0, step: 0.01 }}
                sx={{ flex: 1, minWidth: '250px' }}
              />
            </Box>

            {/* Row 3 */}
            <TextField
              name="description"
              label="Description"
              fullWidth
              multiline
              rows={3}
              value={formState.description}
              onChange={handleInputChange}
              required
              sx={{ mb: 3 }}
            />

            {/* Submit Button */}
            <Box sx={{ textAlign: 'right' }}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={mutationLoading}
                startIcon={
                  mutationLoading ? (
                    <CircularProgress size={20} color="inherit" />
                  ) : (
                    <LibraryAddIcon />
                  )
                }
                sx={{
                  px: 4,
                  py: 1.2,
                  borderRadius: 2,
                  textTransform: 'none',
                  fontWeight: 600,
                }}
              >
                {mutationLoading ? 'Processing...' : 'Submit Product'}
              </Button>
            </Box>
          </Box>
        </Paper>
      )}

      {/* Tabs Section */}
      <Box sx={{ width: '100%', mt: 6 }}>
        <Box sx={{
          borderBottom: 1,
          borderColor: 'divider',
          bgcolor: 'background.paper',
          borderRadius: 2,
          overflow: 'hidden',
          boxShadow: 3,
        }}>
          <Tabs value={tabValue} onChange={handleTabChange} centered variant="fullWidth">
            <Tab label={`Approved (${approvedProducts.length})`} />
            <Tab label={`Pending (${pendingProducts.length})`} />
            <Tab label={`Rejected (${rejectedProducts.length})`} />
          </Tabs>
        </Box>

        {queryLoading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', p: 5 }}>
            <CircularProgress />
          </Box>
        ) : (
          <>
            <TabPanel value={tabValue} index={0}>
              <ProductTable products={approvedProducts} status={ProductStatus.APPROVED} />
            </TabPanel>
            <TabPanel value={tabValue} index={1}>
              <ProductTable products={pendingProducts} status={ProductStatus.PENDING} />
            </TabPanel>
            <TabPanel value={tabValue} index={2}>
              <ProductTable products={rejectedProducts} status={ProductStatus.REJECTED} />
            </TabPanel>
          </>
        )}
      </Box>

      {/* Snackbar for success */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        message="Product added successfully!"
      />
    </Container>
  );
};

export default ProductDashboard;
