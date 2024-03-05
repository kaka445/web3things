# Web3Things

Web3Things integrates IoT devices with the Ethereum blockchain, enabling secure, blockchain-verifiable interactions between smart contracts and physical devices.

## Features

- Listen to Ethereum contract events and trigger IoT device actions.
- Send commands to IoT devices and publish their responses via MQTT.
- Ensure data integrity and action verification using blockchain technology.

## Installation

```bash
npm install web3things
```

### Usage
Ensure you have Web3 and MQTT broker credentials:

```bash
const Web3Things = require('web3things');
const contractABI = [...] // Your contract ABI
const contractAddress = '...' // Your contract address

const web3Things = new Web3Things('https://mainnet.infura.io/v3/YOUR_PROJECT_ID', 'mqtt://broker.hivemq.com');
web3Things.subscribeToContractEvents(contractAddress, contractABI);
web3Things.publishDeviceCommand('deviceId123', { action: 'turnOn' });
web3Things.listenToDeviceResponses('deviceId123');

```
Web3Things empowers your IoT ecosystem to function seamlessly with Ethereum blockchain, enhancing security and automation.