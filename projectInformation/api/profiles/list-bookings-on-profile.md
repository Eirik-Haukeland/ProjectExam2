# get an bookings profile

the most up to date information is availabe here: https://docs.noroff.dev/holidaze/profiles#all-bookings-by-profile

**note:** you must autherice your self to use this endpoint. [for more information on authentication see here](../api-guide.md#sending-authentication-token)

complete url: https://api.noroff.dev/api/v1/holidaze/profiles/{userName}/bookinigs
http method: "GET"

## request users/bookings
request url query options:
- sort (optinal): name of the feeld you want the resault sorted in posible options are: "name", "email", "avatar", "venueManager", "_count"
- sortOrder (optinal): "asc"(asending) or desc(descending) sort order
- limit (optinal): number representing the maximum amount of resaults for this request (used for pagination)
- offset (optinal): number representing how many posible resaults to skip for this request (used for pagination)
- _venue (optional): "true" or "false"(default) whether nor not to include bookings in the responsees

example request object: 
{
  method: "GET,
  headers: {
    Authorization: `Bearer asdfasdf23asdvah2qw344aab....`
  }
}

## response on success

### https://api.noroff.dev/api/v1/holidaze/profiles/test_ebh?_venue=true
```json
[
  {
    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "dateFrom": "2024-01-08T12:34:39.447Z",
    "dateTo": "2024-01-08T12:34:39.447Z",
    "guests": 0,
    "created": "2024-01-08T12:34:39.447Z",
    "updated": "2024-01-08T12:34:39.447Z",
    "venue": {
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "name": "string",
      "description": "string",
      "media": [
        "string"
      ],
      "price": 0,
      "maxGuests": 0,
      "rating": 0,
      "created": "2024-01-08T12:34:39.447Z",
      "updated": "2024-01-08T12:34:39.447Z",
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
      }
    },
    "customer": {
      "name": "string",
      "email": "string",
      "avatar": "string"
    }
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