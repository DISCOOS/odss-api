/* eslint no-use-before-define: 0 */
const ClientOAuth2 = require('client-oauth2');
const rp = require('request-promise');
const queryString = require('query-string');

const TEMPLATE_REGEXP = /{\+?([^{}]+)}/g;

const template = (string, interpolate) =>
  string.replace(TEMPLATE_REGEXP, (match, key) => {
    if (interpolate[key] != null) {
      return encodeURIComponent(interpolate[key]);
    }

    return '';
  });

const request = (client, method, path, opts) => {
  const headers = opts.headers ?
    Object.assign({}, client.options.headers, opts.headers) : client.options.headers;
  const options = Object.assign({}, client.options, opts);
  const baseUri = template(options.baseUri, options.baseUriParameters);

  if (typeof options.query === 'string') {
    options.query = queryString.parse(options.query);
  }

  let reqOpts = {
    url: baseUri.replace(/\/$/, '') + template(path, options.uriParameters),
    json: !Buffer.isBuffer(options.body),
    method,
    headers,
    formData: options.formData,
    body: options.body,
    qs: options.query,
    options: options.options,
    resolveWithFullResponse: true
  };

  if (options.user && typeof options.user.sign === 'function') {
    reqOpts = options.user.sign(reqOpts);
  }

  return rp(reqOpts).then((response) => {
    // adding backward compatibility
    response.status = response.statusCode;
    return response;
  });
};

class Client {
  constructor(options) {
    this.path = '';
    this.options = Object.assign({
      baseUri: 'https://api.redcross.no/odss/rest/api/v{version}',
      baseUriParameters: {},
      headers: {}
    }, options);
    this.customRequest = (method, path, opts) =>
      request(this, method, path, opts);

    this.form = (payload) => {
      const data = {
        formData: payload,
        append(key, value) {
          if (typeof value !== 'string') {
            this.formData.file = value;
          } else {
            data.formData[key] = value;
          }
        }
      };
      return data;
    };

    this.incidents = new Incidents(this, '/incidents');
    this.operations = new Operations(this, '/operations');
    this.logs = new Logs(this, '/logs');
    this.personnel = new Personnel(this, '/personnel');
    this.transports = new Transports(this, '/transports');
  }

  setHeaders(headers) {
    this.options.headers = headers;
  }

  use(name, module) {
    const moduleType = typeof module;
    if (Object.prototype.hasOwnProperty.call(this, name)) {
      throw Error(`The property ${name} already exists`);
    }
    switch (moduleType) {
      case 'string':
        // eslint-disable-next-line
        this[name] = require(module);
        break;
      case 'function':
        this[name] = new module(); // eslint-disable-line new-cap
        break;
      case 'object':
        this[name] = module;
        break;
      case 'undefined':
        if (typeof name === 'string') {
          // eslint-disable-next-line
          this[name] = require(name);
          break;
        }
        throw Error('Cannot create the extension point with the values provided');
      default:
        throw Error('Cannot create the extension point with the values provided');
    }
  }
}

class Incidents {
  constructor(client, path) {
    this.client = client;
    this.path = path;
  }
  incidentId(uriParams) {
    return new Incidents.IncidentId(
      this.client,
      this.path + template('/{incidentId}',
        Object.assign({}, uriParams)
      )
    );
  }
  get(query, opts) {
    const options = Object.assign(query && query.formData ? query : {
      query
    }, opts);
    return request(this.client, 'get', this.path, options);
  }
  post(body, opts) {
    const options = Object.assign(body && body.formData ? body : {
      body
    }, opts);
    return request(this.client, 'post', this.path, options);
  }
}

Incidents.IncidentId = class {
  constructor(client, path) {
    this.client = client;
    this.path = path;
    this.clues = new Incidents.IncidentId.Clues(this.client, `${this.path}/clues`);
    this.persons = new Incidents.IncidentId.Persons(this.client, `${this.path}/persons`);
    this.vehicles = new Incidents.IncidentId.Vehicles(this.client, `${this.path}/vehicles`);
  }
  get(query, opts) {
    const options = Object.assign(query && query.formData ? query : {
      query
    }, opts);
    return request(this.client, 'get', this.path, options);
  }
  patch(body, opts) {
    const options = Object.assign(body && body.formData ? body : {
      body
    }, opts);
    return request(this.client, 'patch', this.path, options);
  }
  delete(body, opts) {
    const options = Object.assign(body && body.formData ? body : {
      body
    }, opts);
    return request(this.client, 'delete', this.path, options);
  }
};

