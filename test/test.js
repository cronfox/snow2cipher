const assert = require('assert/strict');
const SnowCipher = require("../src/SnowCipher");

console.log("testcase:key=AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA,iv=0,0,0,0");
const SC_AAAA_0000 = new SnowCipher({
	keySize : 128,
    key: new Uint8Array([0xaa,0xaa,0xaa,0xaa,0xaa,0xaa,0xaa,0xaa,0xaa,0xaa,0xaa,0xaa,0xaa,0xaa,0xaa,0xaa]),
    ivTable: new Uint32Array([0,0,0,0])
})
let KS_AAAA_0000 = SC_AAAA_0000.generateKeyStream()
assert.deepStrictEqual(KS_AAAA_0000,new Uint32Array([
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
]))


console.log("testcase:key=80000000000000000000000000000000,iv=0,0,0,0");
const SC_8000_0000 = new SnowCipher({
	keySize : 128,
    key: new Uint8Array([0x80,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00]),
    ivTable: new Uint32Array([0,0,0,0])
})
let KS_8000_0000 = SC_8000_0000.generateKeyStream()
assert.deepStrictEqual(KS_8000_0000,new Uint32Array([
	0x8D590AE9,
	0xA74A7D05,
	0x6DC9CA74,
	0xB72D1A45,
	0x99B0A083,
	0xFB45D13F,
	0xCF9411BD,
	0x9A503783,
	0xA98265AE,
	0xBF2DC77F,
	0xF2EB41E4,
	0xAA896508,
	0x19D8AB8F,
	0x2EB8077F,
	0x78F8C1F1,
	0x9D4C5CE2	
]))	


console.log("testcase:key=AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA,iv=1,2,3,4");
const SC_AAAA_1234 = new SnowCipher({
	keySize : 128,
    key: new Uint8Array([0xaa,0xaa,0xaa,0xaa,0xaa,0xaa,0xaa,0xaa,0xaa,0xaa,0xaa,0xaa,0xaa,0xaa,0xaa,0xaa]),
    ivTable: new Uint32Array([1,2,3,4])
})
let KS_AAAA_1234 = SC_AAAA_1234.generateKeyStream()
assert.deepStrictEqual(KS_AAAA_1234,new Uint32Array([
	0xC355385D,
	0xB31D6CBD,
	0xF774AF53,
	0x66C2E877,
	0x4DEADAC7,
	0xDC7229DF,
	0xED171D7B,
	0xB35D54CC,
	0xBC946376,
	0xFBC316BA,
	0x906FE918,
	0x1B8619D5,
	0x7FC1D6FC,
	0x75CC452A,
	0x55AE5978,
	0x44A4F13E	
]))	

console.log("testcase:key=80000000000000000000000000000000,iv=1,2,3,4");
const SC_8000_1234 = new SnowCipher({
	keySize : 128,
    key: new Uint8Array([0x80,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00]),
    ivTable: new Uint32Array([1,2,3,4])
})
let KS_8000_1234 = SC_8000_1234.generateKeyStream()
assert.deepStrictEqual(KS_8000_1234,new Uint32Array([
	0xD6403358,
	0xE0354A69,
	0x57F43FCE,
	0x44B4B13F,
	0xF78E24C2,
	0x46618A07,
	0x67AC83C1,
	0x0BFC45F0,
	0x726E7903,
	0xF29C8A09,
	0x25FF3EFF,
	0xB00B4819,
	0xE163BBE1,
	0xACA590CE,
	0x999D9AB1,
	0x9FF2D7B9	
]))	

