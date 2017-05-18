# BIG Register SOAP wrapper

[![npm version](https://badge.fury.io/js/bigregister-soap.svg)](https://badge.fury.io/js/bigregister-soap)
[![GitHub release](https://img.shields.io/github/release/ferrybrouwer/bigregister-soap.svg)](https://github.com/ferrybrouwer/bigregister-soap)
[![npm](https://img.shields.io/npm/dt/bigregister-soap.svg)](https://www.npmjs.com/package/bigregister-soap)

> A node wrapper for the SOAP webservice on http://webservices.cibg.nl/Ribiz


## Install

```shell
npm install bigregister-soap --save
```


## Usage

### With promises

```javascript
// import package
const bigRegister = require('bigregister-soap')

// connect to SOAP server
bigRegister.connect()

	// find user data by BIG-number
	.then(() => bigRegister.findByRegistrationNumber('xxx'))
	.then((data) => {
        // do something with data...
	})

	// catch errors
	.catch((err) => {
        // an error occurred
	})
```

### Using async / await and ES6 imports

```javascript
// import package
import bigRegister from 'bigregister-soap'

const example = async() => {
    try {

    	// connect to SOAP server
    	await bigRegister.connect()

    	// find user data by BIG-number
        const data = await bigRegisterApi.findByRegistrationNumber('xxx')

        // do something with data

    } catch(err) {

        // an error occurred

    }
}
```

## Documentation

- <u>Connect to SOAP server</u>:

	Method structure _(pseudo code)_:<br />
	`BigRegister.connect(wsdl:String):Promise.<void>`

	> @note: it's not necessary to wait for resolving the promise, since each API method waits for this promise to be resolved.

	```javascript
	const BigRegister = require('bigregister-soap')

	BigRegister.connect()
		.then(() => console.log('connected'))

		.catch((err) => console.error(`An error occurred: ${err}`))
	```


- <u>Find user by BIG-number</u>:

	Method structure _(pseudo code)_:<br />
	`BigRegister.findByRegistrationNumber(bigNumber:String|Number): Promise.<Object>`

	```javascript
	const BigRegister = require('bigregister-soap')

	BigRegister.connect()
		.then(() => BigRegister.findByRegistrationNumber('xxx'))
		.then((data) => console.log(data))

		.catch((err) => console.error(`An error occurred: ${err}`))
	```