Incidents.IncidentId.Clues = class {
  constructor(client, path) {
    this.client = client;
    this.path = path;
  }
  clueId(uriParams) {
    return new Incidents.IncidentId.Clues.ClueId(
      this.client,
      this.path + template('/{clueId}',
        Object.assign({}, uriParams)
      )
    );
  }
  get(query, opts) {
    const options = Object.assign(query && query.formData ? query : {
      query
    }, opts);
    return request(this.client, 'get', this.path, options);
  }
  post(body, opts) {
    const options = Object.assign(body && body.formData ? body : {
      body
    }, opts);
    return request(this.client, 'post', this.path, options);
  }
};

Incidents.IncidentId.Clues.ClueId = class {
  constructor(client, path) {
    this.client = client;
    this.path = path;
  }
  get(query, opts) {
    const options = Object.assign(query && query.formData ? query : {
      query
    }, opts);
    return request(this.client, 'get', this.path, options);
  }
  patch(body, opts) {
    const options = Object.assign(body && body.formData ? body : {
      body
    }, opts);
    return request(this.client, 'patch', this.path, options);
  }
  delete(body, opts) {
    const options = Object.assign(body && body.formData ? body : {
      body
    }, opts);
    return request(this.client, 'delete', this.path, options);
  }
};

Incidents.IncidentId.Persons = class {
  constructor(client, path) {
    this.client = client;
    this.path = path;
  }
  personId(uriParams) {
    return new Incidents.IncidentId.Persons.PersonId(
      this.client,
      this.path + template('/{personId}',
        Object.assign({}, uriParams)
      )
    );
  }
  get(query, opts) {
    const options = Object.assign(query && query.formData ? query : {
      query
    }, opts);
    return request(this.client, 'get', this.path, options);
  }
  post(body, opts) {
    const options = Object.assign(body && body.formData ? body : {
      body
    }, opts);
    return request(this.client, 'post', this.path, options);
  }
};

Incidents.IncidentId.Persons.PersonId = class {
  constructor(client, path) {
    this.client = client;
    this.path = path;
  }
  get(query, opts) {
    const options = Object.assign(query && query.formData ? query : {
      query
    }, opts);
    return request(this.client, 'get', this.path, options);
  }
  patch(body, opts) {
    const options = Object.assign(body && body.formData ? body : {
      body
    }, opts);
    return request(this.client, 'patch', this.path, options);
  }
  delete(body, opts) {
    const options = Object.assign(body && body.formData ? body : {
      body
    }, opts);
    return request(this.client, 'delete', this.path, options);
  }
};

Incidents.IncidentId.Vehicles = class {
  constructor(client, path) {
    this.client = client;
    this.path = path;
  }
  vehicleId(uriParams) {
    return new Incidents.IncidentId.Vehicles.VehicleId(
      this.client,
      this.path + template('/{vehicleId}',
        Object.assign({}, uriParams)
      )
    );
  }
  get(query, opts) {
    const options = Object.assign(query && query.formData ? query : {
      query
    }, opts);
    return request(this.client, 'get', this.path, options);
  }
  post(body, opts) {
    const options = Object.assign(body && body.formData ? body : {
      body
    }, opts);
    return request(this.client, 'post', this.path, options);
  }
};

Incidents.IncidentId.Vehicles.VehicleId = class {
  constructor(client, path) {
    this.client = client;
    this.path = path;
  }
  get(query, opts) {
    const options = Object.assign(query && query.formData ? query : {
      query
    }, opts);
    return request(this.client, 'get', this.path, options);
  }
  patch(body, opts) {
    const options = Object.assign(body && body.formData ? body : {
      body
    }, opts);
    return request(this.client, 'patch', this.path, options);
  }
  delete(body, opts) {
    const options = Object.assign(body && body.formData ? body : {
      body
    }, opts);
    return request(this.client, 'delete', this.path, options);
  }
};

class Operations {
  constructor(client, path) {
    this.client = client;
    this.path = path;
  }
  operationId(uriParams) {
    return new Operations.OperationId(
      this.client,
      this.path + template('/{operationId}',
        Object.assign({}, uriParams)
      )
    );
  }
  get(query, opts) {
    const options = Object.assign(query && query.formData ? query : {
      query
    }, opts);
    return request(this.client, 'get', this.path, options);
  }
  post(body, opts) {
    const options = Object.assign(body && body.formData ? body : {
      body
    }, opts);
    return request(this.client, 'post', this.path, options);
  }
}

