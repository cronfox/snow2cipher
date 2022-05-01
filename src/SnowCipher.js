const SnowTable = require('./SnowTable');
function U8TO32_BE(x, i) {
    return (((x[i] << 24))>>>0 | ((x[i+1] << 16))>>>0 | ((x[i+2] << 8))>>>0 | x[i+3])>>>0;
}
function a_mul(w) {
    return (((((w) << 8)) >>> 0) ^ (SnowTable.snow_alpha_mul[w >>> 24])) >>>0 //dirty hack for unsigned left shift
}
function byte(n, w) {
    return (((w) >>> (n * 8)) & 0xff)
}
function ainv_mul(w) {
    return ((w) >>> 8) ^ (SnowTable.snow_alphainv_mul[w & 0xff])
}
class SnowCipher {
    /**
     * Function:  LoadKey/inits
     *
     * Synopsis:
     *   Loads the key material and performs the initial mixing.
     *
     * Returns: void
     *
     * Assumptions:
     *   keysize is either 128 or 256.
     *   key is of proper length, for keysize=128, key is of lenght 16 bytes
     *      and for keysize=256, key is of length 32 bytes.
     *   key is given in big endian format,
     *   For 128 bit key:
     *        key[0]-> msb of k_3
     *         ...
     *        key[3]-> lsb of k_3
     *         ...
     *        key[12]-> msb of k_0
     *         ...
     *        key[15]-> lsb of k_0
     *
     *   For 256 bit key:
     *        key[0]-> msb of k_7
     *          ...
     *        key[3]-> lsb of k_7
     *          ...
     *        key[28]-> msb of k_0
     *          ...
     *        key[31]-> lsb of k_0
     * @param {}
     */
    constructor(st) {
		this.statusTable = {
            ctr:0,
			keySize:st.keySize,
			key : st.key,
            ivTable :st.ivTable,
			st : new Uint32Array(16),
			r: new Uint32Array([0,0])
		}
        if (this.statusTable.keySize == 128) {
            this.statusTable.st[15] = U8TO32_BE(this.statusTable.key, 0)
            this.statusTable.st[14] = U8TO32_BE(this.statusTable.key, 4)
            this.statusTable.st[13] = U8TO32_BE(this.statusTable.key, 8)
            this.statusTable.st[12] = U8TO32_BE(this.statusTable.key, 12)
            this.statusTable.st[11] = (~this.statusTable.st[15])>>>0; /* bitwise inverse */
            this.statusTable.st[10] = (~this.statusTable.st[14])>>>0;
            this.statusTable.st[9]  = (~this.statusTable.st[13])>>>0;
            this.statusTable.st[8]  = (~this.statusTable.st[12])>>>0;
            this.statusTable.st[7]  = ( this.statusTable.st[15])>>>0;  /* just copy */
            this.statusTable.st[6]  = ( this.statusTable.st[14])>>>0;
            this.statusTable.st[5]  = ( this.statusTable.st[13])>>>0;
            this.statusTable.st[4]  = ( this.statusTable.st[12])>>>0;
            this.statusTable.st[3]  = (~this.statusTable.st[15])>>>0; /* bitwise inverse */
            this.statusTable.st[2]  = (~this.statusTable.st[14])>>>0;
            this.statusTable.st[1]  = (~this.statusTable.st[13])>>>0;
            this.statusTable.st[0]  = (~this.statusTable.st[12])>>>0;
        } else {
            /* assume keysize=256 WIP*/
            this.statusTable.st[15] = U8TO32_BE(this.statusTable.key, 0)
            this.statusTable.st[14] = U8TO32_BE(this.statusTable.key, 4)
            this.statusTable.st[13] = U8TO32_BE(this.statusTable.key, 8)
            this.statusTable.st[12] = U8TO32_BE(this.statusTable.key, 12)
            this.statusTable.st[11] = U8TO32_BE(this.statusTable.key, 16)
            this.statusTable.st[10] = U8TO32_BE(this.statusTable.key, 20)
            this.statusTable.st[9] =  U8TO32_BE(this.statusTable.key, 24)
            this.statusTable.st[8] =  U8TO32_BE(this.statusTable.key, 28)
            this.statusTable.st[7] = (~this.statusTable.st[15])>>>0;/* bitwise inverse */
            this.statusTable.st[6] = (~this.statusTable.st[14])>>>0;
            this.statusTable.st[5] = (~this.statusTable.st[13])>>>0;
            this.statusTable.st[4] = (~this.statusTable.st[12])>>>0;
            this.statusTable.st[3] = (~this.statusTable.st[11])>>>0;
            this.statusTable.st[2] = (~this.statusTable.st[10])>>>0;
            this.statusTable.st[1] = (~this.statusTable.st[9] )>>>0;
            this.statusTable.st[0] = (~this.statusTable.st[9] )>>>0;
        }
        //XOR IV VALUES
        this.statusTable.st[15] = (this.statusTable.st[15] ^ this.statusTable.ivTable[0])>>>0;
        this.statusTable.st[12] = (this.statusTable.st[12] ^ this.statusTable.ivTable[1])>>>0;
        this.statusTable.st[10] = (this.statusTable.st[10] ^ this.statusTable.ivTable[2])>>>0;
        this.statusTable.st[9]  = (this.statusTable.st[9]  ^ this.statusTable.ivTable[3])>>>0;

        //do 32 iclocks
        for (let i = 0; i < 2; i++){
            for (let time=0; time < 16; time++){
                let outfrom_fsm = new Uint32Array(1);
                let fsmtmp = new Uint32Array(1);
                outfrom_fsm[0] = ((this.statusTable.r[0] + this.statusTable.st[(time+15)& 0xf]) ^ this.statusTable.r[1])>>>0;
                this.statusTable.st[(time +0)& 0xf] = (a_mul(this.statusTable.st[(time +0)& 0xf]) ^ this.statusTable.st[(time +2)& 0xf] ^ ainv_mul(this.statusTable.st[(time+11)& 0xf]) ^ outfrom_fsm[0])>>>0;
                fsmtmp[0] = (this.statusTable.r[1] + this.statusTable.st[(time +5)& 0xf])>>>0;
                this.statusTable.r[1] = (SnowTable.snow_T0[byte(0, this.statusTable.r[0])] ^ SnowTable.snow_T1[byte(1, this.statusTable.r[0])] ^ SnowTable.snow_T2[byte(2, this.statusTable.r[0])] ^ SnowTable.snow_T3[byte(3, this.statusTable.r[0])])>>>0;
                this.statusTable.r[0] = fsmtmp[0];
            }
        }
    }
    /**
     * Clocks the cipher 16 times and returns 16 words of keystream symbols in keystream_block.
     * @returns {Uint32Array}keystream_block
     */
    generateKeyStream() {
        let keystream_block = new Uint32Array(16)
        for(let i=0; i<16; i++) {
            keystream_block[i] = this.singleClock()
        }
        return keystream_block
    }
    /**
     * Clocks the cipher once and returns one keystream symbol.
     * @returns {number} keystream symbol(uint32)
     */
	singleClock(){
        let time = this.statusTable.ctr % 16
        let fsmtmp = new Uint32Array(1);
        this.statusTable.st[time] = (a_mul(this.statusTable.st[time]) ^ this.statusTable.st[(time +2)& 0xf] ^ ainv_mul(this.statusTable.st[(time +11)& 0xf]))>>>0;
        fsmtmp[0] = (this.statusTable.r[1] + this.statusTable.st[(time +5)& 0xf])>>>0;
        this.statusTable.r[1] = (SnowTable.snow_T0[byte(0, this.statusTable.r[0])] ^ SnowTable.snow_T1[byte(1, this.statusTable.r[0])] ^ SnowTable.snow_T2[byte(2, this.statusTable.r[0])] ^ SnowTable.snow_T3[byte(3, this.statusTable.r[0])])>>>0;
        this.statusTable.r[0] = fsmtmp[0];
        this.statusTable.ctr++;
        return ((this.statusTable.r[0] + this.statusTable.st[time]) ^ this.statusTable.r[1] ^ this.statusTable.st[(time +1)& 0xf])>>>0;
	}
}
module.exports = SnowCipher

