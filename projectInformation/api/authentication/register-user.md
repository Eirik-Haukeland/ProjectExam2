# regiser new user

the most up to date information is availabe here: https://docs.noroff.dev/holidaze/authentication#register

**note:** after regitration you still need to log inn as you do not resive an `accsessToken` on regitration

complete url: https://api.noroff.dev/api/v1/holidaze/auth/register
http method: "POST"

## request for user registration

request body options:
- name (**required**): may only contain letters, numbers, and underscore
- email (**required**): must be a stud.noroff.no or noroff.no email address
- password (**required**): must be longer than 8 characters
- avatar (optinal, default to `null`): must bee a public url to an image
- venueManager (optinal, default to `flase`): must be `true` or `flase` boolean value 

example request body: 
``` js
  {
    method: "POST,
    body: {
      "name": "test_ebh", // Required
      "email": "test_ebh@stud.noroff.no", // Required
      "password": "12345678", // Required
      "avatar": "https://img.service.com/avatar.jpg", // Optional (default: null)
      "venueManager": false // Optional (default: false)
    }
  }
```

## response on successfull regiser request:
``` json
  {
    "id": 1333,
    "name": "test_ebh",
    "email": "test_ebh@stud.noroff.no",
    "avatar": null,
    "venueManager": false
  }
```

## response on bad regiser requset:

**one bad param:**
```json
  {
    "errors": [
      {
        "code": "invalid_type",
        "message": "Venue manager must be a boolean",
        "path": [
          "venueManager"
        ]
      }
    ],
    "status": "Bad Request",
    "statusCode": 400
  }
```

**multiple bad params:**
```json
  {
    "errors": [
      {
        "code": "invalid_string",
        "message": "Avatar must be valid URL",
        "path": [
          "avatar"
        ]
      },
      {
        "code": "invalid_type",
        "message": "Venue manager must be a boolean",
        "path": [
          "venueManager"
        ]
      }
    ],
    "status": "Bad Request",
    "statusCode": 400
  }
```