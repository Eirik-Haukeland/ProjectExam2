# get an venues profile

the most up to date information is availabe here: https://docs.noroff.dev/holidaze/profiles#all-venues-by-profile

**note:** you must autherice your self to use this endpoint. [for more information on authentication see here](../api-guide.md#sending-authentication-token)

complete url: https://api.noroff.dev/api/v1/holidaze/profiles/{userName}/venues
http method: "GET"

## request users/venues
request url query options:
- sort (optinal): name of the feeld you want the resault sorted in posible options are: "name", "email", "avatar", "venueManager", "_count"
- sortOrder (optinal): "asc"(asending) or desc(descending) sort order
- limit (optinal): number representing the maximum amount of resaults for this request (used for pagination)
- offset (optinal): number representing how many posible resaults to skip for this request (used for pagination)
- _bookings (optional): "true" or "false"(default) whether nor not to include bookings in the responsees
- _owner (optional): "true" or "false"(default) whether nor not to include information about the owner

example request object: 
{
  method: "GET,
  headers: {
    Authorization: `Bearer asdfasdf23asdvah2qw344aab....`
  }
}

## response on success

### https://api.noroff.dev/api/v1/holidaze/profiles/test_ebh?_owner=true&_bookings=true
```json
 [
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
    "created": "2024-01-08T12:31:36.037Z",
    "updated": "2024-01-08T12:31:36.037Z",
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
        "dateFrom": "2024-01-08T12:31:36.037Z",
        "dateTo": "2024-01-08T12:31:36.037Z",
        "guests": 0,
        "created": "2024-01-08T12:31:36.037Z",
        "updated": "2024-01-08T12:31:36.037Z"
      }
    ]
  }
]
```

## response bad response

none-exsisting userName:
```json
  {
    "errors": [
      {
        "message": "No profile with this name"
      }
    ],
    "status": "Not Found",
    "statusCode": 404
  }
```