# Norwegian Red Cross Operations API

> Browser and node module for making API requests against [Norwegian Red Cross Operations API](https://api.redcross.no/odss/rest/api/v{version}).

## Installation

```sh
npm install norwegian-red-cross-operations-api --save
```

## Usage

```js
var NorwegianRedCrossOperationsApi = require('norwegian-red-cross-operations-api')

var client = new NorwegianRedCrossOperationsApi()
```

### Authentication

#### OAuth 2.0

This API supports authentication with [OAuth 2.0](https://github.com/mulesoft/js-client-oauth2). Initialize the `OAuth2` instance with the application client id, client secret and a redirect uri to authenticate with users.

```js
var auth = new NorwegianRedCrossOperationsApi.security.<method>({
  clientId:     '123',
  clientSecret: 'abc',
  redirectUri:  'http://example.com/auth/callback'
});

// Available methods for OAuth 2.0:
 - oauth2_0
```
### Options

You can set options when you initialize a client or at any time with the `options` property. You may also override options per request by passing an object as the last argument of request methods. For example:

```javascript
var client = new NorwegianRedCrossOperationsApi({ ... })

client('GET', '/', {
  baseUri: 'http://example.com',
  headers: {
    'Content-Type': 'application/json'
  }
})
```

#### Base URI

You can override the base URI by setting the `baseUri` property, or initializing a client with a base URI. For example:

```javascript
new NorwegianRedCrossOperationsApi({
  baseUri: 'https://example.com'
});
```

### Helpers

Exports `NorwegianRedCrossOperationsApi.form`, which exposes a cross-platform `FormData` interface that can be used with request bodies.

### Methods

All methods return a HTTP request instance of [Popsicle](https://github.com/blakeembrey/popsicle), which allows the use of promises (and streaming in node).

#### `incidents.get([query, [options]])`

Get collection of active Incidents

```js
client.incidents.get([query, [options]]).then(...)
```
  
#### `incidents.post([body, [options]])`

Add a new incident to collection.

```js
client.incidents.post([body, [options]]).then(...)
```
  
#### `incidents.incidentId({ incidentId }).get([query, [options]])`

* **incidentId** Globally Unique Identifier (GUID) (type: `string`)

Get incident with `incidentId = {incidentId}`.

```js
client.incidents.incidentId({ incidentId }).get([query, [options]]).then(...)
```
  
#### `incidents.incidentId({ incidentId }).patch([body, [options]])`

* **incidentId** Globally Unique Identifier (GUID) (type: `string`)

Update incident with `incidentId = {incidentId}`.

```js
client.incidents.incidentId({ incidentId }).patch([body, [options]]).then(...)
```
  
#### `incidents.incidentId({ incidentId }).delete([body, [options]])`

* **incidentId** Globally Unique Identifier (GUID) (type: `string`)

Delete incident with `incidentId = {incidentId}`.

```js
client.incidents.incidentId({ incidentId }).delete([body, [options]]).then(...)
```
  
#### `incidents.incidentId({ incidentId }).clues.get([query, [options]])`

* **incidentId** Globally Unique Identifier (GUID) (type: `string`)

Get a collection of clues.

```js
client.incidents.incidentId({ incidentId }).clues.get([query, [options]]).then(...)
```
  
#### `incidents.incidentId({ incidentId }).clues.post([body, [options]])`

* **incidentId** Globally Unique Identifier (GUID) (type: `string`)

Add a new clue to collection.

```js
client.incidents.incidentId({ incidentId }).clues.post([body, [options]]).then(...)
```
  
#### `incidents.incidentId({ incidentId }).clues.clueId({ clueId }).get([query, [options]])`

* **incidentId** Globally Unique Identifier (GUID) (type: `string`)
* **clueId** Globally Unique Identifier (GUID) (type: `string`)

Get clue with `clueId = {clueId}`.

```js
client.incidents.incidentId({ incidentId }).clues.clueId({ clueId }).get([query, [options]]).then(...)
```
  
#### `incidents.incidentId({ incidentId }).clues.clueId({ clueId }).patch([body, [options]])`

* **incidentId** Globally Unique Identifier (GUID) (type: `string`)
* **clueId** Globally Unique Identifier (GUID) (type: `string`)

Update clue with `clueId = {clueId}`.

```js
client.incidents.incidentId({ incidentId }).clues.clueId({ clueId }).patch([body, [options]]).then(...)
```
  
#### `incidents.incidentId({ incidentId }).clues.clueId({ clueId }).delete([body, [options]])`

* **incidentId** Globally Unique Identifier (GUID) (type: `string`)
* **clueId** Globally Unique Identifier (GUID) (type: `string`)

Delete clue with `clueId = {clueId}`.

```js
client.incidents.incidentId({ incidentId }).clues.clueId({ clueId }).delete([body, [options]]).then(...)
```
  
#### `incidents.incidentId({ incidentId }).persons.get([query, [options]])`

* **incidentId** Globally Unique Identifier (GUID) (type: `string`)

Get a collection of persons.

```js
client.incidents.incidentId({ incidentId }).persons.get([query, [options]]).then(...)
```
  
#### `incidents.incidentId({ incidentId }).persons.post([body, [options]])`

* **incidentId** Globally Unique Identifier (GUID) (type: `string`)

Add a new person to collection.

```js
client.incidents.incidentId({ incidentId }).persons.post([body, [options]]).then(...)
```
  
#### `incidents.incidentId({ incidentId }).persons.personId({ personId }).get([query, [options]])`

* **incidentId** Globally Unique Identifier (GUID) (type: `string`)
* **personId** Globally Unique Identifier (GUID) (type: `string`)

Get person with `personId = {personId}`.

```js
client.incidents.incidentId({ incidentId }).persons.personId({ personId }).get([query, [options]]).then(...)
```
  
#### `incidents.incidentId({ incidentId }).persons.personId({ personId }).patch([body, [options]])`

* **incidentId** Globally Unique Identifier (GUID) (type: `string`)
* **personId** Globally Unique Identifier (GUID) (type: `string`)

Update person with `personId = {personId}`.

```js
client.incidents.incidentId({ incidentId }).persons.personId({ personId }).patch([body, [options]]).then(...)
```
  
#### `incidents.incidentId({ incidentId }).persons.personId({ personId }).delete([body, [options]])`

* **incidentId** Globally Unique Identifier (GUID) (type: `string`)
* **personId** Globally Unique Identifier (GUID) (type: `string`)

Delete person with `personId = {personId}`.

```js
client.incidents.incidentId({ incidentId }).persons.personId({ personId }).delete([body, [options]]).then(...)
```
  
#### `incidents.incidentId({ incidentId }).vehicles.get([query, [options]])`

* **incidentId** Globally Unique Identifier (GUID) (type: `string`)

Get a collection of vehicles.

```js
client.incidents.incidentId({ incidentId }).vehicles.get([query, [options]]).then(...)
```
  
#### `incidents.incidentId({ incidentId }).vehicles.post([body, [options]])`

* **incidentId** Globally Unique Identifier (GUID) (type: `string`)

Add a new vehicle to collection.

```js
client.incidents.incidentId({ incidentId }).vehicles.post([body, [options]]).then(...)
```
  
#### `incidents.incidentId({ incidentId }).vehicles.vehicleId({ vehicleId }).get([query, [options]])`

* **incidentId** Globally Unique Identifier (GUID) (type: `string`)
* **vehicleId** Globally Unique Identifier (GUID) (type: `string`)

Get vehicle with `vehicleId = {vehicleId}`.

```js
client.incidents.incidentId({ incidentId }).vehicles.vehicleId({ vehicleId }).get([query, [options]]).then(...)
```
  
#### `incidents.incidentId({ incidentId }).vehicles.vehicleId({ vehicleId }).patch([body, [options]])`

* **incidentId** Globally Unique Identifier (GUID) (type: `string`)
* **vehicleId** Globally Unique Identifier (GUID) (type: `string`)

Update vehicle with `vehicleId = {vehicleId}`.

```js
client.incidents.incidentId({ incidentId }).vehicles.vehicleId({ vehicleId }).patch([body, [options]]).then(...)
```
  
#### `incidents.incidentId({ incidentId }).vehicles.vehicleId({ vehicleId }).delete([body, [options]])`

* **incidentId** Globally Unique Identifier (GUID) (type: `string`)
* **vehicleId** Globally Unique Identifier (GUID) (type: `string`)

Delete vehicle with `vehicleId = {vehicleId}`.

```js
client.incidents.incidentId({ incidentId }).vehicles.vehicleId({ vehicleId }).delete([body, [options]]).then(...)
```
  
#### `operations.get([query, [options]])`

Get a list of active Operations

```js
client.operations.get([query, [options]]).then(...)
```
  
#### `operations.post([body, [options]])`

Add a new operation to collection.

```js
client.operations.post([body, [options]]).then(...)
```
  
#### `operations.operationId({ operationId }).get([query, [options]])`

* **operationId** Globally Unique Identifier (GUID) (type: `string`)

Get operation with `operationId = {operationId}`.

```js
client.operations.operationId({ operationId }).get([query, [options]]).then(...)
```
  
#### `operations.operationId({ operationId }).patch([body, [options]])`

* **operationId** Globally Unique Identifier (GUID) (type: `string`)

Update operation with `operationId = {operationId}`.

```js
client.operations.operationId({ operationId }).patch([body, [options]]).then(...)
```
  
#### `operations.operationId({ operationId }).delete([body, [options]])`

* **operationId** Globally Unique Identifier (GUID) (type: `string`)

Delete operation with `operationId = {operationId}`.

```js
client.operations.operationId({ operationId }).delete([body, [options]]).then(...)
```
  
#### `operations.operationId({ operationId }).missions.get([query, [options]])`

* **operationId** Globally Unique Identifier (GUID) (type: `string`)

Get a collection of missions.

```js
client.operations.operationId({ operationId }).missions.get([query, [options]]).then(...)
```
  
#### `operations.operationId({ operationId }).missions.post([body, [options]])`

* **operationId** Globally Unique Identifier (GUID) (type: `string`)

Add a new mission to collection.

```js
client.operations.operationId({ operationId }).missions.post([body, [options]]).then(...)
```
  
#### `operations.operationId({ operationId }).missions.missionId({ missionId }).get([query, [options]])`

* **operationId** Globally Unique Identifier (GUID) (type: `string`)
* **missionId** Globally Unique Identifier (GUID) (type: `string`)

Get mission with `missionId = {missionId}`.

```js
client.operations.operationId({ operationId }).missions.missionId({ missionId }).get([query, [options]]).then(...)
```
  
#### `operations.operationId({ operationId }).missions.missionId({ missionId }).patch([body, [options]])`

* **operationId** Globally Unique Identifier (GUID) (type: `string`)
* **missionId** Globally Unique Identifier (GUID) (type: `string`)

Update mission with `missionId = {missionId}`.

```js
client.operations.operationId({ operationId }).missions.missionId({ missionId }).patch([body, [options]]).then(...)
```
  
#### `operations.operationId({ operationId }).missions.missionId({ missionId }).delete([body, [options]])`

* **operationId** Globally Unique Identifier (GUID) (type: `string`)
* **missionId** Globally Unique Identifier (GUID) (type: `string`)

Delete mission with `missionId = {missionId}`.

```js
client.operations.operationId({ operationId }).missions.missionId({ missionId }).delete([body, [options]]).then(...)
```
  
#### `operations.operationId({ operationId }).transitions.get([query, [options]])`

* **operationId** Globally Unique Identifier (GUID) (type: `string`)

Get a list allowed state transitions for this operation, 
along with operation fields that are required and their types. 
Fields are only returned if `expand=transitions.fields` is given.

```js
client.operations.operationId({ operationId }).transitions.get([query, [options]]).then(...)
```
  
#### `operations.operationId({ operationId }).transitions.post([body, [options]])`

* **operationId** Globally Unique Identifier (GUID) (type: `string`)

Perform a transition on this operation. 
When performing the transition you can update or set other operation fields.

```js
client.operations.operationId({ operationId }).transitions.post([body, [options]]).then(...)
```
  
#### `operations.operationId({ operationId }).personnel.get([query, [options]])`

* **operationId** Globally Unique Identifier (GUID) (type: `string`)

Get list of Personnel mobilized for this Operation.

```js
client.operations.operationId({ operationId }).personnel.get([query, [options]]).then(...)
```
  
#### `operations.operationId({ operationId }).personnel.personnelId({ personnelId }).post([body, [options]])`

* **operationId** Globally Unique Identifier (GUID) (type: `string`)
* **personnelId** Globally Unique Identifier (GUID) (type: `string`)

Mobilize Personnel for this Operation.

```js
client.operations.operationId({ operationId }).personnel.personnelId({ personnelId }).post([body, [options]]).then(...)
```
  
#### `operations.operationId({ operationId }).personnel.personnelId({ personnelId }).delete([body, [options]])`

* **operationId** Globally Unique Identifier (GUID) (type: `string`)
* **personnelId** Globally Unique Identifier (GUID) (type: `string`)

Demobilize Personnel from this Operation.

```js
client.operations.operationId({ operationId }).personnel.personnelId({ personnelId }).delete([body, [options]]).then(...)
```
  
#### `operations.operationId({ operationId }).transports.get([query, [options]])`

* **operationId** Globally Unique Identifier (GUID) (type: `string`)

Get list of Transports demobilized from this Operation.

```js
client.operations.operationId({ operationId }).transports.get([query, [options]]).then(...)
```
  
#### `operations.operationId({ operationId }).transports.transportId({ transportId }).post([body, [options]])`

* **operationId** Globally Unique Identifier (GUID) (type: `string`)
* **transportId** Globally Unique Identifier (GUID) (type: `string`)

Mobilize Transport for this Operation.

```js
client.operations.operationId({ operationId }).transports.transportId({ transportId }).post([body, [options]]).then(...)
```
  
#### `operations.operationId({ operationId }).transports.transportId({ transportId }).delete([body, [options]])`

* **operationId** Globally Unique Identifier (GUID) (type: `string`)
* **transportId** Globally Unique Identifier (GUID) (type: `string`)

Demobilize Transports from this Operation.

```js
client.operations.operationId({ operationId }).transports.transportId({ transportId }).delete([body, [options]]).then(...)
```
  
#### `operations.operationId({ operationId }).units.get([query, [options]])`

* **operationId** Globally Unique Identifier (GUID) (type: `string`)

Get a collection of units.

```js
client.operations.operationId({ operationId }).units.get([query, [options]]).then(...)
```
  
#### `operations.operationId({ operationId }).units.post([body, [options]])`

* **operationId** Globally Unique Identifier (GUID) (type: `string`)

Add a new unit to collection.

```js
client.operations.operationId({ operationId }).units.post([body, [options]]).then(...)
```
  
#### `operations.operationId({ operationId }).units.unitId({ unitId }).get([query, [options]])`

* **operationId** Globally Unique Identifier (GUID) (type: `string`)
* **unitId** Globally Unique Identifier (GUID) (type: `string`)

Get unit with `unitId = {unitId}`.

```js
client.operations.operationId({ operationId }).units.unitId({ unitId }).get([query, [options]]).then(...)
```
  
#### `operations.operationId({ operationId }).units.unitId({ unitId }).patch([body, [options]])`

* **operationId** Globally Unique Identifier (GUID) (type: `string`)
* **unitId** Globally Unique Identifier (GUID) (type: `string`)

Update unit with `unitId = {unitId}`.

```js
client.operations.operationId({ operationId }).units.unitId({ unitId }).patch([body, [options]]).then(...)
```
  
#### `operations.operationId({ operationId }).units.unitId({ unitId }).delete([body, [options]])`

* **operationId** Globally Unique Identifier (GUID) (type: `string`)
* **unitId** Globally Unique Identifier (GUID) (type: `string`)

Delete unit with `unitId = {unitId}`.

```js
client.operations.operationId({ operationId }).units.unitId({ unitId }).delete([body, [options]]).then(...)
```
  
#### `operations.operationId({ operationId }).units.unitId({ unitId }).missions.get([query, [options]])`

* **operationId** Globally Unique Identifier (GUID) (type: `string`)
* **unitId** Globally Unique Identifier (GUID) (type: `string`)

Get list of missions assigned to this Unit.

```js
client.operations.operationId({ operationId }).units.unitId({ unitId }).missions.get([query, [options]]).then(...)
```
  
#### `operations.operationId({ operationId }).units.unitId({ unitId }).missions.missionId({ missionId }).post([body, [options]])`

* **operationId** Globally Unique Identifier (GUID) (type: `string`)
* **unitId** Globally Unique Identifier (GUID) (type: `string`)
* **missionId** Globally Unique Identifier (GUID) (type: `string`)

Assign mission to this unit.

```js
client.operations.operationId({ operationId }).units.unitId({ unitId }).missions.missionId({ missionId }).post([body, [options]]).then(...)
```
  
#### `operations.operationId({ operationId }).units.unitId({ unitId }).missions.missionId({ missionId }).delete([body, [options]])`

* **operationId** Globally Unique Identifier (GUID) (type: `string`)
* **unitId** Globally Unique Identifier (GUID) (type: `string`)
* **missionId** Globally Unique Identifier (GUID) (type: `string`)

Release mission from this Unit.

```js
client.operations.operationId({ operationId }).units.unitId({ unitId }).missions.missionId({ missionId }).delete([body, [options]]).then(...)
```
  
#### `operations.operationId({ operationId }).units.unitId({ unitId }).personnel.get([query, [options]])`

* **operationId** Globally Unique Identifier (GUID) (type: `string`)
* **unitId** Globally Unique Identifier (GUID) (type: `string`)

Get list of personnel assigned to this unit.

```js
client.operations.operationId({ operationId }).units.unitId({ unitId }).personnel.get([query, [options]]).then(...)
```
  
#### `operations.operationId({ operationId }).units.unitId({ unitId }).personnel.personnelId({ personnelId }).post([body, [options]])`

* **operationId** Globally Unique Identifier (GUID) (type: `string`)
* **unitId** Globally Unique Identifier (GUID) (type: `string`)
* **personnelId** Globally Unique Identifier (GUID) (type: `string`)

Assign personnel to this unit.

```js
client.operations.operationId({ operationId }).units.unitId({ unitId }).personnel.personnelId({ personnelId }).post([body, [options]]).then(...)
```
  
#### `operations.operationId({ operationId }).units.unitId({ unitId }).personnel.personnelId({ personnelId }).delete([body, [options]])`

* **operationId** Globally Unique Identifier (GUID) (type: `string`)
* **unitId** Globally Unique Identifier (GUID) (type: `string`)
* **personnelId** Globally Unique Identifier (GUID) (type: `string`)

Release personnel from this unit.

```js
client.operations.operationId({ operationId }).units.unitId({ unitId }).personnel.personnelId({ personnelId }).delete([body, [options]]).then(...)
```
  
#### `operations.operationId({ operationId }).units.unitId({ unitId }).transports.get([query, [options]])`

* **operationId** Globally Unique Identifier (GUID) (type: `string`)
* **unitId** Globally Unique Identifier (GUID) (type: `string`)

Get list of transports assigned to this unit.

```js
client.operations.operationId({ operationId }).units.unitId({ unitId }).transports.get([query, [options]]).then(...)
```
  
#### `operations.operationId({ operationId }).units.unitId({ unitId }).transports.transportId({ transportId }).post([body, [options]])`

* **operationId** Globally Unique Identifier (GUID) (type: `string`)
* **unitId** Globally Unique Identifier (GUID) (type: `string`)
* **transportId** Globally Unique Identifier (GUID) (type: `string`)

Assign transport to this unit.

```js
client.operations.operationId({ operationId }).units.unitId({ unitId }).transports.transportId({ transportId }).post([body, [options]]).then(...)
```
  
#### `operations.operationId({ operationId }).units.unitId({ unitId }).transports.transportId({ transportId }).delete([body, [options]])`

* **operationId** Globally Unique Identifier (GUID) (type: `string`)
* **unitId** Globally Unique Identifier (GUID) (type: `string`)
* **transportId** Globally Unique Identifier (GUID) (type: `string`)

Release transport from this unit.

```js
client.operations.operationId({ operationId }).units.unitId({ unitId }).transports.transportId({ transportId }).delete([body, [options]]).then(...)
```
  
#### `operations.operationId({ operationId }).tracking.get([query, [options]])`

* **operationId** Globally Unique Identifier (GUID) (type: `string`)

Get a collection of tracking.

```js
client.operations.operationId({ operationId }).tracking.get([query, [options]]).then(...)
```
  
#### `operations.operationId({ operationId }).tracking.unitId({ unitId }).get([query, [options]])`

* **operationId** Globally Unique Identifier (GUID) (type: `string`)
* **unitId** Globally Unique Identifier (GUID) (type: `string`)

Get tracking with `unitId = {unitId}`.

```js
client.operations.operationId({ operationId }).tracking.unitId({ unitId }).get([query, [options]]).then(...)
```
  
#### `operations.operationId({ operationId }).tracking.unitId({ unitId }).post([body, [options]])`

* **operationId** Globally Unique Identifier (GUID) (type: `string`)
* **unitId** Globally Unique Identifier (GUID) (type: `string`)

Update tracking with `unitId = {unitId}`.

```js
client.operations.operationId({ operationId }).tracking.unitId({ unitId }).post([body, [options]]).then(...)
```
  
#### `operations.operationId({ operationId }).tracking.unitId({ unitId }).patch([body, [options]])`

* **operationId** Globally Unique Identifier (GUID) (type: `string`)
* **unitId** Globally Unique Identifier (GUID) (type: `string`)

Update tracking with `unitId = {unitId}`.

```js
client.operations.operationId({ operationId }).tracking.unitId({ unitId }).patch([body, [options]]).then(...)
```
  
#### `operations.operationId({ operationId }).tracking.unitId({ unitId }).delete([body, [options]])`

* **operationId** Globally Unique Identifier (GUID) (type: `string`)
* **unitId** Globally Unique Identifier (GUID) (type: `string`)

Delete tracking with `unitId> = {unitId>}`.

```js
client.operations.operationId({ operationId }).tracking.unitId({ unitId }).delete([body, [options]]).then(...)
```
  
#### `operations.operationId({ operationId }).affiliations.get([query, [options]])`

* **operationId** Globally Unique Identifier (GUID) (type: `string`)

Get a collection of affiliations.

```js
client.operations.operationId({ operationId }).affiliations.get([query, [options]]).then(...)
```
  
#### `logs.get([query, [options]])`

Get a collection of logs.

```js
client.logs.get([query, [options]]).then(...)
```
  
#### `logs.logId({ logId }).get([query, [options]])`

* **logId** Globally Unique Identifier (GUID) (type: `string`)

Get log with `logId = {logId}`.

```js
client.logs.logId({ logId }).get([query, [options]]).then(...)
```
  
#### `personnel.get([query, [options]])`

Get collection of available personnel.

```js
client.personnel.get([query, [options]]).then(...)
```
  
#### `personnel.personnelId({ personnelId }).get([query, [options]])`

* **personnelId** Globally Unique Identifier (GUID) (type: `string`)

Get personnel with `personnelId = {personnelId}`.

```js
client.personnel.personnelId({ personnelId }).get([query, [options]]).then(...)
```
  
#### `transports.get([query, [options]])`

Get collection of available transports.

```js
client.transports.get([query, [options]]).then(...)
```
  
#### `transports.transportId({ transportId }).get([query, [options]])`

* **transportId** Globally Unique Identifier (GUID) (type: `string`)

Get transport with `transportId = {transportId}`.

```js
client.transports.transportId({ transportId }).get([query, [options]]).then(...)
```
  
## License

Apache 2.0
