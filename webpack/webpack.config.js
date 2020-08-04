const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const { loader } = require('mini-css-extract-plugin');

module.exports = {
    /* 
        DEFINIENDO EL PUNTO DE ENTRADA, AUNQUE PUEDEN VARIAS ENTRADAS PASADAS COMO UN OBJETO
        entry: {
            home: './src/home.js',
            contact: './src/contact.js'
        }
    */
    entry: {
        app: ['@babel/polyfill', './src/js/index.js'],
    },
    /* 
        DEFINIENDO EL PUNTO DE SALIDA
        path: RECIBE LA RUTA DE LA CARPETA DE SALIDA
        filename: RECIBE EL NOMBRE DEL ARCHIVO DE SALIDA, SI TUBIERAMOS VARIOS ARCHIVOS DE SALIDA
        PODRIAMOS INDICARLE LA CARPETA EN LA QUE SE COLOCARAN Y QUE TOMEN SU PROPIA NOMBRE, DE LA SIGUIENTE MANERA
        filename: 'js/[name].js'    
    */
    output: {
        path: path.resolve(__dirname , '../dist'),
        filename: 'js/[chunkhash][name].js'
    },
    /* 
        EN module SE DEFINEN TODOS LOS LOADER QUE MANEJARA WEBPACK,
        LOS LOADERS SE UTILIZAN PARA INTERPRETAR CADA TIPO DE ARCHIVO DIFERENTE
    */
    module:{
        /* 
            DENTRO DE RULE DEBO COLOCAR UN OBJETO POR CADA LOADER, QUE VALLA A UTILIZAR
        */
        rules:[
            /* 
                LOADER PARA TRABAJAR LOS ARCHIVOS CSS
            */

            /* 
                LOADER PARA TRABAJAR SOLAMENTE LOS ARCHIVOS DE ESTILOS CSS
            */
            {
                //CON test: LE INDICO LA EXTENCIÓN QUE DEBE BUSCAR
                test: /\.(sa|sc|c)ss$/,
                //CON use: LE INDICO QUE LOADER DEBE UTILIZAR A LA HORA DE ENCONTRAR LOS ARCHIVOS
                use: [

                    /* style-loader SE UTILIZA PARA INYECTAR CSS EN EL HTML, PERO EN ESTE CASO NO LO UTILIZAREMOS
                    DEBIDO A QUE USAREMOS EL PLUGIN MiniCssExtractPlugin PARA CREAR EL ARCHIVO CSS COMPILADO
                    'style-loader',  
                    */

                    {
                        loader: MiniCssExtractPlugin.loader,
                    },
                    //css-loader ES EL LOADER QUE SE ENCARGARA DE TRABAJAR LOS ARCHIVOS CSS
                    'css-loader',
                    'postcss-loader',
                    'sass-loader',
                ]
            },

            /* 
                LOADER PARA TRABAJAR LOS ARCHIVOS JS CON BABEL
            */
            {
                test: /\.js$/,
                use: 'babel-loader',
                exclude: '/node_modules/'
            },

            /*
                LOADER PARA TRABAJAR CON IMAGENES.
            */
            {
                test: /\.(jpg|jpeg|png|gif|svg|webp|jpeg2000)$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: 'static/img/',
                        useRelativePath: true
                    }
                }
            },

            /*
                LOADER PARA TRABAJAR CON FUENTES.
            */
            {
                test: /\.(woff|eot|ttf)$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: 'static/fonts/',
                        useRelativePath: true
                        }
                    }
            },

            /*
                LOADER PARA TRABAJAR CON VIDEOS.
            */
           {
            test: /\.(mp4|webm|ogv|mkv|avi|hevc)$/,
            use: {
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]',
                    outputPath: 'static/video/',
                    useRelativePath: true
                    }
                }
            },

        ]
    },
    /* 
        LOS PLUGINS EXTIENDEN LAS FUNCIONALIDADES DE LOS LOADERS
    */
    plugins: [

        /*
            PARA GENERAR LOS ARCHIVOS HTML DE DISTRIBUCIÓN, SI TENGO MAS ARCHIVOS DE HTML 
            DEBO CREAR UNA CONFIGURACIÓN POR CADA ARCHIVO HTML
            https://desarrolloweb.com/articulos/html-webpack-plugin-inyectar-bundles.html
        */
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './src/index.html',
            hash: true,
            minify: {
                html5: true,
                collapseWhitespace: true,
                caseSensitive: true,
                removeComments: true,
                removeEmptyElements: true
            }
        }),
        /* 
            PARA GENERAR LOS ARCHIVOS CSS DE DISTRIBUCIÓN
        */
        new MiniCssExtractPlugin({
            filename: "css/[name]-style.css",
            chunkFilename: '[id].css',
        })
    ], 
    /* 
        CONFIGURACIÓN DEL DEV SERVER
    */
    devServer:{ 
        open: true, //PARA QUE AL INICIARSE EL DEV SERVER SE ABRA EN EL NAVEGADOR
        port: 9090, //MODIFICANDO EL PUERTO
    }
}