Operations.OperationId = class {
  constructor(client, path) {
    this.client = client;
    this.path = path;
    this.missions = new Operations.OperationId.Missions(this.client, `${this.path}/missions`);
    this.transitions = new Operations.OperationId.Transitions(this.client, `${this.path}/transitions`);
    this.personnel = new Operations.OperationId.Personnel(this.client, `${this.path}/personnel`);
    this.transports = new Operations.OperationId.Transports(this.client, `${this.path}/transports`);
    this.units = new Operations.OperationId.Units(this.client, `${this.path}/units`);
    this.tracking = new Operations.OperationId.Tracking(this.client, `${this.path}/tracking`);
    this.affiliations = new Operations.OperationId.Affiliations(this.client, `${this.path}/affiliations`);
  }
  get(query, opts) {
    const options = Object.assign(query && query.formData ? query : {
      query
    }, opts);
    return request(this.client, 'get', this.path, options);
  }
  patch(body, opts) {
    const options = Object.assign(body && body.formData ? body : {
      body
    }, opts);
    return request(this.client, 'patch', this.path, options);
  }
  delete(body, opts) {
    const options = Object.assign(body && body.formData ? body : {
      body
    }, opts);
    return request(this.client, 'delete', this.path, options);
  }
};

Operations.OperationId.Missions = class {
  constructor(client, path) {
    this.client = client;
    this.path = path;
  }
  missionId(uriParams) {
    return new Operations.OperationId.Missions.MissionId(
      this.client,
      this.path + template('/{missionId}',
        Object.assign({}, uriParams)
      )
    );
  }
  get(query, opts) {
    const options = Object.assign(query && query.formData ? query : {
      query
    }, opts);
    return request(this.client, 'get', this.path, options);
  }
  post(body, opts) {
    const options = Object.assign(body && body.formData ? body : {
      body
    }, opts);
    return request(this.client, 'post', this.path, options);
  }
};

Operations.OperationId.Missions.MissionId = class {
  constructor(client, path) {
    this.client = client;
    this.path = path;
  }
  get(query, opts) {
    const options = Object.assign(query && query.formData ? query : {
      query
    }, opts);
    return request(this.client, 'get', this.path, options);
  }
  patch(body, opts) {
    const options = Object.assign(body && body.formData ? body : {
      body
    }, opts);
    return request(this.client, 'patch', this.path, options);
  }
  delete(body, opts) {
    const options = Object.assign(body && body.formData ? body : {
      body
    }, opts);
    return request(this.client, 'delete', this.path, options);
  }
};

Operations.OperationId.Transitions = class {
  constructor(client, path) {
    this.client = client;
    this.path = path;
  }
  get(query, opts) {
    const options = Object.assign(query && query.formData ? query : {
      query
    }, opts);
    return request(this.client, 'get', this.path, options);
  }
  post(body, opts) {
    const options = Object.assign(body && body.formData ? body : {
      body
    }, opts);
    return request(this.client, 'post', this.path, options);
  }
};

Operations.OperationId.Personnel = class {
  constructor(client, path) {
    this.client = client;
    this.path = path;
  }
  personnelId(uriParams) {
    return new Operations.OperationId.Personnel.PersonnelId(
      this.client,
      this.path + template('/{personnelId}',
        Object.assign({}, uriParams)
      )
    );
  }
  get(query, opts) {
    const options = Object.assign(query && query.formData ? query : {
      query
    }, opts);
    return request(this.client, 'get', this.path, options);
  }
};

Operations.OperationId.Personnel.PersonnelId = class {
  constructor(client, path) {
    this.client = client;
    this.path = path;
  }
  post(body, opts) {
    const options = Object.assign(body && body.formData ? body : {
      body
    }, opts);
    return request(this.client, 'post', this.path, options);
  }
  delete(body, opts) {
    const options = Object.assign(body && body.formData ? body : {
      body
    }, opts);
    return request(this.client, 'delete', this.path, options);
  }
};

Operations.OperationId.Transports = class {
  constructor(client, path) {
    this.client = client;
    this.path = path;
  }
  transportId(uriParams) {
    return new Operations.OperationId.Transports.TransportId(
      this.client,
      this.path + template('/{transportId}',
        Object.assign({}, uriParams)
      )
    );
  }
  get(query, opts) {
    const options = Object.assign(query && query.formData ? query : {
      query
    }, opts);
    return request(this.client, 'get', this.path, options);
  }
};

Operations.OperationId.Transports.TransportId = class {
  constructor(client, path) {
    this.client = client;
    this.path = path;
  }
  post(body, opts) {
    const options = Object.assign(body && body.formData ? body : {
      body
    }, opts);
    return request(this.client, 'post', this.path, options);
  }
  delete(body, opts) {
    const options = Object.assign(body && body.formData ? body : {
      body
    }, opts);
    return request(this.client, 'delete', this.path, options);
  }
};

