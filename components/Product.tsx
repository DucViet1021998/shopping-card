'use client';

import { Card, CardMedia, CardContent, CardActions, Button, Typography } from '@mui/material';
import { AddShoppingCart } from '@mui/icons-material';
import { Product, addProduct } from './products.slice';
import { useAppDispatch } from './store';

const products: Product[] = [
    {
        id: 1,
        name: 'Hệ thống Học và Thi trực tuyến V-Study',
        title: 'Tích hợp tất cả tính năng của một hệ thống quản lý học tập trực tuyến và kiểm tra, đánh giá trực tuyến cho mọi đối tượng...',
        price: 100,
        src: '/img/v-study.jpg',
        alt: 'img-vStudy',
        mount: 1,
    },
    {
        id: 2,
        name: 'Hệ thống thư viện điện tử trường học VIELIB',
        price: 200,
        title: 'Thư viện điện tử hiện đại, đã được ứng dụng thành công tại hơn 500 tổ chức, đơn vị, trường học... trong và ngoài nước',
        src: '/img/vlib.jpg',
        alt: 'img-vLib',
        mount: 1,
    },
    {
        id: 3,
        name: 'Hệ thống cổng thông tin điện tử V-Portal',
        price: 300,
        title: 'Được xây dựng và phát triển trên nền tảng công nghệ .NET mới nhất. Kho giao diện hiện đại, nhiều tính năng hấp dẫn',
        src: '/img/v-portal.jpg',
        alt: 'img-vPortal',
        mount: 1,
    },
];

function Products() {
    const dispatch = useAppDispatch();

    return (
        <div className="flex gap-6">
            {products.map((product) => (
                <Card
                    className="flex flex-col items-center justify-space"
                    key={product.id}
                    sx={{ maxWidth: 345 }}
                >
                    <CardMedia component="img" height="194" image={product.src} alt={product.alt} />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            {product.name}{' '}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {product.title}
                        </Typography>
                        <Typography className="text-orange-400">{product.price} $</Typography>
                    </CardContent>
                    <CardActions className="justify-self-end" disableSpacing={true}>
                        <Button
                            style={{ backgroundColor: '#1976d2' }}
                            startIcon={<AddShoppingCart />}
                            size="medium"
                            variant="contained"
                            onClick={() => dispatch(addProduct(product))}
                        >
                            Thêm vào giở hàng
                        </Button>
                    </CardActions>
                </Card>
            ))}
        </div>
    );
}

export default Products;
