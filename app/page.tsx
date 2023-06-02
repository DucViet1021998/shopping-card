'use client';

import React, { useState } from 'react';
import Products from '@/components/Product';

import {
    Box,
    Card,
    CardContent,
    CardMedia,
    IconButton,
    Typography,
    Badge,
    Popover,
    Button,
    Tooltip,
} from '@mui/material';
import { ShoppingCart, DeleteForever, Remove, Add, Payment } from '@mui/icons-material';

import { useSelector } from 'react-redux';
import {
    getProductSelector,
    removeProduct,
    increaseProduct,
    decreaseProduct,
    Product,
} from '@/components/products.slice';
import { useAppDispatch } from '@/components/store';
export default function Home() {
    const dispatch = useAppDispatch();
    const products = useSelector(getProductSelector);

    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;
    const price = products.map((product: Product) => product.mount * product.price);
    const mount = products.map((product: Product) => product.mount);
    const total = price.reduce((a: number, b: number) => a + b, 0);

    const sumMount = mount.reduce((a: number, b: number) => a + b, 0);

    const handlePayClick = () => {
        alert(`Của bạn gồm tất cả ${sumMount} sản phẩm hết ${total} $`);
    };

    return (
        <>
            <nav className="w-full fixed top-0 flex justify-end items-center h-16 pr-12">
                <IconButton onClick={handleClick} aria-label="cart">
                    <Badge
                        badgeContent={sumMount}
                        color="error"
                        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                    >
                        {' '}
                        <ShoppingCart color="primary" />
                    </Badge>
                </IconButton>
                <Popover
                    id={id}
                    open={open}
                    anchorEl={anchorEl}
                    onClose={handleClose}
                    anchorOrigin={{
                        vertical: 'center',
                        horizontal: 'left',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                >
                    {products.length === 0 ? (
                        <Typography className="p-2" component="div" variant="h6">
                            Bạn chưa có sản phẩm nào!
                        </Typography>
                    ) : (
                        <Box>
                            {products.map((product: Product) => (
                                <Card key={product.id} className="flex row justify-between mt-3">
                                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                        <CardContent sx={{ flex: '1 0 auto' }}>
                                            <Typography component="div" variant="h6">
                                                {product.name}
                                            </Typography>
                                            <Typography
                                                className="text-orange-400"
                                                variant="subtitle1"
                                                component="div"
                                            >
                                                {product.price * product.mount} $
                                            </Typography>
                                            <Typography variant="subtitle1" component="div">
                                                Số lượng:
                                                <Tooltip title="Giảm" placement="top" arrow={true}>
                                                    <IconButton
                                                        onClick={() =>
                                                            dispatch(decreaseProduct(product.id))
                                                        }
                                                        aria-label="decrease"
                                                    >
                                                        <Remove fontSize="small" />
                                                    </IconButton>
                                                </Tooltip>
                                                {product.mount}
                                                <Tooltip title="Tăng" placement="top" arrow={true}>
                                                    <IconButton
                                                        onClick={() =>
                                                            dispatch(increaseProduct(product.id))
                                                        }
                                                        aria-label="increase"
                                                    >
                                                        <Add fontSize="small" />
                                                    </IconButton>
                                                </Tooltip>
                                            </Typography>
                                        </CardContent>
                                        <Box className="pb-3 pl-2">
                                            <Tooltip title="Xóa" placement="right" arrow={true}>
                                                <IconButton
                                                    onClick={() =>
                                                        dispatch(removeProduct(product.id))
                                                    }
                                                    aria-label="delete"
                                                >
                                                    <DeleteForever />
                                                </IconButton>
                                            </Tooltip>
                                        </Box>
                                    </Box>
                                    <CardMedia
                                        component="img"
                                        sx={{ width: 151 }}
                                        image={product.src}
                                        alt={product.alt}
                                    />
                                </Card>
                            ))}
                            <div className="flex justify-between items-center border-sky-300 pl-2 pr-2">
                                <span>
                                    Tổng Tiền: <span className="text-orange-400">{total} $</span>
                                </span>
                                <Button startIcon={<Payment />} onClick={handlePayClick}>
                                    Thanh toán
                                </Button>
                            </div>
                        </Box>
                    )}
                </Popover>
            </nav>
            <main className="flex min-h-screen flex-col items-center justify-center p-24">
                <Products />
            </main>
        </>
    );
}