Operations.OperationId.Units = class {
  constructor(client, path) {
    this.client = client;
    this.path = path;
  }
  unitId(uriParams) {
    return new Operations.OperationId.Units.UnitId(
      this.client,
      this.path + template('/{unitId}',
        Object.assign({}, uriParams)
      )
    );
  }
  get(query, opts) {
    const options = Object.assign(query && query.formData ? query : {
      query
    }, opts);
    return request(this.client, 'get', this.path, options);
  }
  post(body, opts) {
    const options = Object.assign(body && body.formData ? body : {
      body
    }, opts);
    return request(this.client, 'post', this.path, options);
  }
};

Operations.OperationId.Units.UnitId = class {
  constructor(client, path) {
    this.client = client;
    this.path = path;
    this.missions = new Operations.OperationId.Units.UnitId.Missions(this.client, `${this.path}/missions`);
    this.personnel = new Operations.OperationId.Units.UnitId.Personnel(this.client, `${this.path}/personnel`);
    this.transports = new Operations.OperationId.Units.UnitId.Transports(this.client, `${this.path}/transports`);
  }
  get(query, opts) {
    const options = Object.assign(query && query.formData ? query : {
      query
    }, opts);
    return request(this.client, 'get', this.path, options);
  }
  patch(body, opts) {
    const options = Object.assign(body && body.formData ? body : {
      body
    }, opts);
    return request(this.client, 'patch', this.path, options);
  }
  delete(body, opts) {
    const options = Object.assign(body && body.formData ? body : {
      body
    }, opts);
    return request(this.client, 'delete', this.path, options);
  }
};

Operations.OperationId.Units.UnitId.Missions = class {
  constructor(client, path) {
    this.client = client;
    this.path = path;
  }
  missionId(uriParams) {
    return new Operations.OperationId.Units.UnitId.Missions.MissionId(
      this.client,
      this.path + template('/{missionId}',
        Object.assign({}, uriParams)
      )
    );
  }
  get(query, opts) {
    const options = Object.assign(query && query.formData ? query : {
      query
    }, opts);
    return request(this.client, 'get', this.path, options);
  }
};

Operations.OperationId.Units.UnitId.Missions.MissionId = class {
  constructor(client, path) {
    this.client = client;
    this.path = path;
  }
  post(body, opts) {
    const options = Object.assign(body && body.formData ? body : {
      body
    }, opts);
    return request(this.client, 'post', this.path, options);
  }
  delete(body, opts) {
    const options = Object.assign(body && body.formData ? body : {
      body
    }, opts);
    return request(this.client, 'delete', this.path, options);
  }
};

Operations.OperationId.Units.UnitId.Personnel = class {
  constructor(client, path) {
    this.client = client;
    this.path = path;
  }
  personnelId(uriParams) {
    return new Operations.OperationId.Units.UnitId.Personnel.PersonnelId(
      this.client,
      this.path + template('/{personnelId}',
        Object.assign({}, uriParams)
      )
    );
  }
  get(query, opts) {
    const options = Object.assign(query && query.formData ? query : {
      query
    }, opts);
    return request(this.client, 'get', this.path, options);
  }
};

Operations.OperationId.Units.UnitId.Personnel.PersonnelId = class {
  constructor(client, path) {
    this.client = client;
    this.path = path;
  }
  post(body, opts) {
    const options = Object.assign(body && body.formData ? body : {
      body
    }, opts);
    return request(this.client, 'post', this.path, options);
  }
  delete(body, opts) {
    const options = Object.assign(body && body.formData ? body : {
      body
    }, opts);
    return request(this.client, 'delete', this.path, options);
  }
};

Operations.OperationId.Units.UnitId.Transports = class {
  constructor(client, path) {
    this.client = client;
    this.path = path;
  }
  transportId(uriParams) {
    return new Operations.OperationId.Units.UnitId.Transports.TransportId(
      this.client,
      this.path + template('/{transportId}',
        Object.assign({}, uriParams)
      )
    );
  }
  get(query, opts) {
    const options = Object.assign(query && query.formData ? query : {
      query
    }, opts);
    return request(this.client, 'get', this.path, options);
  }
};

