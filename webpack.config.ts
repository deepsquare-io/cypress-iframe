
import { join } from 'path'
import { Configuration } from 'webpack'
import 'webpack-dev-server'

export default (): Configuration => {
    return {
        mode: 'development',
        devServer: {
          contentBase: join(__dirname, 'wp'),
          compress: true,
          port: 9000,
        },
        module: {
            rules: [
                {
                    test: /\.ts$/,
                    exclude: /node_modules/,
                    loader: 'ts-loader',
                    options: {
                        configFile: join(__dirname, 'tsconfig.json'),
                    }
                },
            ],
        },
        devtool: 'inline-source-map',
        resolve: {
            extensions: ['.ts', '.js'],
        },
    }
}
