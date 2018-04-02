const fs = require('fs');
const path = require('path');

module.exports = {
    mode: 'production',
    entry: {
        'entryA': './src/entryA.js',
        'entryB': './src/entryB.js'
    },
    output: {
        filename: 'entry-[name].js',
        chunkFilename: 'chunk-[name].js'
    },
    optimization: {
        runtimeChunk: {
            name: `my-runtime`,
        },
        splitChunks: {
            chunks: 'all',
            cacheGroups: {
                dep: {
                    test: ({resource}) => resource.endsWith('shared.js'),
                    enforce: true
                }
            }
        },
    },
    plugins: [
        {
            apply(compiler) {
                 compiler.hooks.afterEmit.tap('test', (compilation, callback) => {
                    const publicPath = compilation.mainTemplate.getPublicPath({
                        hash: compilation.hash,
                    });
                    for (const chunkGroup of compilation.chunkGroups) {
                        if (chunkGroup.isInitial()) {
                            const files = chunkGroup.getFiles();
                            fs.writeFileSync(
                                path.join(__dirname, `./dist/${chunkGroup.name}.html`),
                                files.map(f => `<script src="${publicPath}${f}"></script>`).join('\n')
                            );
                        }
                    }
                });
            }
        }
    ]
}