const Web3 = require('web3');
const mqtt = require('mqtt');

class Web3Things {
    constructor(web3Provider, mqttBrokerUrl) {
        this.web3 = new Web3(web3Provider);
        this.mqttClient = mqtt.connect(mqttBrokerUrl);
    }

    async subscribeToContractEvents(contractAddress, contractABI) {
        const contract = new this.web3.eth.Contract(contractABI, contractAddress);
        contract.events.allEvents()
            .on('data', event => {
                const { returnValues, event: eventName } = event;
                console.log(`New event received - ${eventName}:`, returnValues);
                this.mqttClient.publish(`web3things/${contractAddress}/${eventName}`, JSON.stringify(returnValues));
            })
            .on('error', error => console.error(`Error in subscription: ${error}`));
    }

    publishDeviceCommand(deviceId, command) {
        this.mqttClient.publish(`web3things/device/${deviceId}/command`, JSON.stringify(command));
        console.log(`Command ${command.action} sent to device ${deviceId}`);
    }

    listenToDeviceResponses(deviceId) {
        this.mqttClient.subscribe(`web3things/device/${deviceId}/response`, function(err) {
            if (err) {
                console.error(`Failed to subscribe to device ${deviceId} responses`, err);
            }
        });

        this.mqttClient.on('message', (topic, message) => {
            console.log(`Message from ${topic}: ${message.toString()}`);
        });
    }
}

module.exports = Web3Things;
