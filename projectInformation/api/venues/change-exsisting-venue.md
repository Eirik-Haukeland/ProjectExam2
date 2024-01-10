# change a venue
the most up to date information is availabe here: https://docs.noroff.dev/holidaze/venues#update-entry

**note:** you must autherice your self to use this endpoint. [for more information on authentication see here](../api-guide.md#sending-authentication-token)

complete url: https://api.noroff.dev/api/v1/holidaze/venues/{veneu id}
http method: "PUT"

## request
request url query options:
- id (**required**): the id ot the booking you want to get
- _owner (optional): "true" or "false"(default) whether nor not to include information about the owner
- _bookings (optional): "true" or "false"(default) whether nor not to include bookings in the responsees

example request url:
 https://api.noroff.dev/api/v1/holidaze/venues/23b9b45d-e176-4ade-9ee1-ef94e128557f

**note:** while all body optins are optinal at leest one of them must be included
example request object: 
```js
{
  method: "PUT",
  body: {
    "name": "string", // Optional
    "description": "string", // Optional
    "media": ["string"], // Optional - must be a valid url
    "price": 0, // Optional
    "maxGuests": 0, // Optional
    "rating": 0, // Optional (default: 0)
    "meta": {
      "wifi": true, // Optional (default: false)
      "parking": true, // Optional (default: false)
      "breakfast": true, // Optional (default: false)
      "pets": true // Optional (default: false)
    },
    "location": {
      "address": "string", // Optional (default: "Unknown")
      "city": "string", // Optional (default: "Unknown")
      "zip": "string", // Optional (default: "Unknown")
      "country": "string", // Optional (default: "Unknown")
      "continent": "string", // Optional (default: "Unknown"),
      "lat": 0, // Optional (default: 0)
      "lng": 0 // Optional (default: 0)
    }
  },
  headers: {
    Authorization: `Bearer asdfasdf23asdvah2qw344aab....`
  }
}
```

## response on success

### https://api.noroff.dev/api/v1/holidaze/venues/23b9b45d-e176-4ade-9ee1-ef94e128557f (on 10 jan. 2024)
```json
  {
    "id": "23b9b45d-e176-4ade-9ee1-ef94e128557f",
    "name": "string",
    "description": "string",
    "media": [
      "https://source.unsplash.com/1600x900/?hotel"
    ],
    "price": 0,
    "maxGuests": 100,
    "rating": 5,
    "created": "2024-01-10T06:57:29.799Z",
    "updated": "2024-01-10T06:57:29.799Z",
    "meta": {
      "wifi": true,
      "parking": true,
      "breakfast": true,
      "pets": true
    },
    "location": {
      "address": "string",
      "city": "string",
      "zip": "string",
      "country": "string",
      "continent": "string",
      "lat": 0,
      "lng": 0
    }
  }
```

### on a bad id

```json
  {
    "errors": [
      {
        "message": "Venue not found"
      }
    ],
    "status": "Not Found",
    "statusCode": 404
  }
```


### examples of response on bad body option

bad image url:
```json
  {
    "errors": [
      {
        "code": "invalid_string",
        "message": "Media must be a valid URL",
        "path": [
          "media",
          0
        ]
      }
    ],
    "status": "Bad Request",
    "statusCode": 400
  }
```

body that is empty or without a recognized options:
```json
  {
    "errors": [
      {
        "code": "custom",
        "message": "You must provide at least one field to update",
        "path": []
      }
    ],
    "status": "Bad Request",
    "statusCode": 400
  }
```