Pure javascript implementation of [Snow 2.0](https://link.springer.com/content/pdf/10.1007/3-540-36492-7_5.pdf)

Create by @cronfox .
# Usage
```
const SnowCipher = require("snow2cipher")

let SC1 = new SnowCipher({
	keySize : 128,//(128|256)
    key: new Uint8Array([0xaa,0xaa,0xaa,0xaa,0xaa,0xaa,0xaa,0xaa,0xaa,0xaa,0xaa,0xaa,0xaa,0xaa,0xaa,0xaa]), //if use in mabinogi , please use Int8Array.
    ivTable: new Uint32Array([0,0,0,0])//[iv0,iv1,iv2,iv3]
})

SC1.generateKeyStream()

/*
Clocks the cipher 16 times and returns 16 words of keystream symbols in keystream_block.
return Uint32Array([
	0xE00982F5,
	0x25F02054,
	0x214992D8,
	0x706F2B20,
	0xDA585E5B,
	0x85E2746D,
	0x09F22681,
	0xB2749407,
	0x1D120231,
	0x82D9CCDF,
	0x7562671C,
	0xA19B884F,
	0x89572EAB,
	0x9EBBB511,
	0x85F42F7D,
	0xD5D4B51C	
])
*/

let SC = new SnowCipher({
	keySize : 128,
    key: new Uint8Array([0xaa,0xaa,0xaa,0xaa,0xaa,0xaa,0xaa,0xaa,0xaa,0xaa,0xaa,0xaa,0xaa,0xaa,0xaa,0xaa]),
    ivTable: new Uint32Array([0,0,0,0])
})

SC.singleClock()
//return keystream symbol(uint32 number),0xE00982F5
```
Just generate key stream, non encrypt/decrypt export.