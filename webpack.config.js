import path from 'path';

const __outDir = path.resolve();
console.log(__outDir);

const module={
    entry: {
        main: "./src/main",
    },
    mode: "development",
    module: {
        rules: [{
            use: 'babel-loader',
            exclude: /node_modules/,
        }]
    },
    resolve: {
        extensions: ['.js', '.jsx', '.tsx']
    },
    output: {
        filename: '[name].bundle.js',
        path: path.join(__outDir, 'dist/js')
    }
}

export default module;