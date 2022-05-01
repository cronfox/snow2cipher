/**
* Create Snow 2.0 Cipher Keystream Generater.
* 
*/
declare class SnowCipher {
    /**
     * Create Snow 2.0 Cipher Keystream Generater Instance.
     * @param {keyTable}st @see{@link KeyTable}
     */
    constructor(st: KeyTable)
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

declare interface KeyTable {
    keySize: (128 | 256)
    /**
     * key is of proper length, for keysize=128, key is of lenght 16 bytes, and for keysize=256, key is of length 32 bytes.
     * 
     * key is given in big endian format,
     * 
     * For 128 bit key:
     * key[0]-> msb of k_3 ... key[3]-> lsb of k_3
     * 
     *  ...
     * key[12]-> msb of k_0 ... key[15]-> lsb of k_0
     * 
     * For 256 bit key:
     * key[0]-> msb of k_7 ... key[31]-> lsb of k_0
     * 
     * 
     * If use in Mabinogi,Please Use Int8Array.
     */
    key: (Uint8Array | Int8Array),
    /**
     * [IV0,IV1,IV2,IV3]
     */
    ivTable: Uint32Array
}

export = SnowCipher