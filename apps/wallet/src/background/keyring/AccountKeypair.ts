// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import {
    toSerializedSignature,
    type SerializedSignature,
    type Keypair,
} from '@mysten/sui.js';

export class AccountKeypair {
    #keypair: Keypair;

    constructor(keypair: Keypair) {
        this.#keypair = keypair;
    }

    async sign(data: Uint8Array): Promise<SerializedSignature> {
        const pubkey = this.#keypair.getPublicKey();
        // This is fine to hardcode useRecoverable = false because wallet does not support Secp256k1. Ed25519 does not use this parameter.
        const signature = this.#keypair.signData(data, false);
        const signatureScheme = this.#keypair.getKeyScheme();
        return toSerializedSignature({
            signature,
            signatureScheme,
            pubKey: pubkey,
        });
    }

    exportKeypair() {
        return this.#keypair.export();
    }

    get publicKey() {
        return this.#keypair.getPublicKey();
    }
}
