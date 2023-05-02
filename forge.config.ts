import type {ForgeConfig} from "@electron-forge/shared-types";
import {MakerSquirrel} from '@electron-forge/maker-squirrel';
import {MakerZIP} from '@electron-forge/maker-zip';
import {MakerDeb} from '@electron-forge/maker-deb';
import {MakerRpm} from '@electron-forge/maker-rpm';
import {WebpackPlugin} from '@electron-forge/plugin-webpack';

import {mainConfig} from './webpack.main.config';
import {rendererConfig} from './webpack.renderer.config';

const config: ForgeConfig = {
    packagerConfig: {
        // beforeCopy: async (
        //     buildPath: string,
        //     electronVersion: string,
        //     platform: any,
        //     arch: any
        // ) => {
        //     console.log(`buildPath ::: ${buildPath} `)
        //     console.log(`electronVersion ::: ${electronVersion} `)
        //     console.log(`platform ::: ${platform} `)
        //     console.log(`arch ::: ${arch} `)
        //
        // }
    },
    rebuildConfig: {},
    makers: [],
    plugins: [
        new WebpackPlugin({
            mainConfig,
            renderer: {
                config: rendererConfig,
                entryPoints: [
                    {
                        html: './src/index.html',
                        js: './src/renderer.ts',
                        name: 'main_window',
                        preload: {
                            js: './src/preload.ts',
                        },
                    },
                ],
            },
        }),
    ],
};

export default config;
