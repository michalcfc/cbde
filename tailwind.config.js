module.exports = {
    content: ['./src/**/*.{pug,html,js}'],
    theme: {
        extend: {
            colors: {
                primary: "#34ad54",
                secondary: '#f6f2ef',
            },
        },
        container: {
            padding: {
                DEFAULT: '1rem',
                sm: '1rem',
                lg: '4rem',
                xl: '5rem',
                '2xl': '12rem',
            },
        },
    },
}