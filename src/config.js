const dev = {
    PATH_BASE: 'https://localhost:7042/api'
}

const prd = {
    PATH_BASE: 'https://trips-api.productivitytools.top/api'
}

export const config = process.env.NODE_ENV === 'development' ? dev : prd;