console.log("testcase:key=AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA,iv=0,0,0,0");
const SC_AAAAAAAA_0000 = new SnowCipher({
	keySize : 256,
    key: new Uint8Array([0xaa,0xaa,0xaa,0xaa,0xaa,0xaa,0xaa,0xaa,0xaa,0xaa,0xaa,0xaa,0xaa,0xaa,0xaa,0xaa,0xaa,0xaa,0xaa,0xaa,0xaa,0xaa,0xaa,0xaa,0xaa,0xaa,0xaa,0xaa,0xaa,0xaa,0xaa,0xaa]),
    ivTable: new Uint32Array([0,0,0,0])
})
let KS_AAAAAAAA_0000 = SC_AAAAAAAA_0000.generateKeyStream()
assert.deepStrictEqual(KS_AAAAAAAA_0000,new Uint32Array([
	0xD9CC22FD,
	0x861492D0,
	0xAE6F43FB,
	0x0F072012,
	0x078C5AEE,
	0xE479DE8C,
	0xF0E555F4,
	0x58EED858,
	0xB5CB7F88,
	0x81C1650D,
	0x26107EAA,
	0x912D9A8F,
	0x3A31FBE3,
	0x3057FBFF,
	0x962FCCD3,
	0x3F9A2D89	
]))	

console.log("testcase:key=8000000000000000000000000000000000000000000000000000000000000000,iv=0,0,0,0");
const SC_80000000_0000 = new SnowCipher({
	keySize : 256,
    key: new Uint8Array([0x80,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00]),
    ivTable: new Uint32Array([0,0,0,0])
})
let KS_80000000_0000 = SC_80000000_0000.generateKeyStream()
assert.deepStrictEqual(KS_80000000_0000,new Uint32Array([
	0x0B5BCCE2,
	0x0323E28E,
	0x0FC20380,
	0x9C66AB73,
	0xCA35A680,
	0xF2A5DD19,
	0x7E0C5C02,
	0x287BE822,
	0x0046E8EF,
	0x4668F2B3,
	0xD613ABD0,
	0xDD179993,
	0xB8D063D9,
	0xECA03E07,
	0x2D878C96,
	0xBCF0A9E0	
]))	
console.log("testcase:key=AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA,iv=1,2,3,4");
const SC_AAAAAAAA_1234 = new SnowCipher({
	keySize : 256,
    key: new Uint8Array([0xaa,0xaa,0xaa,0xaa,0xaa,0xaa,0xaa,0xaa,0xaa,0xaa,0xaa,0xaa,0xaa,0xaa,0xaa,0xaa,0xaa,0xaa,0xaa,0xaa,0xaa,0xaa,0xaa,0xaa,0xaa,0xaa,0xaa,0xaa,0xaa,0xaa,0xaa,0xaa]),
    ivTable: new Uint32Array([1,2,3,4])
})
let KS_AAAAAAAA_1234 = SC_AAAAAAAA_1234.generateKeyStream()
assert.deepStrictEqual(KS_AAAAAAAA_1234,new Uint32Array([
	0x29261FCE,
	0x5ED03820,
	0x1D6AFAF8,
	0xB87E74FE,
	0xD49ECB10,
	0x197EAC02,
	0x5D024EB4,
	0x5E0C7655,
	0x3792345F,
	0x391914D2,
	0xD1BEB523,
	0x7A8DC97A,
	0xD5F258EE,
	0xD8389970,
	0xEDB821F2,
	0xBD9BE5EA	
]))	
console.log("testcase:key=8000000000000000000000000000000000000000000000000000000000000000,iv=1,2,3,4");
const SC_80000000_1234 = new SnowCipher({
	keySize : 256,
    key: new Uint8Array([0x80,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00]),
    ivTable: new Uint32Array([1,2,3,4])
})
let KS_80000000_1234 = SC_80000000_1234.generateKeyStream()
assert.deepStrictEqual(KS_80000000_1234,new Uint32Array([
	0x7861080D,
	0x5755E90B,
	0x736F1091,
	0x6ED519B1,
	0x2C1A3A42,
	0x55297FC2,
	0x246AB7FA,
	0x6C089526,
	0x6199747D,
	0x75CEF3C2,
	0x5AAAC49C,
	0xFD210C77,
	0x8FB709CF,
	0x578B3CED,
	0xEB824586,
	0xFB3C76CC	
]))	
console.time("genreate keystream")
const SC_TimeTest = new SnowCipher({
	keySize : 256,
    key: new Uint8Array([0x80,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00]),
    ivTable: new Uint32Array([1,2,3,4])
})
for(let i=0;i<10000000;i++){
    SC_TimeTest.generateKeyStream()
}
console.timeEnd("genreate keystream")