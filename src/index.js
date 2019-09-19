#!/usr/bin/env node

'use strict';

const pinataSDK = require('@pinata/sdk');
const argv = require('minimist')(process.argv.slice(2));

const { key, secret, dir, help, h, name, v, verbose } = argv;

const helpMsg = "Arguments:\n" +
    "--key : Your Pinata API Key (required)\n" +
    "--secret : Your Pinata API Secret (required)\n" +
    "--dir : Path of the directory to upload (required)\n" +
    "--name : The name of the Pin (optional)";

if ( h || help ) {
    console.info(helpMsg);
    process.exit();
}

if ( !key || !secret || !dir ) {
    console.error("--key and --secret and --dir must be set. See --help for details.");
    if (v || verbose) console.log( `key=${key}, secret=${secret}, dir=${dir}` );
    process.exit(10);
}

const fn = async () => {

    const pinata = pinataSDK(key+'', secret+'');

    pinata.testAuthentication()
        .then( JSON.stringify )
        .then( () => console.info(`👍 Connected to Pinata.`) )
        .then( () => console.info('☁️  Uploading...') )
        .then( () => (name) ? pinata.pinFromFS(dir, {pinataMetadata: {name}}) : pinata.pinFromFS(dir) )
        .then( result => {
            console.info('🎉 Upload complete!\n');

            console.info('Details:');
            console.info(`→ IPFS Hash: ${result.IpfsHash}`);
            console.info(`→ Name: ${name || "[default name]"}`);
            console.info(`→ Pin Size: ${result.PinSize} bytes`);
            console.info(`→ Timestamp: ${result.Timestamp}`);
        } )
        .catch( e => {
            console.info('👎 Upload failed!');
            console.error(e);
            process.exit(20);
        } );
};

fn(); // so we can use async/await
