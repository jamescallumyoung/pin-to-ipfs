A small Node.JS utility to pin files to the [IPFS](https://ipfs.io/) network using [Pinata](https://pinata.cloud).

Install:

`npm i @jych/pin-to-ipfs`

Usage:

`pin-to-ipfs --key=$KEY --secret=$SECRET --dir=$DIRECTORY_PATH`

Arguments:

`--key` (required) Is your Pinata API Key.

`--secret` (required) Is your Pinata API Secret.

`--dir` (required) Is the path to the directory. Its contents will be recursively pinned.

`--name` (optional) The name of the pin. If omitted, a default value will be provided.
