# get an profile

the most up to date information is availabe here: https://docs.noroff.dev/holidaze/profiles#single-entry

**note:** you must autherice your self to use this endpoint. [for more information on authentication see here](../api-guide.md#sending-authentication-token)

complete url: https://api.noroff.dev/api/v1/holidaze/profiles/{userName}
http method: "GET"

## request users
request url query options:
- _bookings (optional): "true" or "false"(default) whether nor not to include bookings in the responsees
- _venues (optional): "true" or "false"(default) whether nor not to include venues in the responsees

example request url:
 https://api.noroff.dev/api/v1/holidaze/profiles/test_ebh?_bookings=true

example request object: 
{
  method: "GET,
  headers: {
    Authorization: `Bearer asdfasdf23asdvah2qw344aab....`
  }
}

## response on success

### https://api.noroff.dev/api/v1/holidaze/profiles/test_ebh?_bookings=true (on 8 jan. 2024)
```json
 {
    "name": "test_ebh",
    "email": "test_ebh@stud.noroff.no",
    "avatar": null,
    "venueManager": false,
    "bookings": [],
    "_count": {
      "venues": 0,
      "bookings": 0
    }
  }
```

## response on bad url option

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