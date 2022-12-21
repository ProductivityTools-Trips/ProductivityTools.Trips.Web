const dev = {
    PATH_BASE: 'https://localhost:7042/api'
}

const prd = {
    PATH_BASE: 'https://apitrips.productivitytools.top:8070/api'
}

export const config = process.env.NODE_ENV === 'development' ? dev : prd;
