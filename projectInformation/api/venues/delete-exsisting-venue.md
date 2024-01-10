# delete a venue
the most up to date information is availabe here: https://docs.noroff.dev/holidaze/venues#delete-entry

**note:** you must autherice your self to use this endpoint. [for more information on authentication see here](../api-guide.md#sending-authentication-token)

complete url: https://api.noroff.dev/api/v1/holidaze/venues/{venue id}
http method: "PUT"

## request
request url query options:
- id (**required**): the id ot the venue you want to get

example request url:
 https://api.noroff.dev/api/v1/holidaze/venues/{venue id}

example request object: 
{
  method: "PUT",
  headers: {
    Authorization: `Bearer asdfasdf23asdvah2qw344aab....`
  }
}

## response on success

### https://api.noroff.dev/api/v1/holidaze/venues/7edd5561-96d5-4784-84d9-f4d8a3e5d30b (on 10 jan. 2024)
if successful it respons with a "200" code

## examples of response on bad url

bad id:
```json
  {
    "errors": [
      {
        "message": "venue not found"
      }
    ],
    "status": "Not Found",
    "statusCode": 404
  }
```