Operations.OperationId.Units.UnitId.Transports.TransportId = class {
  constructor(client, path) {
    this.client = client;
    this.path = path;
  }
  post(body, opts) {
    const options = Object.assign(body && body.formData ? body : {
      body
    }, opts);
    return request(this.client, 'post', this.path, options);
  }
  delete(body, opts) {
    const options = Object.assign(body && body.formData ? body : {
      body
    }, opts);
    return request(this.client, 'delete', this.path, options);
  }
};

Operations.OperationId.Tracking = class {
  constructor(client, path) {
    this.client = client;
    this.path = path;
  }
  unitId(uriParams) {
    return new Operations.OperationId.Tracking.UnitId(
      this.client,
      this.path + template('/{unitId}',
        Object.assign({}, uriParams)
      )
    );
  }
  get(query, opts) {
    const options = Object.assign(query && query.formData ? query : {
      query
    }, opts);
    return request(this.client, 'get', this.path, options);
  }
};

Operations.OperationId.Tracking.UnitId = class {
  constructor(client, path) {
    this.client = client;
    this.path = path;
  }
  get(query, opts) {
    const options = Object.assign(query && query.formData ? query : {
      query
    }, opts);
    return request(this.client, 'get', this.path, options);
  }
  post(body, opts) {
    const options = Object.assign(body && body.formData ? body : {
      body
    }, opts);
    return request(this.client, 'post', this.path, options);
  }
  patch(body, opts) {
    const options = Object.assign(body && body.formData ? body : {
      body
    }, opts);
    return request(this.client, 'patch', this.path, options);
  }
  delete(body, opts) {
    const options = Object.assign(body && body.formData ? body : {
      body
    }, opts);
    return request(this.client, 'delete', this.path, options);
  }
};

Operations.OperationId.Affiliations = class {
  constructor(client, path) {
    this.client = client;
    this.path = path;
  }
  get(query, opts) {
    const options = Object.assign(query && query.formData ? query : {
      query
    }, opts);
    return request(this.client, 'get', this.path, options);
  }
};

class Logs {
  constructor(client, path) {
    this.client = client;
    this.path = path;
  }
  logId(uriParams) {
    return new Logs.LogId(
      this.client,
      this.path + template('/{logId}',
        Object.assign({}, uriParams)
      )
    );
  }
  get(query, opts) {
    const options = Object.assign(query && query.formData ? query : {
      query
    }, opts);
    return request(this.client, 'get', this.path, options);
  }
}

Logs.LogId = class {
  constructor(client, path) {
    this.client = client;
    this.path = path;
  }
  get(query, opts) {
    const options = Object.assign(query && query.formData ? query : {
      query
    }, opts);
    return request(this.client, 'get', this.path, options);
  }
};

class Personnel {
  constructor(client, path) {
    this.client = client;
    this.path = path;
  }
  personnelId(uriParams) {
    return new Personnel.PersonnelId(
      this.client,
      this.path + template('/{personnelId}',
        Object.assign({}, uriParams)
      )
    );
  }
  get(query, opts) {
    const options = Object.assign(query && query.formData ? query : {
      query
    }, opts);
    return request(this.client, 'get', this.path, options);
  }
}

Personnel.PersonnelId = class {
  constructor(client, path) {
    this.client = client;
    this.path = path;
  }
  get(query, opts) {
    const options = Object.assign(query && query.formData ? query : {
      query
    }, opts);
    return request(this.client, 'get', this.path, options);
  }
};

class Transports {
  constructor(client, path) {
    this.client = client;
    this.path = path;
  }
  transportId(uriParams) {
    return new Transports.TransportId(
      this.client,
      this.path + template('/{transportId}',
        Object.assign({}, uriParams)
      )
    );
  }
  get(query, opts) {
    const options = Object.assign(query && query.formData ? query : {
      query
    }, opts);
    return request(this.client, 'get', this.path, options);
  }
}

Transports.TransportId = class {
  constructor(client, path) {
    this.client = client;
    this.path = path;
  }
  get(query, opts) {
    const options = Object.assign(query && query.formData ? query : {
      query
    }, opts);
    return request(this.client, 'get', this.path, options);
  }
};
Client.version = '1';
Client.Security = {

// eslint-disable-next-line
  oauth2_0: function oauth2_0(options) {
    const schemeSettings = {
      accessTokenUri: 'https://login.microsoftonline.com/redcross.no/oauth2/token',
      authorizationUri: 'https://login.microsoftonline.com/redcross.no/oauth2/v2.0/authorize',
      authorizationGrants: [
        'authorization_code',
        'password',
        'client_credentials',
        'implicit'
      ]
    };
    return new ClientOAuth2(Object.assign(schemeSettings, options));
  }
};
module.exports = Client;
