# Tozny React Native Example
### Get started

1) Install pods for IOS.
```
cd ios
pod install
```

2) Then at the root of the project:
```
yarn
```

3) Once everything is setup, start:
```
yarn start
```


At the moment a file record does not upload from a base64 string. There are 3 examples in `app/services/ToznyService.js` that I've attempted at. Just uncomment or change as necessary.


---
### Environment Setup
Also, save `.env.example` as `.env.development` or `.env` to make an easier setup.
```
USERNAME=your_username
PASSWORD=your_password
API_URL=https://api.e3db.com
REALM=realm_name
```