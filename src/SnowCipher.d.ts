/**
* Create Snow 2.0 Cipher Keystream Generater.
* 
*/
declare class SnowCipher {
    /**
     * Create Snow 2.0 Cipher Keystream Generater Instance.
     * @param {128|256} keySize - key size in bits, either 128 or 256
     * @param {Uint8Array | Int8Array} key - key bytes
     * @param {Uint32Array} ivTable - `[IV3,IV2,IV1,IV0]`
     */
    constructor(keySize: 128 | 256, key: Uint8Array | Int8Array, ivTable: Uint32Array)
    /**
     * Clocks the cipher 16 times and returns 16 words of keystream symbols in keystream_block.
     * @returns {Uint32Array}keystream_block
     */
    generateKeyStream(): Uint32Array
    /**
     * Clocks the cipher once and returns one keystream symbol.
     * @returns {number} keystream symbol(uint32)
     */
    singleClock(): number
}
export = SnowCipher