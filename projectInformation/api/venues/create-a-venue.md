# create a venue
the most up to date information is availabe here: https://docs.noroff.dev/holidaze/venues#create-entry

**note:** you must autherice your self to use this endpoint. [for more information on authentication see here](../api-guide.md#sending-authentication-token)

complete url: https://api.noroff.dev/api/v1/holidaze/venues
http method: "POST"

## request
request url query options:
- _owner (optional): "true" or "false"(default) whether nor not to include information about the owner
- _bookings (optional): "true" or "false"(default) whether nor not to include bookings in the responsees

example request url:
 https://api.noroff.dev/api/v1/holidaze/venues

example request object: 
```js
{
  method: "POST",
  body: {
    "name": "string", // **Required**
    "description": "string", // **Required**
    "media": ["string"], // Optional - must be a valid url
    "price": 0, // **Required**
    "maxGuests": 0, // **Required**
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

### https://api.noroff.dev/api/v1/holidaze/bookings (on 10 jan. 2024)
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

## examples of response on bad body option

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

missing name field (similar responses for all other requierd feelds):
```json
  {
    "errors": [
      {
        "code": "invalid_type",
        "message": "Name is required",
        "path": [
          "name"
        ]
      }
    ],
    "status": "Bad Request",
    "statusCode": 400
  }
```