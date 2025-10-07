import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Chip, Alert } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import PendingIcon from '@mui/icons-material/Pending';
import type { Product, ProductStatusType } from '../types';

export const ProductStatus = {
    PENDING: 'PENDING',
    APPROVED: 'APPROVED',
    REJECTED: 'REJECTED',
} as const;


interface ProductTableProps {
    products: Product[];
    status: ProductStatusType;
}

const getStatusColor = (status: ProductStatusType): 'success' | 'warning' | 'error' | 'default' => {
    switch (status) {
        case ProductStatus.APPROVED: return 'success';
        case ProductStatus.PENDING: return 'warning';
        case ProductStatus.REJECTED: return 'error';
        default: return 'default';
    }
};

const ProductTable: React.FC<ProductTableProps> = ({ products, status }) => {
    if (!products.length) return (
        <Alert severity="info" sx={{ mt: 2, borderRadius: 2 }}>
            No **{status.toLowerCase()}** products found.
        </Alert>
    );

    return (
        <TableContainer component={Paper} elevation={4} sx={{ borderRadius: 3, overflow: 'hidden' }}>
            <Table sx={{ minWidth: 700 }}>
                <TableHead>
                    <TableRow sx={{
                        backgroundColor: getStatusColor(status) === 'success' ? '#e8f5e9' :
                            getStatusColor(status) === 'warning' ? '#fff8e1' : '#ffebee',
                    }}>
                        <TableCell sx={{ fontWeight: 'bold' }}>Name</TableCell>
                        <TableCell sx={{ fontWeight: 'bold' }}>MFR</TableCell>
                        <TableCell sx={{ fontWeight: 'bold' }}>SKU</TableCell>
                        <TableCell align="right" sx={{ fontWeight: 'bold' }}>Price</TableCell>
                        <TableCell sx={{ fontWeight: 'bold' }}>Status</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {products.map(p => (
                        <TableRow key={p.id} hover>
                            <TableCell>{p.name}</TableCell>
                            <TableCell>{p.mfr}</TableCell>
                            <TableCell>{p.sku}</TableCell>
                            <TableCell align="right">${p.price.toFixed(2)}</TableCell>
                            <TableCell>
                                <Chip
                                    label={p.status}
                                    color={getStatusColor(p.status)}
                                    size="small"
                                    icon={p.status === ProductStatus.APPROVED ? <CheckCircleIcon /> :
                                        p.status === ProductStatus.PENDING ? <PendingIcon /> : <CancelIcon />}
                                />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default ProductTable;
