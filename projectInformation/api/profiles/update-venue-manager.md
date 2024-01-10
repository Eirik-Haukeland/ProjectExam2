# update ability to add venues for a profile

the most up to date information is availabe here: https://docs.noroff.dev/holidaze/profiles#update-profile

**note:** you must autherice your self to use this endpoint. [for more information on authentication see here](../api-guide.md#sending-authentication-token)

complete url: https://api.noroff.dev/api/v1/holidaze/profiles/{userName}
http method: "PUT"

## request users
request body options:
- venueManager (**required**): `true`(enable) or `false`(disable) the ability to create venues

example request object: 
{
  method: "PUT,
  body: {
    venueManager: true
  },
  headers: {
    Authorization: `Bearer asdfasdf23asdvah2qw344aab....`
  }
}

## response on success

### https://api.noroff.dev/api/v1/holidaze/profiles/test_ebh with example request object (on 8 jan. 2024)
```json
 {
    "name": "test_ebh",
    "email": "test_ebh@stud.noroff.no",
    "avatar": null,
    "venueManager": true,
  }
```

## response bad response

missing venueManager:
```json
  {
    "errors": [
      {
        "code": "invalid_type",
        "message": "Venue manager is required",
        "path": [
          "venueManager"
        ]
      }
    ],
    "status": "Bad Request",
    "statusCode": 400
  }
```

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