# get a venue object
the most up to date information is availabe here: https://docs.noroff.dev/holidaze/vnues#single-entry

**note:** you must autherice your self to use this endpoint. [for more information on authentication see here](../api-guide.md#sending-authentication-token)

complete url: https://api.noroff.dev/api/v1/holidaze/venues/{venueId}
http method: "GET"

## request users
request url query options:
- id (**required**): the id ot the venue you want to get
- _bookings (optional): "true" or "false"(default) whether nor not to include bookings in the responsees
- _owner (optional): "true" or "false"(default) whether nor not to include information about the owner

example request url:
 https://api.noroff.dev/api/v1/holidaze/venues/3fa85f64-5717-4562-b3fc-2c963f66afa6

example request object: 
{
  method: "GET,
  headers: {
    Authorization: `Bearer asdfasdf23asdvah2qw344aab....`
  }
}

## response on success

### https://api.noroff.dev/api/v1/holidaze/venues/3fa85f64-5717-4562-b3fc-2c963f66afa6 (on 8 jan. 2024)
```json
  {
    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "name": "string",
    "description": "string",
    "media": [
      "string"
    ],
    "price": 0,
    "maxGuests": 0,
    "rating": 0,
    "created": "2024-01-10T12:20:27.026Z",
    "updated": "2024-01-10T12:20:27.026Z",
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
    },
    "owner": {
      "name": "string",
      "email": "string",
      "avatar": "string"
    },
    "bookings": [
      {
        "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        "dateFrom": "2024-01-10T12:20:27.026Z",
        "dateTo": "2024-01-10T12:20:27.026Z",
        "guests": 0,
        "created": "2024-01-10T12:20:27.026Z",
        "updated": "2024-01-10T12:20:27.026Z"
      }
    ]
  }
```

## response on bad url option

none-exsisting id:
```json
  {
    "errors": [
      {
        "message": "No venue with this id"
      }
    ],
    "status": "Not Found",
    "statusCode": 404
}
```